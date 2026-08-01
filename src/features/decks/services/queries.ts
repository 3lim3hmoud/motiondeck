import "server-only";
import { prisma } from "@/server/db/client";
import type { DeckStatus } from "@/types/domain";

const PAGE_SIZE = 24;

export type DeckFilter = "all" | "recent" | "drafts" | "processing" | "archived";

export interface ListDecksOptions {
  workspaceId: string;
  folderId?: string | null;
  filter?: DeckFilter;
  query?: string;
  page?: number;
  pageSize?: number;
}

export interface DeckListItem {
  id: string;
  title: string;
  status: DeckStatus;
  thumbnailUrl: string | null;
  updatedAt: Date;
  folderId: string | null;
}

export interface DeckListResult {
  decks: DeckListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

function filterToWhere(filter?: DeckFilter) {
  switch (filter) {
    case "drafts":
      return { status: "draft" as const };
    case "processing":
      return { status: "processing" as const };
    case "archived":
      return { status: "archived" as const };
    case "recent":
    case "all":
    default:
      return {};
  }
}

/** Paginated, filterable, searchable deck list for a workspace (dashboard, folder view, search). */
export async function listDecks(opts: ListDecksOptions): Promise<DeckListResult> {
  const page = Math.max(1, opts.page ?? 1);
  const pageSize = opts.pageSize ?? PAGE_SIZE;

  const where = {
    workspaceId: opts.workspaceId,
    deletedAt: null,
    ...(opts.folderId !== undefined ? { folderId: opts.folderId } : {}),
    ...filterToWhere(opts.filter),
    ...(opts.query?.trim()
      ? { title: { contains: opts.query.trim(), mode: "insensitive" as const } }
      : {}),
  };

  const orderBy =
    opts.filter === "recent"
      ? [{ updatedAt: "desc" as const }]
      : [{ updatedAt: "desc" as const }];

  const [decks, total] = await Promise.all([
    prisma.deck.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: { id: true, title: true, status: true, thumbnailUrl: true, updatedAt: true, folderId: true },
    }),
    prisma.deck.count({ where }),
  ]);

  return { decks, total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) };
}

export async function getDeck(workspaceId: string, deckId: string) {
  return prisma.deck.findFirst({ where: { id: deckId, workspaceId, deletedAt: null } });
}

export interface TrashedDeck {
  id: string;
  title: string;
  deletedAt: Date;
  kind: "deck";
}
export interface TrashedFolder {
  id: string;
  name: string;
  deletedAt: Date;
  kind: "folder";
}

/** Soft-deleted decks and folders for the Trash page, newest-deleted first. */
export async function listTrash(workspaceId: string): Promise<Array<TrashedDeck | TrashedFolder>> {
  const [decks, folders] = await Promise.all([
    prisma.deck.findMany({
      where: { workspaceId, deletedAt: { not: null } },
      orderBy: { deletedAt: "desc" },
      select: { id: true, title: true, deletedAt: true },
    }),
    prisma.folder.findMany({
      where: { workspaceId, deletedAt: { not: null } },
      orderBy: { deletedAt: "desc" },
      select: { id: true, name: true, deletedAt: true },
    }),
  ]);

  const items: Array<TrashedDeck | TrashedFolder> = [
    ...decks.map((d: { id: string; title: string; deletedAt: Date | null }) => ({
      id: d.id,
      title: d.title,
      deletedAt: d.deletedAt!,
      kind: "deck" as const,
    })),
    ...folders.map((f: { id: string; name: string; deletedAt: Date | null }) => ({
      id: f.id,
      name: f.name,
      deletedAt: f.deletedAt!,
      kind: "folder" as const,
    })),
  ];

  return items.sort((a, b) => b.deletedAt.getTime() - a.deletedAt.getTime());
}

/** Counts used by the dashboard stats strip. */
export async function getWorkspaceStats(workspaceId: string) {
  const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [totalDecks, readyDecks, totalFolders, viewsThisWeek] = await Promise.all([
    prisma.deck.count({ where: { workspaceId, deletedAt: null } }),
    prisma.deck.count({ where: { workspaceId, deletedAt: null, status: "ready" } }),
    prisma.folder.count({ where: { workspaceId, deletedAt: null } }),
    prisma.analyticsEvent.count({
      where: { deck: { workspaceId }, event: "view", createdAt: { gte: since7d } },
    }),
  ]);

  return { totalDecks, readyDecks, totalFolders, viewsThisWeek };
}
