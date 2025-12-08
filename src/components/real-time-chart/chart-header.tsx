import { Button } from "@/components/ui/button";

export function ChartHeader({
  chartType,
  setChartType,
}: {
  chartType: "line" | "area";
  setChartType: (type: "line" | "area") => void;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-2">
        <Button onClick={() => setChartType("line")} variant={chartType === "line" ? "default" : "secondary"}>
          Line
        </Button>
        <Button onClick={() => setChartType("area")} variant={chartType === "area" ? "default" : "secondary"}>
          Area
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-slate-400 text-sm">Live</span>
      </div>
    </div>
  );
}
