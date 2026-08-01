"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { shortcutGroups, modKeyLabel } from "@/constants/shortcuts";

function Kbd({ children }: { children: string }) {
  const label = children === "Mod" ? modKeyLabel() : children;
  return (
    <kbd className="flex min-w-6 items-center justify-center rounded-sm border border-subtle bg-muted px-1.5 py-0.5 font-mono text-xs text-secondary">
      {label}
    </kbd>
  );
}

function ShortcutsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
        </DialogHeader>
        <div className="max-h-96 space-y-6 overflow-y-auto">
          {shortcutGroups.map((group) => (
            <div key={group.group}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-tertiary">
                {group.group}
              </p>
              <div className="space-y-1.5">
                {group.shortcuts.map((s) => (
                  <div key={s.description} className="flex items-center justify-between text-md">
                    <span className="text-secondary">{s.description}</span>
                    <div className="flex gap-1">
                      {s.keys.map((k, i) => (
                        <Kbd key={i}>{k}</Kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { ShortcutsDialog };
