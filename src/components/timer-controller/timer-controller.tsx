"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TimerDisplay } from "@/components/timer-controller/timer-display";
import { TimerModeSwitch } from "@/components/timer-controller/timer-mode-switch";
import { TimerProgress } from "@/components/timer-controller/timer-progress";
import { TimerActions } from "@/components/timer-controller/timer-action";
import { CountdownInput } from "@/components/timer-controller/count-down-input";
import { TimerMode } from "@/lib/types";


export function TimerControl({ isLoading }: { isLoading: boolean }) {
  const [mode, setMode] = useState<TimerMode>("stopwatch");
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [countdownTarget, setCountdownTarget] = useState(300);

  const lastTickRef = useRef<number | null>(null);

  /**
   * useEffect hook to manage the timer's main loop using requestAnimationFrame.
   * It updates the time state based on the selected mode (stopwatch or countdown).
   * For countdown, it automatically stops when time reaches zero.
   */
  useEffect(() => {
    if (!isRunning) return;

    let frameId: number;

    const tick = () => {
      const now = Date.now();

      if (lastTickRef.current !== null) {
        const delta = Math.floor((now - lastTickRef.current) / 1000);
        if (delta > 0) {
          setTime((prev) => {
            if (mode === "countdown") {
              if (prev - delta <= 0) {
                setIsRunning(false);
                return 0;
              }
              return prev - delta;
            }
            return prev + delta;
          });
          lastTickRef.current = now;
        }
      } else {
        lastTickRef.current = now;
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId); // stop the loop on cleanup
      lastTickRef.current = null;
    };
  }, [isRunning, mode]);

  /**
   * Callback for playing or pausing the timer.
   * Toggles the `isRunning` state and resets `lastTickRef` to ensure accurate delta calculation upon restart.
   */
  const handlePlayPause = useCallback(() => {
    setIsRunning((prev) => !prev);
    lastTickRef.current = null;
  }, []);

  /**
   * Callback for resetting the timer.
   * Stops the timer, sets the time back to initial value (0 for stopwatch, `countdownTarget` for countdown),
   * and resets `lastTickRef`.
   */
  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTime(mode === "countdown" ? countdownTarget : 0);
    lastTickRef.current = null;
  }, [mode, countdownTarget]);

  /**
   * Callback for switching the timer mode.
   * Sets the new mode, stops the timer, and resets the time to its initial value based on the new mode.
   */
  const handleModeSwitch = useCallback(
    (newMode: TimerMode) => {
      setMode(newMode);
      setIsRunning(false);
      setTime(newMode === "countdown" ? countdownTarget : 0);
      lastTickRef.current = null;
    },
    [countdownTarget]
  );

  /**
   * Memoized formatted time string (HH:MM:SS) for display.
   * Recalculated only when the `time` state changes.
   */
  const formattedTime = useMemo(() => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;

    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }, [time]);

  /**
   * Memoized progress value (0-100) for the countdown timer.
   * Recalculated only when `time`, `mode`, or `countdownTarget` changes.
   */
  const progress = useMemo(() => {
    if (mode === "countdown" && countdownTarget > 0) {
      return (1 - time / countdownTarget) * 100;
    }
    return 0;
  }, [time, mode, countdownTarget]);

  return (
    <Card className="bg-slate-800 border-slate-700 text-white">
      {/* Conditional rendering for skeleton loader or actual timer content */}
      {isLoading ? (
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-9 w-full" />
        </CardContent>
      ) : (
        <CardContent className="space-y-2">
          {/* Component to switch between stopwatch and countdown modes */}
          <TimerModeSwitch mode={mode} onSwitch={handleModeSwitch} />

          {/* Displays the current formatted time */}
          <TimerDisplay mode={mode} formattedTime={formattedTime} />

          {/* Progress bar for countdown mode */}
          {mode === "countdown" && <TimerProgress progress={progress} />}

          {/* Input for setting countdown target, visible only when not running in countdown mode */}
          {!isRunning && mode === "countdown" && (
            <CountdownInput
              countdownTarget={countdownTarget}
              setCountdownTarget={(newTarget) => {
                setCountdownTarget(newTarget);
                setTime(newTarget);
                lastTickRef.current = null;
                setIsRunning(false);
              }}
              setTime={setTime}
            />
          )}
        </CardContent>
      )}

      <CardFooter className="">
        {isLoading ? (
          // Skeleton while loading
          <div className="w-full flex flex-col gap-4">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        ) : (
          // Timer control actions: Play/Pause + Reset
          <TimerActions
            isRunning={isRunning}
            onPlayPause={handlePlayPause}
            onReset={handleReset}
          />
        )}
      </CardFooter>
    </Card>
  );
}
