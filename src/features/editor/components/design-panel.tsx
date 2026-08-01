"use client";

import { useState } from "react";
import { BarChart3, Image as ImageIcon, Quote, Table2, Wand2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const blockLibrary = [
  { label: "Chart", icon: BarChart3 },
  { label: "Quote", icon: Quote },
  { label: "Image", icon: ImageIcon },
  { label: "Table", icon: Table2 },
];

const rewritePrompts = ["Make it punchier", "Shorten", "Make it more formal", "Simplify"];

function ContentTab() {
  return (
    <div className="space-y-6 p-4">
      <div>
        <Label>Speaker notes</Label>
        <Textarea rows={3} placeholder="Notes only you can see while presenting…" />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-secondary">AI Rewrite</p>
        <div className="flex flex-wrap gap-1.5">
          {rewritePrompts.map((p) => (
            <Button key={p} variant="secondary" size="sm" className="gap-1.5">
              <Wand2 className="size-3" />
              {p}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-secondary">Add a block</p>
        <div className="grid grid-cols-2 gap-2">
          {blockLibrary.map((block) => (
            <Card key={block.label} interactive className="flex flex-col items-center gap-1.5 p-3">
              <block.icon className="size-4 text-secondary" />
              <p className="text-xs text-primary">{block.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function DesignTab() {
  return (
    <div className="space-y-6 p-4">
      <div>
        <Label>Theme</Label>
        <Select defaultValue="executive">
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="executive">Executive</SelectItem>
            <SelectItem value="editorial">Editorial</SelectItem>
            <SelectItem value="playful">Playful</SelectItem>
            <SelectItem value="minimal">Minimal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Accent color</Label>
        <div className="flex gap-2">
          {["bg-brand-500", "bg-success", "bg-warning", "bg-danger", "bg-info"].map((c) => (
            <button key={c} className={`size-7 rounded-full border-2 border-surface shadow-sm ${c}`} />
          ))}
        </div>
      </div>
      <div>
        <Label>Background</Label>
        <div className="grid grid-cols-3 gap-2">
          {["bg-canvas", "bg-neutral-900", "bg-brand-50"].map((c) => (
            <button key={c} className={`aspect-video rounded-md border border-subtle ${c}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AnimateTab() {
  const [scrubValue, setScrubValue] = useState([30]);
  return (
    <div className="space-y-6 p-4">
      <div>
        <Label>Entrance</Label>
        <Select defaultValue="fade-up">
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="fade-up">Fade up</SelectItem>
            <SelectItem value="fade-in">Fade in</SelectItem>
            <SelectItem value="slide-in">Slide in</SelectItem>
            <SelectItem value="scale-in">Scale in</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Easing</Label>
        <Select defaultValue="standard">
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="decelerate">Decelerate</SelectItem>
            <SelectItem value="spring">Spring</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label className="mb-0">Timeline</Label>
          <span className="text-xs text-tertiary">{scrubValue[0]}%</span>
        </div>
        {/* Scrubbing this live-updates the canvas frame per the spec's
            "demystify motion without hitting Play" interaction idea. */}
        <Slider value={scrubValue} onValueChange={setScrubValue} max={100} step={1} />
      </div>
    </div>
  );
}

function DataTab() {
  return (
    <div className="space-y-4 p-4">
      <p className="text-md text-secondary">
        Connect a spreadsheet or paste a table to keep this chart live-linked.
      </p>
      <Button variant="secondary" className="w-full">Connect spreadsheet</Button>
      <Button variant="ghost" className="w-full">Paste table data</Button>
    </div>
  );
}

function DesignPanel() {
  return (
    <div className="flex h-full w-full flex-col bg-surface">
      <Tabs defaultValue="content" className="flex h-full flex-col">
        <TabsList className="m-2 grid grid-cols-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="animate">Animate</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>
        <div className="flex-1 overflow-y-auto">
          <TabsContent value="content" className="mt-0"><ContentTab /></TabsContent>
          <TabsContent value="design" className="mt-0"><DesignTab /></TabsContent>
          <TabsContent value="animate" className="mt-0"><AnimateTab /></TabsContent>
          <TabsContent value="data" className="mt-0"><DataTab /></TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export { DesignPanel };
