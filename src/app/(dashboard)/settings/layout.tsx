"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  {
    group: "Account",
    items: [
      { label: "Profile", href: "/settings" },
      { label: "Security", href: "/settings/security" },
      { label: "Notifications", href: "/settings/notifications" },
    ],
  },
  {
    group: "Workspace",
    items: [
      { label: "General", href: "/settings/workspace" },
      { label: "Members & Roles", href: "/settings/members" },
      { label: "Branding", href: "/settings/branding" },
      { label: "Templates", href: "/settings/templates" },
    ],
  },
  {
    group: "Billing",
    items: [{ label: "Plan & Usage", href: "/billing" }],
  },
  {
    group: "Integrations",
    items: [{ label: "Connected apps", href: "/settings/integrations" }],
  },
  {
    group: "Data & Privacy",
    items: [
      { label: "Export data", href: "/settings/data" },
      { label: "Delete account", href: "/settings/data#delete" },
    ],
  },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex max-w-6xl gap-8">
      <nav className="w-52 shrink-0 space-y-6">
        <h1 className="px-2 text-xl font-semibold text-primary">Settings</h1>
        {nav.map((group) => (
          <div key={group.group}>
            <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-wide text-tertiary">
              {group.group}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded-md px-2.5 py-1.5 text-md transition-colors",
                      active ? "bg-accent/10 font-medium text-accent" : "text-secondary hover:bg-surface-raised hover:text-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="min-w-0 flex-1 pb-16">{children}</div>
    </div>
  );
}
