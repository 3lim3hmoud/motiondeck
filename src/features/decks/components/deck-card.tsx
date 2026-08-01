"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { relativeTime } from "@/lib/format";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { Badge } from "@/components/ui/badge";
import { TextPromptDialog } from "@/components/shared/text-prompt-dialog";
import { renameDeck, duplicateDeck, trashDeck } from "@/features/decks/services/actions";
import type { DeckStatus } from "@/types/domain";

export interface DeckCardData {
  id: string;
  title: string;
  status: DeckStatus;
  updatedAt: Date | string;
}

const tints = ["bg-brand-100", "bg-success/15", "bg-info/15", "bg-warning/15", "bg-danger/10"];

/**
 * Hovering plays a short auto-looping motion preview of the actual deck —
 * per the UX spec, the dashboard itself is meant to demonstrate the
 * product's core value passively. Here that's simulated with staggered
 * block reveals; a real implementation would scrub the deck's actual first
 * scene animation.
 */
function DeckCard({ deck, index = 0 }: { deck: DeckCardData; index?: number }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const tint = tints[index % tints.length];

  function handleRename(title: string) {
    startTransition(async () => {
      await renameDeck(deck.id, title);
      router.refresh();
    });
  }

  function handleDuplicate() {
    startTransition(async () => {
      await duplicateDeck(deck.id);
      router.refresh();
    });
  }

  function handleTrash() {
    startTransition(async () => {
      await trashDeck(deck.id);
      router.refresh();
    });
  }

  return (
    <div
      className={cn("group relative", isPending && "pointer-events-none opacity-60")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={ROUTES.editor(deck.id)}>
        <div className={cn("relative aspect-video overflow-hidden rounded-lg border border-subtle shadow-sm transition-shadow group-hover:shadow-md", tint)}>
          <div className="absolute inset-3 grid grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="rounded-md bg-surface/60"
                animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 4 }}
                transition={{ duration: 0.3, delay: hovered ? i * 0.06 : 0 }}
              />
            ))}
          </div>

          {deck.status === "processing" && (
            <div className="absolute inset-0 flex items-center justify-center bg-surface/70 backdrop-blur-sm">
              <Badge variant="accent">Processing…</Badge>
            </div>
          )}
        </div>
      </Link>

      <div className="mt-2.5 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <Link href={ROUTES.editor(deck.id)}>
            <p className="truncate text-md font-medium text-primary hover:text-accent">{deck.title}</p>
          </Link>
          <p className="text-sm text-tertiary">Edited {relativeTime(deck.updatedAt)}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconButton
              aria-label="Deck options"
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100"
            >
              <MoreHorizontal />
            </IconButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setRenameOpen(true)}>Rename</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDuplicate}>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleTrash}>Move to trash</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <TextPromptDialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
        title="Rename deck"
        label="Deck title"
        initialValue={deck.title}
        submitLabel="Save"
        onSubmit={handleRename}
      />
    </div>
  );
}

export { DeckCard };
