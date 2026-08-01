"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
  resolved: boolean;
  replies: { author: string; text: string; time: string }[];
}

const initialComments: Comment[] = [
  {
    id: "c1",
    author: "Priya Shah",
    text: "Can we make the headline punchier here? Feels a bit flat.",
    time: "2h ago",
    resolved: false,
    replies: [{ author: "Jamie Doe", text: "Agreed — trying an AI rewrite now.", time: "1h ago" }],
  },
  {
    id: "c2",
    author: "Marcus Webb",
    text: "Love this transition into the results scene.",
    time: "1d ago",
    resolved: true,
    replies: [],
  },
];

function CommentThread({ comment, onResolve }: { comment: Comment; onResolve: (id: string) => void }) {
  return (
    <div className={`rounded-lg border p-3 ${comment.resolved ? "border-subtle bg-muted/50 opacity-70" : "border-subtle bg-surface"}`}>
      <div className="flex items-start gap-2.5">
        <Avatar size="sm"><AvatarFallback>{comment.author[0]}</AvatarFallback></Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-primary">{comment.author}</p>
            <span className="text-xs text-tertiary">{comment.time}</span>
          </div>
          <p className="mt-0.5 text-md text-secondary">{comment.text}</p>

          {comment.replies.map((reply, i) => (
            <div key={i} className="mt-2 flex items-start gap-2 border-l-2 border-subtle pl-3">
              <Avatar size="sm"><AvatarFallback>{reply.author[0]}</AvatarFallback></Avatar>
              <div>
                <p className="text-sm font-medium text-primary">{reply.author}</p>
                <p className="text-sm text-secondary">{reply.text}</p>
              </div>
            </div>
          ))}

          {!comment.resolved && (
            <button
              onClick={() => onResolve(comment.id)}
              className="mt-2 flex items-center gap-1 text-xs font-medium text-accent hover:underline"
            >
              <Check className="size-3" />
              Mark resolved
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CommentsPanel({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [comments, setComments] = useState(initialComments);
  const [draft, setDraft] = useState("");

  function resolve(id: string) {
    setComments((cs) => cs.map((c) => (c.id === id ? { ...c, resolved: true } : c)));
  }

  function submit() {
    if (!draft.trim()) return;
    setComments((cs) => [
      { id: crypto.randomUUID(), author: "Jamie Doe", text: draft, time: "Just now", resolved: false, replies: [] },
      ...cs,
    ]);
    setDraft("");
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full max-w-sm flex-col">
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-3">
            {comments.length === 0 ? (
              <p className="py-10 text-center text-sm text-tertiary">No comments on this scene yet.</p>
            ) : (
              comments.map((c) => <CommentThread key={c.id} comment={c} onResolve={resolve} />)
            )}
          </div>
        </ScrollArea>

        <div className="mt-auto flex gap-2 border-t border-subtle pt-4">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a comment…"
            rows={2}
            className="flex-1 resize-none"
          />
          <IconButton aria-label="Send comment" variant="primary" onClick={submit} disabled={!draft.trim()}>
            <Send className="size-4" />
          </IconButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { CommentsPanel };
