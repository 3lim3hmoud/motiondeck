export interface Shortcut {
  keys: string[];
  description: string;
}

export interface ShortcutGroup {
  group: string;
  shortcuts: Shortcut[];
}

/**
 * The single list every shortcut in the app is drawn from — the ⌘K palette,
 * the "?" Shortcuts dialog, and the hooks that actually bind `keydown`
 * listeners all read from here, so a key never drifts out of sync with its
 * documented meaning.
 */
export const shortcutGroups: ShortcutGroup[] = [
  {
    group: "General",
    shortcuts: [
      { keys: ["Mod", "K"], description: "Open command palette" },
      { keys: ["?"], description: "Show keyboard shortcuts" },
      { keys: ["Esc"], description: "Close dialog / deselect" },
    ],
  },
  {
    group: "Editor",
    shortcuts: [
      { keys: ["Mod", "Z"], description: "Undo" },
      { keys: ["Mod", "Shift", "Z"], description: "Redo" },
      { keys: ["Mod", "S"], description: "Force save" },
      { keys: ["Mod", "D"], description: "Duplicate scene" },
      { keys: ["Mod", "Enter"], description: "Enter Present mode" },
      { keys: ["N"], description: "New scene" },
      { keys: ["Delete"], description: "Delete selected scene" },
    ],
  },
  {
    group: "Present Mode",
    shortcuts: [
      { keys: ["→"], description: "Next scene" },
      { keys: ["←"], description: "Previous scene" },
      { keys: ["B"], description: "Blackout audience screen" },
      { keys: ["G"], description: "Open scene picker" },
      { keys: ["Esc"], description: "Exit to editor" },
    ],
  },
];

/** Renders as ⌘ on Mac, Ctrl elsewhere — resolved client-side only. */
export function modKeyLabel() {
  if (typeof navigator === "undefined") return "Ctrl";
  return /Mac|iPhone|iPad/.test(navigator.platform ?? navigator.userAgent) ? "⌘" : "Ctrl";
}
