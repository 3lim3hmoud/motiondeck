"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const tiers = [
  { id: "free", name: "Free", monthly: 0, yearly: 0 },
  { id: "pro", name: "Pro", monthly: 18, yearly: 15 },
  { id: "team", name: "Team", monthly: 32, yearly: 27 },
];

const rows: { label: string; free: boolean | string; pro: boolean | string; team: boolean | string }[] = [
  { label: "Decks", free: "5", pro: "Unlimited", team: "Unlimited" },
  { label: "AI generations / mo", free: "20", pro: "500", team: "Unlimited" },
  { label: "Remove watermark", free: false, pro: true, team: true },
  { label: "PDF & MP4 export", free: false, pro: true, team: true },
  { label: "AI rewrite & style suggestions", free: false, pro: true, team: true },
  { label: "Shared workspace", free: false, pro: false, team: true },
  { label: "Roles & permissions", free: false, pro: false, team: true },
  { label: "Analytics", free: false, pro: "Basic", team: "Advanced" },
  { label: "Brand lock for members", free: false, pro: false, team: true },
];

const faqs = [
  { q: "Can I switch plans later?", a: "Yes — upgrade or downgrade anytime from Settings → Billing. Changes are prorated." },
  { q: "Is there a free trial for Pro or Team?", a: "Yes, both come with a 14-day free trial, no credit card required to start." },
  { q: "What happens to my decks if I downgrade?", a: "Your decks stay intact. Features exclusive to a higher tier (like MP4 export) simply become unavailable until you upgrade again." },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto size-4 text-success" />
    ) : (
      <Minus className="mx-auto size-4 text-tertiary" />
    );
  }
  return <span className="text-sm text-secondary">{value}</span>;
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(true);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary sm:text-4xl">Pricing that scales with you</h1>
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className={cn("text-sm", !yearly ? "text-primary" : "text-tertiary")}>Monthly</span>
          <Switch checked={yearly} onCheckedChange={setYearly} />
          <span className={cn("flex items-center gap-1.5 text-sm", yearly ? "text-primary" : "text-tertiary")}>
            Yearly <Badge variant="success">Save 15%</Badge>
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr>
              <th className="w-1/3" />
              {tiers.map((tier) => (
                <th key={tier.id} className="px-4 pb-6 text-center">
                  <p className="text-lg font-semibold text-primary">{tier.name}</p>
                  <p className="mt-1 text-3xl font-bold text-primary">
                    ${yearly ? tier.yearly : tier.monthly}
                    <span className="text-md font-normal text-tertiary">/mo</span>
                  </p>
                  <Button
                    size="sm"
                    variant={tier.id === "pro" ? "primary" : "secondary"}
                    className="mt-3 w-full"
                    asChild
                  >
                    <Link href={ROUTES.signup}>Start {tier.name}</Link>
                  </Button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={i % 2 === 0 ? "bg-surface" : ""}>
                <td className="rounded-l-md px-4 py-3 text-sm text-secondary">{row.label}</td>
                <td className="px-4 py-3 text-center"><Cell value={row.free} /></td>
                <td className="px-4 py-3 text-center"><Cell value={row.pro} /></td>
                <td className="rounded-r-md px-4 py-3 text-center"><Cell value={row.team} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-auto mt-16 max-w-2xl">
        <h2 className="mb-4 text-center text-2xl font-semibold text-primary">Questions</h2>
        <Accordion type="single" collapsible>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
