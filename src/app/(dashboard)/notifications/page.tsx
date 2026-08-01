"use client";

import { useState } from "react";
import { MessageSquare, Share2, UserPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/empty-state";
import { Bell } from "lucide-react";

const all = [
  { id: "1", type: "comment", icon: MessageSquare, text: "Priya commented on “Q3 Sales Review”", time: "12m ago", unread: true },
  { id: "2", type: "share", icon: Share2, text: "Your “Product Roadmap” link was viewed 40 times today", time: "2h ago", unread: true },
  { id: "3", type: "member", icon: UserPlus, text: "Marcus Webb joined Acme Inc workspace", time: "1d ago", unread: false },
  { id: "4", type: "comment", icon: MessageSquare, text: "Elena replied to your comment on “Case Study”", time: "2d ago", unread: false },
];

function NotificationRow({ item }: { item: (typeof all)[number] }) {
  return (
    <div className="flex gap-3 rounded-lg p-3 hover:bg-surface-raised">
      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-secondary">
        <item.icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className={item.unread ? "font-medium text-primary" : "text-secondary"}>{item.text}</p>
        <p className="text-sm text-tertiary">{item.time}</p>
      </div>
      {item.unread && <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />}
    </div>
  );
}

export default function NotificationsPage() {
  const [tab, setTab] = useState("all");
  const filtered = tab === "all" ? all : all.filter((n) => n.type === tab);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-primary">Notifications</h1>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="comment">Comments</TabsTrigger>
          <TabsTrigger value="share">Shares</TabsTrigger>
          <TabsTrigger value="member">Team</TabsTrigger>
        </TabsList>
        <TabsContent value={tab} className="space-y-1">
          {filtered.length === 0 ? (
            <EmptyState icon={<Bell />} title="Nothing here" description="You're all caught up." />
          ) : (
            filtered.map((item) => <NotificationRow key={item.id} item={item} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
