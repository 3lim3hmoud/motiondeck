import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Composable layout primitives so page code reaches for <Stack gap={4}>
 * instead of hand-writing `flex flex-col gap-4` (or worse, `gap-[17px]`)
 * over and over. `gap` values are keys into the 4px spacing scale from
 * globals.css, so a primitive can never produce an off-scale gap.
 */

type SpacingKey = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32;

const gapClass: Record<SpacingKey, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
  20: "gap-20",
  24: "gap-24",
  32: "gap-32",
};

/** Centered max-width page wrapper with responsive horizontal padding. */
const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { size?: "sm" | "md" | "lg" | "xl" | "full" }
>(({ className, size = "lg", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mx-auto w-full px-4 sm:px-6 lg:px-8",
      size === "sm" && "max-w-2xl",
      size === "md" && "max-w-4xl",
      size === "lg" && "max-w-6xl",
      size === "xl" && "max-w-7xl",
      size === "full" && "max-w-none",
      className,
    )}
    {...props}
  />
));
Container.displayName = "Container";

/** Vertical flex layout. */
const Stack = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { gap?: SpacingKey; align?: "start" | "center" | "end" | "stretch" }
>(({ className, gap = 4, align = "stretch", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col",
      gapClass[gap],
      align === "start" && "items-start",
      align === "center" && "items-center",
      align === "end" && "items-end",
      align === "stretch" && "items-stretch",
      className,
    )}
    {...props}
  />
));
Stack.displayName = "Stack";

/** Horizontal flex layout with wrap — button groups, tag lists, toolbars. */
const Cluster = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    gap?: SpacingKey;
    align?: "start" | "center" | "end";
    justify?: "start" | "center" | "end" | "between";
    wrap?: boolean;
  }
>(({ className, gap = 3, align = "center", justify = "start", wrap = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex",
      wrap && "flex-wrap",
      gapClass[gap],
      align === "start" && "items-start",
      align === "center" && "items-center",
      align === "end" && "items-end",
      justify === "start" && "justify-start",
      justify === "center" && "justify-center",
      justify === "end" && "justify-end",
      justify === "between" && "justify-between",
      className,
    )}
    {...props}
  />
));
Cluster.displayName = "Cluster";

/** Responsive CSS grid — deck grids, settings cards, pricing tiers. */
const Grid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { cols?: 1 | 2 | 3 | 4 | 6; gap?: SpacingKey }
>(({ className, cols = 3, gap = 4, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid grid-cols-1",
      cols >= 2 && "sm:grid-cols-2",
      cols >= 3 && "lg:grid-cols-3",
      cols >= 4 && "lg:grid-cols-4",
      cols >= 6 && "xl:grid-cols-6",
      gapClass[gap],
      className,
    )}
    {...props}
  />
));
Grid.displayName = "Grid";

export { Container, Stack, Cluster, Grid };
