import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/motion-primitives";

function FinalCta() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <FadeIn className="mx-auto max-w-4xl rounded-2xl bg-accent px-8 py-16 text-center shadow-xl">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Your next presentation could build itself
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-white/80">
          Import a document right now and see your first animated deck in under a minute.
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            className="bg-white text-accent hover:bg-white/90 shadow-lg"
            asChild
          >
            <Link href={ROUTES.signup}>Start Free — No credit card required</Link>
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}

const footerColumns = [
  {
    title: "Product",
    links: ["AI Import", "Motion Engine", "Templates", "Pricing", "Changelog"],
  },
  {
    title: "Resources",
    links: ["Help Center", "Blog", "Guides", "API Docs"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security"],
  },
];

function MarketingFooter() {
  return (
    <footer className="border-t border-subtle bg-surface px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href={ROUTES.home} className="flex items-center gap-2 font-semibold text-primary">
              <span className="flex size-7 items-center justify-center rounded-md bg-accent text-white">
                <Sparkles className="size-4" />
              </span>
              MotionDeck
            </Link>
            <p className="mt-3 text-sm text-tertiary">
              Documents in. Animated presentations out.
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-sm font-semibold text-primary">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-secondary hover:text-primary">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-subtle pt-8 sm:flex-row">
          <p className="text-sm text-tertiary">© {new Date().getFullYear()} MotionDeck, Inc.</p>
          <div className="flex gap-4 text-sm text-tertiary">
            <Link href="#" className="hover:text-primary">Twitter</Link>
            <Link href="#" className="hover:text-primary">LinkedIn</Link>
            <Link href="#" className="hover:text-primary">GitHub</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { FinalCta, MarketingFooter };
