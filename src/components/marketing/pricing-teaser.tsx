import Link from "next/link";
import { Check } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/motion-primitives";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tiers = [
  {
    name: "Free",
    price: "$0",
    tagline: "Try the core experience",
    features: ["Up to 5 decks", "Core templates", "MotionDeck watermark"],
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$18",
    tagline: "For individuals who present often",
    features: ["Unlimited decks", "Remove watermark", "PDF & MP4 export", "AI rewrite & style suggestions"],
    cta: "Start Pro trial",
    featured: true,
  },
  {
    name: "Team",
    price: "$32",
    tagline: "Per seat — for teams presenting together",
    features: ["Everything in Pro", "Shared workspace & branding", "Roles & permissions", "Analytics"],
    cta: "Start Team trial",
    featured: false,
  },
];

function PricingTeaser() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Simple pricing that scales with you
          </h2>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-3">
          {tiers.map((tier, i) => (
            <FadeIn key={tier.name} index={i}>
              <Card
                className={cn(
                  "flex h-full flex-col",
                  tier.featured && "border-accent shadow-md ring-1 ring-accent/20",
                )}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CardTitle>{tier.name}</CardTitle>
                    {tier.featured && <Badge variant="accent">Most popular</Badge>}
                  </div>
                  <p className="text-sm text-secondary">{tier.tagline}</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="mb-6 text-4xl font-bold text-primary">
                    {tier.price}
                    <span className="text-md font-normal text-tertiary">/mo</span>
                  </p>
                  <ul className="space-y-2.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-md text-secondary">
                        <Check className="mt-0.5 size-4 shrink-0 text-success" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={tier.featured ? "primary" : "secondary"}
                    asChild
                  >
                    <Link href={ROUTES.signup}>{tier.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>
          ))}
        </div>

        <p className="mt-8 text-center text-md text-secondary">
          <Link href={ROUTES.pricing} className="font-medium text-accent hover:underline">
            Compare all plans and features →
          </Link>
        </p>
      </div>
    </section>
  );
}

export { PricingTeaser };
