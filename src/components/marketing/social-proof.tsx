import { FadeIn } from "@/components/motion/motion-primitives";

const logos = ["Northwind", "Vantage", "Loop Studio", "Basecamp Labs", "Fieldnote", "Rally"];

function SocialProof() {
  return (
    <section className="border-y border-subtle bg-surface px-4 py-10 sm:px-6 lg:px-8">
      <FadeIn className="mx-auto max-w-7xl">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wide text-tertiary">
          Trusted by teams who present for a living
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 grayscale opacity-60">
          {logos.map((logo) => (
            <span key={logo} className="text-lg font-semibold text-secondary">
              {logo}
            </span>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

export { SocialProof };
