"use client";

import { useState } from "react";
import { Grid3x3, MessageSquare, Minus, Plus, StickyNote } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";
import { CommentsPanel } from "@/features/editor/components/comments-panel";

function EditorBottomBar({
  onToggleNotes,
  notesOpen,
}: {
  onToggleNotes: () => void;
  notesOpen: boolean;
}) {
  const [zoom, setZoom] = useState(100);
  const [gridOn, setGridOn] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);

  return (
    <div className="flex h-11 shrink-0 items-center gap-2 border-t border-subtle bg-surface px-3">
      <div className="flex items-center gap-1">
        <IconButton aria-label="Zoom out" variant="ghost" size="sm" onClick={() => setZoom((z) => Math.max(25, z - 10))}>
          <Minus className="size-3.5" />
        </IconButton>
        <span className="w-10 text-center text-sm tabular-nums text-secondary">{zoom}%</span>
        <IconButton aria-label="Zoom in" variant="ghost" size="sm" onClick={() => setZoom((z) => Math.min(200, z + 10))}>
          <Plus className="size-3.5" />
        </IconButton>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <IconButton
          aria-label="Toggle speaker notes"
          variant="ghost"
          size="sm"
          className={cn(notesOpen && "bg-accent/10 text-accent")}
          onClick={onToggleNotes}
        >
          <StickyNote className="size-3.5" />
        </IconButton>
        <IconButton
          aria-label="Toggle comments"
          variant="ghost"
          size="sm"
          className={cn(commentsOpen && "bg-accent/10 text-accent")}
          onClick={() => setCommentsOpen((v) => !v)}
        >
          <MessageSquare className="size-3.5" />
        </IconButton>
        <CommentsPanel open={commentsOpen} onOpenChange={setCommentsOpen} />
        <IconButton
          aria-label="Toggle snap to grid"
          variant="ghost"
          size="sm"
          className={cn(gridOn && "bg-accent/10 text-accent")}
          onClick={() => setGridOn((v) => !v)}
        >
          <Grid3x3 className="size-3.5" />
        </IconButton>
      </div>
    </div>
  );
}

export { EditorBottomBar };
