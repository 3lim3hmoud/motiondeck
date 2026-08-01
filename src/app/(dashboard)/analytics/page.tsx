"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { colorTokens } from "@/lib/tokens";

const stats = [
  { label: "Total views", value: "1,284" },
  { label: "Avg. time spent", value: "3m 42s" },
  { label: "Completion rate", value: "68%" },
];

const funnelData = [
  { scene: "Title", viewers: 1284 },
  { scene: "Problem", viewers: 1190 },
  { scene: "Approach", viewers: 1050 },
  { scene: "Results", viewers: 940 },
  { scene: "Next Steps", viewers: 872 },
];

const viewers = [
  { name: "Priya Shah", device: "Desktop · Chrome", location: "San Francisco, US", completed: true },
  { name: "Anonymous", device: "Mobile · Safari", location: "London, UK", completed: false },
  { name: "Marcus Webb", device: "Desktop · Firefox", location: "Austin, US", completed: true },
];

function DropOffChart() {
  const [hoveredScene, setHoveredScene] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scene drop-off</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 lg:grid-cols-[1fr_180px]">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={funnelData}
                onMouseMove={(state) => {
                  const label = state?.activeLabel;
                  if (typeof label === "string") setHoveredScene(label);
                }}
                onMouseLeave={() => setHoveredScene(null)}
              >
                <defs>
                  <linearGradient id="funnelFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colorTokens.brand[500]} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={colorTokens.brand[500]} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                <XAxis dataKey="scene" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--bg-surface-raised)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="viewers"
                  stroke={colorTokens.brand[500]}
                  strokeWidth={2}
                  fill="url(#funnelFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Live thumbnail preview of the hovered scene — per spec's
              "connect the dip to the content" interaction idea. */}
          <div className="flex flex-col items-center justify-center rounded-lg border border-subtle bg-muted p-3">
            {hoveredScene ? (
              <>
                <div className="aspect-video w-full rounded-md bg-surface shadow-sm" />
                <p className="mt-2 text-sm font-medium text-primary">{hoveredScene}</p>
              </>
            ) : (
              <p className="text-center text-sm text-tertiary">
                Hover the chart to preview a scene
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-primary">Analytics</h1>
        <div className="flex items-center gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="secondary" size="sm" className="gap-1.5">
            <Download className="size-3.5" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5">
            <p className="text-sm text-tertiary">{stat.label}</p>
            <p className="mt-1 text-3xl font-semibold text-primary">{stat.value}</p>
          </Card>
        ))}
      </div>

      <DropOffChart />

      <Card>
        <CardHeader>
          <CardTitle>Viewers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Viewer</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Completed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {viewers.map((v) => (
                <TableRow key={v.name}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar size="sm"><AvatarFallback>{v.name[0]}</AvatarFallback></Avatar>
                      {v.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-secondary">{v.device}</TableCell>
                  <TableCell className="text-secondary">{v.location}</TableCell>
                  <TableCell>
                    {v.completed ? (
                      <span className="text-success">Yes</span>
                    ) : (
                      <span className="text-tertiary">No</span>
                    )}
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
