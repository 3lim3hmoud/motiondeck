import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-xs font-medium leading-none w-fit",
  {
    variants: {
      variant: {
        neutral: "bg-muted text-secondary",
        accent: "bg-accent/10 text-accent",
        success: "bg-success/10 text-success-600",
        warning: "bg-warning/10 text-warning-600",
        danger: "bg-danger/10 text-danger-600",
        outline: "border border-default text-secondary",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
