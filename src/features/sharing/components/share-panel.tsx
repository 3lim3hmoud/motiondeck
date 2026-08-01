"use client";

import { useState } from "react";
import { Check, Copy, Download, FileText, Film, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

function CopyLinkButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      className="shrink-0 gap-1.5"
      onClick={() => {
        navigator.clipboard?.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {copied ? "Copied!" : "Copy link"}
    </Button>
  );
}

function PeopleWithAccess() {
  const [people, setPeople] = useState([
    { email: "priya@acme.com", role: "edit" },
    { email: "marcus@acme.com", role: "view" },
  ]);
  const [inviteEmail, setInviteEmail] = useState("");

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          placeholder="Add people by email…"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          className="flex-1"
        />
        <Button
          size="sm"
          disabled={!inviteEmail.trim()}
          onClick={() => {
            setPeople((p) => [...p, { email: inviteEmail.trim(), role: "view" }]);
            setInviteEmail("");
          }}
        >
          Invite
        </Button>
      </div>

      {people.length > 0 && (
        <div className="space-y-1.5">
          {people.map((person) => (
            <div key={person.email} className="flex items-center justify-between gap-2 rounded-md px-1 py-1">
              <span className="text-sm text-secondary">{person.email}</span>
              <Select
                value={person.role}
                onValueChange={(role) =>
                  setPeople((p) => p.map((x) => (x.email === person.email ? { ...x, role } : x)))
                }
              >
                <SelectTrigger className="h-7 w-28 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">Can view</SelectItem>
                  <SelectItem value="comment">Can comment</SelectItem>
                  <SelectItem value="edit">Can edit</SelectItem>
                  <SelectItem value="remove">Remove access</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LinkTab() {
  const [linkOn, setLinkOn] = useState(true);
  const [passwordOn, setPasswordOn] = useState(false);
  const [expiryOn, setExpiryOn] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date>();

  return (
    <div className="space-y-6">
      <div>
        <Label>People with access</Label>
        <PeopleWithAccess />
      </div>

      <div className="h-px bg-[var(--border-subtle)]" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Globe className="size-4 text-secondary" />
          <div>
            <p className="text-md font-medium text-primary">Anyone with the link</p>
            <p className="text-sm text-tertiary">{linkOn ? "Live" : "Off"}</p>
          </div>
        </div>
        <Switch checked={linkOn} onCheckedChange={setLinkOn} />
      </div>

      {linkOn && (
        <>
          <div className="flex gap-2">
            <Input readOnly value="https://motiondeck.app/s/qx7-plan-2027" className="flex-1" />
            <CopyLinkButton value="https://motiondeck.app/s/qx7-plan-2027" />
          </div>

          <div>
            <Label>Permission</Label>
            <Select defaultValue="view">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="view">Can view</SelectItem>
                <SelectItem value="comment">Can comment</SelectItem>
                <SelectItem value="edit">Can edit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 rounded-lg border border-subtle p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Lock className="size-4 text-secondary" />
                <p className="text-md text-primary">Password protect</p>
              </div>
              <Switch checked={passwordOn} onCheckedChange={setPasswordOn} />
            </div>
            {passwordOn && <Input type="password" placeholder="Set a password" />}

            <div className="flex items-center justify-between">
              <p className="text-md text-primary">Set expiration</p>
              <Switch checked={expiryOn} onCheckedChange={setExpiryOn} />
            </div>
            {expiryOn && <DatePicker date={expiryDate} onDateChange={setExpiryDate} />}
          </div>
        </>
      )}
    </div>
  );
}

function EmbedTab() {
  const [width, setWidth] = useState("100%");
  const [height, setHeight] = useState("600");
  const [theme, setTheme] = useState("auto");
  const [autoplay, setAutoplay] = useState(false);
  const [copied, setCopied] = useState(false);

  const snippet = `<iframe src="https://motiondeck.app/embed/qx7-plan-2027?theme=${theme}${autoplay ? "&autoplay=1" : ""}" width="${width}" height="${height}" frameborder="0" allowfullscreen></iframe>`;

  return (
    <div className="space-y-4">
      <p className="text-md text-secondary">Paste this snippet into any website or CMS.</p>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Width</Label>
          <Input value={width} onChange={(e) => setWidth(e.target.value)} />
        </div>
        <div>
          <Label>Height (px)</Label>
          <Input value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
      </div>

      <div>
        <Label>Theme</Label>
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Match visitor’s system</SelectItem>
            <SelectItem value="light">Always light</SelectItem>
            <SelectItem value="dark">Always dark</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label className="mb-0">Autoplay first scene</Label>
        <Switch checked={autoplay} onCheckedChange={setAutoplay} />
      </div>

      <div className="rounded-lg border border-subtle bg-muted p-3 font-mono text-xs text-secondary">
        {snippet}
      </div>
      <Button
        variant="secondary"
        className="w-full gap-1.5"
        onClick={() => {
          navigator.clipboard?.writeText(snippet);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        }}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? "Copied!" : "Copy embed code"}
      </Button>
    </div>
  );
}

type ExportState = "idle" | "exporting" | "done";

function ExportRow({
  format,
  icon: FormatIcon,
  desc,
}: {
  format: string;
  icon: typeof FileText;
  desc: string;
}) {
  const [state, setState] = useState<ExportState>("idle");
  const [progress, setProgress] = useState(0);

  function startExport() {
    setState("exporting");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setState("done");
          return 100;
        }
        return p + Math.random() * 22;
      });
    }, 350);
  }

  return (
    <Card className="p-3">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-md bg-muted text-secondary">
          <FormatIcon className="size-5" />
        </div>
        <div className="flex-1">
          <p className="text-md font-medium text-primary">{format}</p>
          <p className="text-sm text-tertiary">{desc}</p>
        </div>
        {state === "idle" && (
          <Button variant="secondary" size="sm" className="gap-1.5" onClick={startExport}>
            <Download className="size-3.5" />
            Export
          </Button>
        )}
        {state === "done" && (
          <Button size="sm" className="gap-1.5">
            <Download className="size-3.5" />
            Download
          </Button>
        )}
      </div>
      {state === "exporting" && (
        <div className="mt-3 space-y-1.5">
          <Progress value={Math.min(progress, 100)} />
          <p className="text-xs text-tertiary">Rendering… {Math.min(Math.round(progress), 100)}%</p>
        </div>
      )}
    </Card>
  );
}

function ExportTab() {
  const formats = [
    { id: "pdf", label: "PDF", icon: FileText, desc: "Static, one page per scene" },
    { id: "mp4", label: "MP4", icon: Film, desc: "Full motion, for video platforms" },
    { id: "html", label: "Standalone HTML", icon: Globe, desc: "Self-contained, works offline" },
  ];
  return (
    <div className="space-y-3">
      {formats.map((f) => (
        <ExportRow key={f.id} format={f.label} icon={f.icon} desc={f.desc} />
      ))}
    </div>
  );
}

function SharePanel({ children }: { children?: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full max-w-md">
        <SheetHeader>
          <SheetTitle>Share this deck</SheetTitle>
        </SheetHeader>
        <Tabs defaultValue="link">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="embed">Embed</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>
          <TabsContent value="link"><LinkTab /></TabsContent>
          <TabsContent value="embed"><EmbedTab /></TabsContent>
          <TabsContent value="export"><ExportTab /></TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

export { SharePanel };
