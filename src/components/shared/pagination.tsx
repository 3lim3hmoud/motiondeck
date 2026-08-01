"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function Pagination({
  page,
  totalPages,
  buildHref,
}: {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <Link
        href={buildHref(page - 1)}
        aria-disabled={page <= 1}
        className={cn(
          "flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium text-secondary hover:bg-surface-raised hover:text-primary",
          page <= 1 && "pointer-events-none opacity-40",
        )}
      >
        <ChevronLeft className="size-3.5" />
        Prev
      </Link>
      <span className="text-sm text-tertiary">
        Page {page} of {totalPages}
      </span>
      <Link
        href={buildHref(page + 1)}
        aria-disabled={page >= totalPages}
        className={cn(
          "flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium text-secondary hover:bg-surface-raised hover:text-primary",
          page >= totalPages && "pointer-events-none opacity-40",
        )}
      >
        Next
        <ChevronRight className="size-3.5" />
      </Link>
    </div>
  );
}

export { Pagination };
