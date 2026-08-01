"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SettingsField } from "@/features/settings/components/settings-field";

export default function WorkspaceGeneralSettingsPage() {
  const [name, setName] = useState("Acme Inc");
  const [savedAt, setSavedAt] = useState<number>();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-primary">General</h2>
        <p className="text-md text-secondary">Basic information about this workspace.</p>
      </div>

      <SettingsField label="Workspace logo">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-lg bg-accent text-lg font-semibold text-white">
            {name[0]}
          </div>
          <Button variant="secondary" size="sm" className="gap-1.5">
            <Upload className="size-3.5" />
            Upload
          </Button>
        </div>
      </SettingsField>

      <SettingsField label="Workspace name" savedAt={savedAt}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setSavedAt(Date.now())}
        />
      </SettingsField>

      <SettingsField label="Workspace URL">
        <div className="flex items-center gap-1 text-md">
          <span className="text-tertiary">motiondeck.app/</span>
          <Input defaultValue="acme-inc" className="w-40" />
        </div>
      </SettingsField>
    </div>
  );
}
