"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
} from "@/animations/variants";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

/**
 * Drop-in animated wrappers so feature code writes <FadeIn> instead of
 * re-declaring `initial/animate/variants` on a `motion.div` every time.
 * All three respect prefers-reduced-motion automatically via
 * useReducedMotionSafe.
 */

interface FadeInProps extends React.ComponentProps<typeof motion.div> {
  /** Optional stagger index — delays this item by `delay + index * 0.04s`. */
  index?: number;
}

const FadeIn = React.forwardRef<HTMLDivElement, FadeInProps>(
  ({ index = 0, style, ...props }, ref) => {
    const variants = useReducedMotionSafe(fadeUp);
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={variants}
        transition={{ delay: index * 0.04 }}
        style={style}
        {...props}
      />
    );
  },
);
FadeIn.displayName = "FadeIn";

/** Alias of FadeIn scoped for scroll-triggered marketing-page sections. */
const Reveal = FadeIn;

/** Wrap a list of children to stagger their entrance (deck grids, menus). */
const StaggerList = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof motion.div>>(
  ({ children, ...props }, ref) => {
    const variants = useReducedMotionSafe(staggerContainer);
    return (
      <motion.div ref={ref} initial="hidden" animate="visible" variants={variants} {...props}>
        {children}
      </motion.div>
    );
  },
);
StaggerList.displayName = "StaggerList";

/** Individual child of a <StaggerList> — must be a direct child to inherit stagger timing. */
const StaggerItem = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof motion.div>>(
  (props, ref) => {
    const variants = useReducedMotionSafe(staggerItem);
    return <motion.div ref={ref} variants={variants} {...props} />;
  },
);
StaggerItem.displayName = "StaggerItem";

export { FadeIn, Reveal, StaggerList, StaggerItem };
