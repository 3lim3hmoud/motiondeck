"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Grid } from "@/components/ui/layout";
import { StaggerItem, StaggerList } from "@/components/motion/motion-primitives";

const categories = ["All", "Business", "Sales", "Education", "Marketing", "Reports"];

const templates = [
  { name: "Pitch Deck", category: "Business", tint: "bg-brand-100" },
  { name: "Sales Proposal", category: "Sales", tint: "bg-success/15" },
  { name: "Product Update", category: "Business", tint: "bg-info/15" },
  { name: "Quarterly Report", category: "Reports", tint: "bg-warning/15" },
  { name: "Team Onboarding", category: "Business", tint: "bg-danger/10" },
  { name: "Case Study", category: "Marketing", tint: "bg-neutral-200" },
  { name: "Lecture Slides", category: "Education", tint: "bg-brand-50" },
  { name: "Campaign Recap", category: "Marketing", tint: "bg-success/10" },
  { name: "Sales Deck — SaaS", category: "Sales", tint: "bg-info/10" },
];

export default function TemplatesPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? templates : templates.filter((t) => t.category === active);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary sm:text-4xl">Start from a template</h1>
        <p className="mt-2 text-lg text-secondary">Every template ships with real motion, not just layout.</p>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              active === cat ? "bg-accent text-white" : "bg-muted text-secondary hover:text-primary",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <StaggerList key={active}>
        <Grid cols={3} gap={5}>
          {filtered.map((t) => (
            <StaggerItem key={t.name}>
              <div className="cursor-pointer">
                <div className={cn("aspect-[4/3] rounded-xl border border-subtle shadow-sm transition-shadow hover:shadow-md", t.tint)} />
                <p className="mt-3 text-md font-medium text-primary">{t.name}</p>
                <p className="text-sm text-tertiary">{t.category}</p>
              </div>
            </StaggerItem>
          ))}
        </Grid>
      </StaggerList>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <Button variant="secondary" onClick={() => setActive("All")}>Clear filters</Button>
        </div>
      )}
    </div>
  );
}
