# MotionDeck Design System — Phase 2

Every primitive listed in the brief, implemented against the tokens in
`src/app/globals.css`, with light/dark support, WCAG 2.1 AA focus/contrast
handling, and `prefers-reduced-motion` respected everywhere Framer Motion is
used.

## Token implementation — how classes map to the spec

Tailwind v4 is CSS-first: `globals.css` *is* the token implementation, not a
config file referencing it. Three techniques are used, chosen per case:

1. **Real Tailwind colors** (`@theme`) for roles whose name doesn't collide
   with a utility prefix: `bg-canvas`, `bg-surface`, `bg-accent`, `bg-muted`.
2. **Explicit `@utility` rules** for roles that *would* stutter as colors
   (`text-primary`, `border-subtle`) — Tailwind v4 lets you hand-declare a
   utility's CSS directly, so the class name matches the spec exactly with
   no naming compromise.
3. **`@theme` scales** for spacing, radius, shadow, and the new `--animate-*`
   / custom `z-*` utilities (accordion keyframes, stacking order).

Light/dark resolution lives in exactly one place — the `:root` /
`[data-theme="dark"]` blocks — so every component only ever reads a semantic
variable and never branches on theme itself. A custom `@custom-variant dark`
binds Tailwind's `dark:` prefix to `[data-theme="dark"]` (next-themes'
attribute) instead of the OS media query, since theme here is a persisted,
user-toggleable choice, not just a system preference mirror.

Semantic state colors (`success`/`warning`/`danger`/`info`) are **theme-aware**
per the design doc's Semantic States table — dark mode uses the brighter tint
of each pair for contrast against the darker canvas, not a flat reuse of the
light-mode value.

## Component inventory

| Category | Components |
|---|---|
| Buttons | `Button` (primary/secondary/ghost/destructive/link × sm/md/lg, loading state with width-lock), `IconButton` |
| Form | `Input`, `Textarea`, `Select`, `Combobox`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`, `Label`, `Form` (React Hook Form + Zod wiring, a11y-wired via `aria-describedby`/`aria-invalid`) |
| Content | `Card`, `Badge`, `Avatar` + `AvatarStack`, `Alert` |
| Overlays | `Dialog`, `Sheet`, `Drawer` (Vaul), `Popover`, `Tooltip`, `DropdownMenu`, `ContextMenu`, `HoverCard`, `Command`/`CommandDialog` |
| Navigation | `NavigationMenu`, `Tabs`, `Accordion`, `Collapsible`, `Breadcrumb`, `Pagination` |
| Feedback | `Progress`, `Skeleton`, `Toaster` (themed Sonner) |
| Layout | `Separator`, `ScrollArea`, `Resizable*` (react-resizable-panels), `Container`/`Stack`/`Cluster`/`Grid` |
| Data | `Calendar` (react-day-picker), `DatePicker`, `Table`, `DataTable` (+ `DataTableColumnHeader`, TanStack Table) |
| States | `EmptyState`, `ErrorState`, `LoadingState` + `DeckGridSkeleton`/`TableRowsSkeleton` |
| Systems | `Typography` (`Heading`, `Text`, `Eyebrow`, `Code`), `Icon`, motion primitives (`FadeIn`/`Reveal`/`StaggerList`/`StaggerItem`), `ThemeToggle` |

## Accessibility notes baked into the primitives

- Every interactive primitive gets `focus-visible:shadow-focus` — a visible
  3px ring — never `outline-none` without a replacement.
- `IconButton` requires `aria-label` at the type level (TypeScript error if
  omitted), since an icon-only button with no accessible name fails WCAG 4.1.2.
- `Form` wires `aria-invalid` and `aria-describedby` automatically from React
  Hook Form's field state — no call site has to remember to do this by hand.
- Disabled states use `opacity-45` *and* `pointer-events-none`/`cursor-not-allowed`
  together, never opacity alone (which some screen readers/OS-level contrast
  modes will disregard).
- `Breadcrumb`'s current page uses `aria-current="page"`, not just a style.

## Motion notes

- Every Framer-Motion-backed primitive above (`FadeIn`, `StaggerList`, plus
  any feature code using `src/animations/variants.ts`) should be wrapped with
  `useReducedMotionSafe()` — already done inside the motion primitives file,
  so feature code gets this for free by using `<FadeIn>` instead of a raw
  `motion.div`.
- Radix-driven open/close animations (Dialog, DropdownMenu, Select, Sheet…)
  use `tailwindcss-animate`'s `data-[state=]` driven classes, which
  automatically no-op under the global `prefers-reduced-motion` rule in
  `globals.css`'s base layer.

## What's intentionally NOT in Phase 2

- Any page assembling these primitives into a real screen (Phase 3+).
- Feature-specific components (SceneNavigator, AnimationTimeline, etc.) —
  those live in `src/features/*` and are built alongside their owning phase.
