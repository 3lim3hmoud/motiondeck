import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/**
 * One component per role in the design system's type scale (§3). Using
 * <Heading level={1}> instead of raw <h1 className="text-5xl font-bold">
 * everywhere means a scale adjustment is a one-file change, and screen
 * readers still get correct heading semantics because `level` maps directly
 * to the rendered tag.
 */

const headingStyles: Record<number, string> = {
  1: "text-5xl font-bold tracking-tight leading-tight",
  2: "text-4xl font-bold tracking-tight leading-tight",
  3: "text-3xl font-semibold tracking-tight leading-snug",
  4: "text-2xl font-semibold leading-snug",
  5: "text-xl font-semibold leading-snug",
  6: "text-lg font-semibold leading-snug",
};

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  asChild?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : (`h${level}` as const);
    return (
      <Comp
        ref={ref}
        className={cn(headingStyles[level], "text-primary", className)}
        {...props}
      />
    );
  },
);
Heading.displayName = "Heading";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "xs" | "sm" | "md" | "base" | "lg";
  tone?: "primary" | "secondary" | "tertiary" | "disabled";
  weight?: "normal" | "medium" | "semibold";
  asChild?: boolean;
  as?: "p" | "span" | "div";
}

const toneClass: Record<NonNullable<TextProps["tone"]>, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  disabled: "text-disabled",
};

const weightClass: Record<NonNullable<TextProps["weight"]>, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
};

const sizeClass: Record<NonNullable<TextProps["size"]>, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  base: "text-base",
  lg: "text-lg",
};

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    { size = "base", tone = "primary", weight = "normal", asChild, as = "p", className, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : as;
    return (
      <Comp
        ref={ref}
        className={cn(sizeClass[size], toneClass[tone], weightClass[weight], className)}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

/** Small caps label — table headers, form section labels, overline eyebrows. */
const Eyebrow = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-xs font-semibold uppercase tracking-wide text-tertiary", className)}
      {...props}
    />
  ),
);
Eyebrow.displayName = "Eyebrow";

/** Monospace code / metric display — durations, keyboard shortcuts, IDs. */
const Code = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        "rounded-sm bg-muted px-1.5 py-0.5 font-mono text-sm text-primary",
        className,
      )}
      {...props}
    />
  ),
);
Code.displayName = "Code";

export { Heading, Text, Eyebrow, Code };
