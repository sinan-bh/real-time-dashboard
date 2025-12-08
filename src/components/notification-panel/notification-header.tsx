import { Notification } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface Props {
  notifications: Notification[];
  clearAll: () => void;
}

export function NotificationHeader({ notifications, clearAll }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-slate-400 text-sm">
        {notifications.length} notification
        {notifications.length !== 1 ? "s" : ""}
      </div>
      {notifications.length > 0 && (
        <Button
          onClick={clearAll}
          className="text-slate-400 hover:text-white text-sm transition-colors"
        >
          Clear all
        </Button>
      )}
    </div>
  );
}
