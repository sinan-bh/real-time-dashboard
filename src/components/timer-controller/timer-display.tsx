import { TimerMode } from "@/lib/types";

export function TimerDisplay({
  formattedTime,
  mode,
}: {
  formattedTime: string;
  mode: TimerMode;
}) {
  return (
    <div className="text-center">
      <div className="text-5xl font-mono text-cyan-400">{formattedTime}</div>
      <div className="text-slate-400 mt-1">
        {mode === "countdown" ? "Time Remaining" : "Elapsed Time"}
      </div>
    </div>
  );
}
