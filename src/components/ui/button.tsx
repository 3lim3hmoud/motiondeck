"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium " +
    "transition-[background,color,box-shadow,transform] duration-150 ease-out " +
    "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45 " +
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white shadow-xs hover:bg-accent-hover " +
          "focus-visible:shadow-focus",
        secondary:
          "bg-surface text-primary border border-default shadow-xs " +
          "hover:bg-surface-raised focus-visible:shadow-focus",
        ghost:
          "bg-transparent text-secondary hover:bg-surface-raised " +
          "focus-visible:shadow-focus",
        destructive:
          "bg-danger text-white shadow-xs hover:bg-danger-600 " +
          "focus-visible:shadow-focus",
        link: "bg-transparent text-accent underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-7 rounded-sm px-2.5 text-sm [&_svg]:size-3.5",
        md: "h-9 rounded-md px-3.5 text-md [&_svg]:size-4",
        lg: "h-11 rounded-md px-[18px] text-lg font-semibold [&_svg]:size-[18px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Shows a spinner and locks the button's current width to prevent layout shift. */
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, disabled, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const widthRef = React.useRef<HTMLButtonElement | null>(null);
    const [lockedWidth, setLockedWidth] = React.useState<number>();

    React.useEffect(() => {
      if (loading && widthRef.current) {
        setLockedWidth(widthRef.current.offsetWidth);
      } else if (!loading) {
        setLockedWidth(undefined);
      }
    }, [loading]);

    return (
      <Comp
        ref={(node: HTMLButtonElement) => {
          widthRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(buttonVariants({ variant, size }), className)}
        style={lockedWidth ? { width: lockedWidth } : undefined}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? <Loader2 className="animate-spin" aria-hidden /> : children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
