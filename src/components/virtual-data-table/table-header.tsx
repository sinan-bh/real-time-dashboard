"use client";

import { Button } from "../ui/button";
import SortIcon from "@/components/virtual-data-table/sort-icon";
import { SortKey } from "@/lib/utils";
import { TableHeaderProps } from "@/lib/types";

export default function TableHeader({
  sortKey,
  sortDirection,
  onSort,
}: TableHeaderProps) {
  return (
    <div className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700">
      <div className="grid grid-cols-12 gap-4 px-4 py-3">
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
            className="col-span-2 flex items-center gap-2 hover:text-cyan-400 transition-colors"
          >
            {col.label}
            <SortIcon active={sortKey === col.key} direction={sortDirection} />
          </Button>
        ))}
      </div>
    </div>
  );
}
