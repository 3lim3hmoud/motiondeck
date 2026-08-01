import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  className?: string;
}

/**
 * The single empty-state pattern used across the dashboard: no decks yet, no
 * search results, empty folder, no comments, no analytics data. Consistency
 * here matters more than per-screen customization — same icon treatment,
 * same copy rhythm (title = what's missing, description = what to do).
 */
function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg px-6 py-16 text-center",
        className,
      )}
    >
      {icon && (
        <div className="flex size-12 items-center justify-center rounded-full bg-muted text-tertiary [&>svg]:size-6">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <p className="text-lg font-semibold text-primary">{title}</p>
        {description && <p className="max-w-sm text-md text-secondary">{description}</p>}
      </div>
      {(action || secondaryAction) && (
        <div className="mt-2 flex items-center gap-3">
          {secondaryAction && (
            <Button variant="secondary" size="sm" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
          {action && (
            <Button size="sm" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export { EmptyState };
