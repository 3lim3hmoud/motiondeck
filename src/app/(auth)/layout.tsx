import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-gradient-to-b from-brand-50 to-canvas px-4 py-12 dark:from-neutral-900 dark:to-canvas">
      <Link href={ROUTES.home} className="flex items-center gap-2 font-semibold text-primary">
        <span className="flex size-8 items-center justify-center rounded-md bg-accent text-white">
          <Sparkles className="size-4" />
        </span>
        <span className="text-lg">MotionDeck</span>
      </Link>
      {children}
    </div>
  );
}
