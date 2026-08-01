"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, MoreHorizontal, Share2, StickyNote } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";

const scenes = ["Title", "The Problem", "Our Approach", "Results", "Next Steps"];

export default function ShareViewerPage({ params }: { params: Promise<{ shareToken: string }> }) {
  const { shareToken } = use(params);
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [chromeVisible, setChromeVisible] = useState(true);
  const [notesVisible, setNotesVisible] = useState(false);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function resetChromeTimer() {
    setChromeVisible(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => setChromeVisible(false), 2000);
  }

  useEffect(() => {
    resetChromeTimer();
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function goNext() {
    setIndex((i) => Math.min(i + 1, scenes.length - 1));
    resetChromeTimer();
  }
  function goPrev() {
    setIndex((i) => Math.max(i - 1, 0));
    resetChromeTimer();
  }

  // Simple swipe detection
  const touchStartX = useRef(0);
  function onTouchStart(e: React.TouchEvent) {
    const touch = e.touches[0];
    if (!touch) return;
    touchStartX.current = touch.clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    const touch = e.changedTouches[0];
    if (!touch) return;
    const delta = touch.clientX - touchStartX.current;
    if (Math.abs(delta) < 50) return;
    if (delta < 0) goNext();
    else goPrev();
  }

  return (
    <div
      className="relative flex h-dvh w-full items-center justify-center bg-white"
      onMouseMove={resetChromeTimer}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onPointerDown={() => {
        const t = setTimeout(() => setNotesVisible(true), 500);
        window.addEventListener("pointerup", () => {
          clearTimeout(t);
          setNotesVisible(false);
        }, { once: true });
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          className="flex size-full items-center justify-center p-10"
        >
          <h1 className="text-center text-3xl font-bold text-neutral-900 sm:text-5xl">
            {scenes[index]}
          </h1>
        </motion.div>
      </AnimatePresence>

      {/* Auto-hiding chrome */}
      <AnimatePresence>
        {chromeVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/30 to-transparent p-3"
            >
              <IconButton
                aria-label="Back"
                variant="ghost"
                onClick={() => router.back()}
                className="bg-white/10 text-white hover:bg-white/20"
              >
                <ArrowLeft />
              </IconButton>
              <IconButton
                aria-label="More options"
                variant="ghost"
                className="bg-white/10 text-white hover:bg-white/20"
              >
                <MoreHorizontal />
              </IconButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-black/30 to-transparent p-4"
            >
              <div className="flex gap-1.5">
                {scenes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIndex(i);
                      resetChromeTimer();
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-5 bg-white" : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <p className="flex items-center gap-1.5 text-xs text-white/70">
                  <StickyNote className="size-3" />
                  Hold to view notes
                </p>
                <span className="text-white/40">·</span>
                <button className="flex items-center gap-1.5 text-xs text-white/70">
                  <Share2 className="size-3" />
                  Share
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Tap-hold speaker notes overlay */}
      <AnimatePresence>
        {notesVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-4 bottom-20 rounded-lg bg-black/80 p-4 text-sm text-white backdrop-blur-sm"
          >
            Lead with the three-phase rollout timeline — pause after "40% reduction."
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
