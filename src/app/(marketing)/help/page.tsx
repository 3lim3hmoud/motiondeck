"use client";

import { useState } from "react";
import { BarChart3, MessageCircleQuestion, Search, Share2, Sparkles, Wand2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const categories = [
  { icon: Sparkles, title: "Getting started", count: 12 },
  { icon: Wand2, title: "AI features", count: 9 },
  { icon: Share2, title: "Sharing & export", count: 7 },
  { icon: BarChart3, title: "Analytics", count: 5 },
];

const faqs = [
  {
    q: "What file formats can I import?",
    a: "MotionDeck accepts DOCX, PDF, PPTX, plain text, pasted text, and web URLs. Notion pages can be imported via the Notion connector in Settings → Integrations.",
  },
  {
    q: "Can I turn off the MotionDeck watermark?",
    a: "The watermark appears on the Free plan. Upgrading to Pro or Team removes it from all decks in your workspace.",
  },
  {
    q: "How does live-linked data work?",
    a: "Connect a spreadsheet to a chart or table block, and any update to that spreadsheet automatically propagates to every deck referencing it — no re-export needed.",
  },
  {
    q: "Can viewers comment on a shared deck?",
    a: "Yes — set the share link's permission to \"Can comment\" in the Share panel, and viewers can leave scene-specific comments without needing an account.",
  },
];

export default function HelpCenterPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-primary sm:text-4xl">How can we help?</h1>
        <div className="relative mx-auto mt-6 max-w-lg">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-tertiary" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="h-11 pl-9"
          />
        </div>
      </div>

      <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((cat) => (
          <Card key={cat.title} interactive className="flex flex-col items-center gap-2 p-4 text-center">
            <cat.icon className="size-5 text-accent" />
            <p className="text-sm font-medium text-primary">{cat.title}</p>
            <p className="text-xs text-tertiary">{cat.count} articles</p>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-primary">Frequently asked</h2>
        <Accordion type="single" collapsible>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <Card className="mt-12 flex items-center gap-4 p-5">
        <div className="flex size-10 items-center justify-center rounded-full bg-accent/10 text-accent">
          <MessageCircleQuestion className="size-5" />
        </div>
        <div>
          <p className="text-md font-medium text-primary">Still stuck?</p>
          <p className="text-sm text-secondary">Our team typically replies within a few hours.</p>
        </div>
        <a href="mailto:support@motiondeck.app" className="ml-auto text-md font-medium text-accent hover:underline">
          Contact support
        </a>
      </Card>
    </div>
  );
}
