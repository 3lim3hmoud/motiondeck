import { Edit3, FilePlus, FolderPlus, MoveRight, RotateCcw, Trash2, type LucideIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { EmptyState } from "@/components/shared/empty-state";
import { relativeTime } from "@/lib/format";
import { requireWorkspaceContext } from "@/server/workspace/context";
import { getRecentActivity } from "@/features/workspace/services/queries";

const ICONS: Record<string, LucideIcon> = {
  "deck.created": FilePlus,
  "deck.renamed": Edit3,
  "deck.moved": MoveRight,
  "deck.duplicated": FilePlus,
  "deck.trashed": Trash2,
  "deck.restored": RotateCcw,
  "folder.created": FolderPlus,
  "folder.renamed": Edit3,
  "folder.trashed": Trash2,
  "folder.restored": RotateCcw,
  "workspace.renamed": Edit3,
};

function describe(type: string, metadata: unknown): string {
  const meta = (metadata ?? {}) as Record<string, unknown>;
  switch (type) {
    case "deck.created":
      return `created "${meta.title ?? "a deck"}"`;
    case "deck.renamed":
      return `renamed "${meta.from ?? ""}" to "${meta.to ?? ""}"`;
    case "deck.moved":
      return "moved a deck";
    case "deck.duplicated":
      return "duplicated a deck";
    case "deck.trashed":
      return `moved "${meta.title ?? "a deck"}" to trash`;
    case "deck.restored":
      return `restored "${meta.title ?? "a deck"}" from trash`;
    case "folder.created":
      return `created folder "${meta.name ?? ""}"`;
    case "folder.renamed":
      return `renamed folder "${meta.from ?? ""}" to "${meta.to ?? ""}"`;
    case "folder.trashed":
      return `moved folder "${meta.name ?? ""}" to trash`;
    case "folder.restored":
      return `restored folder "${meta.name ?? ""}" from trash`;
    case "workspace.renamed":
      return `renamed the workspace to "${meta.to ?? ""}"`;
    default:
      return type;
  }
}

export default async function ActivityFeedPage() {
  const ctx = await requireWorkspaceContext();
  const activity = await getRecentActivity(ctx.workspaceId);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-primary">Activity</h1>

      {activity.length === 0 ? (
        <EmptyState title="No activity yet" description="Actions you take on decks and folders will show up here." />
      ) : (
        <div className="relative space-y-6 border-l border-subtle pl-6">
          {activity.map((item) => {
            const Icon = ICONS[item.type] ?? Edit3;
            const actorName = item.actor.name ?? item.actor.email;
            return (
              <div key={item.id} className="relative">
                <div className="absolute -left-[31px] flex size-6 items-center justify-center rounded-full border border-subtle bg-surface">
                  <Icon className="size-3 text-tertiary" />
                </div>
                <div className="flex items-start gap-2.5">
                  <Avatar size="sm"><AvatarFallback>{actorName[0]?.toUpperCase()}</AvatarFallback></Avatar>
                  <div>
                    <p className="text-md text-primary">
                      <span className="font-medium">{actorName}</span>{" "}
                      <span className="text-secondary">{describe(item.type, item.metadata)}</span>
                    </p>
                    <p className="text-sm text-tertiary">{relativeTime(item.createdAt)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
