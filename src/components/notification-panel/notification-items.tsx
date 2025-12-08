import { Button } from '@/components/ui/button';
import { Notification } from '@/lib/types';
import { formatTime, getNotificationStyle } from '@/lib/utils';
import { X } from 'lucide-react';

interface Props {
  notification: Notification;
  removeNotification: (id: string) => void;
}

export function NotificationItem({ notification, removeNotification }: Props) {
  const style = getNotificationStyle(notification.type);
  const Icon = style.icon;

  return (
    <div className={`${style.bg} border ${style.border} rounded-lg p-3 transition-all duration-300 hover:scale-[1.02] animate-slideIn`}>
      <div className="flex items-start gap-3">
        <div className={style.text}><Icon className="w-5 h-5" /></div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm">{notification.message}</p>
          <p className="text-slate-400 text-xs mt-1">{formatTime(notification.timestamp)}</p>
        </div>
        <Button onClick={() => removeNotification(notification.id)} className="text-slate-400 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
