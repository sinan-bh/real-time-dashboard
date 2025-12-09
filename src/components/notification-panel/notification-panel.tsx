"use client";

import { useState, useEffect, useCallback } from "react";
import { NotificationHeader } from "@/components/notification-panel/notification-header";
import { NotificationItem } from "@/components/notification-panel/notification-items";
import { NotificationEmpty } from "@/components/notification-panel/notification-empty";
import { Notification, NotificationsPanelProps } from "@/lib/types";
import { notificationMessages } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";


export function NotificationsPanel({
  isPolling,
  isLoading,
}: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  /**
   * useCallback hook to add a new random notification to the panel.
   * It selects a random type (info, success, warning, error) and a corresponding message.
   * New notifications are added to the beginning of the list, keeping a maximum of 10 notifications.
   */
  const addNotification = useCallback(() => {
    const types: Notification["type"][] = [
      "info",
      "success",
      "warning",
      "error",
    ];
    const type = types[Math.floor(Math.random() * types.length)];
    const messages = notificationMessages[type];
    const message = messages[Math.floor(Math.random() * messages.length)];

    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
    };

    setNotifications((prev) => [newNotification, ...prev].slice(0, 10));
  }, []);

  /**
   * useEffect hook to manage the periodic generation of new notifications.
   * When `isPolling` is true, it sets up an interval to call `addNotification` randomly every 4 seconds.
   * The interval is cleared when the component unmounts or `isPolling` becomes false.
   */
  useEffect(() => {
    if (!isPolling) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.3) addNotification(); // Roughly 30% chance to add a new notification
    }, 4000);

    return () => clearInterval(interval);
  }, [isPolling, addNotification]);

  /**
   * useCallback hook to remove a specific notification by its ID.
   * It filters out the notification with the matching ID from the `notifications` state.
   */
  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <div className="space-y-4">
      {/* Conditional rendering for skeleton loader or notification header and items */}
      {isLoading ? (
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
      ) : (
        // Notification header with count and clear all button
        <NotificationHeader
          notifications={notifications}
          clearAll={() => setNotifications([])}
        />
      )}

      {/* Container for scrollable notification items */}
      <div className="space-y-2 max-h-96 overflow-y-auto hide-scrollbar">
        {isLoading ? (
          // Skeleton for notification items when loading
          <div className="space-y-2 ">
            {Array.from({ length: 5 }).map((_, i) => (
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
        ) : notifications.length === 0 ? (
          // Displayed when there are no notifications
          <NotificationEmpty />
        ) : (
          // List of individual notification items
          notifications.map((n) => (
            <NotificationItem
              key={n.id}
              notification={n}
              removeNotification={removeNotification}
            />
          ))
        )}
      </div>
    </div>
  );
}
