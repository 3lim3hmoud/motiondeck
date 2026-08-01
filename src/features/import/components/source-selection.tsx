"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Globe, Link2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const sourceTiles = [
  { id: "drive", label: "Google Drive", icon: FileText },
  { id: "notion", label: "Notion", icon: FileText },
  { id: "url", label: "Web page URL", icon: Globe },
];

interface SourceSelectionProps {
  onFileDropped: (fileName: string) => void;
  onTextPasted: (text: string) => void;
  onUrlSubmitted: (url: string) => void;
}

/**
 * Dropping a file triggers an immediate "catch" animation (icon shrinks into
 * the drop zone) before the parent advances to the AI Parsing step — per the
 * spec, this confirms the drop registered before any processing feedback
 * appears, rather than jumping straight to a spinner.
 */
function SourceSelection({ onFileDropped, onTextPasted, onUrlSubmitted }: SourceSelectionProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [caught, setCaught] = useState(false);
  const [pasteMode, setPasteMode] = useState(false);
  const [pastedText, setPastedText] = useState("");
  const [urlMode, setUrlMode] = useState(false);
  const [url, setUrl] = useState("");

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setCaught(true);
    setTimeout(() => onFileDropped(file.name), 500);
  }

  function handleBrowse(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCaught(true);
    setTimeout(() => onFileDropped(file.name), 500);
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 pb-16">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold text-primary">Bring in your content</h1>
        <p className="mt-2 text-lg text-secondary">
          Drop a file, paste text, or connect a source — any format works.
        </p>
      </div>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={handleDrop}
        className={cn(
          "relative flex min-h-64 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition-colors",
          isDraggingOver ? "border-accent bg-accent/5" : "border-default hover:border-strong",
        )}
      >
        <input type="file" className="sr-only" onChange={handleBrowse} accept=".docx,.pdf,.pptx,.txt" />
        <motion.div
          animate={caught ? { scale: 0.4, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 1, 1] }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex size-14 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Upload className="size-7" />
          </div>
          <p className="text-lg font-medium text-primary">Drop a file here, or click to browse</p>
          <p className="text-sm text-tertiary">Supports .docx, .pdf, .pptx, .txt</p>
        </motion.div>
      </label>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--border-subtle)]" />
        <span className="text-xs text-tertiary">OR</span>
        <div className="h-px flex-1 bg-[var(--border-subtle)]" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card
          interactive
          className="flex flex-col items-center gap-2 p-4"
          onClick={() => setPasteMode((v) => !v)}
        >
          <FileText className="size-5 text-secondary" />
          <p className="text-sm font-medium text-primary">Paste text</p>
        </Card>
        <Card
          interactive
          className="flex flex-col items-center gap-2 p-4"
          onClick={() => setUrlMode((v) => !v)}
        >
          <Link2 className="size-5 text-secondary" />
          <p className="text-sm font-medium text-primary">Web page URL</p>
        </Card>
        {sourceTiles.slice(0, 2).map((tile) => (
          <Card key={tile.id} interactive className="flex flex-col items-center gap-2 p-4">
            <tile.icon className="size-5 text-secondary" />
            <p className="text-sm font-medium text-primary">{tile.label}</p>
          </Card>
        ))}
      </div>

      {pasteMode && (
        <div className="mt-5 space-y-3">
          <Textarea
            placeholder="Paste your text here…"
            rows={6}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            autoFocus
          />
          <Button className="w-full" disabled={!pastedText.trim()} onClick={() => onTextPasted(pastedText)}>
            Continue
          </Button>
        </div>
      )}

      {urlMode && (
        <div className="mt-5 flex gap-2">
          <input
            type="url"
            placeholder="https://example.com/article"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex h-9 flex-1 rounded-md border border-default bg-surface px-3 text-md text-primary focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-focus"
            autoFocus
          />
          <Button disabled={!url.trim()} onClick={() => onUrlSubmitted(url)}>
            Import
          </Button>
        </div>
      )}
    </div>
  );
}

export { SourceSelection };
