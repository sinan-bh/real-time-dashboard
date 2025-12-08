import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { SortProps } from "@/lib/types";

export default function SortIcon({ active, direction }: SortProps) {
  if (!active) return <ArrowUpDown className="w-4 h-4 text-slate-500" />;

  if (direction === "asc") return <ArrowUp className="w-4 h-4 text-cyan-400" />;

  return <ArrowDown className="w-4 h-4 text-cyan-400" />;
}
