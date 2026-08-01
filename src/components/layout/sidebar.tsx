"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  FolderPlus,
  Home,
  Plus,
  Settings,
  Share2,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FolderDialog } from "@/features/workspace/components/folder-dialog";

const primaryNav = [
  { label: "Home", href: ROUTES.dashboard, icon: Home },
  { label: "Shared with me", href: "/shared", icon: Users },
  { label: "Activity", href: "/activity", icon: Activity },
  { label: "Analytics", href: ROUTES.analytics(), icon: BarChart3 },
];

const initialFolders = [
  { id: "f1", name: "Q3 Sales" },
  { id: "f2", name: "Onboarding" },
  { id: "f3", name: "Client Work" },
];

function Sidebar() {
  const pathname = usePathname();
  const [folders, setFolders] = useState(initialFolders);
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-subtle bg-surface md:flex">
      <div className="p-4">
        <Link href={ROUTES.home} className="mb-4 flex items-center gap-2 px-2 font-semibold text-primary">
          <span className="flex size-6 items-center justify-center rounded-md bg-accent text-white">
            <Sparkles className="size-3.5" />
          </span>
          MotionDeck
        </Link>
        <Button className="w-full gap-2" size="md">
          <Plus className="size-4" />
          New Deck
        </Button>
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
                href={ROUTES.folder("default", folder.id)}
                className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-md text-secondary hover:bg-surface-raised hover:text-primary"
              >
                <span className="size-4 rounded-sm bg-neutral-300" />
                {folder.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-0.5">
          <Link href="#" className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-md text-secondary hover:bg-surface-raised hover:text-primary">
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

      <FolderDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={(name) => setFolders((f) => [...f, { id: crypto.randomUUID(), name }])}
      />
    </aside>
  );
}

export { Sidebar };
