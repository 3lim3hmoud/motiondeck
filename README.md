# MotionDeck

AI-powered web app that turns documents, PDFs, text, URLs, and presentations
into animated, interactive web presentations.

**Stack:** Next.js 15 (App Router, Turbopack) · React 19 · TypeScript (strict)
· Tailwind CSS v4 · shadcn/ui (Radix primitives) · Framer Motion · Prisma +
PostgreSQL · NextAuth v5 · TanStack Query · Zustand · UploadThing · OpenAI ·
Supabase (optional) · Stripe (optional) · deployed on Vercel.

---

## 1. Installation

**Requirements**

| Tool     | Version   |
| -------- | --------- |
| Node.js  | ≥ 20.11.0 (see `.nvmrc`) |
| npm      | 10+ (ships with Node 20) |
| Postgres | 14+ (local, Docker, or hosted — see §3) |

```bash
git clone https://github.com/<your-org>/motiondeck.git
cd motiondeck

# use the pinned Node version if you have nvm
nvm use

npm install
```

`npm install` will run `husky` via the `prepare` script to set up git hooks.
If you cloned without a `.git` folder yet, that step is a harmless no-op.

---

## 2. Environment variables

Copy the example file and fill in real values:

```bash
cp .env.example .env.local
```

`.env.local` is git-ignored and is the only file Next.js reads locally.
Never commit it. All variables are validated at boot time by
`src/config/env.ts` (Zod schema) — the app will refuse to start with a clear
error if a required variable is missing or malformed.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | ✅ | Public base URL, used for absolute links/redirects |
| `NODE_ENV` | — | `development` / `test` / `production` (defaults to `development`) |
| `DATABASE_URL` | ✅ | Pooled Postgres connection string (used at runtime) |
| `DIRECT_URL` | ✅ | Direct (non-pooled) Postgres connection string (used by Prisma migrations) |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | optional | Only if using Supabase instead of raw Postgres hosting |
| `SUPABASE_SERVICE_ROLE_KEY` | optional | Server-side Supabase admin key |
| `AUTH_SECRET` | ✅ | NextAuth v5 signing secret — generate with `openssl rand -base64 32` |
| `AUTH_URL` | ✅ | Canonical auth callback URL (same as app URL in most setups) |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | optional | Google OAuth provider |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | optional | GitHub OAuth provider |
| `UPLOADTHING_TOKEN` | ✅ | File upload provider (deck assets, avatars) |
| `OPENAI_API_KEY` | ✅ | AI generation (see §7) |
| `OPENAI_ORG_ID` | optional | OpenAI organization scoping |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | ✅ | Billing |
| `NEXT_PUBLIC_STRIPE_PRICE_*` | optional | Stripe price IDs for pricing page |
| `RESEND_API_KEY` / `EMAIL_FROM` | optional | Transactional email |
| `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST` | optional | Product analytics |
| `SENTRY_DSN` | optional | Error monitoring |

`✅` = the app throws at boot if missing. Fill placeholder values for any
`✅` variable you're not using yet (e.g. a dummy Stripe key) if you just want
the app to run locally without that feature working end-to-end.

---

## 3. Database setup

MotionDeck uses PostgreSQL. Pick one:

**Option A — Docker (fastest local setup)**

```bash
docker run --name motiondeck-db \
  -e POSTGRES_USER=motiondeck \
  -e POSTGRES_PASSWORD=motiondeck \
  -e POSTGRES_DB=motiondeck \
  -p 5432:5432 -d postgres:16
```

Then set:
```
DATABASE_URL="postgresql://motiondeck:motiondeck@localhost:5432/motiondeck"
DIRECT_URL="postgresql://motiondeck:motiondeck@localhost:5432/motiondeck"
```

**Option B — Supabase (hosted, free tier available)**

