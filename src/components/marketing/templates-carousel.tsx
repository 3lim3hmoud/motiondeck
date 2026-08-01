"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/motion-primitives";
import { Button } from "@/components/ui/button";

const templates = [
  { name: "Pitch Deck", tint: "bg-brand-100" },
  { name: "Sales Proposal", tint: "bg-success/15" },
  { name: "Product Update", tint: "bg-info/15" },
  { name: "Quarterly Report", tint: "bg-warning/15" },
  { name: "Team Onboarding", tint: "bg-danger/10" },
  { name: "Case Study", tint: "bg-neutral-200" },
];

function TemplateCard({ name, tint }: { name: string; tint: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-64 shrink-0 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`relative aspect-[4/3] overflow-hidden rounded-xl border border-subtle shadow-sm ${tint}`}>
        <motion.div
          className="absolute inset-4 rounded-lg bg-surface/70 shadow-sm"
          animate={hovered ? { y: -6, rotate: -1 } : { y: 0, rotate: 0 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.div
          className="absolute inset-x-8 bottom-6 h-2 rounded-full bg-surface/50"
          animate={hovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0.6, opacity: 0.6 }}
          style={{ transformOrigin: "left" }}
          transition={{ duration: 0.22 }}
        />
      </div>
      <p className="mt-3 text-md font-medium text-primary">{name}</p>
    </div>
  );
}

function TemplatesCarousel() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Start from a template
            </h2>
            <p className="mt-2 text-lg text-secondary">Hover to see the motion, not just a screenshot.</p>
          </div>
          <Button variant="ghost" className="hidden gap-1.5 sm:flex" asChild>
            <Link href="/templates">
              Browse all <ArrowRight className="size-4" />
            </Link>
          </Button>
        </FadeIn>

        <div className="flex gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]">
          {templates.map((t) => (
            <TemplateCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { TemplatesCarousel };
