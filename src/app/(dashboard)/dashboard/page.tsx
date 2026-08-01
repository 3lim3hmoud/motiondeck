import { requireWorkspaceContext } from "@/server/workspace/context";
import { listDecks, getWorkspaceStats, type DeckFilter } from "@/features/decks/services/queries";
import { DashboardView } from "@/features/decks/components/dashboard-view";

const VALID_FILTERS: DeckFilter[] = ["all", "recent", "drafts", "processing", "archived"];

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; page?: string }>;
}) {
  const ctx = await requireWorkspaceContext();
  const sp = await searchParams;
  const filter = VALID_FILTERS.includes(sp.filter as DeckFilter) ? (sp.filter as DeckFilter) : "all";
  const page = Math.max(1, Number(sp.page) || 1);

  const [{ decks, total, totalPages }, stats] = await Promise.all([
    listDecks({ workspaceId: ctx.workspaceId, filter, page }),
    getWorkspaceStats(ctx.workspaceId),
  ]);

  return (
    <DashboardView
      decks={decks}
      total={total}
      page={page}
      totalPages={totalPages}
      filter={filter}
      stats={stats}
    />
  );
}
