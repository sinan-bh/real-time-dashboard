import { Info } from 'lucide-react';

export function NotificationEmpty() {
  return (
    <div className="text-center py-8 text-slate-500">
      <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
      <p>No notifications</p>
    </div>
  );
}
