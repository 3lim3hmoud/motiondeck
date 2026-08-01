"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

/**
 * Themed wrapper so Sonner's toasts pick up MotionDeck's tokens instead of
 * its own default palette. Mounted once in src/app/providers.tsx — reach for
 * `toast()` / `toast.success()` / `toast.error()` from "sonner" anywhere.
 */
function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-surface-raised text-primary border border-subtle shadow-lg rounded-lg",
          description: "text-secondary",
          actionButton: "bg-accent text-white rounded-md",
          cancelButton: "bg-muted text-secondary rounded-md",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
