"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { GlobalShortcuts } from "@/components/layout/global-shortcuts";
import { OfflineBanner } from "@/components/layout/offline-banner";

/**
 * Single composition root for every cross-cutting client concern.
 * Ordering matters: ThemeProvider must wrap everything that reads CSS
 * theme variables; QueryClientProvider must wrap anything using
 * TanStack Query hooks (which is most of the feature layer).
 *
 * One QueryClient instance per browser session — created inside
 * useState so it survives re-renders but is never shared across
 * requests on the server (avoiding cross-user cache leakage).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <SessionProvider>
      <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster position="bottom-right" closeButton />
          <GlobalShortcuts />
          <OfflineBanner />
          {process.env.NODE_ENV === "development" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
