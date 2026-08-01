"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  FolderPlus,
  Home,
  Settings,
  Share2,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { FolderDialog } from "@/features/workspace/components/folder-dialog";
import { NewDeckButton } from "@/features/decks/components/new-deck-button";
import { createFolder } from "@/features/workspace/services/actions";

const primaryNav = [
  { label: "Home", href: ROUTES.dashboard, icon: Home },
  { label: "Shared with me", href: "/shared", icon: Users },
  { label: "Activity", href: "/activity", icon: Activity },
  { label: "Analytics", href: ROUTES.analytics(), icon: BarChart3 },
];

interface SidebarFolder {
  id: string;
  name: string;
}

function Sidebar({
  workspaceId,
  workspaceName,
  folders,
}: {
  workspaceId: string;
  workspaceName: string;
  folders: SidebarFolder[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  const [, startTransition] = useTransition();

  function handleCreateFolder(name: string) {
    startTransition(async () => {
      await createFolder({ name });
      router.refresh();
    });
  }

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-subtle bg-surface md:flex">
      <div className="p-4">
        <Link href={ROUTES.home} className="mb-4 flex items-center gap-2 px-2 font-semibold text-primary">
          <span className="flex size-6 items-center justify-center rounded-md bg-accent text-white">
            <Sparkles className="size-3.5" />
          </span>
          <span className="truncate">{workspaceName}</span>
        </Link>
        <NewDeckButton size="md" className="w-full" />
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-4">
        <div className="space-y-0.5">
          {primaryNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-md font-medium transition-colors",
                  active ? "bg-accent/10 text-accent" : "text-secondary hover:bg-surface-raised hover:text-primary",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between px-2.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Folders</p>
            <button
              className="text-tertiary hover:text-primary"
              aria-label="Create folder"
              onClick={() => setCreateOpen(true)}
            >
              <FolderPlus className="size-3.5" />
            </button>
          </div>
          <div className="space-y-0.5">
            {folders.map((folder) => (
              <Link
                key={folder.id}
                href={ROUTES.folder(workspaceId, folder.id)}
                className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-md text-secondary hover:bg-surface-raised hover:text-primary"
              >
                <span className="size-4 rounded-sm bg-neutral-300" />
                {folder.name}
              </Link>
            ))}
            {folders.length === 0 && (
              <p className="px-2.5 py-1 text-sm text-tertiary">No folders yet</p>
            )}
          </div>
        </div>

        <div className="space-y-0.5">
          <Link href="/shared" className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-md text-secondary hover:bg-surface-raised hover:text-primary">
            <Share2 className="size-4" />
            Shared links
          </Link>
          <Link href="/trash" className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-md text-secondary hover:bg-surface-raised hover:text-primary">
            <Trash2 className="size-4" />
            Trash
          </Link>
        </div>
      </nav>

      <div className="border-t border-subtle p-3">
        <Link
          href={ROUTES.settings}
          className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-md text-secondary hover:bg-surface-raised hover:text-primary"
        >
          <Settings className="size-4" />
          Settings
        </Link>
      </div>

      <FolderDialog open={createOpen} onOpenChange={setCreateOpen} onSubmit={handleCreateFolder} />
    </aside>
  );
}

export { Sidebar };
