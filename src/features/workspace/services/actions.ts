"use server";

import { revalidatePath } from "next/cache";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/server/db/client";
import { requireWorkspaceContext } from "@/server/workspace/context";

type ActionResult = { ok: true; folderId?: string } | { ok: false; error: string };

async function logActivity(workspaceId: string, actorId: string, type: string, targetId: string, metadata?: Record<string, unknown>) {
  await prisma.activityEvent.create({
    data: {
      workspaceId,
      actorId,
      type,
      targetType: "folder",
      targetId,
      metadata: metadata as Prisma.InputJsonValue | undefined,
    },
  });
}

function revalidateFolderSurfaces() {
  revalidatePath("/dashboard", "layout");
  revalidatePath("/trash");
  revalidatePath("/activity");
}

export async function createFolder(input: { name: string; parentFolderId?: string | null }): Promise<ActionResult> {
  const ctx = await requireWorkspaceContext();
  const name = input.name.trim();
  if (!name) return { ok: false, error: "Folder name can't be empty." };

  const folder = await prisma.folder.create({
    data: {
      workspaceId: ctx.workspaceId,
      parentFolderId: input.parentFolderId ?? null,
      name,
      createdById: ctx.userId,
    },
  });

  await logActivity(ctx.workspaceId, ctx.userId, "folder.created", folder.id, { name });
  revalidateFolderSurfaces();
  return { ok: true, folderId: folder.id };
}

export async function renameFolder(folderId: string, name: string): Promise<ActionResult> {
  const ctx = await requireWorkspaceContext();
  const trimmed = name.trim();
  if (!trimmed) return { ok: false, error: "Folder name can't be empty." };

  const folder = await prisma.folder.findFirst({ where: { id: folderId, workspaceId: ctx.workspaceId, deletedAt: null } });
  if (!folder) return { ok: false, error: "Folder not found." };

  await prisma.folder.update({ where: { id: folderId }, data: { name: trimmed } });
  await logActivity(ctx.workspaceId, ctx.userId, "folder.renamed", folderId, { from: folder.name, to: trimmed });
  revalidateFolderSurfaces();
  return { ok: true };
}

/** Soft-deletes a folder and moves any decks directly inside it out to the root (folderId = null), so they aren't orphaned or silently trashed. */
export async function trashFolder(folderId: string): Promise<ActionResult> {
  const ctx = await requireWorkspaceContext();
  const folder = await prisma.folder.findFirst({ where: { id: folderId, workspaceId: ctx.workspaceId, deletedAt: null } });
  if (!folder) return { ok: false, error: "Folder not found." };

  await prisma.$transaction([
    prisma.deck.updateMany({ where: { folderId, workspaceId: ctx.workspaceId }, data: { folderId: null } }),
    prisma.folder.update({ where: { id: folderId }, data: { deletedAt: new Date() } }),
  ]);

  await logActivity(ctx.workspaceId, ctx.userId, "folder.trashed", folderId, { name: folder.name });
  revalidateFolderSurfaces();
  return { ok: true };
}

export async function restoreFolder(folderId: string): Promise<ActionResult> {
  const ctx = await requireWorkspaceContext();
  const folder = await prisma.folder.findFirst({ where: { id: folderId, workspaceId: ctx.workspaceId, deletedAt: { not: null } } });
  if (!folder) return { ok: false, error: "Folder not found in trash." };

  await prisma.folder.update({ where: { id: folderId }, data: { deletedAt: null } });
  await logActivity(ctx.workspaceId, ctx.userId, "folder.restored", folderId, { name: folder.name });
  revalidateFolderSurfaces();
  return { ok: true };
}

export async function permanentlyDeleteFolder(folderId: string): Promise<ActionResult> {
  const ctx = await requireWorkspaceContext();
  const folder = await prisma.folder.findFirst({ where: { id: folderId, workspaceId: ctx.workspaceId, deletedAt: { not: null } } });
  if (!folder) return { ok: false, error: "Folder not found in trash." };

  await prisma.folder.delete({ where: { id: folderId } });
  revalidateFolderSurfaces();
  return { ok: true };
}

export async function renameWorkspace(name: string): Promise<ActionResult> {
  const ctx = await requireWorkspaceContext();
  const trimmed = name.trim();
  if (!trimmed) return { ok: false, error: "Workspace name can't be empty." };
  if (ctx.role !== "owner" && ctx.role !== "admin") {
    return { ok: false, error: "Only workspace owners or admins can rename the workspace." };
  }

  await prisma.workspace.update({ where: { id: ctx.workspaceId }, data: { name: trimmed } });
  await logActivity(ctx.workspaceId, ctx.userId, "workspace.renamed", ctx.workspaceId, { to: trimmed });
  revalidatePath("/dashboard", "layout");
  revalidatePath("/settings/workspace");
  return { ok: true };
}
