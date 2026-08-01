"use client";

import { motion } from "framer-motion";
import { FileText, Sparkles, Wand2 } from "lucide-react";
import { FadeIn } from "@/components/motion/motion-primitives";

const steps = [
  {
    icon: FileText,
    title: "Import",
    description: "Drop in a doc, PDF, slide deck, or paste a URL. No formatting required.",
  },
  {
    icon: Sparkles,
    title: "AI Structures",
    description: "MotionDeck reads the content, finds the narrative, and drafts scenes automatically.",
  },
  {
    icon: Wand2,
    title: "You Refine & Present",
    description: "Adjust styling, animation, and pacing — then share a link or present live.",
  },
];

function HowItWorks() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            From document to deck in three steps
          </h2>
        </FadeIn>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <FadeIn key={step.title} index={i} className="relative flex flex-col items-start gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <step.icon className="size-6" />
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-tertiary">
                  Step {i + 1}
                </p>
                <h3 className="mb-2 text-xl font-semibold text-primary">{step.title}</h3>
                <p className="text-md text-secondary">{step.description}</p>
              </div>
              <motion.div
                className="mt-2 h-1.5 w-full rounded-full bg-accent/15"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0, 0, 0.2, 1] }}
                style={{ transformOrigin: "left" }}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export { HowItWorks };
