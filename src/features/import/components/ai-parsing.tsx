"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { GenerateDeckResult } from "@/services/gemini";

const logSteps = [
  "Reading document",
  "Detecting structure",
  "Identifying visual elements",
  "Drafting scene layout",
];

interface AiParsingProps {
  fileName: string;
  /**
   * Raw source text to send to the real Gemini-backed API. When present,
   * this component makes an actual /api/ai/generate call and reports the
   * real result via onComplete. When absent (file drop / URL import, which
   * don't have text-extraction wired up yet), it falls back to the
   * original timed mock animation so those flows keep working visually
   * until their own extraction step exists.
   */
  sourceText?: string;
  onComplete: (result: GenerateDeckResult | null) => void;
  onCancel: () => void;
}

/**
 * Fake spinners are banned wherever a real multi-step process exists (per
 * UX spec §Loading States) — so this renders an actual step-by-step log
 * with checkmarks landing in sequence, and each completed step "births" a
 * scene thumbnail in the visualization above, rather than a blank spinner.
 *
 * When `sourceText` is provided, the step log is paced visually while a
 * real request to /api/ai/generate runs in the background; the log will
 * not finish before the real response arrives (or fail cleanly if it
 * errors), so the animation never lies about what's actually happening.
 */
function AiParsing({ fileName, sourceText, onComplete, onCancel }: AiParsingProps) {
  const [completedSteps, setCompletedSteps] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<GenerateDeckResult | null>(null);
  const requestDoneRef = useRef(false);

  // Kick off the real API call once, in the background, when sourceText is
  // available.
  useEffect(() => {
    if (!sourceText) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/ai/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: sourceText }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ?? `Request failed with status ${res.status}`);
        }
        const data = (await res.json()) as GenerateDeckResult;
        if (cancelled) return;
        resultRef.current = data;
        requestDoneRef.current = true;
      } catch (err) {
        if (cancelled) return;
        requestDoneRef.current = true;
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sourceText]);

  // Step animation: paced for feel, but for the real (sourceText) path it
  // will not advance past the last step until the real request has
  // resolved — no fake "done" state while a real call is still in flight.
  useEffect(() => {
    if (error) return;

    if (completedSteps >= logSteps.length) {
      if (sourceText && !requestDoneRef.current) return; // wait for the real call
      const timeout = setTimeout(() => onComplete(resultRef.current), 400);
      return () => clearTimeout(timeout);
    }

    const isLastStep = completedSteps === logSteps.length - 1;
    if (isLastStep && sourceText && !requestDoneRef.current) return; // hold on last step

    const timeout = setTimeout(() => setCompletedSteps((s) => s + 1), 900);
    return () => clearTimeout(timeout);
  }, [completedSteps, error, onComplete, sourceText]);

  const progress = (completedSteps / logSteps.length) * 100;

  if (error) {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-4 px-4 pb-16 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-danger/10 text-danger">
          <AlertTriangle className="size-6" />
        </div>
        <h1 className="text-2xl font-semibold text-primary">Couldn’t structure “{fileName}”</h1>
        <p className="max-w-sm text-md text-secondary">{error}</p>
        <div className="mt-2 flex gap-2">
          <Button variant="ghost" onClick={onCancel}>
            Back
          </Button>
          <Button
            onClick={() => {
              setError(null);
              requestDoneRef.current = false;
              setCompletedSteps(0);
            }}
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }

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
