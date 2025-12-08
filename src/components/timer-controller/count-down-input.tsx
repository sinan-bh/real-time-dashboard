import { Input } from "../ui/input";

export function CountdownInput({
  countdownTarget,
  setCountdownTarget,
  setTime,
}: {
  countdownTarget: number;
  setCountdownTarget: (n: number) => void;
  setTime: (n: number) => void;
}) {
  return (
    <div>
      <label className="text-slate-400 block mb-2">Set Countdown (seconds)</label>
      <Input
        type="number"
        value={countdownTarget}
        onChange={(e) => {
          const v = Number(e.target.value) || 0;
          setCountdownTarget(v);
          setTime(v);
        }}
        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
      />
    </div>
  );
}
