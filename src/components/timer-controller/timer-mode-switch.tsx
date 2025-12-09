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
      {/* Button to activate stopwatch mode */}
      <Button
        onClick={() => onSwitch("stopwatch")}
        variant={mode === "stopwatch" ? "secondary" : "default"}
        className={`flex-1 rounded-lg border-2 hover:text-white hover:bg-white ${
          mode === "stopwatch" ? "" : "bg-transparent"
        }`}
      >
        <Clock className="w-4 h-4 mr-2" /> Stopwatch
      </Button>

      {/* Button to activate countdown mode */}
      <Button
        onClick={() => onSwitch("countdown")}
        variant={mode === "countdown" ? "secondary" : "default"}
        className={`flex-1 rounded-lg border-2 hover:text-black hover:bg-white ${
          mode === "countdown" ? "" : "bg-transparent"
        }`}
      >
        <Timer className="w-4 h-4 mr-2" /> Countdown
      </Button>
    </div>
  );
}
