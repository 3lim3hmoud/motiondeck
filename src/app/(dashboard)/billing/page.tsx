import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const usage = [
  { label: "Decks", used: 34, limit: 100 },
  { label: "AI generations this month", used: 210, limit: 500 },
  { label: "Team seats", used: 6, limit: 10 },
];

const invoices = [
  { id: "INV-0143", date: "Jul 1, 2026", amount: "$96.00", status: "Paid" },
  { id: "INV-0121", date: "Jun 1, 2026", amount: "$96.00", status: "Paid" },
  { id: "INV-0098", date: "May 1, 2026", amount: "$64.00", status: "Paid" },
];

export default function BillingPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-2xl font-semibold text-primary">Billing</h1>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Team plan</CardTitle>
            <p className="mt-1 text-md text-secondary">$32/seat/mo · Renews Sep 1, 2026</p>
          </div>
          <Badge variant="accent">Active</Badge>
        </CardHeader>
        <CardContent className="space-y-5">
          {usage.map((u) => (
            <div key={u.label}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-secondary">{u.label}</span>
                <span className="tabular-nums text-tertiary">{u.used} / {u.limit}</span>
              </div>
              <Progress value={(u.used / u.limit) * 100} />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <Button variant="secondary">Change plan</Button>
            <Button variant="ghost">Cancel subscription</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>Payment method</CardTitle>
          <Button variant="ghost" size="sm">Update</Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 rounded-lg border border-subtle p-3">
            <div className="flex h-8 w-12 items-center justify-center rounded bg-neutral-900 text-xs font-semibold text-white">
              VISA
            </div>
            <p className="text-md text-primary">•••• •••• •••• 4242</p>
            <p className="ml-auto text-sm text-tertiary">Expires 09/28</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoice history</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">{inv.id}</TableCell>
                  <TableCell className="text-secondary">{inv.date}</TableCell>
                  <TableCell className="text-secondary">{inv.amount}</TableCell>
                  <TableCell><Badge variant="success">{inv.status}</Badge></TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="gap-1.5">
                      <Download className="size-3.5" />
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
