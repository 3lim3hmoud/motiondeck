"use client";

import { useState } from "react";
import { Plus, Sparkles, Waves, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { IconButton } from "@/components/ui/icon-button";

interface SceneMeta {
  id: string;
  title: string;
  motionTag: "fade" | "parallax" | "emphasis";
}

const motionIcons = { fade: Sparkles, parallax: Waves, emphasis: Zap };

const initialScenes: SceneMeta[] = [
  { id: "s1", title: "Title", motionTag: "fade" },
  { id: "s2", title: "The Problem", motionTag: "emphasis" },
  { id: "s3", title: "Our Approach", motionTag: "parallax" },
  { id: "s4", title: "Results", motionTag: "fade" },
  { id: "s5", title: "Next Steps", motionTag: "fade" },
];

function SceneNavigator({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [scenes] = useState(initialScenes);

  return (
    <div className="flex h-full w-full flex-col bg-surface">
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {scenes.map((scene, i) => {
          const MotionIcon = motionIcons[scene.motionTag];
          const active = scene.id === activeId;
          return (
            <ContextMenu key={scene.id}>
              <ContextMenuTrigger>
                <button
                  onClick={() => onSelect(scene.id)}
                  className={cn(
                    "group flex w-full flex-col gap-1.5 rounded-lg border p-1.5 text-left transition-colors",
                    active ? "border-accent bg-accent/5" : "border-transparent hover:bg-surface-raised",
                  )}
                >
                  <div
                    className={cn(
                      "aspect-video w-full rounded-md border",
                      active ? "border-accent" : "border-subtle bg-canvas",
                    )}
                  />
                  <div className="flex items-center justify-between px-0.5">
                    <span className="flex items-center gap-1 text-sm text-secondary">
                      <span className="text-xs text-tertiary">{i + 1}</span>
                      {scene.title}
                    </span>
                    <MotionIcon className="size-3 text-tertiary" />
                  </div>
                </button>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Duplicate</ContextMenuItem>
                <ContextMenuItem>Add speaker notes</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem variant="destructive">Delete scene</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
      </div>
      <div className="border-t border-subtle p-3">
        <IconButton aria-label="Add scene" variant="secondary" className="w-full !rounded-md" size="sm">
          <Plus className="size-4" />
        </IconButton>
      </div>
    </div>
  );
}

export { SceneNavigator };
