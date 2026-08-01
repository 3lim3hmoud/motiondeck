import { notFound } from "next/navigation";
import { requireWorkspaceContext } from "@/server/workspace/context";
import { getFolder } from "@/features/workspace/services/queries";
import { listDecks } from "@/features/decks/services/queries";
import { FolderView } from "@/features/workspace/components/folder-view";

export default async function FolderPage({
  params,
  searchParams,
}: {
  params: Promise<{ workspaceId: string; folderId: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const ctx = await requireWorkspaceContext();
  const { folderId } = await params;
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);

  const folder = await getFolder(ctx.workspaceId, folderId);
  if (!folder) notFound();

  const { decks, totalPages } = await listDecks({ workspaceId: ctx.workspaceId, folderId, page });

  return (
    <FolderView
      workspaceId={ctx.workspaceId}
      folderId={folder.id}
      folderName={folder.name}
      decks={decks}
      page={page}
      totalPages={totalPages}
    />
  );
}
