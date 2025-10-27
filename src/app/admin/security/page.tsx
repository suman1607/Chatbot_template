
'use client';

import React from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ChevronDown,
  Lock,
  History,
  FileText,
  Bell,
  AlertTriangle,
  Fingerprint,
  UserCheck,
  ToggleLeft,
  ToggleRight,
  Computer,
  Calendar,
  KeyRound,
  Eye,
  Plus
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
import { Switch } from '@/components/ui/switch';

const auditLogs = [
    { id: 'log-01', user: 'Admin User', action: 'Broadcast Sent', details: 'Sent "New Features v2.5"', ip: '192.168.1.1', time: '15m ago', status: 'Success' },
    { id: 'log-02', user: 'Jane Doe', action: 'User Role Changed', details: 'Promoted john.smith@example.com to Admin', ip: '203.0.113.24', time: '1h ago', status: 'Success' },
    { id: 'log-03', user: 'Admin User', action: 'Failed Login Attempt', details: 'From unknown IP', ip: '104.28.212.128', time: '3h ago', status: 'Failure' },
];

const securitySettings = [
    { key: '2fa_required', label: 'Require 2FA for all admins', enabled: true },
    { key: 'session_timeout', label: 'Session inactivity timeout (minutes)', value: '30' },
    { key: 'password_expiry', label: 'Password expiry (days)', value: '90' },
];

const activeSessions = [
    { device: 'Chrome on macOS', location: 'New York, USA', ip: '192.168.1.1', lastSeen: 'Active now' },
    { device: 'Admin API Key', location: 'Server (GCP)', ip: '35.232.15.11', lastSeen: '2m ago' },
    { device: 'Safari on iPhone', location: 'Remote', ip: '172.58.10.45', lastSeen: '3h ago' },
];

const roles = [
    { role: 'Super Admin', permissions: ['Full Access', 'Can Manage Billing'] },
    { role: 'Support Lead', permissions: ['Manage Tickets', 'Edit Users'] },
    { role: 'Developer', permissions: ['API Access', 'Manage Integrations'] },
]

const StatusBadge = ({ status } : { status: string }) => {
    const colors: {[key: string]: string} = {
        'Success': 'bg-green-100 text-green-800',
        'Failure': 'bg-red-100 text-red-800',
    }
    return <Badge variant="outline" className={colors[status]}>{status}</Badge>
}

