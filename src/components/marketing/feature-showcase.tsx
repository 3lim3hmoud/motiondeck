import { BarChart3, Share2, Sparkles, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/motion-primitives";

const features = [
  {
    id: "feature-import",
    icon: Sparkles,
    title: "Smart Import",
    description:
      "MotionDeck parses DOCX, PDF, PPTX, plain text, URLs, and Notion pages — detecting headings, lists, and data automatically so nothing gets flattened into one wall of text.",
    accent: "bg-brand-50",
  },
  {
    id: "feature-motion",
    icon: Wand2,
    title: "Motion Design Engine",
    description:
      "Every scene gets purposeful, Apple-grade animation out of the box — entrances, emphasis, and transitions tuned by design principles, not random templates.",
    accent: "bg-success/10",
  },
  {
    id: "feature-data",
    icon: BarChart3,
    title: "Live Data Blocks",
    description:
      "Charts and tables stay connected to their source. Update the spreadsheet, and every deck referencing it updates too — no more stale screenshots.",
    accent: "bg-info/10",
  },
  {
    id: "feature-share",
    icon: Share2,
    title: "One-Click Share & Embed",
    description:
      "Publish a link, embed on your site, or export to PDF/MP4 — with password protection and expiration when you need control.",
    accent: "bg-warning/10",
  },
];

function FeatureShowcase() {
  return (
    <section className="bg-surface px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-24">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            id={feature.id}
            className={cn(
              "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
              i % 2 === 1 && "lg:[&>*:first-child]:order-2",
            )}
          >
            <FadeIn>
              <div className={cn("flex size-12 items-center justify-center rounded-xl mb-5", feature.accent)}>
                <feature.icon className="size-6 text-primary" />
              </div>
              <h3 className="mb-3 text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                {feature.title}
              </h3>
              <p className="text-lg text-secondary">{feature.description}</p>
            </FadeIn>
            <FadeIn index={1}>
              <div
                className={cn(
                  "aspect-[4/3] rounded-2xl border border-subtle shadow-lg",
                  feature.accent,
                )}
              />
            </FadeIn>
          </div>
        ))}
      </div>
    </section>
  );
}

export { FeatureShowcase };
