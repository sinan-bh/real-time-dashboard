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

  // Memoized seed data
  const nowRef = useRef(Date.now());

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

  const addDataPoint = useCallback(() => {
    setData((prev) => {
      const now = new Date();
      const newPoint = {
        time: now.toLocaleTimeString(),
        cpu: Math.random() * 50 + 30,
        memory: Math.random() * 40 + 40,
        network: Math.random() * 60 + 20,
      };
      return [...prev.slice(1), newPoint];
    });
  }, []);

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
          <ChartHeader chartType={chartType} setChartType={setChartType} />

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
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
