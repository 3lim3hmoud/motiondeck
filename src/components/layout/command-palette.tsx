"use client";

import { useRouter } from "next/navigation";
import {
  BarChart3,
  FileText,
  FolderOpen,
  Home,
  Moon,
  Plus,
  Search,
  Settings,
  Sparkles,
  Sun,
  Trash2,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
import { ROUTES } from "@/constants/routes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const recentDecks = [
  { id: "1", title: "Q3 Sales Review" },
  { id: "2", title: "Product Roadmap 2027" },
  { id: "4", title: "Marketing Brief — Fall Campaign" },
];

function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const router = useRouter();
  const { setTheme } = useTheme();

  function go(path: string) {
    router.push(path);
    onOpenChange(false);
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search decks, or jump to…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Recent decks">
          {recentDecks.map((deck) => (
            <CommandItem key={deck.id} onSelect={() => go(ROUTES.editor(deck.id))}>
              <FileText />
              {deck.title}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go(ROUTES.dashboard)}>
            <Home /> Home
            <CommandShortcut>G H</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => go("/shared")}>
            <Users /> Shared with me
          </CommandItem>
          <CommandItem onSelect={() => go(ROUTES.analytics())}>
            <BarChart3 /> Analytics
          </CommandItem>
          <CommandItem onSelect={() => go("/trash")}>
            <Trash2 /> Trash
          </CommandItem>
          <CommandItem onSelect={() => go(ROUTES.settings)}>
            <Settings /> Settings
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => go(ROUTES.deckImport)}>
            <Plus /> New deck from import
          </CommandItem>
          <CommandItem onSelect={() => go("/templates")}>
            <Sparkles /> Start from a template
          </CommandItem>
          <CommandItem onSelect={() => go("/search")}>
            <Search /> Search decks
          </CommandItem>
          <CommandItem>
            <FolderOpen /> New folder
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Appearance">
          <CommandItem onSelect={() => { setTheme("light"); onOpenChange(false); }}>
            <Sun /> Light theme
          </CommandItem>
          <CommandItem onSelect={() => { setTheme("dark"); onOpenChange(false); }}>
            <Moon /> Dark theme
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export { CommandPalette };
