import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton — prevents exhausting Supabase's free-tier
 * connection limit from Next.js hot-reload creating a new client per
 * request in development.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
