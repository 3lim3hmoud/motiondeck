"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

export default function MarketingTemplate({ children }: { children: React.ReactNode }) {
  const variants = useReducedMotionSafe({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  });

  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      {children}
    </motion.div>
  );
}
