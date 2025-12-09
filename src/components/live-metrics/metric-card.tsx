"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { MetricProps } from "@/lib/types";
import { colorMap } from "@/lib/constants";

interface MetricCardProps {
  metric: MetricProps;
}

export function MetricCard({ metric }: MetricCardProps) {
  const { icon: Icon, value, unit, label, change, color } = metric;

  const colorClass = colorMap[color as keyof typeof colorMap];
  const [text, bg, border] = colorClass.split(" ");

  return (
    <Card
      className={`border ${border} bg-slate-800/40 backdrop-blur-sm shadow-lg transition-all hover:scale-[1.02]`}
    >
      <CardContent className="p-2">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className={`p-2 rounded-lg ${text} ${bg}`}>
            <Icon className="w-5 h-5" />
          </div>

          {change !== 0 && (
            <div
              className={`flex items-center gap-1 text-xs ${
                change > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {change > 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {Math.abs(change).toFixed(1)}%
            </div>
          )}
        </div>

        {/* Value */}
        <div className={`text-3xl font-semibold mt-3 ${text}`}>
          {value.toLocaleString()}
          {unit}
        </div>

        {/* Label */}
        <div className="text-slate-400 text-sm mt-1">{label}</div>
      </CardContent>
    </Card>
  );
}
