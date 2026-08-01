"use client";

import { useState } from "react";
import { Copy, Key, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const apps = [
  { name: "Google Drive", desc: "Import docs and slides directly", connected: true },
  { name: "Notion", desc: "Import pages as decks", connected: true },
  { name: "Slack", desc: "Get notified when a deck is viewed", connected: false },
  { name: "Figma", desc: "Import frames as scene backgrounds", connected: false },
];

export default function IntegrationsSettingsPage() {
  const [connected, setConnected] = useState(
    Object.fromEntries(apps.map((a) => [a.name, a.connected])),
  );

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-semibold text-primary">Integrations</h2>
        <p className="text-md text-secondary">Connect the tools your team already uses.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {apps.map((app) => (
          <Card key={app.name} className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-md bg-muted text-secondary">
              {app.name[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-md font-medium text-primary">{app.name}</p>
              <p className="text-sm text-tertiary">{app.desc}</p>
            </div>
            <Button
              variant={connected[app.name] ? "secondary" : "primary"}
              size="sm"
              onClick={() => setConnected((c) => ({ ...c, [app.name]: !c[app.name] }))}
            >
              {connected[app.name] ? "Connected" : "Connect"}
            </Button>
          </Card>
        ))}
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-md font-semibold text-primary">API Keys</h3>
            <p className="text-sm text-secondary">Available on Pro and Team plans.</p>
          </div>
          <Button size="sm" className="gap-1.5">
            <Plus className="size-3.5" />
            New key
          </Button>
        </div>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Key className="size-4 text-tertiary" />
            <code className="flex-1 font-mono text-sm text-secondary">md_live_••••••••••••3fA2</code>
            <Badge variant="neutral">Created Jun 12</Badge>
            <Button variant="ghost" size="sm" className="gap-1.5">
              <Copy className="size-3.5" />
              Copy
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
