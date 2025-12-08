export function TimerProgress({ progress }: { progress: number }) {
  return (
    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
