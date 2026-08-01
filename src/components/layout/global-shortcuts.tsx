"use client";

import { useEffect, useState } from "react";
import { CommandPalette } from "@/components/layout/command-palette";
import { ShortcutsDialog } from "@/components/layout/shortcuts-dialog";

function isTypingTarget(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false;
  return el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable;
}

/**
 * Mounted once in the root layout so ⌘K / Ctrl+K and "?" work from any
 * screen without each page wiring its own listener. Ignores keystrokes
 * while the user is actively typing in a field (except the explicit
 * Mod+K combo, which should always work).
 */
function GlobalShortcuts() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;

      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }

      if (isTypingTarget(e.target)) return;

      if (e.key === "?") {
        e.preventDefault();
        setShortcutsOpen((v) => !v);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <ShortcutsDialog open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
    </>
  );
}

export { GlobalShortcuts };
