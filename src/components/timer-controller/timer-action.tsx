import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";


export function TimerActions({
  isRunning,
  onPlayPause,
  onReset,
}: {
  isRunning: boolean;
  onPlayPause: () => void;
  onReset: () => void;
}) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-3">
        {/* Play/Pause Button: Changes appearance and icon based on timer's running state */}
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

        {/* Reset Button: Resets the timer to its initial state */}
        <Button
          onClick={onReset}
          className="flex-1 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" /> Reset
        </Button>
      </div>
    </div>
  );
}
