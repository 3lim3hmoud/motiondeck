"use client";

import { useState } from "react";
import { AlertTriangle, Download } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingsField } from "@/features/settings/components/settings-field";

export default function DataPrivacyPage() {
  const [confirmText, setConfirmText] = useState("");

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-semibold text-primary">Data & Privacy</h2>
        <p className="text-md text-secondary">Control your data, retention, and account.</p>
      </div>

      <SettingsField label="Export all data">
        <p className="mb-3 text-sm text-secondary">
          Download every deck, comment, and analytics record as a zip archive.
        </p>
        <Button variant="secondary" className="gap-1.5">
          <Download className="size-4" />
          Request export
        </Button>
      </SettingsField>

      <SettingsField label="Deck retention policy">
        <Select defaultValue="forever">
          <SelectTrigger className="max-w-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="forever">Keep forever</SelectItem>
            <SelectItem value="1y">Delete after 1 year of inactivity</SelectItem>
            <SelectItem value="2y">Delete after 2 years of inactivity</SelectItem>
          </SelectContent>
        </Select>
      </SettingsField>

      <div id="delete" className="rounded-lg border border-danger/30 bg-danger/5 p-5">
        <Alert variant="danger" icon={false} className="border-0 bg-transparent p-0">
          <AlertTitle className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-danger" />
            Delete account
          </AlertTitle>
          <AlertDescription>
            This permanently deletes your account, all decks, and all workspace data you own. This cannot be undone.
          </AlertDescription>
        </Alert>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" className="mt-4">Delete my account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                Type <span className="font-mono font-semibold">delete</span> to confirm. This action is permanent.
              </DialogDescription>
            </DialogHeader>
            <div>
              <Label>Confirmation</Label>
              <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder="delete" />
            </div>
            <DialogFooter>
              <Button variant="destructive" disabled={confirmText !== "delete"}>
                Permanently delete account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
