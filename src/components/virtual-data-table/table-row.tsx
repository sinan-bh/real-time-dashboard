import { DataRow } from "@/lib/types";
import { getStatusStyle } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

export default function TableRow({ row }: { row: DataRow }) {
  const isMobile = useMobile();

  return (
    // Main container for the table row. Uses flexbox for mobile horizontal scrolling and grid for larger screens.
    <div
      className={`gap-4 px-4 py-3 border-b border-slate-800 hover:bg-slate-800/50 transition-colors ${
        isMobile ? "flex flex-nowrap" : "grid grid-cols-12"
      }`}
      style={{ height: "48px" }}
    >
      {/* Timestamp column with conditional width for mobile */}
      <div
        className={`text-slate-300 text-sm ${
          isMobile ? "min-w-[120px]" : "col-span-2"
        }`}
      >
        {row?.timestamp.toLocaleTimeString()}
      </div>

      {/* User column with conditional width for mobile */}
      <div
        className={`text-cyan-400 text-sm ${
          isMobile ? "min-w-[120px]" : "col-span-2"
        }`}
      >
        {row.user}
      </div>

      {/* Action column with conditional width for mobile */}
      <div
        className={`text-slate-300 text-sm ${
          isMobile ? "min-w-[120px]" : "col-span-2"
        }`}
      >
        {row.action}
      </div>

      {/* Endpoint column with conditional width for mobile */}
      <div
        className={`text-slate-400 text-sm font-mono ${
          isMobile ? "min-w-[150px]" : "col-span-2"
        }`}
      >
        {row.endpoint}
      </div>

      {/* Status column with conditional width for mobile and dynamic styling */}
      <div className={`col-span-2 ${isMobile ? "min-w-[100px]" : ""}`}>
        <span
          className={`inline-block px-2 py-1 rounded text-xs border ${getStatusStyle(
            row.status
          )}`}
        >
          {row.status}
        </span>
      </div>

      {/* Duration column with conditional width for mobile */}
      <div
        className={`text-slate-400 text-sm ${
          isMobile ? "min-w-[80px]" : "col-span-2"
        }`}
      >
        {row.duration}ms
      </div>
    </div>
  );
}
