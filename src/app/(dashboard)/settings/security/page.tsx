"use client";

import { useState } from "react";
import { Laptop, Smartphone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { SettingsField } from "@/features/settings/components/settings-field";

const sessions = [
  { device: "MacBook Pro — Chrome", location: "San Francisco, US", icon: Laptop, current: true },
  { device: "iPhone 16 — MotionDeck app", location: "San Francisco, US", icon: Smartphone, current: false },
];

export default function SecuritySettingsPage() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [savedAt, setSavedAt] = useState<number>();

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-semibold text-primary">Security</h2>
        <p className="text-md text-secondary">Keep your account secure.</p>
      </div>

      <SettingsField label="Password">
        <Button variant="secondary" size="sm">Change password</Button>
      </SettingsField>

      <div className="flex items-center justify-between rounded-lg border border-subtle p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-accent/10 text-accent">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <p className="text-md font-medium text-primary">Two-factor authentication</p>
            <p className="text-sm text-secondary">Require a code from your phone at login</p>
          </div>
        </div>
        <Switch
          checked={twoFactor}
          onCheckedChange={(v) => {
            setTwoFactor(v);
            setSavedAt(Date.now());
          }}
        />
      </div>
      {savedAt && (
        <p className="-mt-6 text-sm text-success">
          {twoFactor ? "Two-factor authentication enabled." : "Two-factor authentication disabled."}
        </p>
      )}

      <div>
        <h3 className="mb-3 text-md font-semibold text-primary">Active sessions</h3>
        <div className="space-y-2">
          {sessions.map((s) => (
            <div key={s.device} className="flex items-center gap-3 rounded-lg border border-subtle p-3">
              <s.icon className="size-4 text-tertiary" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-md text-primary">{s.device}</p>
                  {s.current && <Badge variant="success">This device</Badge>}
                </div>
                <p className="text-sm text-tertiary">{s.location}</p>
              </div>
              {!s.current && (
                <Button variant="ghost" size="sm" className="text-danger hover:bg-danger/10 hover:text-danger">
                  Sign out
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
