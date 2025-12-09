"use client";

import { Button } from "../ui/button";
import SortIcon from "@/components/virtual-data-table/sort-icon";
import { SortKey } from "@/lib/utils";
import { TableHeaderProps } from "@/lib/types";
import { useMobile } from "@/components/ui/use-mobile";

export default function TableHeader({
  sortKey,
  sortDirection,
  onSort,
}: TableHeaderProps) {
  const isMobile = useMobile();

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700">
      {/* Container for the table header columns. Uses flexbox for mobile horizontal scrolling and grid for larger screens. */}
      <div
        className={`gap-4 px-4 py-3 ${
          isMobile ? "flex flex-nowrap" : "grid grid-cols-12"
        }`}
      >
        {/* Maps through defined columns to render sortable header buttons */}
        {[
          { key: "timestamp", label: "Timestamp" },
          { key: "user", label: "User" },
          { key: "action", label: "Action" },
          { key: "endpoint", label: "Endpoint" },
          { key: "status", label: "Status" },
          { key: "duration", label: "Duration" },
        ].map((col) => (
          <Button
            key={col.key}
            onClick={() => onSort(col.key as SortKey)}
            // Conditional styling for column width and alignment on mobile vs. desktop
            className={`flex items-center gap-2 hover:text-cyan-400 transition-colors ${
              isMobile ? "min-w-[120px] justify-start" : "col-span-2"
            }`}
          >
            {col.label}
            {/* Sort icon indicating current sort state for the column */}
            <SortIcon active={sortKey === col.key} direction={sortDirection} />
          </Button>
        ))}
      </div>
    </div>
  );
}
