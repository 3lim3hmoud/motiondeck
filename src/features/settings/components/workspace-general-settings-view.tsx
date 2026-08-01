"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SettingsField } from "@/features/settings/components/settings-field";
import { renameWorkspace } from "@/features/workspace/services/actions";

function WorkspaceGeneralSettingsView({ initialName, slug }: { initialName: string; slug: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [savedAt, setSavedAt] = useState<number>();
  const [, startTransition] = useTransition();

  function handleBlur() {
    const trimmed = name.trim();
    if (!trimmed || trimmed === initialName) return;
    startTransition(async () => {
      const result = await renameWorkspace(trimmed);
      if (result.ok) {
        setSavedAt(Date.now());
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-primary">General</h2>
        <p className="text-md text-secondary">Basic information about this workspace.</p>
      </div>

      <SettingsField label="Workspace logo">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-lg bg-accent text-lg font-semibold text-white">
            {name[0]?.toUpperCase()}
          </div>
          <Button variant="secondary" size="sm" className="gap-1.5" disabled>
            <Upload className="size-3.5" />
            Upload
          </Button>
        </div>
      </SettingsField>

      <SettingsField label="Workspace name" savedAt={savedAt}>
        <Input value={name} onChange={(e) => setName(e.target.value)} onBlur={handleBlur} />
      </SettingsField>

      <SettingsField label="Workspace URL">
        <div className="flex items-center gap-1 text-md">
          <span className="text-tertiary">motiondeck.app/</span>
          <Input defaultValue={slug} className="w-40" disabled />
        </div>
      </SettingsField>
    </div>
  );
}

export { WorkspaceGeneralSettingsView };
