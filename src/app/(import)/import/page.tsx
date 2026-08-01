"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ROUTES } from "@/constants/routes";
import { SourceSelection } from "@/features/import/components/source-selection";
import { AiParsing } from "@/features/import/components/ai-parsing";
import { StyleSelection } from "@/features/import/components/style-selection";
import type { GenerateDeckResult } from "@/services/gemini";

type Step = "source" | "parsing" | "style";

export default function ImportFlowPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("source");
  const [fileName, setFileName] = useState("");
  const [sourceText, setSourceText] = useState<string | undefined>(undefined);
  const [generatedDeck, setGeneratedDeck] = useState<GenerateDeckResult | null>(null);

  function goToParsing(name: string, text?: string) {
    setFileName(name);
    setSourceText(text);
    setStep("parsing");
  }

  function handleParsingComplete(result: GenerateDeckResult | null) {
    setGeneratedDeck(result);
    setStep("style");
  }

  return (
    <AnimatePresence mode="wait">
      {step === "source" && (
        <motion.div key="source" exit={{ opacity: 0 }} className="flex flex-1 flex-col">
          <SourceSelection
            onFileDropped={(name) => goToParsing(name)}
            onTextPasted={(text) => goToParsing("Pasted text", text)}
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
            sourceText={sourceText}
            onComplete={handleParsingComplete}
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
          {generatedDeck && (
            <div className="mx-auto mb-6 w-full max-w-xl rounded-xl border border-subtle bg-surface p-4 text-sm text-secondary">
              <p className="mb-2 font-medium text-primary">
                Gemini generated “{generatedDeck.deckTitle}” — {generatedDeck.scenes.length} scenes
              </p>
              <ul className="list-inside list-disc space-y-1">
                {generatedDeck.scenes.map((scene) => (
                  <li key={scene.title}>{scene.title}</li>
                ))}
              </ul>
            </div>
          )}
          {/* New deck gets a generated id from the backend; using a mock id here. */}
          <StyleSelection onContinue={() => router.push(ROUTES.editor("new-deck"))} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

