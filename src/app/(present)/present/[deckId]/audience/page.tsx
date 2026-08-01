"use client";

import { use } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePresentSync } from "@/features/editor/hooks/use-present-sync";

const scenes = ["Title", "The Problem", "Our Approach", "Results", "Next Steps"];

export default function AudienceViewPage({ params }: { params: Promise<{ deckId: string }> }) {
  const { deckId } = use(params);
  const { state } = usePresentSync(deckId, "audience");

  return (
    <div className="relative flex h-dvh w-full items-center justify-center bg-white">
      <AnimatePresence>
        {state.blackout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-black"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={state.sceneIndex}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          className="flex size-full items-center justify-center p-16"
        >
          <h1 className="text-center text-5xl font-bold text-neutral-900 lg:text-7xl">
            {scenes[state.sceneIndex]}
          </h1>
        </motion.div>
      </AnimatePresence>

      <p className="absolute bottom-4 right-6 text-xs text-neutral-300">
        Audience View — controlled from the presenter window
      </p>
    </div>
  );
}
