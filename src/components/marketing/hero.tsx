"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { PlayCircle, Sparkles } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * The hero's before/after morph is the actual pitch (per UX spec §Landing
 * Page — "this animation IS the pitch"), so it's built as a real animated
 * component rather than a static screenshot or video embed: a document
 * silhouette literally reflows into styled, staggered deck blocks once it
 * scrolls into view. `useInView` (not autoplay-on-mount) matches the spec's
 * explicit "scroll-into-view trigger, not autoplay on load" requirement.
 */
function HeroMorph() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = inView;
  const t = (seconds: number) => (prefersReducedMotion ? 0 : seconds);

  const lines = [72, 94, 58, 88, 40];

  return (
    <div ref={ref} className="relative mx-auto aspect-[16/10] w-full max-w-2xl">
      {/* Document state — fades out as deck state fades in */}
      <motion.div
        className="absolute inset-0 rounded-xl border border-subtle bg-surface p-8 shadow-lg"
        animate={shouldAnimate ? { opacity: 0, scale: 0.94 } : { opacity: 1, scale: 1 }}
        transition={{ duration: t(0.6), delay: t(0.4), ease: [0.4, 0, 1, 1] }}
      >
        <div className="mb-6 h-3 w-24 rounded-full bg-neutral-300" />
        <div className="space-y-3">
          {lines.map((w, i) => (
            <div key={i} className="h-2.5 rounded-full bg-neutral-200" style={{ width: `${w}%` }} />
          ))}
        </div>
      </motion.div>

      {/* Deck state — staggered animated blocks */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3 p-2">
        {[
          { bg: "bg-accent", delay: 0 },
          { bg: "bg-success", delay: 0.08 },
          { bg: "bg-info", delay: 0.16 },
          { bg: "bg-warning", delay: 0.24 },
        ].map((block, i) => (
          <motion.div
            key={i}
            className={`rounded-lg ${block.bg} shadow-md`}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={
              shouldAnimate
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 24, scale: 0.9 }
            }
            transition={{ duration: t(0.52), delay: t(0.7 + block.delay), ease: [0, 0, 0.2, 1] }}
          >
            <div className="flex size-full flex-col justify-end p-4">
              <div className="h-2 w-2/3 rounded-full bg-white/70" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="absolute -right-4 -top-4 flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 shadow-md border border-subtle"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: t(0.3), delay: t(1.3) }}
      >
        <Sparkles className="size-3.5 text-accent" />
        <span className="text-xs font-medium text-primary">AI structured in 4s</span>
      </motion.div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col items-start gap-6">
          <Badge variant="accent">New — AI Style Suggestions</Badge>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Turn any document into a presentation people actually remember
          </h1>
          <p className="max-w-xl text-lg text-secondary">
            MotionDeck reads your docs, PDFs, and slides — then builds a beautiful,
            animated web presentation automatically. Refine it in minutes, not hours.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href={ROUTES.signup}>Start Free</Link>
            </Button>
            <Button size="lg" variant="secondary" className="gap-2">
              <PlayCircle className="size-[18px]" />
              Watch 60-sec demo
            </Button>
          </div>
          <p className="text-sm text-tertiary">No credit card required · Free forever plan</p>
        </div>

        <HeroMorph />
      </div>
    </section>
  );
}

export { Hero };
