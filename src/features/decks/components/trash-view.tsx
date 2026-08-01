"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, RotateCcw, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { relativeTime } from "@/lib/format";
import { restoreDeck, permanentlyDeleteDeck } from "@/features/decks/services/actions";
import { restoreFolder, permanentlyDeleteFolder } from "@/features/workspace/services/actions";

export interface TrashItem {
  id: string;
  name: string;
  deletedAt: Date | string;
  kind: "deck" | "folder";
}

function TrashView({ items }: { items: TrashItem[] }) {
  const router = useRouter();
  const [pendingDelete, setPendingDelete] = useState<TrashItem | null>(null);
  const [, startTransition] = useTransition();

  function restore(item: TrashItem) {
    startTransition(async () => {
      if (item.kind === "deck") await restoreDeck(item.id);
      else await restoreFolder(item.id);
      router.refresh();
    });
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    const item = pendingDelete;
    startTransition(async () => {
      if (item.kind === "deck") await permanentlyDeleteDeck(item.id);
      else await permanentlyDeleteFolder(item.id);
      router.refresh();
    });
    setPendingDelete(null);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-2xl font-semibold text-primary">Trash</h1>
      <p className="mb-6 text-md text-secondary">
        Deleted decks and folders stay here until you restore or permanently delete them.
      </p>

      {items.length === 0 ? (
        <EmptyState icon={<Trash2 />} title="Trash is empty" description="Deleted decks and folders will appear here." />
      ) : (
        <>
          <Alert variant="warning" className="mb-4">
            <AlertDescription>
              {items.length} item{items.length > 1 ? "s" : ""} in trash.
            </AlertDescription>
          </Alert>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Deleted</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={`${item.kind}-${item.id}`}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-secondary capitalize">{item.kind}</TableCell>
                  <TableCell className="text-tertiary">{relativeTime(item.deletedAt)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1.5">
                      <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => restore(item)}>
                        <RotateCcw className="size-3.5" />
                        Restore
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5 text-danger hover:bg-danger/10 hover:text-danger"
                        onClick={() => setPendingDelete(item)}
                      >
                        <Trash2 className="size-3.5" />
                        Delete forever
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}

      <Dialog open={!!pendingDelete} onOpenChange={(v) => !v && setPendingDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="size-5 text-danger" />
              Delete permanently?
            </DialogTitle>
            <DialogDescription>
              &ldquo;{pendingDelete?.name}&rdquo; will be permanently deleted. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setPendingDelete(null)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete forever</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { TrashView };
