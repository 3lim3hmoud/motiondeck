"use client";

import { use, useState } from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/shared/empty-state";
import { Grid } from "@/components/ui/layout";
import { StaggerItem, StaggerList } from "@/components/motion/motion-primitives";
import { DeckCard } from "@/features/decks/components/deck-card";
import { FolderDialog } from "@/features/workspace/components/folder-dialog";
import { ROUTES } from "@/constants/routes";

const folderDecks = [
  { id: "30", title: "Sprint 14 Review", status: "ready" as const, updatedAt: "1d ago" },
  { id: "31", title: "Onboarding Checklist", status: "ready" as const, updatedAt: "4d ago" },
];

export default function FolderPage({
  params,
}: {
  params: Promise<{ workspaceId: string; folderId: string }>;
}) {
  const { folderId } = use(params);
  void folderId; // reserved for the data-fetching phase
  const [name, setName] = useState("Onboarding");
  const [renameOpen, setRenameOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb className="mb-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={ROUTES.dashboard}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-primary">{name}</h1>
        <div className="flex items-center gap-2">
          <Button size="sm" className="gap-1.5">
            <Plus className="size-3.5" />
            New Deck
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm"><MoreHorizontal className="size-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setRenameOpen(true)}>Rename folder</DropdownMenuItem>
              <DropdownMenuItem>Move folder</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Delete folder</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {folderDecks.length === 0 ? (
        <EmptyState title="This folder is empty" description="Move decks in, or create a new one here." />
      ) : (
        <StaggerList>
          <Grid cols={4} gap={5}>
            {folderDecks.map((deck, i) => (
              <StaggerItem key={deck.id}>
                <DeckCard deck={deck} index={i} />
              </StaggerItem>
            ))}
          </Grid>
        </StaggerList>
      )}

      <FolderDialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
        initialName={name}
        onSubmit={setName}
      />
    </div>
  );
}
