import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges conditional class names (clsx) and then resolves conflicting
 * Tailwind utilities (tailwind-merge), e.g. cn("p-4", condition && "p-2")
 * correctly keeps only "p-2". Every component in /components and /features
 * should accept a `className` prop and pass it through this function
 * rather than string-concatenating classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
