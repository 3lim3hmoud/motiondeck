import Link from "next/link";
import { X } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { IconButton } from "@/components/ui/icon-button";

export default function ImportFlowLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      <header className="flex h-16 shrink-0 items-center justify-end px-4 sm:px-6">
        <IconButton aria-label="Close import" variant="ghost" asChild>
          <Link href={ROUTES.dashboard}>
            <X />
          </Link>
        </IconButton>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
