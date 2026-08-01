import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { prisma } from "@/server/db/client";
import { ROUTES } from "@/constants/routes";

export interface WorkspaceContext {
  userId: string;
  userName: string;
  userEmail: string;
  workspaceId: string;
  workspaceName: string;
  workspaceSlug: string;
  role: "owner" | "admin" | "editor" | "viewer";
}

/**
 * Resolves the signed-in user's session and their first workspace
 * membership (users currently belong to exactly one workspace, created at
 * signup — see registerUser). Redirects to login/onboarding if either is
 * missing. Call this at the top of every server component/action under
 * the (dashboard) route group instead of re-deriving it ad hoc.
 */
export async function requireWorkspaceContext(): Promise<WorkspaceContext> {
  const session = await auth();
  if (!session?.user?.id) {
    redirect(ROUTES.login);
  }

  const membership = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
    include: { workspace: true },
  });

  if (!membership) {
    redirect(ROUTES.onboarding);
  }

  return {
    userId: session.user.id,
    userName: session.user.name ?? session.user.email ?? "You",
    userEmail: session.user.email ?? "",
    workspaceId: membership.workspaceId,
    workspaceName: membership.workspace.name,
    workspaceSlug: membership.workspace.slug,
    role: membership.role,
  };
}
