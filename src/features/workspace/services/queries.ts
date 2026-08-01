import "server-only";
import { prisma } from "@/server/db/client";

/** Flat, non-deleted folder list for the sidebar and folder pickers. */
export async function getFolders(workspaceId: string) {
  return prisma.folder.findMany({
    where: { workspaceId, deletedAt: null },
    orderBy: { name: "asc" },
    select: { id: true, name: true, parentFolderId: true },
  });
}

export async function getFolder(workspaceId: string, folderId: string) {
  return prisma.folder.findFirst({
    where: { id: folderId, workspaceId, deletedAt: null },
  });
}

export interface ActivityFeedItem {
  id: string;
  type: string;
  targetType: string | null;
  targetId: string | null;
  metadata: unknown;
  createdAt: Date;
  actor: { id: string; name: string | null; email: string };
}

/** Recent workspace activity (deck/folder create/rename/trash/restore, etc.) for the Activity page. */
export async function getRecentActivity(workspaceId: string, limit = 30): Promise<ActivityFeedItem[]> {
  return prisma.activityEvent.findMany({
    where: { workspaceId },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      type: true,
      targetType: true,
      targetId: true,
      metadata: true,
      createdAt: true,
      actor: { select: { id: true, name: true, email: true } },
    },
  });
}
