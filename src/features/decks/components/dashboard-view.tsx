"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { StaggerItem, StaggerList } from "@/components/motion/motion-primitives";
import { DeckCard, type DeckCardData } from "@/features/decks/components/deck-card";
import { NewDeckButton } from "@/features/decks/components/new-deck-button";
import type { DeckFilter } from "@/features/decks/services/queries";

const filters: { value: DeckFilter; label: string }[] = [
  { value: "all", label: "All decks" },
  { value: "recent", label: "Recent" },
  { value: "drafts", label: "Drafts" },
  { value: "processing", label: "Processing" },
  { value: "archived", label: "Archived" },
];

export interface DashboardStats {
  totalDecks: number;
  readyDecks: number;
  totalFolders: number;
  viewsThisWeek: number;
}

function StatChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-subtle bg-surface px-4 py-2.5">
      <p className="text-lg font-semibold text-primary">{value.toLocaleString()}</p>
      <p className="text-sm text-tertiary">{label}</p>
    </div>
  );
}

function DashboardView({
  decks,
  total,
  page,
  totalPages,
  filter,
  stats,
}: {
  decks: DeckCardData[];
  total: number;
  page: number;
  totalPages: number;
  filter: DeckFilter;
  stats: DashboardStats;
}) {
  const router = useRouter();
  void router;

  function buildHref(f: DeckFilter, p: number) {
    const params = new URLSearchParams();
    if (f !== "all") params.set("filter", f);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `${ROUTES.dashboard}?${qs}` : ROUTES.dashboard;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-primary">Home</h1>
        <div className="hidden sm:block">
          <NewDeckButton size="sm" />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatChip label="Decks" value={stats.totalDecks} />
        <StatChip label="Ready" value={stats.readyDecks} />
        <StatChip label="Folders" value={stats.totalFolders} />
        <StatChip label="Views (7d)" value={stats.viewsThisWeek} />
      </div>

      {total > 0 && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <Link
                key={f.value}
                href={buildHref(f.value, 1)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  filter === f.value
                    ? "bg-accent text-white"
                    : "bg-muted text-secondary hover:text-primary",
                )}
              >
                {f.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {decks.length > 0 ? (
        <>
          <StaggerList>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {decks.map((deck, i) => (
                <StaggerItem key={deck.id}>
                  <DeckCard deck={deck} index={i} />
                </StaggerItem>
              ))}
            </div>
          </StaggerList>
          <Pagination page={page} totalPages={totalPages} buildHref={(p) => buildHref(filter, p)} />
        </>
      ) : total === 0 && filter === "all" ? (
        <EmptyState
          icon={<FileText />}
          title="Nothing here yet — import a doc and watch it come alive"
          description="Bring in a document, PDF, or slide deck and MotionDeck will structure it into an animated presentation automatically."
          action={{ label: "Import a Document", onClick: () => router.push(ROUTES.deckImport) }}
          secondaryAction={{ label: "Start from a template", onClick: () => router.push("/templates") }}
        />
      ) : (
        <EmptyState icon={<FileText />} title="No decks match this filter" description="Try a different filter." />
      )}
    </div>
  );
}

export { DashboardView };
