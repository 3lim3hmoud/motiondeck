"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FadeIn } from "@/components/motion/motion-primitives";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const useCases = {
  sales: {
    label: "Sales",
    quote:
      "Our win rate on proposals went up noticeably once decks stopped looking like static PDFs.",
    name: "Priya Shah",
    role: "VP Sales, Vantage",
    tint: "bg-brand-50",
  },
  education: {
    label: "Education",
    quote: "Students stay engaged through an entire lecture deck now instead of skimming ahead.",
    name: "Marcus Webb",
    role: "Lecturer, Northwind University",
    tint: "bg-info/10",
  },
  agencies: {
    label: "Agencies",
    quote: "We turn client research docs into a polished deliverable in under an hour.",
    name: "Elena Ruiz",
    role: "Creative Director, Loop Studio",
    tint: "bg-success/10",
  },
  internal: {
    label: "Internal Comms",
    quote: "Quarterly updates finally get read all the way through by the whole company.",
    name: "Devon Clarke",
    role: "Head of Comms, Fieldnote",
    tint: "bg-warning/10",
  },
} as const;

type UseCaseKey = keyof typeof useCases;

function UseCaseTabs() {
  const [active, setActive] = useState<UseCaseKey>("sales");
  const current = useCases[active];

  return (
    <section className="bg-surface px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Built for how your team actually presents
          </h2>
        </FadeIn>

        <Tabs value={active} onValueChange={(v) => setActive(v as UseCaseKey)}>
          <TabsList className="mx-auto mb-8 w-fit">
            {Object.entries(useCases).map(([key, uc]) => (
              <TabsTrigger key={key} value={key}>
                {uc.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid items-center gap-8 lg:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className={`aspect-[4/3] rounded-2xl border border-subtle shadow-lg ${current.tint}`}
            />
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="mb-6 text-xl font-medium leading-snug text-primary">
                “{current.quote}”
              </p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{current.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-md font-medium text-primary">{current.name}</p>
                  <p className="text-sm text-tertiary">{current.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export { UseCaseTabs };
