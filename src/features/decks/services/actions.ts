"use server";

import { revalidatePath } from "next/cache";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/server/db/client";
import { requireWorkspaceContext } from "@/server/workspace/context";

type ActionResult = { ok: true; deckId?: string } | { ok: false; error: string };

async function logActivity(
  workspaceId: string,
  actorId: string,
  type: string,
  targetId: string,
  metadata?: Record<string, unknown>,
) {
  await prisma.activityEvent.create({
    data: {
      workspaceId,
      actorId,
      type,
      targetType: "deck",
      targetId,
      metadata: metadata as Prisma.InputJsonValue | undefined,
    },
  });
}

function revalidateDeckSurfaces() {
  revalidatePath("/dashboard");
  revalidatePath("/trash");
  revalidatePath("/activity");
  revalidatePath("/search");
  revalidatePath("/workspace/[workspaceId]/folders/[folderId]", "page");
}

/** Creates a new draft deck, optionally inside a folder. Returns the new deck id. */
export async function createDeck(input: { folderId?: string | null; title?: string }): Promise<ActionResult> {
  const ctx = await requireWorkspaceContext();

  if (input.folderId) {
    const folder = await prisma.folder.findFirst({
      where: { id: input.folderId, workspaceId: ctx.workspaceId, deletedAt: null },
    });
    if (!folder) return { ok: false, error: "Folder not found." };
  }

  const deck = await prisma.deck.create({
    data: {
      workspaceId: ctx.workspaceId,
      folderId: input.folderId ?? null,
      title: input.title?.trim() || "Untitled Deck",
      status: "draft",
      createdById: ctx.userId,
    },
  });

  await logActivity(ctx.workspaceId, ctx.userId, "deck.created", deck.id, { title: deck.title });
  revalidateDeckSurfaces();
  return { ok: true, deckId: deck.id };
}

export async function renameDeck(deckId: string, title: string): Promise<ActionResult> {
  const ctx = await requireWorkspaceContext();
  const trimmed = title.trim();
  if (!trimmed) return { ok: false, error: "Title can't be empty." };

  const deck = await prisma.deck.findFirst({ where: { id: deckId, workspaceId: ctx.workspaceId, deletedAt: null } });
  if (!deck) return { ok: false, error: "Deck not found." };

  await prisma.deck.update({ where: { id: deckId }, data: { title: trimmed } });
  await logActivity(ctx.workspaceId, ctx.userId, "deck.renamed", deckId, { from: deck.title, to: trimmed });
  revalidateDeckSurfaces();
  return { ok: true };
}

export async function moveDeckToFolder(deckId: string, folderId: string | null): Promise<ActionResult> {
  const ctx = await requireWorkspaceContext();

  const deck = await prisma.deck.findFirst({ where: { id: deckId, workspaceId: ctx.workspaceId, deletedAt: null } });
  if (!deck) return { ok: false, error: "Deck not found." };

  if (folderId) {
    const folder = await prisma.folder.findFirst({ where: { id: folderId, workspaceId: ctx.workspaceId, deletedAt: null } });
    if (!folder) return { ok: false, error: "Folder not found." };
  }

  await prisma.deck.update({ where: { id: deckId }, data: { folderId } });
  await logActivity(ctx.workspaceId, ctx.userId, "deck.moved", deckId, { folderId });
  revalidateDeckSurfaces();
  return { ok: true };
}

export async function duplicateDeck(deckId: string): Promise<ActionResult> {
  const ctx = await requireWorkspaceContext();

  const deck = await prisma.deck.findFirst({ where: { id: deckId, workspaceId: ctx.workspaceId, deletedAt: null } });
  if (!deck) return { ok: false, error: "Deck not found." };

  const copy = await prisma.deck.create({
    data: {
      workspaceId: ctx.workspaceId,
      folderId: deck.folderId,
      title: `${deck.title} (copy)`,
      status: "draft",
      createdById: ctx.userId,
    },
  });

  await logActivity(ctx.workspaceId, ctx.userId, "deck.duplicated", copy.id, { from: deckId });
  revalidateDeckSurfaces();
  return { ok: true, deckId: copy.id };
}

/** Soft-deletes a deck (moves it to Trash). */
export async function trashDeck(deckId: string): Promise<ActionResult> {
  const ctx = await requireWorkspaceContext();

  const deck = await prisma.deck.findFirst({ where: { id: deckId, workspaceId: ctx.workspaceId, deletedAt: null } });
  if (!deck) return { ok: false, error: "Deck not found." };

  await prisma.deck.update({ where: { id: deckId }, data: { deletedAt: new Date() } });
  await logActivity(ctx.workspaceId, ctx.userId, "deck.trashed", deckId, { title: deck.title });
  revalidateDeckSurfaces();
  return { ok: true };
}

export async function restoreDeck(deckId: string): Promise<ActionResult> {
  const ctx = await requireWorkspaceContext();

  const deck = await prisma.deck.findFirst({ where: { id: deckId, workspaceId: ctx.workspaceId, deletedAt: { not: null } } });
  if (!deck) return { ok: false, error: "Deck not found in trash." };

  await prisma.deck.update({ where: { id: deckId }, data: { deletedAt: null } });
  await logActivity(ctx.workspaceId, ctx.userId, "deck.restored", deckId, { title: deck.title });
  revalidateDeckSurfaces();
  return { ok: true };
}

/** Permanently deletes a deck that's already in Trash. Irreversible. */
export async function permanentlyDeleteDeck(deckId: string): Promise<ActionResult> {
  const ctx = await requireWorkspaceContext();

  const deck = await prisma.deck.findFirst({ where: { id: deckId, workspaceId: ctx.workspaceId, deletedAt: { not: null } } });
  if (!deck) return { ok: false, error: "Deck not found in trash." };

  await prisma.deck.delete({ where: { id: deckId } });
  revalidateDeckSurfaces();
  return { ok: true };
}
