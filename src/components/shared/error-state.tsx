import * as React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

/**
 * Used for failed data fetches inline in a panel/card, and reused (larger,
 * centered on its own page) by app/error.tsx and app/(dashboard)/**\/error.tsx
 * boundaries. Keeping one component means a fix to copy/spacing/icon
 * propagates everywhere at once.
 */
function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg px-6 py-16 text-center",
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-danger/10 text-danger">
        <AlertTriangle className="size-6" />
      </div>
      <div className="space-y-1">
        <p className="text-lg font-semibold text-primary">{title}</p>
        <p className="max-w-sm text-md text-secondary">{description}</p>
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} className="mt-2 gap-2">
          <RefreshCw className="size-3.5" />
          Try again
        </Button>
      )}
    </div>
  );
}

export { ErrorState };
