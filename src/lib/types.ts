export type MetricProps = {
  id: string;
  label: string;
  value: number;
  unit: string;
  icon: React.ElementType;
  color: string;
  change: number;
};

export type LiveMetricsProps = {
  isPolling: boolean;
  isLoading: boolean;
};

export type Notification = {
  id: string;
  type: "info" | "success" | "warning" | "error";
  message: string;
  timestamp: Date;
};

export type NotificationsPanelProps = {
  isPolling: boolean;
  isLoading: boolean;
};

export type TimerMode = "stopwatch" | "countdown";

export interface DataRow {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  status: "success" | "pending" | "failed";
  duration: number;
  endpoint: string;
}

export type SortKey = keyof DataRow;
export type SortDirection = "asc" | "desc" | null;

export type Props = {
  isPolling: boolean;
  isLoading: boolean;
};

export type SortProps = {
  active: boolean;
  direction: "asc" | "desc" | null;
};

export type TableHeaderProps = {
  sortKey: SortKey | null;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
};

export type ChartDataPoint = {
  time: string;
  cpu: number;
  memory: number;
  network: number;
};

export type ChartRendererProps = {
  chartType: "line" | "area";
  data: ChartDataPoint[];
  isPolling: boolean;
};
export type ChartTooltipItem = {
  color: string;
  dataKey: string;
  fill?: string;
  hide?: boolean;
  name: string;
  nameKey?: string | undefined;
  payload: {
    time: string;
    cpu: number;
    memory: number;
    network: number;
  };
  stroke?: string;
  strokeWidth?: number;
  type?: string | undefined;
  unit?: string | undefined;
  value: number;
};

export type ChartTooltipProps = {
  active: boolean;
  payload: ChartTooltipItem[];
};