1. Create a project at [supabase.com](https://supabase.com).
2. Copy the pooled connection string into `DATABASE_URL` and the direct
   connection string into `DIRECT_URL` (Project Settings → Database).
3. Optionally set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   and `SUPABASE_SERVICE_ROLE_KEY` if you use Supabase client features
   directly (storage, realtime) beyond Postgres.

**Option C — Any managed Postgres** (Neon, Railway, RDS, etc.) — same idea:
a pooled URL for `DATABASE_URL`, a direct/non-pooled URL for `DIRECT_URL`.

---

## 4. Prisma setup

The schema lives at `prisma/schema.prisma`. It currently scaffolds the
NextAuth-required models (`User`, `Account`, `Session`, `VerificationToken`);
domain models (Workspace, Deck, Scene, etc.) are added incrementally.

```bash
# generate the Prisma Client (required after every schema change,
# and after a fresh `npm install`)
npm run db:generate

# push the current schema to your database (fast, no migration history —
# good for local dev)
npm run db:push

# OR, create a tracked migration (recommended once you're on a shared/
# production database)
npm run db:migrate

# inspect data visually
npm run db:studio

# seed data — add prisma/seed.ts first; this script expects one
npm run db:seed
```

`npm run db:seed` calls `tsx prisma/seed.ts`, which is not included in this
scaffold yet — create it before running that script.

---

## 5. Local development

```bash
npm run dev
```

Starts Next.js with Turbopack at `http://localhost:3000`. Fast Refresh is on
by default. If your DB isn't configured yet, boot will fail fast with a
readable error from `src/config/env.ts` rather than a runtime crash deep in
a request — that's intentional.

Other useful local commands:

```bash
npm run typecheck   # tsc --noEmit, strict mode
npm run lint         # eslint .
npm run lint:fix
npm run format       # prettier --write .
npm run test         # vitest run
npm run test:watch
```

---

## 6. Production deployment

**Vercel (recommended)**

1. Push this repo to GitHub.
2. Import the repo in Vercel → it auto-detects Next.js.
3. Add every `✅` environment variable from §2 in Project Settings →
   Environment Variables (Production + Preview).
4. Set the Build Command to `next build` (default) and make sure
   `prisma generate` runs before build — either:
   - add a `postinstall` script: `"postinstall": "prisma generate"`, or
   - rely on `@prisma/client`'s own postinstall hook (already triggers
     `prisma generate` automatically on `npm install` in most setups).
5. Point `DATABASE_URL` / `DIRECT_URL` at your production Postgres
   (Supabase, Neon, RDS, etc.) — use the **pooled** connection string for
   `DATABASE_URL` in serverless environments to avoid exhausting Postgres
   connections.
6. Deploy. Run `npx prisma migrate deploy` (via a Vercel deploy hook, CI
   step, or manually) to apply migrations to production — don't use
   `db:push` against production data.

**Self-hosted / other platforms**

```bash
npm run build
npm run start
```

`next start` serves the production build on port 3000 (override with
`PORT=xxxx npm run start`). Make sure `DATABASE_URL`, `AUTH_SECRET`,
`AUTH_URL`, and the rest of the `✅` variables in §2 are present in the
runtime environment.

---

## 7. AI provider configuration

MotionDeck's AI generation (`src/app/api/ai`, `src/features/ai`) uses the
OpenAI API.

