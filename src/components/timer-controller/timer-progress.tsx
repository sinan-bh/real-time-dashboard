
export function TimerProgress({ progress }: { progress: number }) {
  return (
    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
      {/* The progress bar itself, transitioning its width based on the progress prop. */}
      <div
        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
