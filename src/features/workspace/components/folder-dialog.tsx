"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function FolderDialog({
  open,
  onOpenChange,
  initialName = "",
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initialName?: string;
  onSubmit: (name: string) => void;
}) {
  const [name, setName] = useState(initialName);
  const isRename = initialName.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{isRename ? "Rename folder" : "New folder"}</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="folder-name">Folder name</Label>
          <Input
            id="folder-name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && name.trim()) {
                onSubmit(name.trim());
                onOpenChange(false);
              }
            }}
            placeholder="e.g. Q4 Campaigns"
          />
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button
            disabled={!name.trim()}
            onClick={() => {
              onSubmit(name.trim());
              onOpenChange(false);
            }}
          >
            {isRename ? "Save" : "Create folder"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { FolderDialog };
