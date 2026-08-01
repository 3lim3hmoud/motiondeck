import { requireWorkspaceContext } from "@/server/workspace/context";
import { listTrash } from "@/features/decks/services/queries";
import { TrashView, type TrashItem } from "@/features/decks/components/trash-view";

export default async function TrashPage() {
  const ctx = await requireWorkspaceContext();
  const trash = await listTrash(ctx.workspaceId);

  const items: TrashItem[] = trash.map((t) =>
    t.kind === "deck"
      ? { id: t.id, name: t.title, deletedAt: t.deletedAt, kind: "deck" }
      : { id: t.id, name: t.name, deletedAt: t.deletedAt, kind: "folder" },
  );

  return <TrashView items={items} />;
}
