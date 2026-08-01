"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { createDeck } from "@/features/decks/services/actions";
import { cn } from "@/lib/utils";

/** Creates a blank draft deck in the given folder (or workspace root) and navigates to the editor. */
function NewDeckButton({
  folderId = null,
  size = "md",
  className,
  label = "New Deck",
}: {
  folderId?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const result = await createDeck({ folderId });
      if (result.ok && result.deckId) {
        router.push(ROUTES.editor(result.deckId));
      }
    });
  }

  return (
    <Button size={size} className={cn("gap-1.5", className)} onClick={handleClick} disabled={isPending}>
      <Plus className="size-3.5" />
      {isPending ? "Creating…" : label}
    </Button>
  );
}

export { NewDeckButton };
