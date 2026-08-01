# MotionDeck — Component Inventory

127 `.tsx`/`.ts` component and hook files. Organized by layer, matching the
folder structure defined in Phase 1's `README.md`.

## `src/components/ui/` — Design System primitives (44)
accordion · alert · avatar · badge · breadcrumb · button · calendar · card ·
checkbox · collapsible · combobox · command · context-menu · data-table ·
date-picker · dialog · drawer · dropdown-menu · form · hover-card · icon ·
icon-button · input · label · layout (Container/Stack/Cluster/Grid) ·
navigation-menu · pagination · popover · progress · radio-group · resizable ·
scroll-area · select · separator · sheet · skeleton · slider · sonner
(Toaster) · switch · table · tabs · textarea · tooltip · typography
(Heading/Text/Eyebrow/Code)

## `src/components/shared/` — Cross-feature UI states (3)
`empty-state` · `error-state` · `loading-state` (+ `DeckGridSkeleton`,
`TableRowsSkeleton`)

## `src/components/layout/` — App chrome (8)
`sidebar` · `dashboard-topbar` · `mobile-tab-bar` · `theme-toggle` ·
`command-palette` · `shortcuts-dialog` · `global-shortcuts` (mounts both) ·
`offline-banner`

## `src/components/motion/` — Animation primitives (1)
`motion-primitives` → `FadeIn`, `Reveal`, `StaggerList`, `StaggerItem`

## `src/components/marketing/` — Landing site sections (9)
`navbar` · `hero` (incl. `HeroMorph`) · `social-proof` · `how-it-works` ·
`feature-showcase` · `templates-carousel` · `use-case-tabs` ·
`pricing-teaser` · `footer-and-cta` (`FinalCta` + `MarketingFooter`)

## `src/features/*` — Vertical feature slices (16)
| Feature | Components |
|---|---|
| `auth` | `password-strength-meter`, `sso-buttons` |
| `decks` | `deck-card` |
| `editor` | `editor-topbar`, `scene-navigator`, `canvas`, `design-panel`, `bottom-bar`, `speaker-notes-drawer`, `comments-panel`, `version-history-sheet`, `desktop-only-notice`, hook `use-present-sync` |
| `import` | `source-selection`, `ai-parsing`, `style-selection` |
| `notifications` | `notifications-menu` |
| `settings` | `settings-field` |
| `sharing` | `share-panel` (Link/Embed/Export tabs, `PeopleWithAccess`, `ExportRow`) |
| `workspace` | `folder-dialog` |

## Supporting non-component modules
- `src/animations/variants.ts` — shared Framer Motion variant library
- `src/lib/tokens.ts` — JS mirror of design tokens (charts/canvas)
- `src/lib/utils.ts` — `cn()`
- `src/constants/routes.ts` — typed route table
- `src/constants/shortcuts.ts` — shortcut registry (source of truth for ⌘K/`?`)
- `src/hooks/use-reduced-motion-safe.ts`
- `src/config/env.ts` — validated environment access
- `src/types/domain.ts` — shared domain types
