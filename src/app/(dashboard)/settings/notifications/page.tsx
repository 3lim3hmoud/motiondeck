"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { SettingsField } from "@/features/settings/components/settings-field";

const prefs = [
  { key: "digest", label: "Weekly email digest", desc: "A summary of activity across your workspace" },
  { key: "comments", label: "Comment alerts", desc: "Someone comments on a deck you own or follow" },
  { key: "shares", label: "Share alerts", desc: "Someone views a deck you shared for the first time" },
  { key: "mentions", label: "Mentions", desc: "Someone @mentions you in a comment" },
];

export default function NotificationSettingsPage() {
  const [values, setValues] = useState<Record<string, boolean>>({
    digest: true,
    comments: true,
    shares: false,
    mentions: true,
  });
  const [savedAt, setSavedAt] = useState<number>();

  function toggle(key: string) {
    setValues((v) => ({ ...v, [key]: !v[key] }));
    setSavedAt(Date.now());
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-primary">Notifications</h2>
        <p className="text-md text-secondary">Choose what MotionDeck emails you about.</p>
      </div>

      <div className="divide-y divide-[var(--border-subtle)]">
        {prefs.map((pref) => (
          <div key={pref.key} className="flex items-center justify-between py-4">
            <SettingsField label={pref.label} savedAt={savedAt}>
              <p className="text-sm text-tertiary">{pref.desc}</p>
            </SettingsField>
            <Switch checked={values[pref.key]} onCheckedChange={() => toggle(pref.key)} />
          </div>
        ))}
      </div>
    </div>
  );
}
