/* eslint-disable react-hooks/purity */
"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { ResponsiveContainer } from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ChartHeader } from "@/components/real-time-chart/chart-header";
import { ChartRenderer } from "@/components/real-time-chart/chart-renderer";
import { ChartTooltip } from "@/components/real-time-chart/chart-tooltip";
import { Skeleton } from "@/components/ui/skeleton";


export function RealTimeChart({
  isPolling,
  isLoading,
}: {
  isPolling: boolean;
  isLoading: boolean;
}) {
  const [chartType, setChartType] = useState<"line" | "area">("area");

  // useRef to maintain a consistent starting time for seed data generation.
  const nowRef = useRef(Date.now());

  /**
   * Memoized initial seed data for the chart.
   * Generates 20 data points with simulated CPU, memory, and network usage,
   * spaced 3 seconds apart, leading up to the current time.
   * This data is only generated once on component mount.
   */
  const seedData = useMemo(() => {
    return Array.from({ length: 20 }, (_, index) => {
      const t = new Date(nowRef.current - (19 - index) * 3000);
      return {
        time: t.toLocaleTimeString(),
        cpu: Math.random() * 50 + 30,
        memory: Math.random() * 40 + 40,
        network: Math.random() * 60 + 20,
      };
    });
  }, []);

  const [data, setData] = useState(seedData);

  /**
   * Callback function to add a new data point to the chart.
   * It generates a new simulated data point for CPU, memory, and network usage
   * and adds it to the end of the `data` array, removing the oldest point to maintain a fixed window.
   */
  const addDataPoint = useCallback(() => {
    setData((prev) => {
      const now = new Date();
      const newPoint = {
        time: now.toLocaleTimeString(),
        cpu: Math.random() * 50 + 30,
        memory: Math.random() * 40 + 40,
        network: Math.random() * 60 + 20,
      };
      return [...prev.slice(1), newPoint]; // Keep last 20 points
    });
  }, []);

  /**
   * useEffect hook to manage the real-time polling of chart data.
   * When `isPolling` is true, it sets up an interval to call `addDataPoint` every 3 seconds.
   * The interval is cleared when the component unmounts or `isPolling` becomes false.
   */
  useEffect(() => {
    if (!isPolling) return;
    const interval = setInterval(addDataPoint, 3000);
    return () => clearInterval(interval);
  }, [isPolling, addDataPoint]);

  return (
    <Card className="bg-slate-900 border-slate-800 shadow-xl">
      <CardHeader>
        <CardTitle className="text-cyan-400">Live System Monitor</CardTitle>
        <CardDescription className="text-slate-400">
          Realtime CPU / Memory / Network usage
        </CardDescription>
      </CardHeader>

      {/* Conditional rendering for skeleton loader or actual chart content */}
      {isLoading ? (
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
          <Skeleton className="h-80 w-full" />
        </CardContent>
      ) : (
        <CardContent>
          {/* Component to switch between line and area chart types */}
          <ChartHeader chartType={chartType} setChartType={setChartType} />

          <div className="h-80">
            {/* Responsive container for the Recharts chart */}
            <ResponsiveContainer width="100%" height="100%">
              {/* Renders the actual chart based on type and data */}
              <ChartRenderer
                chartType={chartType}
                data={data}
                isPolling={isPolling}
              />
            </ResponsiveContainer>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
