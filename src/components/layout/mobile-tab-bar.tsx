"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Home, Plus, Search, User } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Home", href: ROUTES.dashboard, icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "New", href: ROUTES.deckImport("default"), icon: Plus, isAction: true },
  { label: "Alerts", href: "/notifications", icon: Bell },
  { label: "Profile", href: ROUTES.profile, icon: User },
];

/**
 * Renders only below the `sm` breakpoint. Desktop uses the full Sidebar;
 * mobile is scoped to viewing/light-editing per the UX spec, so navigation
 * collapses to this five-tab bar instead of the 240px sidebar.
 */
function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-sticky flex items-center justify-around border-t border-subtle bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      {tabs.map((tab) => {
        const active = pathname === tab.href;

        if (tab.isAction) {
          return (
            <Link key={tab.label} href={tab.href} className="flex flex-col items-center gap-1 py-2">
              <span className="flex size-11 items-center justify-center rounded-full bg-accent text-white shadow-md">
                <tab.icon className="size-5" />
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-xs",
              active ? "text-accent" : "text-tertiary",
            )}
          >
            <tab.icon className="size-5" />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

export { MobileTabBar };
