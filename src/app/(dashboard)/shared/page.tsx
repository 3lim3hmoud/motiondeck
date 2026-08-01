"use client";

import { Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Grid } from "@/components/ui/layout";
import { StaggerItem, StaggerList } from "@/components/motion/motion-primitives";
import { DeckCard } from "@/features/decks/components/deck-card";

const sharedDecks = [
  { id: "10", title: "Fieldnote — All Hands Q3", status: "ready" as const, updatedAt: "3h ago", sharedBy: "Devon Clarke" },
  { id: "11", title: "Vantage — Partnership Proposal", status: "ready" as const, updatedAt: "yesterday", sharedBy: "Priya Shah" },
];

export default function SharedWithMePage() {
  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="mb-6 text-2xl font-semibold text-primary">Shared with me</h1>

      {sharedDecks.length === 0 ? (
        <EmptyState
          icon={<Users />}
          title="Nothing shared with you yet"
          description="Decks that teammates share directly with you will show up here."
        />
      ) : (
        <StaggerList>
          <Grid cols={4} gap={5}>
            {sharedDecks.map((deck, i) => (
              <StaggerItem key={deck.id}>
                <div className="space-y-2">
                  <DeckCard deck={deck} index={i} />
                  <div className="flex items-center gap-1.5 px-0.5">
                    <Avatar size="sm"><AvatarFallback>{deck.sharedBy[0]}</AvatarFallback></Avatar>
                    <p className="text-xs text-tertiary">Shared by {deck.sharedBy}</p>
                    <Badge variant="outline" className="ml-auto">Can edit</Badge>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Grid>
        </StaggerList>
      )}
    </div>
  );
}
