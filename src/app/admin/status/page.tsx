
'use client';

import React from 'react';
import {
  Server,
  Zap,
  Database,
  Cloud,
  Bot,
  MessageSquare,
  GitBranch,
  ShieldCheck,
  Power,
  ChevronDown,
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Bell,
  Settings,
  Download,
  Search,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

const systems = [
  { name: 'Web App', status: 'Operational', uptime: '99.98%', latency: '52ms', icon: <Server /> },
  { name: 'API', status: 'Operational', uptime: '99.99%', latency: '35ms', icon: <Zap /> },
  { name: 'Database', status: 'Operational', uptime: '99.99%', latency: '12ms', icon: <Database /> },
  { name: 'AI Model', status: 'Degraded Performance', uptime: '99.85%', latency: '240ms', icon: <Bot /> },
  { name: 'Messaging Queue', status: 'Operational', uptime: '99.97%', latency: '8ms', icon: <MessageSquare /> },
  { name: 'Integrations', status: 'Operational', uptime: '99.96%', latency: '150ms', icon: <GitBranch /> },
  { name: 'CDN', status: 'Operational', uptime: '100%', latency: '5ms', icon: <Cloud /> },
  { name: 'Authentication', status: 'Major Outage', uptime: '98.50%', latency: '500ms', icon: <ShieldCheck /> },
];

const incidents = [
    { id: 'INC-124', system: 'Authentication', severity: 'Critical', status: 'Investigating', duration: '5m', timestamp: '2m ago' },
    { id: 'INC-123', system: 'AI Model', severity: 'Minor', status: 'Monitoring', duration: '32m', timestamp: '1h ago' },
    { id: 'INC-122', system: 'API', severity: 'Minor', status: 'Resolved', duration: '5m', timestamp: '5h ago' },
];

const latencyData = [
  { time: '16:00', latency: 30 }, { time: '16:05', latency: 32 }, { time: '16:10', latency: 28 },
  { time: '16:15', latency: 45 }, { time: '16:20', latency: 52 }, { time: '16:25', latency: 50 },
];

const StatusBadge = ({ status } : { status: string }) => {
    const statusConfig : {[key:string]: {class: string, icon: React.ReactNode}} = {
        'Operational': { class: 'bg-green-100 text-green-800', icon: <CheckCircle2 className="w-3 h-3"/> },
        'Degraded Performance': { class: 'bg-orange-100 text-orange-800', icon: <AlertTriangle className="w-3 h-3"/> },
        'Major Outage': { class: 'bg-red-100 text-red-800 animate-pulse', icon: <XCircle className="w-3 h-3"/> },
    }
    const config = statusConfig[status] || { class: 'bg-gray-100 text-gray-800', icon: null };
    return <Badge className={`gap-1.5 ${config.class}`}>{config.icon}{status}</Badge>;
}

const SeverityBadge = ({ severity } : { severity: string }) => {
    const severityConfig : {[key:string]: string} = {
        'Critical': 'bg-red-100 text-red-800',
        'High': 'bg-orange-100 text-orange-800',
        'Minor': 'bg-yellow-100 text-yellow-800',
    }
    return <Badge variant="outline" className={severityConfig[severity] || 'bg-gray-100'}>{severity}</Badge>;
}

const SystemCard = ({ name, status, uptime, latency, icon } : { name: string, status: string, uptime: string, latency: string, icon: React.ReactNode }) => {
    const statusColors : {[key: string]: string} = {
        'Operational': 'border-green-300 bg-green-50/50',
        'Degraded Performance': 'border-orange-300 bg-orange-50/50',
        'Major Outage': 'border-red-400 bg-red-50/50 animate-pulse',
    }
    return (
        <Card className={`shadow-sm ${statusColors[status] || 'border-gray-200'}`}>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <div className="p-2 bg-orange-100/80 text-primary rounded-lg">{icon}</div> {name}
                </CardTitle>
                <div className="text-right">
                    <StatusBadge status={status} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-baseline text-sm text-muted-foreground">
                   <div className="flex flex-col">
                     <span className="text-xs">Uptime (30d)</span>
                     <span className="font-semibold text-foreground">{uptime}</span>
                   </div>
                   <div className="flex flex-col text-right">
                     <span className="text-xs">Avg. Latency</span>
                     <span className="font-semibold text-foreground">{latency}</span>
                   </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function AdminStatusPage() {
    const isOutage = systems.some(s => s.status.includes('Outage'));
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2"><Power className="w-8 h-8 text-primary"/> System Status</h1>
                    <p className="text-muted-foreground">Monitor the health and performance of all platform services.</p>
                </div>
                <div className="flex gap-2">
                     <Button variant="outline"><Bell className="mr-2 h-4 w-4"/>Subscribe to Updates</Button>
                     <Button variant="outline"><Settings className="mr-2 h-4 w-4"/>Alert Settings</Button>
                </div>
            </div>

            {isOutage ? (
                 <div className="p-4 bg-red-100 border-l-4 border-red-500 rounded-r-lg flex items-center gap-3">
                    <XCircle className="w-6 h-6 text-red-600" />
                    <div>
                        <h4 className="font-bold text-red-800">Major Outage Detected</h4>
                        <p className="text-sm text-red-900/80">We are currently investigating a major outage impacting the Authentication service. <a href="#" className="font-semibold underline">View incident</a></p>
                    </div>
                </div>
            ) : (
                <div className="p-4 bg-green-100 border-l-4 border-green-500 rounded-r-lg flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <div>
                        <h4 className="font-bold text-green-800">All Systems Operational</h4>
                        <p className="text-sm text-green-900/80">No incidents or maintenance to report.</p>
                    </div>
                </div>
            )}
           

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {systems.map(system => <SystemCard key={system.name} {...system} />)}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Incidents</CardTitle>
                    <CardDescription>Recent and ongoing service incidents.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="all">
                        <TabsList className="mb-4">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                            <TabsTrigger value="resolved">Resolved</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>System</TableHead>
                                        <TableHead>Severity</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead>Started</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {incidents.map(inc => (
                                        <TableRow key={inc.id} className="cursor-pointer hover:bg-muted/50">
                                            <TableCell className="font-medium text-primary">{inc.system}</TableCell>
                                            <TableCell><SeverityBadge severity={inc.severity} /></TableCell>
                                            <TableCell>{inc.status}</TableCell>
                                            <TableCell>{inc.duration}</TableCell>
                                            <TableCell>{inc.timestamp}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Real-time API Performance</CardTitle>
                    <CardDescription>API latency over the last 30 minutes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={latencyData}>
                            <defs>
                                <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="time" axisLine={false} tickLine={false} fontSize={12} />
                            <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={(val) => `${val}ms`} />
                            <Tooltip content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-background border p-2 rounded-lg shadow-lg">
                                            <p className="font-bold text-base">{payload[0].value} ms</p>
                                            <p className="text-sm text-muted-foreground">{`At ${label}`}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}/>
                            <Area type="monotone" dataKey="latency" stroke="hsl(var(--primary))" fill="url(#latencyGradient)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

        </div>
    );
}

    
