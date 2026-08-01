"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/server/db/client";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).optional(),
});

export type RegisterResult = { ok: true } | { ok: false; error: string };

/**
 * Credentials sign-up: creates the User + a first Workspace (owner
 * membership + free-tier Subscription row) in one transaction. The signup
 * page calls this, then calls `signIn("credentials", ...)` client-side to
 * establish the session.
 */
export async function registerUser(input: unknown): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Enter a valid email and an 8+ character password." };
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, error: "An account with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  const displayName = parsed.data.name ?? email.split("@")[0];
  const workspaceName = `${displayName}'s Workspace`;
  const slug = `${workspaceName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;

  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const user = await tx.user.create({
      data: { email, name: displayName, passwordHash },
    });

    const workspace = await tx.workspace.create({
      data: {
        name: workspaceName,
        slug,
        createdById: user.id,
        subscription: { create: { planTier: "free" } },
      },
    });

    await tx.workspaceMember.create({
      data: { userId: user.id, workspaceId: workspace.id, role: "owner" },
    });
  });

  return { ok: true };
}
