import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center shrink-0 transition-[background,color,transform] " +
    "duration-150 ease-out active:scale-[0.94] disabled:pointer-events-none disabled:opacity-45 " +
    "focus-visible:shadow-focus [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-accent text-white shadow-xs hover:bg-accent-hover",
        secondary: "bg-surface text-primary border border-default hover:bg-surface-raised",
        ghost: "bg-transparent text-secondary hover:bg-surface-raised hover:text-primary",
        destructive: "bg-danger text-white hover:bg-danger-600",
      },
      size: {
        sm: "size-7 rounded-sm [&_svg]:size-3.5",
        md: "size-9 rounded-md [&_svg]:size-4",
        lg: "size-11 rounded-md [&_svg]:size-5",
      },
    },
    defaultVariants: { variant: "ghost", size: "md" },
  },
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  /** Required — icon-only buttons must always have an accessible name. */
  "aria-label": string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
