"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingsField } from "@/features/settings/components/settings-field";

const swatches = ["#3D6BFF", "#1FAA59", "#E6A417", "#E5484D", "#7D7D8A", "#17171C"];

export default function BrandingSettingsPage() {
  const [primary, setPrimary] = useState(swatches[0]);
  const [locked, setLocked] = useState(false);
  const [showLockWarning, setShowLockWarning] = useState(false);
  const [savedAt, setSavedAt] = useState<number>();

  function handleLockToggle(next: boolean) {
    setLocked(next);
    setShowLockWarning(next);
    setSavedAt(Date.now());
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-primary">Branding</h2>
        <p className="text-md text-secondary">
          Set default fonts, colors, and logo for every deck in this workspace.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Form — left */}
        <div className="space-y-7">
          <SettingsField label="Workspace logo">
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-lg border border-dashed border-default bg-muted text-tertiary">
                <Upload className="size-5" />
              </div>
              <Button variant="secondary" size="sm">Upload logo</Button>
            </div>
          </SettingsField>

          <SettingsField label="Primary color" savedAt={savedAt}>
            <div className="flex gap-2">
              {swatches.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setPrimary(c);
                    setSavedAt(Date.now());
                  }}
                  style={{ backgroundColor: c }}
                  className={`size-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    primary === c ? "border-primary" : "border-surface"
                  }`}
                  aria-label={`Set primary color to ${c}`}
                />
              ))}
              <Input value={primary} onChange={(e) => setPrimary(e.target.value)} className="w-28 font-mono text-sm" />
            </div>
          </SettingsField>

          <SettingsField label="Font pair">
            <Select defaultValue="inter">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="inter">Inter / Inter</SelectItem>
                <SelectItem value="editorial">Fraunces / Inter</SelectItem>
                <SelectItem value="technical">JetBrains Mono / Inter</SelectItem>
              </SelectContent>
            </Select>
          </SettingsField>

          <div className="space-y-3 rounded-lg border border-subtle p-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="mb-0">Lock brand for all members</Label>
                <p className="text-sm text-tertiary">Prevent overriding colors/fonts in new decks</p>
              </div>
              <Switch checked={locked} onCheckedChange={handleLockToggle} />
            </div>
            {showLockWarning && (
              <Alert variant="warning" className="mt-1">
                <AlertDescription>
                  Members won't be able to override colors or fonts when creating new decks. Existing decks are unaffected.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Live preview — right, equally weighted per spec */}
        <div className="lg:sticky lg:top-6 lg:h-fit">
          <p className="mb-2 text-sm font-medium text-secondary">Live preview</p>
          <div
            className="flex aspect-video flex-col items-center justify-center gap-4 rounded-xl border border-subtle p-10 shadow-md"
            style={{ backgroundColor: "var(--bg-surface)" }}
          >
            <div className="h-2 w-16 rounded-full" style={{ backgroundColor: primary }} />
            <h3 className="text-2xl font-bold text-primary">Quarterly Business Review</h3>
            <p className="max-w-xs text-center text-md text-secondary">
              A live sample scene styled with your current brand settings.
            </p>
            <button
              className="mt-2 rounded-md px-4 py-2 text-sm font-medium text-white"
              style={{ backgroundColor: primary }}
            >
              View Deck
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
