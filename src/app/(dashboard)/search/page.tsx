"use client";

import { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/shared/empty-state";
import { Grid } from "@/components/ui/layout";
import { StaggerItem, StaggerList } from "@/components/motion/motion-primitives";
import { DeckCard } from "@/features/decks/components/deck-card";
import { cn } from "@/lib/utils";

const allDecks = [
  { id: "1", title: "Q3 Sales Review", status: "ready" as const, updatedAt: "2h ago" },
  { id: "2", title: "Product Roadmap 2027", status: "ready" as const, updatedAt: "yesterday" },
  { id: "3", title: "Client Onboarding Guide", status: "ready" as const, updatedAt: "5d ago" },
  { id: "4", title: "Marketing Brief — Fall Campaign", status: "ready" as const, updatedAt: "3d ago" },
  { id: "5", title: "All-Hands — August", status: "ready" as const, updatedAt: "1w ago" },
];

const scopes = ["All", "Decks", "Folders", "People"] as const;

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<(typeof scopes)[number]>("All");

  const results = useMemo(
    () =>
      query.trim()
        ? allDecks.filter((d) => d.title.toLowerCase().includes(query.toLowerCase()))
        : allDecks,
    [query],
  );

  return (
    <div className="mx-auto max-w-5xl">
      <div className="relative mb-4">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-tertiary" />
        <Input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search decks, folders, people…"
          className="h-11 pl-9 text-lg"
        />
      </div>

      <div className="mb-6 flex gap-2">
        {scopes.map((s) => (
          <button
            key={s}
            onClick={() => setScope(s)}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              scope === s ? "bg-accent text-white" : "bg-muted text-secondary hover:text-primary",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <EmptyState
          icon={<SearchIcon />}
          title={`No results for "${query}"`}
          description="Try a different keyword, or check the spelling."
        />
      ) : (
        <StaggerList key={query + scope}>
          <Grid cols={4} gap={5}>
            {results.map((deck, i) => (
              <StaggerItem key={deck.id}>
                <DeckCard deck={deck} index={i} />
              </StaggerItem>
            ))}
          </Grid>
        </StaggerList>
      )}
    </div>
  );
}
