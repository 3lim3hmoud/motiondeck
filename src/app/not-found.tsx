import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-canvas px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted text-tertiary">
        <FileQuestion className="size-7" />
      </div>
      <h1 className="text-3xl font-bold text-primary">Page not found</h1>
      <p className="max-w-sm text-md text-secondary">
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <div className="mt-2 flex gap-3">
        <Button variant="secondary" asChild>
          <Link href={ROUTES.help}>Visit Help Center</Link>
        </Button>
        <Button asChild>
          <Link href={ROUTES.home}>Go home</Link>
        </Button>
      </div>
    </div>
  );
}
