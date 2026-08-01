"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
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
import { Pagination } from "@/components/shared/pagination";
import { StaggerItem, StaggerList } from "@/components/motion/motion-primitives";
import { DeckCard, type DeckCardData } from "@/features/decks/components/deck-card";
import { NewDeckButton } from "@/features/decks/components/new-deck-button";
import { FolderDialog } from "@/features/workspace/components/folder-dialog";
import { renameFolder, trashFolder } from "@/features/workspace/services/actions";
import { ROUTES } from "@/constants/routes";

function FolderView({
  workspaceId,
  folderId,
  folderName,
  decks,
  page,
  totalPages,
}: {
  workspaceId: string;
  folderId: string;
  folderName: string;
  decks: DeckCardData[];
  page: number;
  totalPages: number;
}) {
  const router = useRouter();
  const [renameOpen, setRenameOpen] = useState(false);
  const [, startTransition] = useTransition();

  function handleRename(name: string) {
    startTransition(async () => {
      await renameFolder(folderId, name);
      router.refresh();
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await trashFolder(folderId);
      router.push(ROUTES.dashboard);
    });
  }

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb className="mb-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={ROUTES.dashboard}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{folderName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-primary">{folderName}</h1>
        <div className="flex items-center gap-2">
          <NewDeckButton size="sm" folderId={folderId} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm"><MoreHorizontal className="size-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setRenameOpen(true)}>Rename folder</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={handleDelete}>Delete folder</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {decks.length === 0 ? (
        <EmptyState title="This folder is empty" description="Create a deck in this folder to get started." />
      ) : (
        <>
          <StaggerList>
            <Grid cols={4} gap={5}>
              {decks.map((deck, i) => (
                <StaggerItem key={deck.id}>
                  <DeckCard deck={deck} index={i} />
                </StaggerItem>
              ))}
            </Grid>
          </StaggerList>
          <Pagination
            page={page}
            totalPages={totalPages}
            buildHref={(p) => `${ROUTES.folder(workspaceId, folderId)}${p > 1 ? `?page=${p}` : ""}`}
          />
        </>
      )}

      <FolderDialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
        initialName={folderName}
        onSubmit={handleRename}
      />
    </div>
  );
}

export { FolderView };
