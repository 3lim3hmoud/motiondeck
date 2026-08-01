import type { Transition, Variants } from "framer-motion";

/**
 * Central motion vocabulary for MotionDeck.
 *
 * Design-system rule (§9 Motion Principles): duration scales with distance,
 * enter uses `decelerate`, exit uses `accelerate`, state changes use
 * `standard`, and `spring` is reserved for playful confirmations only.
 * Every animated component should import from here rather than inventing
 * one-off transition objects, so the whole app moves with one voice.
 *
 * Reduced motion: components using these variants should pair them with
 * `useReducedMotionSafe()` (src/hooks/use-reduced-motion.ts), which swaps
 * these for instant opacity-only cross-fades.
 */

const EASE = {
  standard: [0.4, 0, 0.2, 1],
  decelerate: [0, 0, 0.2, 1],
  accelerate: [0.4, 0, 1, 1],
  spring: [0.34, 1.56, 0.64, 1],
} as const;

const DURATION = {
  instant: 0.08,
  fast: 0.15,
  base: 0.22,
  slow: 0.36,
  slower: 0.52,
} as const;

export const transitions = {
  instant: { duration: DURATION.instant, ease: EASE.standard } satisfies Transition,
  fast: { duration: DURATION.fast, ease: EASE.standard } satisfies Transition,
  base: { duration: DURATION.base, ease: EASE.standard } satisfies Transition,
  enter: { duration: DURATION.base, ease: EASE.decelerate } satisfies Transition,
  exit: { duration: DURATION.fast, ease: EASE.accelerate } satisfies Transition,
  spring: { type: "spring", stiffness: 400, damping: 28 } satisfies Transition,
};

/** Card lift, dropdown reveal, generic content fade-in */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: transitions.enter },
  exit: { opacity: 0, y: 4, transition: transitions.exit },
};

/** Modal / dialog sheet — scales from 0.96 per §10 micro-interactions */
export const modalSheet: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transitions.enter },
  exit: { opacity: 0, scale: 0.98, transition: transitions.exit },
};

/** Backdrop for modals/overlays */
export const backdropFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/** Dropdown / popover — 4px collapse per §10 */
export const dropdownReveal: Variants = {
  hidden: { opacity: 0, y: -4, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: transitions.fast },
  exit: { opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.1 } },
};

/** Toast slide-in from edge */
export const toastSlide: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: transitions.enter },
  exit: { opacity: 0, x: 16, transition: transitions.exit },
};

/** Staggered list/grid children (deck cards, scene thumbnails) */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.02 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: transitions.enter },
};

/** Reduced-motion fallback: instant opacity-only cross-fade, per §11/§12 */
export const reducedMotionFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.05 } },
  exit: { opacity: 0, transition: { duration: 0.05 } },
};
