import { ChartTooltipProps } from "@/lib/types";

export const ChartTooltip = ({ active, payload }: ChartTooltipProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
      <p className="text-slate-400 text-sm mb-2">{payload[0].payload.time}</p>

      {payload.map((item, i) => (
        <p key={i} className="text-sm" style={{ color: item.color }}>
          {item.name}: {item.value.toFixed(1)}%
        </p>
      ))}
    </div>
  );
};
