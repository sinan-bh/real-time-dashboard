import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { DataRow, Notification } from "@/lib/types";
import { actions, endpoints, statuses } from "./constants";
import { Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ROW_HEIGHT = 48;
export const VISIBLE_ROWS = 10;

export const getStatusStyle = (status: DataRow["status"]) => {
  const styles = {
    success: "bg-green-500/20 text-green-400 border-green-500/30",
    pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    failed: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  return styles[status];
};

export type SortKey = keyof DataRow;
export type SortDirection = "asc" | "desc" | null;

export const generateRow = (): DataRow => ({
  id: Math.random().toString(36).substr(2, 9),
  timestamp: new Date(),
  user: `user${Math.floor(Math.random() * 1000)}`,
  action: actions[Math.floor(Math.random() * actions.length)],
  status: statuses[Math.floor(Math.random() * statuses.length)],
  duration: Math.floor(Math.random() * 5000) + 100,
  endpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
});

export const getNotificationStyle = (type: Notification['type']) => {
    const styles = {
      info: { icon: Info, bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
      success: { icon: CheckCircle, bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
      warning: { icon: AlertTriangle, bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
      error: { icon: AlertCircle, bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
    };
    return styles[type];
  };

export const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
