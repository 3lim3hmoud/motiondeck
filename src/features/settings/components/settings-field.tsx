"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";

/**
 * Wraps a single settings field. Call `notifySaved()` (or just pass
 * `savedAt` bumped from a parent's mutation `onSuccess`) to flash the
 * checkmark. Settings pages should never show a page-level "Save" button —
 * this is the one confirmation mechanism, consistently, everywhere.
 */
function SettingsField({
  label,
  savedAt,
  children,
}: {
  label: string;
  savedAt?: number;
  children: React.ReactNode;
}) {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (!savedAt) return;
    setShowSaved(true);
    const t = setTimeout(() => setShowSaved(false), 1800);
    return () => clearTimeout(t);
  }, [savedAt]);

  return (
    <div className="max-w-md">
      <div className="mb-1.5 flex items-center gap-2">
        <Label className="mb-0">{label}</Label>
        <AnimatePresence>
          {showSaved && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1 text-xs font-medium text-success"
            >
              <Check className="size-3" strokeWidth={3} />
              Saved
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {children}
    </div>
  );
}

export { SettingsField };
