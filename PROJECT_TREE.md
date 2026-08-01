# MotionDeck — Project Tree

```
motiondeck/
├── README.md                       Phase 1 architecture rationale
├── DESIGN_SYSTEM.md                Phase 2 token/component rationale
├── PRODUCTION_REVIEW.md            Honest status: what's real vs. mocked
├── FEATURES_CHECKLIST.md           Every requested feature, status-tagged
├── ROUTE_MAP.md                    Full route table
├── COMPONENT_INVENTORY.md          Every component, by layer
├── PROJECT_TREE.md                 This file
├── package.json / tsconfig.json / next.config.ts / postcss.config.mjs
├── eslint.config.mjs / .prettierrc.json / .env.example / .nvmrc
├── prisma/schema.prisma            NextAuth models only (Phase 1 scaffold)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              Root layout (fonts, skip link, Providers)
│   │   ├── providers.tsx           Theme/Query/Toast/Shortcuts/Offline
│   │   ├── globals.css             Design tokens — source of truth
│   │   ├── not-found.tsx           404
│   │   ├── global-error.tsx        500 / error boundary
│   │   │
│   │   ├── (marketing)/            Public site — own layout + page-fade template
│   │   │   ├── page.tsx                    Landing page
│   │   │   ├── pricing/page.tsx
│   │   │   ├── templates/page.tsx
│   │   │   └── help/page.tsx
│   │   │
│   │   ├── (auth)/                 Centered-card shell, no nav
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   ├── reset-password/page.tsx
│   │   │   └── onboarding/page.tsx
│   │   │
│   │   ├── (import)/               Full-screen import wizard
│   │   │   └── import/page.tsx
│   │   │
│   │   ├── (dashboard)/            Sidebar + topbar + mobile tab bar shell
│   │   │   ├── dashboard/page.tsx          Home — deck grid
│   │   │   ├── search/page.tsx
│   │   │   ├── shared/page.tsx
│   │   │   ├── activity/page.tsx
│   │   │   ├── trash/page.tsx
│   │   │   ├── notifications/page.tsx
│   │   │   ├── analytics/page.tsx
│   │   │   ├── billing/page.tsx
│   │   │   ├── workspace/[workspaceId]/folders/[folderId]/page.tsx
│   │   │   └── settings/                   Secondary left-nav sub-shell
│   │   │       ├── page.tsx                Profile
│   │   │       ├── security/page.tsx
│   │   │       ├── notifications/page.tsx
│   │   │       ├── workspace/page.tsx
│   │   │       ├── members/page.tsx
│   │   │       ├── branding/page.tsx
│   │   │       ├── integrations/page.tsx
│   │   │       └── data/page.tsx
│   │   │
│   │   ├── (editor)/               Full-bleed, no dashboard chrome
│   │   │   └── editor/[deckId]/page.tsx
│   │   │
│   │   ├── (present)/              Full-bleed, dark
│   │   │   └── present/[deckId]/
│   │   │       ├── page.tsx                Presenter view
│   │   │       └── audience/page.tsx       Audience view (BroadcastChannel-synced)
│   │   │
│   │   └── (share)/                Public, no auth
│   │       └── s/[shareToken]/page.tsx     Also serves as mobile deck viewer
│   │
│   ├── components/
│   │   ├── ui/                     44 design-system primitives
│   │   ├── shared/                 empty-state, error-state, loading-state
│   │   ├── layout/                 sidebar, topbar, tab-bar, command palette,
│   │   │                           shortcuts dialog, offline banner, theme toggle
│   │   ├── motion/                 FadeIn / Reveal / StaggerList primitives
│   │   └── marketing/              9 landing-page sections
│   │
│   ├── features/                   Vertical slices: auth, decks, editor,
│   │                               import, notifications, settings, sharing,
│   │                               workspace — each with components/ (+hooks/)
│   │
│   ├── animations/variants.ts      Shared Framer Motion variant library
│   ├── hooks/use-reduced-motion-safe.ts
│   ├── lib/                        utils.ts (cn), tokens.ts (JS token mirror)
│   ├── config/env.ts               Validated environment access (Zod)
│   ├── constants/                  routes.ts, shortcuts.ts
│   ├── types/domain.ts             Shared domain types
│   └── server/, services/, styles/ Reserved — populated in backend-wiring phase
│
└── public/
```

**127** `.ts`/`.tsx` files · **40** routes (pages/layouts/templates) · **44**
design-system primitives · **8** feature slices.
