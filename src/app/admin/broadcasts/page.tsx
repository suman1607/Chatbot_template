
'use client';

import React, { useState } from 'react';
import {
  Send,
  Plus,
  Search,
  Filter,
  Users,
  Eye,
  Edit,
  Copy,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  ChevronDown,
  BarChart2,
  Inbox,
  Mail,
  Smartphone,
  Globe,
  Settings,
  Archive,
  FileText
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
} from "@/components/ui/tabs";
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

const broadcasts = [
  { id: 'BCST-012', title: "New AI Features Rollout", status: 'Sent', sent_at: '2024-06-15', audience: 'Pro Plan Users', delivery: { sent: 1250, delivered: 1245, opens: '75%', clicks: '15%' } },
  { id: 'BCST-011', title: "Scheduled Maintenance", status: 'Scheduled', sent_at: '2024-06-20 10pm', audience: 'All Users', delivery: { sent: 8400, delivered: 0, opens: '0%', clicks: '0%' } },
  { id: 'BCST-010', title: "Holiday Greetings", status: 'Draft', sent_at: '-', audience: 'EU Region', delivery: { sent: 0, delivered: 0, opens: '0%', clicks: '0%' } },
];

const openRateData = [
  { time: '1h', rate: 25 },
  { time: '2h', rate: 45 },
  { time: '4h', rate: 60 },
  { time: '8h', rate: 70 },
  { time: '12h', rate: 75 },
];


const StatusBadge = ({ status }: { status: string }) => {
    const colors: {[key:string]: string} = {
        'Sent': 'bg-green-100 text-green-800',
        'Scheduled': 'bg-blue-100 text-blue-800',
        'Draft': 'bg-gray-100 text-gray-800',
        'Sending': 'bg-orange-100 text-orange-800 animate-pulse',
    };
    return <Badge variant="outline" className={colors[status]}>{status}</Badge>;
}

export default function AdminBroadcastsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2"><Send className="w-8 h-8 text-primary"/> Broadcasts</h1>
                    <p className="text-muted-foreground">Compose, schedule, and analyze platform announcements.</p>
                </div>
                 <Dialog>
                    <DialogTrigger asChild><Button className="bg-primary hover:bg-primary/90 text-white"><Plus className="mr-2 h-4 w-4"/>New Broadcast</Button></DialogTrigger>
                    <DialogContent className="max-w-4xl">
                        <DialogHeader>
                            <DialogTitle>Create New Broadcast</DialogTitle>
                            <DialogDescription>Compose your message and select your audience.</DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                            <div className="space-y-4">
                                <Input placeholder="Broadcast Title (internal)" />
                                <Input placeholder="Email Subject / Notification Title" />
                                <Textarea placeholder="Message body... Supports Markdown." className="min-h-[200px]" />
                                <Input placeholder="CTA Button Text" />
                                <Input placeholder="CTA Button URL" />
                            </div>
                            <div className="space-y-4">
                                <Card>
                                    <CardHeader><CardTitle>Audience</CardTitle></CardHeader>
                                    <CardContent>
                                        <Select>
                                            <SelectTrigger><SelectValue placeholder="Select a segment..." /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Users</SelectItem>
                                                <SelectItem value="pro">Pro Plan Users</SelectItem>
                                                <SelectItem value="trial">Trial Users</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-sm text-muted-foreground mt-2">Estimated recipients: ~1,250</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader><CardTitle>Channels</CardTitle></CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email</div>
                                        <div className="flex items-center gap-2"><Inbox className="w-4 h-4" /> In-App Banner</div>
                                        <div className="flex items-center gap-2"><Smartphone className="w-4 h-4" /> In-App Modal</div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Save as Draft</Button>
                            <Button className="bg-primary hover:bg-primary/90 text-white">Schedule or Send</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Tabs defaultValue="sent">
                        <TabsList className="p-4 border-b w-full justify-start bg-transparent rounded-none">
                            <TabsTrigger value="sent"><CheckCircle className="mr-2 h-4 w-4"/>Sent</TabsTrigger>
                            <TabsTrigger value="scheduled"><Clock className="mr-2 h-4 w-4"/>Scheduled</TabsTrigger>
                            <TabsTrigger value="drafts"><FileText className="mr-2 h-4 w-4"/>Drafts</TabsTrigger>
                            <TabsTrigger value="archive"><Archive className="mr-2 h-4 w-4"/>Archive</TabsTrigger>
                        </TabsList>
                        
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex gap-2">
                                     <div className="group relative max-w-sm">
                                        <Search className="icon absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-900/60" />
                                        <Input 
                                            placeholder="Search broadcasts..."
                                            className="h-11 w-full pl-10 pr-4 border-2 border-transparent rounded-lg outline-none bg-orange-100/50 text-foreground transition-all duration-300 ease-in-out focus:bg-white focus:border-primary focus:shadow-[0_0_5px_hsl(var(--primary)/0.5)]"
                                        />
                                    </div>
                                    <Button variant="outline"><Filter className="mr-2 h-4 w-4"/>Filter</Button>
                                </div>
                            </div>
                            
                            <TabsContent value="sent">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Sent At</TableHead>
                                            <TableHead>Audience</TableHead>
                                            <TableHead>Delivered</TableHead>
                                            <TableHead>Open Rate</TableHead>
                                            <TableHead>Click Rate</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {broadcasts.filter(b => b.status === 'Sent').map((broadcast) => (
                                        <TableRow key={broadcast.id}>
                                            <TableCell className="font-semibold">{broadcast.title}</TableCell>
                                            <TableCell><StatusBadge status={broadcast.status} /></TableCell>
                                            <TableCell>{broadcast.sent_at}</TableCell>
                                            <TableCell>{broadcast.audience}</TableCell>
                                            <TableCell>{broadcast.delivery.delivered} / {broadcast.delivery.sent}</TableCell>
                                            <TableCell className="font-medium text-primary">{broadcast.delivery.opens}</TableCell>
                                            <TableCell>{broadcast.delivery.clicks}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem><BarChart2 className="mr-2 h-4 w-4"/>View Analytics</DropdownMenuItem>
                                                        <DropdownMenuItem><Copy className="mr-2 h-4 w-4"/>Duplicate</DropdownMenuItem>
                                                        <DropdownMenuItem><Archive className="mr-2 h-4 w-4"/>Archive</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Analytics for "New AI Features Rollout"</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={openRateData}>
                             <defs>
                                <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="time" axisLine={false} tickLine={false} fontSize={12} />
                            <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={(val) => `${val}%`} />
                            <Tooltip content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-background border p-2 rounded-lg shadow-lg">
                                            <p className="font-bold text-base">{payload[0].value}% Open Rate</p>
                                            <p className="text-sm text-muted-foreground">{`After ${label}`}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}/>
                            <Area type="monotone" dataKey="rate" stroke="hsl(var(--primary))" fill="url(#rateGradient)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}

    