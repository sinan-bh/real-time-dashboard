"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
import { Activity, BarChart3, Bell, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimerControl } from "@/components/timer-controller/timer-controller";
import { LiveMetrics } from "@/components/live-metrics/live-metrics";
import { RealTimeChart } from "@/components/real-time-chart/real-time-chart";
import { NotificationsPanel } from "@/components/notification-panel/notification-panel";
import VirtualDataTable from "@/components/virtual-data-table/virtual-data-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [isPolling, setIsPolling] = useState(true);
  const [isLoadingTimer, setIsLoadingTimer] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingTimer(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-cyan-400" />
              <h1 className="text-2xl font-bold">Real-Time Dashboard</h1>
            </div>
            <Button
              onClick={() => setIsPolling(!isPolling)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                isPolling
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              {isPolling ? "● Polling Active" : "○ Polling Paused"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <h2 className="font-semibold text-md">Timer Control</h2>
              </div>
              <Suspense
                fallback={
                  <div className="space-y-4">
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                }
              >
                <TimerControl isLoading={isLoadingTimer} />
              </Suspense>
            </div>
          </div>

          {/* Live Metrics */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-5">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                <h2 className="font-semibold text-md">Live Metrics</h2>
              </div>
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  </div>
                }
              >
                <LiveMetrics isPolling={isPolling} isLoading={isLoadingTimer} />
              </Suspense>
            </div>
          </div>

          {/* Real-Time Chart */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-cyan-400" />
                <h2 className="font-semibold text-lg">Real-Time Performance</h2>
              </div>
              <Suspense
                fallback={
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Skeleton className="h-9 w-24" />
                      <Skeleton className="h-9 w-24" />
                    </div>
                    <Skeleton className="h-80 w-full" />
                  </div>
                }
              >
                <RealTimeChart
                  isPolling={isPolling}
                  isLoading={isLoadingTimer}
                />
              </Suspense>
            </div>
          </div>

          {/* Notifications Panel */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-cyan-400" />
                <h2 className="font-semibold text-lg">Live Notifications</h2>
              </div>
              <Suspense
                fallback={
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 border border-slate-700 rounded-lg bg-slate-800/40"
                      >
                        <Skeleton className="w-5 h-5 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                    ))}
                  </div>
                }
              >
                <NotificationsPanel
                  isPolling={isPolling}
                  isLoading={isLoadingTimer}
                />
              </Suspense>
            </div>
          </div>

          {/* Virtual Data Table */}
          <div className="col-span-12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <h2 className="font-semibold text-lg mb-4">
                Real-Time Data Stream
              </h2>
              <Suspense
                fallback={
                  <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-slate-800"
                      >
                        <Skeleton className="col-span-2 h-5" />
                        <Skeleton className="col-span-2 h-5" />
                        <Skeleton className="col-span-2 h-5" />
                        <Skeleton className="col-span-2 h-5" />
                        <Skeleton className="col-span-2 h-5" />
                        <Skeleton className="col-span-2 h-5" />
                        <Skeleton className="col-span-2 h-5" />
                      </div>
                    ))}
                  </div>
                }
              >
                <VirtualDataTable
                  isPolling={isPolling}
                  isLoading={isLoadingTimer}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
