import { Laptop } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";

/**
 * Shown below `sm` instead of the editor shell. This is an honest UX
 * decision, not a missing feature: a Scene Navigator + Canvas + Design
 * Panel genuinely does not fit or function well at phone width. Viewing and
 * light comments/notes on mobile go through the share viewer / present
 * mode instead, which *are* built mobile-first.
 */
function DesktopOnlyNotice({ deckId }: { deckId: string }) {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-canvas px-6 text-center sm:hidden">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted text-tertiary">
        <Laptop className="size-7" />
      </div>
      <h1 className="text-xl font-semibold text-primary">Editing works best on a larger screen</h1>
      <p className="max-w-xs text-md text-secondary">
        Open this deck on a tablet or desktop to use the full editor. You can still present or review it here.
      </p>
      <div className="flex gap-3">
        <Button variant="secondary" asChild>
          <Link href={ROUTES.present(deckId)}>Present</Link>
        </Button>
        <Button asChild>
          <Link href={ROUTES.dashboard}>Back home</Link>
        </Button>
      </div>
    </div>
  );
}

export { DesktopOnlyNotice };
