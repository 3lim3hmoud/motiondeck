"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { Badge } from "@/components/ui/badge";
import type { Deck } from "@/types/domain";

const tints = ["bg-brand-100", "bg-success/15", "bg-info/15", "bg-warning/15", "bg-danger/10"];

/**
 * Hovering plays a short auto-looping motion preview of the actual deck —
 * per the UX spec, the dashboard itself is meant to demonstrate the
 * product's core value passively. Here that's simulated with staggered
 * block reveals; a real implementation would scrub the deck's actual first
 * scene animation.
 */
function DeckCard({ deck, index = 0 }: { deck: Pick<Deck, "id" | "title" | "status" | "updatedAt">; index?: number }) {
  const [hovered, setHovered] = useState(false);
  const tint = tints[index % tints.length];

  return (
    <div
      className="group relative"
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
          <p className="text-sm text-tertiary">Edited {deck.updatedAt}</p>
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
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem>Move to folder</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Move to trash</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export { DeckCard };
