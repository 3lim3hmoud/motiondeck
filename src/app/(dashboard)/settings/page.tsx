"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SettingsField } from "@/features/settings/components/settings-field";

export default function ProfileSettingsPage() {
  const [name, setName] = useState("Jamie Doe");
  const [savedAt, setSavedAt] = useState<number>();

  function handleBlur() {
    // TODO(Phase — settings backend): PATCH /api/user/profile
    setSavedAt(Date.now());
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-primary">Profile</h2>
        <p className="text-md text-secondary">This is how you appear across MotionDeck.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar size="xl">
            <AvatarFallback className="text-xl">{name[0]}</AvatarFallback>
          </Avatar>
          <button
            aria-label="Change avatar"
            className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border-2 border-surface bg-accent text-white shadow-sm hover:bg-accent-hover"
          >
            <Camera className="size-3.5" />
          </button>
        </div>
        <div>
          <p className="text-md font-medium text-primary">{name}</p>
          <p className="text-sm text-tertiary">JPG or PNG, max 2MB</p>
        </div>
      </div>

      <SettingsField label="Full name" savedAt={savedAt}>
        <Input value={name} onChange={(e) => setName(e.target.value)} onBlur={handleBlur} />
      </SettingsField>

      <SettingsField label="Email">
        <div className="flex items-center gap-3">
          <Input value="jamie@acme.com" disabled className="max-w-xs" />
          <Button variant="ghost" size="sm">Change</Button>
        </div>
      </SettingsField>
    </div>
  );
}
