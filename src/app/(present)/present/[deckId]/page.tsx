"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Grid2x2,
  Monitor,
  RotateCcw,
  X,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { IconButton } from "@/components/ui/icon-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePresentSync } from "@/features/editor/hooks/use-present-sync";

const scenes = ["Title", "The Problem", "Our Approach", "Results", "Next Steps"];

function useElapsedTimer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const reset = () => setSeconds(0);
  const formatted = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  return { formatted, reset };
}

export default function PresentPage({ params }: { params: Promise<{ deckId: string }> }) {
  const { deckId } = use(params);
  const router = useRouter();
  const [index, setIndex] = useState(2);
  const [blackout, setBlackout] = useState(false);
  const [scenePicker, setScenePicker] = useState(false);
  const { formatted, reset } = useElapsedTimer();
  const { broadcast } = usePresentSync(deckId, "presenter");

  useEffect(() => {
    broadcast({ sceneIndex: index, blackout });
  }, [index, blackout, broadcast]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, scenes.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
      if (e.key.toLowerCase() === "b") setBlackout((v) => !v);
      if (e.key === "Escape") router.push(ROUTES.editor(deckId));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [deckId, router]);

  return (
    <div className="grid h-dvh grid-cols-[1fr_320px] grid-rows-[1fr_auto] gap-3 bg-neutral-950 p-3">
      {/* Current slide — dominant, high contrast */}
      <div className="relative col-start-1 row-start-1 overflow-hidden rounded-xl bg-white shadow-2xl">
        <AnimatePresence>
          {blackout && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 bg-black"
            />
          )}
        </AnimatePresence>
        <div className="flex size-full items-center justify-center p-16">
          <h1 className="text-center text-4xl font-bold text-neutral-900">{scenes[index]}</h1>
        </div>

        <IconButton
          aria-label="Open Audience View in a new window"
          variant="ghost"
          className="absolute right-16 top-4 bg-white/80 text-neutral-700 hover:bg-white"
          onClick={() => window.open(`/present/${deckId}/audience`, "_blank", "noopener,width=1280,height=720")}
        >
          <ExternalLink />
        </IconButton>
        <IconButton
          aria-label="Exit presentation"
          variant="ghost"
          className="absolute right-4 top-4 bg-white/80 text-neutral-700 hover:bg-white"
          onClick={() => router.push(ROUTES.editor(deckId))}
        >
          <X />
        </IconButton>
      </div>

      {/* Right utility column: next slide + timer */}
      <div className="col-start-2 row-start-1 flex flex-col gap-3">
        <div className="rounded-lg bg-neutral-900 p-3">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">Next</p>
          <div className="flex aspect-video items-center justify-center rounded-md bg-neutral-800">
            <p className="text-sm text-neutral-400">
              {scenes[index + 1] ?? "End of deck"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-neutral-900 px-4 py-3">
          <span className="font-mono text-lg tabular-nums text-neutral-100">{formatted}</span>
          <IconButton aria-label="Restart timer" variant="ghost" size="sm" onClick={reset}>
            <RotateCcw className="size-3.5 text-neutral-400" />
          </IconButton>
        </div>

        <div className="flex-1 rounded-lg bg-neutral-900 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Speaker notes
          </p>
          <ScrollArea className="h-40">
            <p className="text-sm leading-relaxed text-neutral-300">
              Lead with the three-phase rollout timeline. Pause after "40% reduction" — let it
              land before moving to the next point.
            </p>
          </ScrollArea>
        </div>
      </div>

      {/* Bottom control bar */}
      <div className="col-span-2 row-start-2 flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5">
        <IconButton
          aria-label="Previous scene"
          variant="ghost"
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          className="text-neutral-300 hover:bg-neutral-800 hover:text-white"
        >
          <ChevronLeft />
        </IconButton>
        <span className="mx-2 text-sm tabular-nums text-neutral-400">
          {index + 1} / {scenes.length}
        </span>
        <IconButton
          aria-label="Next scene"
          variant="ghost"
          onClick={() => setIndex((i) => Math.min(i + 1, scenes.length - 1))}
          className="text-neutral-300 hover:bg-neutral-800 hover:text-white"
        >
          <ChevronRight />
        </IconButton>

        <div className="mx-3 h-5 w-px bg-neutral-700" />

        <IconButton
          aria-label="Scene picker"
          variant="ghost"
          onClick={() => setScenePicker((v) => !v)}
          className="text-neutral-300 hover:bg-neutral-800 hover:text-white"
        >
          <Grid2x2 className="size-4" />
        </IconButton>
        <IconButton
          aria-label="Toggle audience blackout"
          variant="ghost"
          onClick={() => setBlackout((v) => !v)}
          className="text-neutral-300 hover:bg-neutral-800 hover:text-white"
        >
          <Monitor className="size-4" />
        </IconButton>
      </div>

      <AnimatePresence>
        {scenePicker && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="absolute inset-x-0 bottom-16 z-20 mx-auto flex w-fit gap-2 rounded-lg bg-neutral-900 p-3 shadow-2xl"
          >
            {scenes.map((s, i) => (
              <button
                key={s}
                onClick={() => {
                  setIndex(i);
                  setScenePicker(false);
                }}
                className="flex h-14 w-20 flex-col items-center justify-center gap-1 rounded-md bg-neutral-800 text-xs text-neutral-300 hover:bg-neutral-700"
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
