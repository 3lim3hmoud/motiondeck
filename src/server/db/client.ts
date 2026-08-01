import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton — prevents exhausting Supabase's free-tier
 * connection limit from Next.js hot-reload creating a new client per
 * request in development.
 *
 * Supabase's transaction-mode pooler (port 6543) doesn't support prepared
 * statements, and serverless functions on Vercel each get their own cold
 * connection — without `connection_limit=1` this surfaces as intermittent
 * "prepared statement \"sN\" already exists" (Postgres 42P05) errors under
 * concurrent requests. `pgbouncer=true` is required too. Both are enforced
 * here at the connection-string level so a correctly/incorrectly configured
 * DATABASE_URL in Vercel's dashboard can't accidentally drop them.
 * https://supabase.com/docs/guides/troubleshooting/prisma-error-management-Cm5P_o
 */
function resolveDatabaseUrl(): string | undefined {
  const raw = process.env.DATABASE_URL;
  if (!raw) return raw;

  try {
    const url = new URL(raw);
    if (!url.searchParams.has("pgbouncer")) url.searchParams.set("pgbouncer", "true");
    if (!url.searchParams.has("connection_limit")) url.searchParams.set("connection_limit", "1");
    return url.toString();
  } catch {
    // Malformed URL — let Prisma surface its own clearer error at connect time.
    return raw;
  }
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    datasourceUrl: resolveDatabaseUrl(),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