1. Get an API key from [platform.openai.com](https://platform.openai.com/api-keys).
2. Set `OPENAI_API_KEY` in `.env.local` (and in your hosting provider's env
   settings for production).
3. `OPENAI_ORG_ID` is optional — only needed if your account belongs to
   multiple OpenAI organizations and you need to scope requests to one.

The OpenAI client is never imported in client components — all calls happen
in server-only code (route handlers / server actions) so the key never
reaches the browser bundle. If you swap providers, keep that same
server-only boundary.

---

## 8. Folder structure

```
src/
├── app/                     Next.js App Router — routing & layouts ONLY.
│   ├── (marketing)/         Landing, pricing, help — public, no auth.
│   ├── (auth)/              Login, signup, reset password, onboarding.
│   ├── (dashboard)/         Authenticated app shell: dashboard, workspace,
│   │                        folders, decks, settings, billing, analytics.
│   ├── (editor)/            Full-bleed editor shell (no dashboard chrome).
│   ├── (present)/           Fullscreen presentation-mode shell.
│   ├── (share)/             Public share-link viewer (/s/[shareToken]).
│   ├── (import)/            Document/URL import flow.
│   └── api/                 Route handlers: auth, decks, import, ai,
│                            upload, share, export, webhooks.
│
├── components/
│   ├── ui/                  shadcn/ui primitives (button, input, dialog...).
│   │                        Generated, low-level, no business logic.
│   ├── shared/               Composed, reusable, domain-agnostic pieces
│   │                        (EmptyState, PageHeader, Avatar stack...).
│   ├── layout/               App shell chrome: Sidebar, Navbar, CommandMenu.
│   └── motion/               Reusable animated primitives wrapping Framer
│                             Motion + the shared variants in src/animations.
│
├── features/                One folder per product capability, each with
│   ├── auth/                 its own components/ hooks/ services/ (and
│   ├── workspace/             store/ where local UI state warrants it).
│   ├── decks/                This is the "vertical slice" boundary — a
│   ├── import/                feature should be understandable and
│   ├── ai/                    deletable without spelunking elsewhere.
│   ├── editor/
│   └── sharing/
│
├── animations/               Shared Framer Motion variants/transitions.
├── config/                   Boot-time config, incl. validated env access.
├── constants/                Route table, static enums.
├── hooks/                    Cross-feature React hooks.
├── lib/                      Framework-agnostic utilities (cn, formatting).
├── server/                   Server-only code: db client, auth config.
├── services/                 External API clients (OpenAI, UploadThing...).
├── styles/                   Additional CSS beyond globals.css.
├── types/                    Shared TypeScript types.
└── app/globals.css           Tailwind v4 entry point + design tokens.

prisma/
└── schema.prisma             Database schema (Prisma ORM).

public/                       Static assets.
```

Reference docs also included in this repo: `DESIGN_SYSTEM.md`,
`COMPONENT_INVENTORY.md`, `ROUTE_MAP.md`, `FEATURES_CHECKLIST.md`,
`PRODUCTION_REVIEW.md`.

---

## 9. Available scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `npm run dev` | `next dev --turbopack` | Local dev server with Turbopack |
| `npm run build` | `next build` | Production build |
| `npm run start` | `next start` | Serve the production build |
| `npm run lint` | `eslint .` | Lint the codebase |
| `npm run lint:fix` | `eslint . --fix` | Lint and auto-fix |
| `npm run typecheck` | `tsc --noEmit` | Strict TypeScript check, no output |
| `npm run format` | `prettier --write .` | Format all files |
| `npm run db:generate` | `prisma generate` | Generate the Prisma Client |
| `npm run db:push` | `prisma db push` | Push schema to DB (no migration history) |
| `npm run db:migrate` | `prisma migrate dev` | Create + apply a tracked migration |
| `npm run db:studio` | `prisma studio` | Visual DB browser |
| `npm run db:seed` | `tsx prisma/seed.ts` | Seed the database (add `prisma/seed.ts` first) |
| `npm run test` | `vitest run` | Run tests once |
| `npm run test:watch` | `vitest` | Run tests in watch mode |

---

## Notes on this build

This project was audited and fixed for Next.js 15 + React 19 + Tailwind CSS
v4 compatibility:

- `tailwindcss-animate` (Tailwind v3-only JS plugin, incompatible with v4's
  CSS-first engine) was replaced with `tw-animate-css`.
- `usehooks-ts` was bumped to a version with a React 19 peer range.
- `tailwindcss` / `@tailwindcss/postcss` were pinned to a matched `4.3.3`
  (the initial `4.0.0` release has a scanner regression).
- `src/components/ui/button.tsx` was marked `"use client"` (it uses React
  hooks and was incorrectly being treated as a Server Component).
- A handful of strict-mode (`noUncheckedIndexedAccess`) TypeScript errors
  were fixed in the onboarding flow, the share viewer, and the version
  history sheet.

`npm install && npm run dev` and `npm run build` both complete with zero
errors as of this snapshot.
