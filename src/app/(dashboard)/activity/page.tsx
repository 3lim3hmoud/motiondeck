"use client";

import { Edit3, FileText, MessageSquare, Share2, Trash2, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
}

const activity: ActivityItem[] = [
  { id: "1", actor: "Priya Shah", action: "commented on", target: "Q3 Sales Review", time: "12m ago", icon: MessageSquare },
  { id: "2", actor: "Jamie Doe", action: "created", target: "Marketing Brief — Fall Campaign", time: "1h ago", icon: FileText },
  { id: "3", actor: "Marcus Webb", action: "edited", target: "Product Roadmap 2027", time: "3h ago", icon: Edit3 },
  { id: "4", actor: "Jamie Doe", action: "shared", target: "Client Onboarding Guide", time: "5h ago", icon: Share2 },
  { id: "5", actor: "Elena Ruiz", action: "joined", target: "Acme Inc workspace", time: "1d ago", icon: UserPlus },
  { id: "6", actor: "Priya Shah", action: "deleted", target: "Draft — Untitled", time: "2d ago", icon: Trash2 },
];

export default function ActivityFeedPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-primary">Activity</h1>

      <div className="relative space-y-6 border-l border-subtle pl-6">
        {activity.map((item) => (
          <div key={item.id} className="relative">
            <div className="absolute -left-[31px] flex size-6 items-center justify-center rounded-full border border-subtle bg-surface">
              <item.icon className="size-3 text-tertiary" />
            </div>
            <div className="flex items-start gap-2.5">
              <Avatar size="sm"><AvatarFallback>{item.actor[0]}</AvatarFallback></Avatar>
              <div>
                <p className="text-md text-primary">
                  <span className="font-medium">{item.actor}</span>{" "}
                  <span className="text-secondary">{item.action}</span>{" "}
                  <span className="font-medium">{item.target}</span>
                </p>
                <p className="text-sm text-tertiary">{item.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
