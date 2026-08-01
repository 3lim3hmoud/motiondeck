"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bold, Italic, Palette, Sparkles, Underline } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { Separator } from "@/components/ui/separator";

function FloatingToolbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.15 }}
      className="absolute -top-12 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-lg border border-subtle bg-surface-raised p-1 shadow-md"
    >
      <IconButton aria-label="Bold" variant="ghost" size="sm"><Bold className="size-3.5" /></IconButton>
      <IconButton aria-label="Italic" variant="ghost" size="sm"><Italic className="size-3.5" /></IconButton>
      <IconButton aria-label="Underline" variant="ghost" size="sm"><Underline className="size-3.5" /></IconButton>
      <Separator orientation="vertical" className="mx-1 h-5" />
      <IconButton aria-label="Text color" variant="ghost" size="sm"><Palette className="size-3.5" /></IconButton>
      <Separator orientation="vertical" className="mx-1 h-5" />
      <IconButton aria-label="Animate this element" variant="ghost" size="sm">
        <Sparkles className="size-3.5 text-accent" />
      </IconButton>
    </motion.div>
  );
}

function Canvas() {
  const [selectedEl, setSelectedEl] = useState<string | null>(null);

  return (
    <div className="flex size-full items-center justify-center overflow-auto bg-canvas p-8">
      <div
        className="relative aspect-video w-full max-w-4xl rounded-lg border border-subtle bg-surface shadow-lg"
        onClick={() => setSelectedEl(null)}
      >
        <div className="flex size-full flex-col items-center justify-center gap-4 p-16">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEl("heading");
            }}
            className={`relative cursor-text rounded-md px-3 py-1.5 text-3xl font-bold text-primary transition-shadow ${
              selectedEl === "heading" ? "shadow-focus" : "hover:bg-surface-raised"
            }`}
          >
            <AnimatePresence>{selectedEl === "heading" && <FloatingToolbar />}</AnimatePresence>
            Our Approach
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEl("body");
            }}
            className={`relative max-w-lg cursor-text rounded-md px-3 py-1.5 text-center text-lg text-secondary transition-shadow ${
              selectedEl === "body" ? "shadow-focus" : "hover:bg-surface-raised"
            }`}
          >
            <AnimatePresence>{selectedEl === "body" && <FloatingToolbar />}</AnimatePresence>
            A three-phase rollout that reduces onboarding time by 40% while keeping every
            team member in the loop.
          </div>
        </div>
      </div>
    </div>
  );
}

export { Canvas };
