import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

/** Full-panel centered spinner — use for page-level Suspense fallbacks. */
function LoadingState({ label, className }: { label?: string; className?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("flex flex-col items-center justify-center gap-3 py-16 text-tertiary", className)}
    >
      <Loader2 className="size-6 animate-spin" />
      {label && <p className="text-sm">{label}</p>}
    </div>
  );
}

/** Skeleton grid matching the deck-card layout — dashboard/folder initial load. */
function DeckGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="aspect-video w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}

/** Skeleton rows matching the Table layout — settings/billing/analytics lists. */
function TableRowsSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          {Array.from({ length: columns }).map((_, j) => (
            <Skeleton key={j} className={cn("h-4", j === 0 ? "w-1/4" : "w-1/6")} />
          ))}
        </div>
      ))}
    </div>
  );
}

export { LoadingState, DeckGridSkeleton, TableRowsSkeleton };
