# MotionDeck — Backend Setup (Supabase + Prisma + NextAuth)

This phase wires the app to a real Postgres database on Supabase's free
tier, via Prisma, with NextAuth v5 for authentication.

## What's wired

- **Prisma → Supabase Postgres**: `prisma/schema.prisma` has the full data
  model (NextAuth tables + Workspace, Folder, Deck, Scene, Animation,
  ShareLink, Comment, Notification, ActivityEvent, AnalyticsEvent, ApiKey,
  Job, Subscription).
- **Migration**: `prisma/migrations/20260801000000_init/` — applied
  automatically on every Vercel deploy via `prisma migrate deploy` (see
  `package.json` → `build` script).
- **Auth**: NextAuth v5, email/password (Credentials, bcrypt-hashed) is
  fully wired end-to-end — signup creates a `User` + a default `Workspace`
  (owner membership + free-tier `Subscription`), login authenticates
  against it. Google OAuth is configured but inactive until you add
  `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`.
- **Route protection**: `src/middleware.ts` guards `/dashboard`,
  `/workspace`, `/editor`, `/import`, `/settings`, `/billing`,
  `/notifications`, `/analytics`, `/activity`, `/shared`, `/trash`,
  `/search` — redirects signed-out users to `/auth/login`.
- **Storage**: `src/server/storage/supabase.ts` — server-only helper for
  Supabase Storage (deck thumbnails, exports). Not called anywhere yet;
  ready for the Editor/Export phase.

## What's still UI-only (by design, out of this phase's scope)

The dashboard, editor, analytics, billing, etc. screens were built with
static/mock content and currently make **zero** API calls — so none of
this backend work could break them. Wiring each screen to real Prisma
queries (decks list, folder tree, analytics charts, etc.) is the natural
next phase, now that the schema and auth exist to build on.

## One-time manual steps (things no CLI/agent can do for you)

### 1. Create two Supabase Storage buckets (~1 min)
Supabase dashboard → **Storage** → **New bucket**:
- `deck-thumbnails` — Public bucket
- `deck-exports` — Public bucket

Free tier includes 1GB storage / 2GB bandwidth per month — plenty for
early usage.

### 2. Get your Supabase API keys
Project Settings → **API**:
- `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (server-only, never
  exposed to the browser — keep this secret)

### 3. Set environment variables in Vercel
Vercel project → **Settings → Environment Variables**. Add for
Production (and Preview if you want PR previews to work):

| Key | Value |
|---|---|
| `DATABASE_URL` | `postgresql://postgres.dltxqmbbbkfrsvdphiaf:<PASSWORD>@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true` |
| `DIRECT_URL` | `postgresql://postgres.dltxqmbbbkfrsvdphiaf:<PASSWORD>@aws-0-eu-west-1.pooler.supabase.com:5432/postgres` |
| `NEXT_PUBLIC_APP_URL` | your production URL, e.g. `https://motiondeck.vercel.app` |
| `AUTH_URL` | same as `NEXT_PUBLIC_APP_URL` |
| `AUTH_SECRET` | generate your own: `openssl rand -base64 32` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://dltxqmbbbkfrsvdphiaf.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | from step 2 |
| `SUPABASE_SERVICE_ROLE_KEY` | from step 2 |

Leave `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `UPLOADTHING_TOKEN`,
`OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` unset — the
app boots fine without them (those integrations are simply inactive until
you're ready to wire that phase).

**Never reuse the `AUTH_SECRET` from a local `.env.local` file in
production** — generate a fresh one for Vercel.

### 4. Redeploy
Trigger a new Vercel deploy (push already does this automatically). The
build runs `prisma migrate deploy` before `next build`, which creates all
tables on your Supabase database on first deploy.

## Verifying it works after deploy

1. Visit `/auth/signup`, create an account with email + password.
2. You should land on `/auth/onboarding`, then reach `/dashboard` —
   confirms `User` + `Workspace` + `Subscription` rows were created.
3. In Supabase → **Table Editor**, check the `User` and `Workspace`
   tables — your new row should be there.
4. Log out, log back in at `/auth/login` with the same credentials.
5. Try visiting `/dashboard` in an incognito window (signed out) — it
   should redirect to `/auth/login`.
