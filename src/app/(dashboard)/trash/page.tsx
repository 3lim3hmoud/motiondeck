"use client";

import { useState } from "react";
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

interface TrashedDeck {
  id: string;
  title: string;
  deletedAt: string;
  purgesIn: string;
}

const initialTrash: TrashedDeck[] = [
  { id: "20", title: "Old Investor Update", deletedAt: "2 days ago", purgesIn: "28 days" },
  { id: "21", title: "Draft — Untitled", deletedAt: "1 week ago", purgesIn: "23 days" },
];

export default function TrashPage() {
  const [trash, setTrash] = useState(initialTrash);
  const [pendingDelete, setPendingDelete] = useState<TrashedDeck | null>(null);

  function restore(id: string) {
    setTrash((t) => t.filter((d) => d.id !== id));
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    setTrash((t) => t.filter((d) => d.id !== pendingDelete.id));
    setPendingDelete(null);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-2xl font-semibold text-primary">Trash</h1>
      <p className="mb-6 text-md text-secondary">
        Items are permanently deleted 30 days after being moved to trash.
      </p>

      {trash.length === 0 ? (
        <EmptyState icon={<Trash2 />} title="Trash is empty" description="Deleted decks will appear here for 30 days." />
      ) : (
        <>
          <Alert variant="warning" className="mb-4">
            <AlertDescription>
              {trash.length} item{trash.length > 1 ? "s" : ""} will be permanently deleted soon.
            </AlertDescription>
          </Alert>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deck</TableHead>
                <TableHead>Deleted</TableHead>
                <TableHead>Purges in</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {trash.map((deck) => (
                <TableRow key={deck.id}>
                  <TableCell className="font-medium">{deck.title}</TableCell>
                  <TableCell className="text-secondary">{deck.deletedAt}</TableCell>
                  <TableCell className="text-tertiary">{deck.purgesIn}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1.5">
                      <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => restore(deck.id)}>
                        <RotateCcw className="size-3.5" />
                        Restore
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5 text-danger hover:bg-danger/10 hover:text-danger"
                        onClick={() => setPendingDelete(deck)}
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
              "{pendingDelete?.title}" will be permanently deleted. This cannot be undone.
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
