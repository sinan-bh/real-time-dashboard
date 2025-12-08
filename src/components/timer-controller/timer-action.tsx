import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimerMode } from "@/lib/types";

export function TimerActions({
  isRunning,
  onPlayPause,
  onReset,
  mode,
}: {
  isRunning: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  mode: TimerMode;
}) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-3">
        <Button
          onClick={onPlayPause}
          className={`flex-1 rounded-lg flex items-center justify-center gap-2 ${
            isRunning
              ? "bg-amber-600 hover:bg-amber-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5" /> Pause
            </>
          ) : (
            <>
              <Play className="w-5 h-5" /> Start
            </>
          )}
        </Button>

        <Button
          onClick={onReset}
          className="flex-1 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" /> Reset
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-slate-400">Status</div>
          <div className="text-lg text-cyan-400">
            {isRunning ? "Running" : "Paused"}
          </div>
        </div>
        <div>
          <div className="text-slate-400">Mode</div>
          <div className="text-lg text-cyan-400 capitalize">{mode}</div>
        </div>
      </div>
    </div>
  );
}