export default function AdminSecurityPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2"><ShieldCheck className="w-8 h-8 text-primary"/> Security & Audit</h1>
                    <p className="text-muted-foreground">Monitor security events, manage access, and view audit trails.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><Download className="mr-2 h-4 w-4"/>Export Logs</Button>
                    <Button className="bg-primary hover:bg-primary/90 text-white"><AlertTriangle className="mr-2 h-4 w-4"/>Report Incident</Button>
                </div>
            </div>

             <div className="p-4 bg-orange-50 border-l-4 border-primary rounded-r-lg flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-primary" />
                <div>
                    <h4 className="font-bold text-primary">High-Priority Alert</h4>
                    <p className="text-sm text-orange-900/80">3 failed login attempts from an unrecognized IP address. <a href="#" className="font-semibold underline">Review now</a></p>
                </div>
            </div>
            
            <Tabs defaultValue="audit_log">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="audit_log"><History className="mr-2 h-4 w-4"/>Audit Log</TabsTrigger>
                    <TabsTrigger value="settings"><Lock className="mr-2 h-4 w-4"/>Access Control</TabsTrigger>
                    <TabsTrigger value="sessions"><Fingerprint className="mr-2 h-4 w-4"/>Active Sessions</TabsTrigger>
                    <TabsTrigger value="compliance"><FileText className="mr-2 h-4 w-4"/>Compliance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="audit_log" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Security Events</CardTitle>
                            <CardDescription>A log of important activities across the platform.</CardDescription>
                            <div className="flex gap-2 pt-2">
                                <div className="group relative max-w-sm">
                                    <Search className="icon absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-900/60" />
                                    <Input 
                                        placeholder="Search logs..."
                                        className="h-11 w-full pl-10 pr-4 border-2 border-transparent rounded-lg outline-none bg-orange-100/50 text-foreground transition-all duration-300 ease-in-out focus:bg-white focus:border-primary focus:shadow-[0_0_5px_hsl(var(--primary)/0.5)]"
                                    />
                                </div>
                                <Button variant="outline"><Filter className="mr-2 h-4 w-4"/>Filter</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Action</TableHead>
                                        <TableHead>Details</TableHead>
                                        <TableHead>IP Address</TableHead>
                                        <TableHead>Time</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Context</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {auditLogs.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell className="font-semibold">{log.user}</TableCell>
                                        <TableCell>{log.action}</TableCell>
                                        <TableCell className="text-muted-foreground">{log.details}</TableCell>
                                        <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                                        <TableCell>{log.time}</TableCell>
                                        <TableCell><StatusBadge status={log.status} /></TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon"><Eye className="h-4 w-4"/></Button>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Roles & Permissions</CardTitle>
                                <CardDescription>Define what each role can see and do.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader><TableRow><TableHead>Role</TableHead><TableHead>Permissions</TableHead></TableRow></TableHeader>
                                    <TableBody>
                                        {roles.map(r => (
                                            <TableRow key={r.role}>
                                                <TableCell className="font-semibold">{r.role}</TableCell>
                                                <TableCell className="flex flex-wrap gap-1">
                                                    {r.permissions.map(p => <Badge key={p} variant="secondary">{p}</Badge>)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Button variant="outline" className="mt-4 w-full"><Plus className="mr-2 h-4 w-4"/>New Role</Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Global Security Policies</CardTitle>
                                <CardDescription>Manage security settings for all admins.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {securitySettings.map(setting => (
                                <div key={setting.key} className="flex items-center justify-between p-3 border rounded-lg">
                                    <label htmlFor={setting.key} className="text-sm font-medium">{setting.label}</label>
                                    {setting.value ? (
                                        <Input id={setting.key} defaultValue={setting.value} className="w-24"/>
                                    ) : (
                                        <Switch id={setting.key} checked={setting.enabled} />
                                    )}
                                </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                 <TabsContent value="sessions" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Active Sessions</CardTitle>
                            <CardDescription>Monitor and manage all active administrator sessions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Device & Location</TableHead>
                                        <TableHead>IP Address</TableHead>
                                        <TableHead>Last Seen</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {activeSessions.map((session) => (
                                    <TableRow key={session.device}>
                                        <TableCell>
                                            <p className="font-semibold flex items-center gap-2">
                                                {session.device.includes('API') ? <KeyRound className="h-4 w-4 text-muted-foreground"/> : <Computer className="h-4 w-4 text-muted-foreground"/>}
                                                {session.device}
                                            </p>
                                            <p className="text-xs text-muted-foreground ml-6">{session.location}</p>
                                        </TableCell>
                                        <TableCell className="font-mono text-xs">{session.ip}</TableCell>
                                        <TableCell>{session.lastSeen}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="destructive" size="sm">Revoke</Button>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                 </TabsContent>

                 <TabsContent value="compliance" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Compliance Status</CardTitle>
                            <CardDescription>View and download compliance reports.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-lg">SOC 2 Type II</p>
                                    <p className="text-sm text-green-600">Certified</p>
                                </div>
                                <Button variant="outline">Download Report</Button>
                            </Card>
                             <Card className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-lg">GDPR</p>
                                    <p className="text-sm text-green-600">Compliant</p>
                                </div>
                                <Button variant="outline">View DPA</Button>
                            </Card>
                        </CardContent>
                    </Card>
                 </TabsContent>
            </Tabs>
        </div>
    );
}

