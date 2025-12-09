"use client";

import { useEffect, useMemo, useState } from "react";
import { LiveMetricsProps, MetricProps } from "@/lib/types";
import { MetricCard } from "@/components/live-metrics/metric-card";
import { Skeleton } from "@/components/ui/skeleton";
import { metricData } from "@/lib/constants";

export function LiveMetrics({ isPolling, isLoading }: LiveMetricsProps) {
  const initialMetrics = useMemo<MetricProps[]>(() => metricData, []);

  const [metrics, setMetrics] = useState(initialMetrics);

  /**
   * useEffect hook to manage the polling of live metric data.
   * When `isPolling` is true, it sets up an interval to update the metrics state with new, simulated values.
   * The interval is cleared when the component unmounts or `isPolling` becomes false.
   */
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
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {/* Conditional rendering for skeleton loaders or actual metric cards */}
      {isLoading ? (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-slate-800/40 rounded-xl border border-slate-700 p-3 shadow-lg"
            >
              <div className="flex items-start justify-between mb-2">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <Skeleton className="w-14 h-4 rounded-md" />
              </div>
              <Skeleton className="h-7 w-3/4 mb-1" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </>
      ) : (
        metrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)
      )}
    </div>
  );
}
