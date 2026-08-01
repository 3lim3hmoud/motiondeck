# MotionDeck — Features Checklist

Legend: ✅ built (real UI/interaction) · 🟡 built, backend-dependent for full function · ⬜ not started

| Feature | Status | Notes |
|---|---|---|
| Present Mode (Audience View) | ✅ | `/present/[deckId]/audience`, synced via BroadcastChannel from Presenter |
| Presenter View | ✅ | Timer, next-slide preview, notes, scene picker, keyboard shortcuts |
| Share & Publish | ✅ | Link/Embed/Export tabs in `SharePanel` |
| Link Permissions | ✅ | Per-person invite list + role select, plus link-level view/comment/edit |
| Embed Generator | ✅ | Width/height/theme/autoplay options, live snippet |
| Export (PDF, MP4, HTML) | 🟡 | Real trigger → progress → download UI; actual rendering pipeline is backend |
| Analytics Dashboard | ✅ | Stat cards, drop-off chart w/ hover-scene preview, viewer table |
| Workspace Settings | ✅ | General, Branding (live preview), Members & Roles |
| Account Settings | ✅ | Profile, Security (2FA, sessions), Notifications prefs |
| Billing | 🟡 | Plan/usage/invoices UI; real Stripe integration is backend |
| Integrations | ✅ | Connected apps grid, API key display |
| Data & Privacy | ✅ | Export request, retention policy, delete-account confirm flow |
| Notifications Center | ✅ | Topbar dropdown + full `/notifications` page with tabs |
| Activity Feed | ✅ | `/activity` — timeline of workspace events |
| Shared With Me | ✅ | `/shared` |
| Trash | ✅ | `/trash` — restore / permanent delete with confirm dialog |
| Folder Management | ✅ | Create/rename dialog, folder detail page, breadcrumb |
| Search Experience | ✅ | `/search` page + topbar trigger |
| Command Palette (⌘K) | ✅ | Global, recent decks + navigate + actions + theme |
| Keyboard Shortcuts | ✅ | `?` opens reference dialog; Editor/Present bind real listeners |
| Version History | ✅ | Timeline sheet, preview pane, restore action |
| Comments System | ✅ | Threaded panel, resolve, reply, opened from editor bottom bar |
| Responsive Mobile Experience | ✅ | Dashboard, marketing, share viewer all mobile-first |
| Tablet Experience | ✅ | Sidebar/tab-bar breakpoint gap found and fixed (md:) |
| Offline State | ✅ | Global banner via `navigator.onLine` + online/offline events |
| Empty States | ✅ | Shared `EmptyState`, used on every list screen |
| Loading States | ✅ | Skeletons (deck grid, tables), real step-logs (AI Parsing) — no fake spinners |
| Error States | ✅ | Shared `ErrorState`, global 404/500 |
| Accessibility Audit | 🟡 | Manual pass done (see PRODUCTION_REVIEW.md); automated/screen-reader audit needs a deployed instance |
| Performance Optimizations | 🟡 | Package import optimization, route-based code splitting; no measured Lighthouse run |
| Motion Polish | ✅ | Single shared variant library, reduced-motion everywhere, page-fade template |
| Final Design QA | ✅ | Token-utility bugs found and fixed (see below) |
| Final Responsive QA | ✅ | Tablet nav gap found and fixed; Editor mobile gate added |
| Final Production Review | ✅ | `PRODUCTION_REVIEW.md` |

## Design QA fixes made during this pass
- `globals.css`: `success/warning/danger/info` were static (light-mode-only)
  aliases; made theme-aware per the design system's dark-mode table.
- `globals.css`: added missing `bg-muted` semantic role (badges/chips were
  using raw `neutral-100`, which breaks contrast in dark mode).
- `globals.css`: added the missing z-index scale and accordion keyframes.
- Fixed a broken `Button`/`SharePanel` composition in the editor topbar
  (`asChild` around a non-forwarding component tree).
