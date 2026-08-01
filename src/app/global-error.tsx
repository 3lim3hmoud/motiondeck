"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/shared/error-state";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Report to Sentry/observability once wired (src/config/env.ts SENTRY_DSN).
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col items-center justify-center bg-canvas px-6">
        <ErrorState
          title="Something broke on our end"
          description="Our team has been notified. Try again, or head back home."
          onRetry={reset}
        />
        <Button variant="ghost" asChild>
          <Link href={ROUTES.home}>Go home</Link>
        </Button>
      </body>
    </html>
  );
}
