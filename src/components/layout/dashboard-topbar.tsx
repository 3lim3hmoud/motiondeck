"use client";

import { useState } from "react";
import { ChevronDown, Plus, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { modKeyLabel } from "@/constants/shortcuts";

function DashboardTopbar() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-subtle bg-canvas px-4 sm:px-6">
      <button className="hidden items-center gap-1.5 rounded-md px-2 py-1.5 text-md font-medium text-primary hover:bg-surface-raised md:flex">
        Acme Inc
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
        <Button size="sm" className="hidden gap-1.5 sm:flex">
          <Plus className="size-3.5" />
          New Deck
        </Button>
        <ThemeToggle />
        <NotificationsMenu />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full focus-visible:outline-none focus-visible:shadow-focus">
              <Avatar size="sm">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Jamie Doe</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export { DashboardTopbar };
