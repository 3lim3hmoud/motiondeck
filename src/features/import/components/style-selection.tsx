"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const styles = [
  { id: "executive", name: "Executive", descriptor: "Clean, confident, boardroom-ready", tint: "bg-neutral-100" },
  { id: "editorial", name: "Editorial", descriptor: "Serif type, magazine-style layout", tint: "bg-brand-50" },
  { id: "playful", name: "Playful", descriptor: "Bold color, bouncy motion", tint: "bg-warning/15" },
  { id: "technical", name: "Technical", descriptor: "Monospace accents, precise grids", tint: "bg-info/10" },
  { id: "minimal", name: "Minimal", descriptor: "Maximum whitespace, one idea per scene", tint: "bg-surface" },
  { id: "bold", name: "Bold", descriptor: "Oversized type, high contrast", tint: "bg-danger/10" },
] as const;

type StyleId = (typeof styles)[number]["id"];

function StylePreview({ styleId, hovered }: { styleId: StyleId; hovered: boolean }) {
  // Each style gets a distinct "signature motion" on hover, per spec —
  // Editorial fades serif text from the left, Bold snaps in with a spring.
  if (styleId === "editorial") {
    return (
      <motion.div
        className="absolute inset-x-6 top-8 h-3 w-2/3 rounded-full bg-primary/70"
        initial={false}
        animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0.4, x: -12 }}
        transition={{ duration: 0.35, ease: [0, 0, 0.2, 1] }}
      />
    );
  }
  if (styleId === "bold") {
    return (
      <motion.div
        className="absolute inset-x-6 top-7 h-4 w-3/4 rounded-md bg-primary/80"
        initial={false}
        animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0.5 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      />
    );
  }
  return (
    <motion.div
      className="absolute inset-x-6 top-8 h-3 w-2/3 rounded-full bg-primary/60"
      initial={false}
      animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 4 }}
      transition={{ duration: 0.22 }}
    />
  );
}

function StyleSelection({ onContinue }: { onContinue: (styleId: StyleId) => void }) {
  const [selected, setSelected] = useState<StyleId>("executive");
  const [hoveredId, setHoveredId] = useState<StyleId | null>(null);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 pb-16">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold text-primary">Choose a look for your deck</h1>
        <p className="mt-2 text-lg text-secondary">
          These previews use your actual first scene — pick what feels right, you can change it later.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {styles.map((style) => {
          const isSelected = selected === style.id;
          return (
            <Card
              key={style.id}
              interactive
              onClick={() => setSelected(style.id)}
              onMouseEnter={() => setHoveredId(style.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "p-3 transition-transform",
                isSelected && "scale-[1.02] border-accent ring-1 ring-accent",
              )}
            >
              <div className={cn("relative aspect-[4/3] overflow-hidden rounded-lg", style.tint)}>
                <StylePreview styleId={style.id} hovered={hoveredId === style.id || isSelected} />
              </div>
              <div className="mt-3 flex items-center justify-between px-1">
                <div>
                  <p className="text-md font-medium text-primary">{style.name}</p>
                  <p className="text-sm text-tertiary">{style.descriptor}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <Button size="lg" onClick={() => onContinue(selected)}>
          Continue to Editor
        </Button>
      </div>
    </div>
  );
}

export { StyleSelection };
