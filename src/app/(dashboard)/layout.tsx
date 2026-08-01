import { Sidebar } from "@/components/layout/sidebar";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh bg-canvas">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar />
        <main id="main-content" className="flex-1 overflow-y-auto p-4 pb-20 sm:p-6 md:pb-6">{children}</main>
      </div>
      <MobileTabBar />
    </div>
  );
}
