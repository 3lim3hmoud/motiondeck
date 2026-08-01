"use client";

import { useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { reducedMotionFade } from "@/animations/variants";

/**
 * Returns the requested variants unless the user has
 * `prefers-reduced-motion: reduce` set, in which case it returns a
 * flat opacity-only cross-fade instead. Use this everywhere a
 * <motion.div variants={...}> would otherwise slide/scale/parallax.
 *
 * const variants = useReducedMotionSafe(modalSheet);
 * <motion.div variants={variants} initial="hidden" animate="visible" exit="exit" />
 */
export function useReducedMotionSafe(variants: Variants): Variants {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? reducedMotionFade : variants;
}
