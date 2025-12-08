import { DataRow } from "@/lib/types";
import { getStatusStyle } from "@/lib/utils";

export default function TableRow({ row }: { row: DataRow }) {
  return (
    <div
      className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
      style={{ height: "48px" }}
    >
      <div className="col-span-2 text-slate-300 text-sm">
        {row?.timestamp.toLocaleTimeString()}
      </div>

      <div className="col-span-2 text-cyan-400 text-sm">{row.user}</div>

      <div className="col-span-2 text-slate-300 text-sm">{row.action}</div>

      <div className="col-span-2 text-slate-400 text-sm font-mono text-xs">
        {row.endpoint}
      </div>

      <div className="col-span-2">
        <span
          className={`inline-block px-2 py-1 rounded text-xs border ${getStatusStyle(
            row.status
          )}`}
        >
          {row.status}
        </span>
      </div>

      <div className="col-span-2 text-slate-400 text-sm">{row.duration}ms</div>
    </div>
  );
}
