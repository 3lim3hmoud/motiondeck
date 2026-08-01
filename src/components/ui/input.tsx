import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Puts the field in the error visual state (border/ring turn danger). */
  invalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", invalid, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex h-9 w-full rounded-md border bg-surface px-3 text-md text-primary",
          "border-default placeholder:text-tertiary",
          "transition-[border-color,box-shadow] duration-150 ease-out",
          "focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-focus",
          "disabled:cursor-not-allowed disabled:opacity-45",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          invalid && "border-danger focus-visible:border-danger",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
