/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChartRendererProps, ChartTooltipProps } from "@/lib/types";
import {
  LineChart,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Area,
} from "recharts";
import { ChartTooltip } from "./chart-tooltip";

export function ChartRenderer({
  chartType,
  data,
  isPolling,
}: ChartRendererProps) {
  // Lines for LineChart
  const renderLines = (
    <>
      <Line
        type="monotone"
        dataKey="cpu"
        stroke="#06b6d4"
        strokeWidth={2}
        dot={false}
        name="CPU"
        isAnimationActive={false}
      />
      <Line
        type="monotone"
        dataKey="memory"
        stroke="#a855f7"
        strokeWidth={2}
        dot={false}
        name="Memory"
        isAnimationActive={false}
      />
      <Line
        type="monotone"
        dataKey="network"
        stroke="#10b981"
        strokeWidth={2}
        dot={false}
        name="Network"
        isAnimationActive={false}
      />
    </>
  );

  // Areas for AreaChart
  const renderAreas = (
    <>
      <defs>
        <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
        </linearGradient>
        <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1} />
        </linearGradient>
        <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
        </linearGradient>
      </defs>

      <Area
        type="monotone"
        dataKey="cpu"
        stroke="#06b6d4"
        fill="url(#cpuGrad)"
        fillOpacity={1}
        name="CPU"
      />
      <Area
        type="monotone"
        dataKey="memory"
        stroke="#a855f7"
        fill="url(#memGrad)"
        fillOpacity={1}
        name="Memory"
      />
      <Area
        type="monotone"
        dataKey="network"
        stroke="#10b981"
        fill="url(#netGrad)"
        fillOpacity={1}
        name="Network"
      />
    </>
  );

  return chartType === "line" ? (
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
      <XAxis
        dataKey="time"
        stroke="#94a3b8"
        tick={{ fill: "#94a3b8", fontSize: 12 }}
      />
      <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
      <Tooltip content={(props) => <ChartTooltip {...(props as any)} />} />
      <Legend wrapperStyle={{ color: "#94a3b8" }} />
      {renderLines}
    </LineChart>
  ) : (
    <AreaChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
      <XAxis
        dataKey="time"
        stroke="#94a3b8"
        tick={{ fill: "#94a3b8", fontSize: 12 }}
      />
      <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
      <Tooltip content={(props) => <ChartTooltip {...(props as any)} />} />
      <Legend wrapperStyle={{ color: "#94a3b8" }} />
      {renderAreas}
    </AreaChart>
  );
}
