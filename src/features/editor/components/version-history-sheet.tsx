"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface Version {
  id: string;
  label: string;
  time: string;
  author: string;
  isCurrent?: boolean;
  isNamed?: boolean;
}

const versions: Version[] = [
  { id: "v9", label: "Current version", time: "Just now", author: "Jamie Doe", isCurrent: true },
  { id: "v8", label: "Autosave", time: "12m ago", author: "Jamie Doe" },
  { id: "v7", label: "Autosave", time: "34m ago", author: "Priya Shah" },
  { id: "v6", label: "Sent to client for review", time: "Yesterday, 4:12 PM", author: "Jamie Doe", isNamed: true },
  { id: "v5", label: "Autosave", time: "Yesterday, 2:03 PM", author: "Marcus Webb" },
  { id: "v4", label: "Autosave", time: "2 days ago", author: "Jamie Doe" },
];

function VersionHistorySheet({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [selected, setSelected] = useState(versions[0]?.id ?? "");
  const selectedVersion = versions.find((v) => v.id === selected)!;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-2xl">
        <SheetHeader>
          <SheetTitle>Version history</SheetTitle>
        </SheetHeader>

        <div className="grid h-[calc(100%-3rem)] grid-cols-[220px_1fr] gap-4">
          <ScrollArea className="border-r border-subtle pr-3">
            <div className="space-y-1">
              {versions.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelected(v.id)}
                  className={cn(
                    "w-full rounded-md p-2.5 text-left transition-colors",
                    selected === v.id ? "bg-accent/10" : "hover:bg-surface-raised",
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <p className={cn("text-sm font-medium", selected === v.id ? "text-accent" : "text-primary")}>
                      {v.label}
                    </p>
                    {v.isNamed && <Badge variant="outline">Named</Badge>}
                  </div>
                  <p className="mt-0.5 text-xs text-tertiary">{v.time}</p>
                  <p className="text-xs text-tertiary">{v.author}</p>
                </button>
              ))}
            </div>
          </ScrollArea>

          <div className="flex flex-col">
            <div className="flex flex-1 items-center justify-center rounded-lg border border-subtle bg-canvas">
              <div className="aspect-video w-3/4 rounded-md bg-surface shadow-sm" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar size="sm"><AvatarFallback>{selectedVersion.author[0]}</AvatarFallback></Avatar>
                <p className="text-sm text-secondary">
                  {selectedVersion.author} · {selectedVersion.time}
                </p>
              </div>
              {!selectedVersion.isCurrent && (
                <Button size="sm" className="gap-1.5">
                  <RotateCcw className="size-3.5" />
                  Restore this version
                </Button>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { VersionHistorySheet };
