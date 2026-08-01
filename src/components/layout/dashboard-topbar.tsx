"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { NotificationsMenu } from "@/features/notifications/components/notifications-menu";
import { CommandPalette } from "@/components/layout/command-palette";
import { NewDeckButton } from "@/features/decks/components/new-deck-button";
import { modKeyLabel } from "@/constants/shortcuts";
import { ROUTES } from "@/constants/routes";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return (parts[0] ?? "").slice(0, 2).toUpperCase();
  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return (first + last).toUpperCase();
}

function DashboardTopbar({
  workspaceName,
  userName,
  userEmail,
}: {
  workspaceName: string;
  userName: string;
  userEmail: string;
}) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-subtle bg-canvas px-4 sm:px-6">
      <button className="hidden items-center gap-1.5 rounded-md px-2 py-1.5 text-md font-medium text-primary hover:bg-surface-raised md:flex">
        <span className="max-w-40 truncate">{workspaceName}</span>
        <ChevronDown className="size-3.5 text-tertiary" />
      </button>

      <button
        onClick={() => setPaletteOpen(true)}
        className="flex max-w-md flex-1 items-center gap-2 rounded-md border border-default bg-surface px-3 py-1.5 text-left text-md text-tertiary hover:border-strong"
      >
        <Search className="size-4 shrink-0" />
        <span className="flex-1 truncate">Search decks…</span>
        <kbd className="hidden shrink-0 rounded-sm border border-subtle bg-muted px-1.5 py-0.5 font-mono text-xs text-tertiary sm:block">
          {modKeyLabel()}K
        </kbd>
      </button>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden sm:flex">
          <NewDeckButton size="sm" />
        </div>
        <ThemeToggle />
        <NotificationsMenu />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full focus-visible:outline-none focus-visible:shadow-focus">
              <Avatar size="sm">
                <AvatarFallback>{initials(userName)}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="truncate">{userName || userEmail}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href={ROUTES.profile}>Profile</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href={ROUTES.billing}>Billing</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href={ROUTES.settings}>Settings</a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => signOut({ callbackUrl: ROUTES.login })}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export { DashboardTopbar };
