"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";

function SpeakerNotesDrawer({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 140, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          className="shrink-0 overflow-hidden border-t border-subtle bg-surface"
        >
          <div className="flex h-[140px] flex-col gap-2 p-4">
            <p className="text-sm font-medium text-secondary">Speaker notes</p>
            <Textarea
              placeholder="Notes visible only to you while presenting…"
              className="flex-1 resize-none"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { SpeakerNotesDrawer };
