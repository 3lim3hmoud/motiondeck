"use client";

import { useState } from "react";
import { Mail, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Role = "Owner" | "Admin" | "Editor" | "Viewer";

const members: { name: string; email: string; role: Role }[] = [
  { name: "Jamie Doe", email: "jamie@acme.com", role: "Owner" },
  { name: "Priya Shah", email: "priya@acme.com", role: "Admin" },
  { name: "Marcus Webb", email: "marcus@acme.com", role: "Editor" },
  { name: "Elena Ruiz", email: "elena@acme.com", role: "Viewer" },
];

const roleTone: Record<Role, "accent" | "neutral" | "outline"> = {
  Owner: "accent",
  Admin: "neutral",
  Editor: "outline",
  Viewer: "outline",
};

export default function MembersSettingsPage() {
  const [inviteEmail, setInviteEmail] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-primary">Members & Roles</h2>
        <p className="text-md text-secondary">Manage who has access to this workspace.</p>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Invite by email…"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          className="max-w-sm"
        />
        <Button className="gap-1.5" disabled={!inviteEmail.trim()}>
          <Mail className="size-3.5" />
          Send invite
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Role</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((m) => (
            <TableRow key={m.email}>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Avatar size="sm"><AvatarFallback>{m.name[0]}</AvatarFallback></Avatar>
                  <div>
                    <p className="font-medium text-primary">{m.name}</p>
                    <p className="text-sm text-tertiary">{m.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {m.role === "Owner" ? (
                  <Badge variant={roleTone[m.role]}>{m.role}</Badge>
                ) : (
                  <Select defaultValue={m.role}>
                    <SelectTrigger className="h-8 w-28"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Editor">Editor</SelectItem>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </TableCell>
              <TableCell>
                {m.role !== "Owner" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm"><MoreHorizontal className="size-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem variant="destructive">Remove member</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
