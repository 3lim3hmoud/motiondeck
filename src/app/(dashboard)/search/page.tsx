import { requireWorkspaceContext } from "@/server/workspace/context";
import { listDecks } from "@/features/decks/services/queries";
import { SearchView } from "@/features/decks/components/search-view";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const ctx = await requireWorkspaceContext();
  const sp = await searchParams;
  const query = sp.q ?? "";
  const page = Math.max(1, Number(sp.page) || 1);

  const { decks, totalPages } = await listDecks({
    workspaceId: ctx.workspaceId,
    query: query.trim() ? query : undefined,
    page,
  });

  return <SearchView initialQuery={query} decks={decks} page={page} totalPages={totalPages} />;
}
