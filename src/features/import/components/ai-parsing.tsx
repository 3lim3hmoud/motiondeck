"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const logSteps = [
  "Reading document",
  "Detecting structure",
  "Identifying visual elements",
  "Drafting scene layout",
];

interface AiParsingProps {
  fileName: string;
  onComplete: () => void;
  onCancel: () => void;
}

/**
 * Fake spinners are banned wherever a real multi-step process exists (per
 * UX spec §Loading States) — so this renders an actual step-by-step log
 * with checkmarks landing in sequence, and each completed step "births" a
 * scene thumbnail in the visualization above, rather than a blank spinner.
 */
function AiParsing({ fileName, onComplete, onCancel }: AiParsingProps) {
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    if (completedSteps >= logSteps.length) {
      const timeout = setTimeout(onComplete, 500);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => setCompletedSteps((s) => s + 1), 900);
    return () => clearTimeout(timeout);
  }, [completedSteps, onComplete]);

  const progress = (completedSteps / logSteps.length) * 100;

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-10 px-4 pb-16">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-primary">Structuring “{fileName}”</h1>
        <p className="mt-1 text-md text-secondary">This usually takes about 10 seconds.</p>
      </div>

      <div className="flex gap-3">
        {Array.from({ length: 6 }).map((_, i) => {
          const born = i < completedSteps * 1.5;
          return (
            <motion.div
              key={i}
              className="h-16 w-11 rounded-md border border-subtle bg-surface shadow-sm"
              initial={{ opacity: 0, scale: 0.6, y: 12 }}
              animate={born ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 12 }}
              transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
            />
          );
        })}
      </div>

      <div className="w-full space-y-3">
        <Progress value={progress} />
        <ul className="space-y-2">
          {logSteps.map((step, i) => {
            const done = i < completedSteps;
            const active = i === completedSteps;
            return (
              <li key={step} className="flex items-center gap-2.5 text-md">
                <span className="flex size-5 items-center justify-center">
                  <AnimatePresence mode="wait" initial={false}>
                    {done ? (
                      <motion.span
                        key="done"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex size-5 items-center justify-center rounded-full bg-success text-white"
                      >
                        <Check className="size-3" strokeWidth={3} />
                      </motion.span>
                    ) : active ? (
                      <Loader2 className="size-4 animate-spin text-accent" />
                    ) : (
                      <span className="size-1.5 rounded-full bg-neutral-300" />
                    )}
                  </AnimatePresence>
                </span>
                <span className={done ? "text-secondary" : active ? "text-primary" : "text-tertiary"}>
                  {step}
                  {active && "…"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <Button variant="ghost" size="sm" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
}

export { AiParsing };
