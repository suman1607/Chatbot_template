
'use client';

import React, { useState } from 'react';
import {
  Package,
  Flag,
  Megaphone,
  BookText,
  Rocket,
  Plus,
  MoreHorizontal,
  ChevronDown,
  GitMerge,
  GitCommit,
  PauseCircle,
  PlayCircle,
  Clock,
  ShieldCheck,
  Percent,
  Search,
  Filter,
  Download,
  BarChart2,
  AlertCircle,
  ChevronsRight,
  Eye,
  Settings,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const releases = [
  { id: 'v2.5.1', date: '2024-06-15', status: 'Live', stage: '100% Rollout', health: 'Healthy' },
  { id: 'v2.5.0', date: '2024-06-10', status: 'Live', stage: '100% Rollout', health: 'Healthy' },
  { id: 'v2.4.3', date: '2024-05-28', status: 'Live', stage: '100% Rollout', health: 'Healthy' },
];

const featureFlags = [
  { id: 'new-dashboard-view', status: 'Active', rollout: 100, conditions: 'Internal Team', last_modified: '2h ago' },
  { id: 'ai-summary-v2', status: 'Staged Rollout', rollout: 25, conditions: 'Pro Plan Users', last_modified: '1d ago' },
  { id: 'dark-mode-beta', status: 'Inactive', rollout: 0, conditions: 'None', last_modified: '5d ago' },
];

const healthData = [
  { name: '12:00', errors: 2, latency: 120 },
  { name: '13:00', errors: 1, latency: 110 },
  { name: '14:00', errors: 5, latency: 150 },
  { name: '15:00', errors: 3, latency: 130 },
  { name: '16:00', errors: 2, latency: 125 },
];

const StatusBadge = ({ status }: { status: string }) => {
    const colors: {[key:string]: string} = {
        'Live': 'bg-green-100 text-green-800',
        'Staged Rollout': 'bg-blue-100 text-blue-800',
        'Active': 'bg-green-100 text-green-800',
        'Inactive': 'bg-gray-100 text-gray-800',
        'Healthy': 'bg-green-100 text-green-800',
    };
    return <Badge variant="outline" className={colors[status]}>{status}</Badge>;
}


export default function AdminProductPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2"><Package className="w-8 h-8 text-primary"/> Product & Updates</h1>
                    <p className="text-muted-foreground">Manage releases, feature flags, and product announcements.</p>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Tabs defaultValue="releases">
                        <TabsList className="p-4 border-b w-full justify-start bg-transparent rounded-none">
                            <TabsTrigger value="releases"><Rocket className="mr-2 h-4 w-4"/>Releases</TabsTrigger>
                            <TabsTrigger value="flags"><Flag className="mr-2 h-4 w-4"/>Feature Flags</TabsTrigger>
                            <TabsTrigger value="announcements"><Megaphone className="mr-2 h-4 w-4"/>Announcements</TabsTrigger>
                            <TabsTrigger value="changelog"><BookText className="mr-2 h-4 w-4"/>Changelog</TabsTrigger>
                             <TabsTrigger value="health"><BarChart2 className="mr-2 h-4 w-4"/>Health</TabsTrigger>
                        </TabsList>
                        
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex gap-2">
                                     <div className="group relative max-w-sm">
                                        <Search className="icon absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-900/60" />
                                        <Input 
                                            placeholder="Search..."
                                            className="h-11 w-full pl-10 pr-4 border-2 border-transparent rounded-lg outline-none bg-orange-100/50 text-foreground transition-all duration-300 ease-in-out focus:bg-white focus:border-primary focus:shadow-[0_0_5px_hsl(var(--primary)/0.5)]"
                                        />
                                    </div>
                                    <Button variant="outline"><Filter className="mr-2 h-4 w-4"/>Filter</Button>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline"><Download className="mr-2 h-4 w-4"/>Export</Button>
                                    <Dialog>
                                        <DialogTrigger asChild><Button className="bg-primary hover:bg-primary/90 text-white"><Plus className="mr-2 h-4 w-4"/>New Release</Button></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Create New Release</DialogTitle>
                                                <DialogDescription>Define a new version and start the rollout process.</DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <Input placeholder="Version (e.g., v2.6.0)" />
                                                <Textarea placeholder="Release notes (supports Markdown)..." />
                                            </div>
                                            <DialogFooter>
                                                <Button variant="outline">Cancel</Button>
                                                <Button className="bg-primary hover:bg-primary/90 text-white">Create Release</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            
                            <TabsContent value="releases">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Version</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Stage</TableHead>
                                            <TableHead>Health</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {releases.map((release) => (
                                        <TableRow key={release.id}>
                                            <TableCell className="font-semibold text-primary flex items-center gap-2"><GitCommit className="w-4 h-4"/>{release.id}</TableCell>
                                            <TableCell>{release.date}</TableCell>
                                            <TableCell><StatusBadge status={release.status} /></TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={100} className="w-24 h-2"/>
                                                    <span className="text-xs text-muted-foreground">{release.stage}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell><StatusBadge status={release.health} /></TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                                        <DropdownMenuItem>Pause Rollout</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-500">Rollback</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                             <TabsContent value="flags">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Flag Key</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Rollout %</TableHead>
                                            <TableHead>Conditions</TableHead>
                                            <TableHead>Last Modified</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {featureFlags.map((flag) => (
                                        <TableRow key={flag.id}>
                                            <TableCell className="font-semibold">{flag.id}</TableCell>
                                            <TableCell><Switch checked={flag.status !== 'Inactive'} /></TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={flag.rollout} className="w-24 h-2"/>
                                                    <span className="text-xs font-medium">{flag.rollout}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell><Badge variant="secondary">{flag.conditions}</Badge></TableCell>
                                            <TableCell>{flag.last_modified}</TableCell>
                                            <TableCell className="text-right">
                                                 <DropdownMenu>
                                                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                                        <DropdownMenuItem>Schedule</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-500">Kill Switch</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                             </TabsContent>
                             <TabsContent value="health">
                                 <Card>
                                     <CardHeader>
                                         <CardTitle>Release Health Telemetry (v2.5.1)</CardTitle>
                                         <CardDescription>Error rates and API latency over the past 4 hours.</CardDescription>
                                     </CardHeader>
                                     <CardContent>
                                          <ResponsiveContainer width="100%" height={250}>
                                            <AreaChart data={healthData}>
                                                <defs>
                                                    <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                                                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" axisLine={false} tickLine={false} fontSize={12} tickFormatter={(val) => `${val}ms`}/>
                                                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" axisLine={false} tickLine={false} fontSize={12} />
                                                <Tooltip content={({ active, payload, label }) => {
                                                    if (active && payload && payload.length) {
                                                        return (
                                                            <div className="bg-background border p-2 rounded-lg shadow-lg">
                                                                <p className="font-bold text-base">{label}</p>
                                                                <p style={{ color: payload[0].color }}>Latency: {payload[0].value}ms</p>
                                                                <p style={{ color: payload[1].color }}>Errors: {payload[1].value}</p>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}/>
                                                <Area yAxisId="left" type="monotone" dataKey="latency" stroke="hsl(var(--primary))" fill="url(#latencyGradient)" strokeWidth={2} />
                                                <Area yAxisId="right" type="monotone" dataKey="errors" stroke="#ff0000" fill="transparent" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                     </CardContent>
                                 </Card>
                             </TabsContent>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
