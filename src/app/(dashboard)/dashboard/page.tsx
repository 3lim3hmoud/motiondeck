"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpDown, FileText } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { DeckGridSkeleton } from "@/components/shared/loading-state";
import { StaggerItem, StaggerList } from "@/components/motion/motion-primitives";
import { DeckCard } from "@/features/decks/components/deck-card";
import type { Deck } from "@/types/domain";

const filters = ["All decks", "Recent", "Shared with me", "Drafts"] as const;

// Mock data — replaced by a TanStack Query hook (useDecksQuery) in the
// backend-wiring phase for this feature.
const mockDecks: Array<Pick<Deck, "id" | "title" | "status" | "updatedAt">> = [
  { id: "1", title: "Q3 Sales Review", status: "ready", updatedAt: "2h ago" },
  { id: "2", title: "Product Roadmap 2027", status: "ready", updatedAt: "yesterday" },
  { id: "3", title: "Client Onboarding Guide", status: "processing", updatedAt: "5m ago" },
  { id: "4", title: "Marketing Brief — Fall Campaign", status: "ready", updatedAt: "3d ago" },
  { id: "5", title: "All-Hands — August", status: "ready", updatedAt: "1w ago" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All decks");
  const [isLoading] = useState(false);
  const hasDecks = mockDecks.length > 0;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-primary">Home</h1>
      </div>

      {hasDecks && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  activeFilter === f
                    ? "bg-accent text-white"
                    : "bg-muted text-secondary hover:text-primary",
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="gap-1.5">
            <ArrowUpDown className="size-3.5" />
            Last edited
          </Button>
        </div>
      )}

      {isLoading ? (
        <DeckGridSkeleton />
      ) : hasDecks ? (
        <StaggerList>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {mockDecks.map((deck, i) => (
              <StaggerItem key={deck.id}>
                <DeckCard deck={deck} index={i} />
              </StaggerItem>
            ))}
          </div>
        </StaggerList>
      ) : (
        <EmptyState
          icon={<FileText />}
          title="Nothing here yet — import a doc and watch it come alive"
          description="Bring in a document, PDF, or slide deck and MotionDeck will structure it into an animated presentation automatically."
          action={{ label: "Import a Document", onClick: () => router.push(ROUTES.deckImport("default")) }}
          secondaryAction={{ label: "Start from a template", onClick: () => router.push("/templates") }}
        />
      )}
    </div>
  );
}
