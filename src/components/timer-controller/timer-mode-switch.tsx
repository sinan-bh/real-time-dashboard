import { Button } from "@/components/ui/button";
import { Clock, Timer } from "lucide-react";
import { TimerMode } from "@/lib/types";

export function TimerModeSwitch({
  mode,
  onSwitch,
}: {
  mode: TimerMode;
  onSwitch: (m: TimerMode) => void;
}) {
  return (
    <div className="flex gap-2">
      <Button
        onClick={() => onSwitch("stopwatch")}
        variant={mode === "stopwatch" ? "default" : "secondary"}
        className="flex-1 rounded-lg"
      >
        <Clock className="w-4 h-4 mr-2" /> Stopwatch
      </Button>

      <Button
        onClick={() => onSwitch("countdown")}
        variant={mode === "countdown" ? "default" : "secondary"}
        className="flex-1 rounded-lg"
      >
        <Timer className="w-4 h-4 mr-2" /> Countdown
      </Button>
    </div>
  );
}
