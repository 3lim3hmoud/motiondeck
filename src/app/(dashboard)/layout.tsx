import { Sidebar } from "@/components/layout/sidebar";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { requireWorkspaceContext } from "@/server/workspace/context";
import { getFolders } from "@/features/workspace/services/queries";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const ctx = await requireWorkspaceContext();
  const folders = await getFolders(ctx.workspaceId);

  return (
    <div className="flex h-dvh bg-canvas">
      <Sidebar workspaceId={ctx.workspaceId} workspaceName={ctx.workspaceName} folders={folders} />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar workspaceName={ctx.workspaceName} userName={ctx.userName} userEmail={ctx.userEmail} />
        <main id="main-content" className="flex-1 overflow-y-auto p-4 pb-20 sm:p-6 md:pb-6">{children}</main>
      </div>
      <MobileTabBar />
    </div>
  );
}
