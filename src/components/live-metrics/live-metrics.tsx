"use client";

import { useEffect, useMemo, useState } from "react";
import { LiveMetricsProps, MetricProps } from "@/lib/types";
import { MetricCard } from "@/components/live-metrics/metric-card";
import { Skeleton } from "@/components/ui/skeleton";
import { metricData } from "@/lib/constants";

export function LiveMetrics({ isPolling, isLoading }: LiveMetricsProps) {
  const initialMetrics = useMemo<MetricProps[]>(
    () => metricData,
    []
  );

  const [metrics, setMetrics] = useState(initialMetrics);

  useEffect(() => {
    if (!isPolling) return;

    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => {
          const variance = (Math.random() - 0.5) * 0.1;
          const limit =
            metric.id === "cpu" || metric.id === "memory" ? 100 : 10000;

          const newValue = Math.max(
            0,
            Math.min(limit, metric.value * (1 + variance))
          );
          const change = ((newValue - metric.value) / metric.value) * 100;

          return {
            ...metric,
            value: Math.round(newValue),
            change: parseFloat(change.toFixed(2)),
          };
        })
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [isPolling]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {isLoading ? (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-slate-800/40 rounded-xl border border-slate-700 p-4 shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <Skeleton className="w-16 h-5 rounded-md" />
              </div>
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </>
      ) : (
        metrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)
      )}
    </div>
  );
}
