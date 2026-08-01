"use client";

import { Bell, MessageSquare, Share2, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { ScrollArea } from "@/components/ui/scroll-area";

const notifications = [
  {
    id: "1",
    icon: MessageSquare,
    text: "Priya commented on “Q3 Sales Review”",
    time: "12m ago",
    unread: true,
  },
  {
    id: "2",
    icon: Share2,
    text: "Your “Product Roadmap” link was viewed 40 times today",
    time: "2h ago",
    unread: true,
  },
  {
    id: "3",
    icon: UserPlus,
    text: "Marcus Webb joined Acme Inc workspace",
    time: "1d ago",
    unread: false,
  },
];

function NotificationsMenu() {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <IconButton aria-label="Notifications" variant="ghost">
            <Bell />
          </IconButton>
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-danger text-[10px] font-semibold text-white">
              {unreadCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b border-subtle p-3">
          <p className="text-md font-semibold text-primary">Notifications</p>
          {unreadCount > 0 && <Badge variant="accent">{unreadCount} new</Badge>}
        </div>
        <ScrollArea className="max-h-80">
          <div className="p-1">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="flex gap-3 rounded-md p-2.5 hover:bg-surface-raised"
              >
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-secondary">
                  <n.icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className={`text-sm ${n.unread ? "font-medium text-primary" : "text-secondary"}`}>
                    {n.text}
                  </p>
                  <p className="text-xs text-tertiary">{n.time}</p>
                </div>
                {n.unread && <span className="ml-auto mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { NotificationsMenu };
