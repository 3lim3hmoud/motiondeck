"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ChevronLeft, History, Redo2, Share2, Undo2 } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { AvatarStack, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SharePanel } from "@/features/sharing/components/share-panel";
import { VersionHistorySheet } from "@/features/editor/components/version-history-sheet";

function EditorTopbar({ deckId, title }: { deckId: string; title: string }) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [value, setValue] = useState(title);
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-subtle bg-surface px-3">
      <IconButton aria-label="Back to dashboard" variant="ghost" size="sm" asChild>
        <Link href={ROUTES.dashboard}>
          <ChevronLeft />
        </Link>
      </IconButton>

      {editingTitle ? (
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setEditingTitle(false)}
          onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
          className="h-8 rounded-md border border-accent bg-surface px-2 text-md font-medium text-primary focus-visible:outline-none"
        />
      ) : (
        <button
          onClick={() => setEditingTitle(true)}
          className="rounded-md px-2 py-1 text-md font-medium text-primary hover:bg-surface-raised"
        >
          {value}
        </button>
      )}

      <div className="flex items-center gap-0.5">
        <IconButton aria-label="Undo" variant="ghost" size="sm">
          <Undo2 className="size-4" />
        </IconButton>
        <IconButton aria-label="Redo" variant="ghost" size="sm">
          <Redo2 className="size-4" />
        </IconButton>
      </div>

      <div className="flex items-center gap-1.5 text-sm text-tertiary">
        <Check className="size-3.5 text-success" />
        Saved
      </div>

      <IconButton aria-label="Version history" variant="ghost" size="sm" onClick={() => setHistoryOpen(true)}>
        <History className="size-4" />
      </IconButton>
      <VersionHistorySheet open={historyOpen} onOpenChange={setHistoryOpen} />

      <div className="ml-auto flex items-center gap-3">
        <AvatarStack max={3}>
          <Avatar size="sm"><AvatarFallback>JD</AvatarFallback></Avatar>
          <Avatar size="sm"><AvatarFallback>AK</AvatarFallback></Avatar>
        </AvatarStack>

        <Button variant="secondary" size="sm" className="gap-1.5" asChild>
          <Link href={ROUTES.present(deckId)}>Present</Link>
        </Button>
        <SharePanel>
          <button className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}>
            <Share2 className="size-3.5" />
            Share
          </button>
        </SharePanel>
      </div>
    </header>
  );
}

export { EditorTopbar };
