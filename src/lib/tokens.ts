/**
 * Design tokens as plain JS values, for the handful of consumers that can't
 * read a CSS variable: Recharts series colors, canvas/SVG export rendering,
 * PDF export styling. Every UI component should still use CSS
 * variables/utility classes (bg-canvas, text-primary, etc.) — reach for this
 * file only when you need a raw value in JS/TS logic.
 *
 * These values are hand-kept in sync with src/app/globals.css. If you change
 * a color there, mirror it here.
 */

export const colorTokens = {
  brand: {
    50: "#F0F5FF",
    100: "#DCE7FF",
    200: "#B9CFFF",
    300: "#8FADFF",
    400: "#6690FF",
    500: "#3D6BFF",
    600: "#2951E6",
    700: "#1E3EB8",
    800: "#162C8A",
    900: "#0F1F5C",
  },
  neutral: {
    0: "#FFFFFF",
    50: "#FAFAFB",
    100: "#F4F4F6",
    200: "#E7E7EB",
    300: "#D4D4DA",
    400: "#A8A8B3",
    500: "#7D7D8A",
    600: "#5C5C68",
    700: "#3F3F49",
    800: "#26262E",
    900: "#17171C",
    950: "#0B0B0E",
  },
  success: { 500: "#1FAA59", 600: "#178A47" },
  warning: { 500: "#E6A417", 600: "#C4890E" },
  danger: { 500: "#E5484D", 600: "#CC3A3F" },
  info: { 500: "#3D9EFF", 600: "#2B82D9" },
} as const;

/** Categorical chart series order — design system §7.7. */
export const chartPalette = [
  colorTokens.brand[500],
  colorTokens.success[500],
  colorTokens.warning[500],
  colorTokens.info[500],
  colorTokens.danger[500],
  colorTokens.neutral[400],
  colorTokens.neutral[600],
] as const;

export const spacingTokens = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
} as const;

export const radiusTokens = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 20,
  full: 9999,
} as const;

export const durationTokens = {
  instant: 80,
  fast: 150,
  base: 220,
  slow: 360,
  slower: 520,
} as const;
