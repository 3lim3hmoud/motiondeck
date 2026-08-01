"use client";

import Link from "next/link";
import { Menu, Sparkles } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IconButton } from "@/components/ui/icon-button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const productLinks = [
  { label: "AI Import", href: "/#feature-import", desc: "Turn docs, PDFs & slides into decks" },
  { label: "Motion Engine", href: "/#feature-motion", desc: "Apple-grade animation, automatically" },
  { label: "Live Data Blocks", href: "/#feature-data", desc: "Charts that stay current" },
  { label: "Share & Embed", href: "/#feature-share", desc: "One link, any surface" },
];

function MarketingNavbar() {
  return (
    <header className="sticky top-0 z-sticky border-b border-subtle bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={ROUTES.home} className="flex items-center gap-2 font-semibold text-primary">
          <span className="flex size-7 items-center justify-center rounded-md bg-accent text-white">
            <Sparkles className="size-4" />
          </span>
          MotionDeck
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Product</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[420px] gap-1 p-3">
                  {productLinks.map((item) => (
                    <li key={item.label}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="block rounded-md p-3 transition-colors hover:bg-surface-raised"
                        >
                          <p className="text-md font-medium text-primary">{item.label}</p>
                          <p className="text-sm text-secondary">{item.desc}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/templates"
                  className="inline-flex h-9 items-center rounded-md px-3 text-md font-medium text-secondary transition-colors hover:bg-surface-raised hover:text-primary"
                >
                  Templates
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href={ROUTES.pricing}
                  className="inline-flex h-9 items-center rounded-md px-3 text-md font-medium text-secondary transition-colors hover:bg-surface-raised hover:text-primary"
                >
                  Pricing
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Button variant="ghost" size="md" asChild>
            <Link href={ROUTES.login}>Log in</Link>
          </Button>
          <Button size="md" asChild>
            <Link href={ROUTES.signup}>Start Free</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <IconButton aria-label="Open menu" variant="ghost">
                <Menu />
              </IconButton>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <nav className="flex flex-col gap-1 pt-8">
                {[...productLinks.map((p) => ({ label: p.label, href: p.href })), { label: "Templates", href: "/templates" }, { label: "Pricing", href: ROUTES.pricing }].map(
                  (item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="rounded-md px-3 py-2.5 text-md font-medium text-primary hover:bg-surface-raised"
                    >
                      {item.label}
                    </Link>
                  ),
                )}
                <div className="mt-4 flex flex-col gap-2 border-t border-subtle pt-4">
                  <Button variant="secondary" asChild>
                    <Link href={ROUTES.login}>Log in</Link>
                  </Button>
                  <Button asChild>
                    <Link href={ROUTES.signup}>Start Free</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export { MarketingNavbar };
