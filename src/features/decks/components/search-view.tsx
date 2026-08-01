"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/shared/empty-state";
import { Grid } from "@/components/ui/layout";
import { Pagination } from "@/components/shared/pagination";
import { StaggerItem, StaggerList } from "@/components/motion/motion-primitives";
import { DeckCard, type DeckCardData } from "@/features/decks/components/deck-card";
import { ROUTES } from "@/constants/routes";

function SearchView({
  initialQuery,
  decks,
  page,
  totalPages,
}: {
  initialQuery: string;
  decks: DeckCardData[];
  page: number;
  totalPages: number;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [, startTransition] = useTransition();

  // Push the query into the URL (debounced) so the server component can
  // re-run the Prisma search; keeps search shareable/bookmarkable too.
  useEffect(() => {
    const handle = setTimeout(() => {
      if (query === initialQuery) return;
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      startTransition(() => {
        router.push(params.toString() ? `/search?${params.toString()}` : "/search");
      });
    }, 300);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="relative mb-6">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-tertiary" />
        <Input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search decks…"
          className="h-11 pl-9 text-lg"
        />
      </div>

      {decks.length === 0 ? (
        <EmptyState
          icon={<SearchIcon />}
          title={query.trim() ? "No decks match your search" : "Search your decks"}
          description={query.trim() ? "Try a different title." : "Start typing to search decks by title."}
        />
      ) : (
        <>
          <StaggerList>
            <Grid cols={4} gap={5}>
              {decks.map((deck, i) => (
                <StaggerItem key={deck.id}>
                  <DeckCard deck={deck} index={i} />
                </StaggerItem>
              ))}
            </Grid>
          </StaggerList>
          <Pagination
            page={page}
            totalPages={totalPages}
            buildHref={(p) => {
              const params = new URLSearchParams();
              if (query.trim()) params.set("q", query.trim());
              if (p > 1) params.set("page", String(p));
              const qs = params.toString();
              return qs ? `${ROUTES.dashboard.replace("dashboard", "search")}?${qs}` : "/search";
            }}
          />
        </>
      )}
    </div>
  );
}

export { SearchView };
