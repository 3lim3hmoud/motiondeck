import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Icon system §5: five fixed sizes and a fixed set of tones, so no component
 * ever hand-picks an arbitrary icon pixel size or a raw color for an icon.
 * Usage: <Icon icon={Sparkles} size="md" tone="accent" />
 */

const sizeMap = {
  xs: "size-3.5",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8",
} as const;

const toneMap = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  accent: "text-accent",
  success: "text-success",
  warning: "text-warning-600",
  danger: "text-danger",
  inherit: "",
} as const;

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  icon: LucideIcon;
  size?: keyof typeof sizeMap;
  tone?: keyof typeof toneMap;
}

function Icon({ icon: LucideIconComponent, size = "md", tone = "inherit", className, ...props }: IconProps) {
  return (
    <LucideIconComponent
      aria-hidden
      className={cn(sizeMap[size], toneMap[tone], "shrink-0", className)}
      {...props}
    />
  );
}

export { Icon };
