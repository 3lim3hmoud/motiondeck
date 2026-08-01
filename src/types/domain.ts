/**
 * Domain-level types shared across features. These mirror the Prisma models
 * (see prisma/schema.prisma) but are hand-declared here so UI code can import
 * plain types without pulling in `@prisma/client` on the client bundle.
 * Feature-specific shapes (e.g. AnimationKeyframe, ImportJobStatus) live
 * inside their own feature's `types.ts`, not here.
 */

export type PlanTier = "free" | "pro" | "team" | "enterprise";

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  planTier: PlanTier;
  createdAt: string;
}

export interface WorkspaceMember {
  userId: string;
  workspaceId: string;
  role: "owner" | "admin" | "editor" | "viewer";
}

export interface Folder {
  id: string;
  workspaceId: string;
  parentFolderId: string | null;
  name: string;
  createdAt: string;
}

export type DeckStatus = "draft" | "processing" | "ready" | "archived";

export interface Deck {
  id: string;
  workspaceId: string;
  folderId: string | null;
  title: string;
  status: DeckStatus;
  thumbnailUrl: string | null;
  createdAt: string;
  updatedAt: string;
  createdById: string;
}

export interface Scene {
  id: string;
  deckId: string;
  order: number;
  title: string;
  layoutId: string;
  speakerNotes: string | null;
}

export type ShareVisibility = "private" | "public" | "password";

export interface ShareLink {
  id: string;
  deckId: string;
  token: string;
  visibility: ShareVisibility;
  expiresAt: string | null;
  allowComments: boolean;
}
