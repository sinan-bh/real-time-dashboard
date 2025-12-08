import { MetricProps } from "./types";
import { Activity, Server, Users, Zap } from "lucide-react";

export const colorMap = {
  cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
  amber: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  purple: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  green: "text-green-400 bg-green-500/10 border-green-500/30",
} as const;

export const notificationMessages = {
  info: [
    "System health check completed",
    "New update available",
    "Scheduled maintenance at 2 AM",
    "Cache cleared successfully",
  ],
  success: [
    "Deployment completed successfully",
    "Backup created",
    "Database optimized",
    "Performance improved by 15%",
  ],
  warning: [
    "High CPU usage detected",
    "Memory usage above 80%",
    "Slow response time on API endpoint",
    "SSL certificate expires in 30 days",
  ],
  error: [
    "Failed to connect to database",
    "API request timeout",
    "Service temporarily unavailable",
    "Authentication failed",
  ],
};

export const actions = [
  "Login",
  "Logout",
  "Update Profile",
  "Delete Item",
  "Create Post",
  "Upload File",
];
export const endpoints = [
  "/api/users",
  "/api/posts",
  "/api/auth",
  "/api/upload",
  "/api/settings",
];
export const statuses = ["success", "pending", "failed"] as const;

export const metricData: MetricProps[] = [
  {
    id: "users",
    label: "Active Users",
    value: 1247,
    unit: "",
    icon: Users,
    color: "cyan",
    change: 0,
  },
  {
    id: "cpu",
    label: "CPU Usage",
    value: 45,
    unit: "%",
    icon: Zap,
    color: "amber",
    change: 0,
  },
  {
    id: "memory",
    label: "Memory Usage",
    value: 62,
    unit: "%",
    icon: Server,
    color: "purple",
    change: 0,
  },
  {
    id: "requests",
    label: "Requests/min",
    value: 3420,
    unit: "",
    icon: Activity,
    color: "green",
    change: 0,
  },
];
