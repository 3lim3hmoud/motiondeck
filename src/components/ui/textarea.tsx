import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex min-h-20 w-full rounded-md border bg-surface px-3 py-2 text-md text-primary",
          "border-default placeholder:text-tertiary",
          "transition-[border-color,box-shadow] duration-150 ease-out",
          "focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-focus",
          "disabled:cursor-not-allowed disabled:opacity-45",
          invalid && "border-danger focus-visible:border-danger",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
