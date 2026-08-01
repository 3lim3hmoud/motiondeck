"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ROUTES } from "@/constants/routes";
import { SourceSelection } from "@/features/import/components/source-selection";
import { AiParsing } from "@/features/import/components/ai-parsing";
import { StyleSelection } from "@/features/import/components/style-selection";

type Step = "source" | "parsing" | "style";

export default function ImportFlowPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("source");
  const [fileName, setFileName] = useState("");

  function goToParsing(name: string) {
    setFileName(name);
    setStep("parsing");
  }

  return (
    <AnimatePresence mode="wait">
      {step === "source" && (
        <motion.div key="source" exit={{ opacity: 0 }} className="flex flex-1 flex-col">
          <SourceSelection
            onFileDropped={goToParsing}
            onTextPasted={() => goToParsing("Pasted text")}
            onUrlSubmitted={(url) => goToParsing(url)}
          />
        </motion.div>
      )}

      {step === "parsing" && (
        <motion.div
          key="parsing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-1 flex-col"
        >
          <AiParsing
            fileName={fileName}
            onComplete={() => setStep("style")}
            onCancel={() => setStep("source")}
          />
        </motion.div>
      )}

      {step === "style" && (
        <motion.div
          key="style"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-1 flex-col"
        >
          {/* New deck gets a generated id from the backend; using a mock id here. */}
          <StyleSelection onContinue={() => router.push(ROUTES.editor("new-deck"))} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
