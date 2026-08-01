import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative flex gap-3 rounded-lg border p-4 text-md [&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:mt-0.5",
  {
    variants: {
      variant: {
        neutral: "border-subtle bg-surface text-primary [&>svg]:text-secondary",
        info: "border-info/30 bg-info/10 text-primary [&>svg]:text-info",
        success: "border-success/30 bg-success/10 text-primary [&>svg]:text-success",
        warning: "border-warning/30 bg-warning/10 text-primary [&>svg]:text-warning-600",
        danger: "border-danger/30 bg-danger/10 text-primary [&>svg]:text-danger",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

const defaultIcon = {
  neutral: Info,
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: AlertCircle,
} as const;

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Pass `false` to omit the leading status icon entirely. */
  icon?: boolean;
}

function Alert({ className, variant = "neutral", icon = true, children, ...props }: AlertProps) {
  const Icon = defaultIcon[variant ?? "neutral"];
  return (
    <div role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      {icon && <Icon aria-hidden />}
      <div className="flex-1 space-y-0.5">{children}</div>
    </div>
  );
}

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5 ref={ref} className={cn("font-medium leading-snug text-primary", className)} {...props} />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-secondary", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
