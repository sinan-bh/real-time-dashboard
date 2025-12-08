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

  // Timer loop
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

  const handlePlayPause = useCallback(() => {
    setIsRunning((prev) => !prev);
    lastTickRef.current = null;
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTime(mode === "countdown" ? countdownTarget : 0);
    lastTickRef.current = null;
  }, [mode, countdownTarget]);

  const handleModeSwitch = useCallback(
    (newMode: TimerMode) => {
      setMode(newMode);
      setIsRunning(false);
      setTime(newMode === "countdown" ? countdownTarget : 0);
      lastTickRef.current = null;
    },
    [countdownTarget]
  );

  const formattedTime = useMemo(() => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;

    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }, [time]);

  const progress = useMemo(() => {
    if (mode === "countdown" && countdownTarget > 0) {
      return (1 - time / countdownTarget) * 100;
    }
    return 0;
  }, [time, mode, countdownTarget]);

  return (
    <Card className="bg-slate-800 border-slate-700 text-white">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-cyan-400">
          Timer Control
        </CardTitle>
      </CardHeader>

      {isLoading ? (
        <CardContent className="space-y-6">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      ) : (
        <CardContent className="space-y-6">
          <TimerModeSwitch mode={mode} onSwitch={handleModeSwitch} />

          <TimerDisplay mode={mode} formattedTime={formattedTime} />

          {mode === "countdown" && <TimerProgress progress={progress} />}

          {!isRunning && mode === "countdown" && (
            <CountdownInput
              countdownTarget={countdownTarget}
              setCountdownTarget={(newTarget) => {
                setCountdownTarget(newTarget);
                setTime(newTarget); // sync time with new target
                lastTickRef.current = null; // reset delta calculation
                setIsRunning(false); // pause timer while editing
              }}
              setTime={setTime}
            />
          )}
        </CardContent>
      )}

      <CardFooter className="border-t border-slate-700 pt-4">
        {isLoading ? (
          <div className="w-full flex flex-col gap-4">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        ) : (
          <TimerActions
            isRunning={isRunning}
            onPlayPause={handlePlayPause}
            onReset={handleReset}
            mode={mode}
          />
        )}
      </CardFooter>
    </Card>
  );
}
