
'use client';

import React, { useState } from 'react';
import {
  GitBranch,
  KeyRound,
  Plus,
  MoreHorizontal,
  Copy,
  Trash2,
  RefreshCw,
  Search,
  Book,
  Webhook,
  Settings,
  Bell,
  CheckCircle,
  AlertTriangle,
  FileText,
  Eye,
  EyeOff
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
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const apiKeys = [
    { name: 'Primary Server Key', key: 'sk_live_xxxxxxxxxx1234', scopes: ['read:all', 'write:users'], created: '2023-01-15', lastUsed: '2 hours ago', status: 'Active' },
    { name: 'Analytics Service Key', key: 'sk_live_xxxxxxxxxx5678', scopes: ['read:analytics'], created: '2023-03-10', lastUsed: '15 minutes ago', status: 'Active' },
    { name: 'External Partner API', key: 'sk_live_xxxxxxxxxx9012', scopes: ['read:limited'], created: '2022-11-20', lastUsed: '2 months ago', status: 'Expired' },
];

const integrations = [
    { name: 'Slack', category: 'Productivity', description: 'Send notifications to Slack channels.', connected: true, logo: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg' },
    { name: 'Zapier', category: 'Automation', description: 'Connect to thousands of apps.', connected: false, logo: 'https://cdn.worldvectorlogo.com/logos/zapier.svg' },
    { name: 'HubSpot', category: 'CRM', description: 'Sync contacts and conversations.', connected: false, logo: 'https://cdn.worldvectorlogo.com/logos/hubspot.svg' },
    { name: 'Stripe', category: 'Payments', description: 'Manage billing and subscriptions.', connected: true, logo: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg' },
];

const webhooks = [
    { event: 'user.created', url: 'https://api.example.com/webhooks/users', status: 'Active', retries: 3 },
    { event: 'payment.failed', url: 'https://api.example.com/webhooks/payments', status: 'Failing', retries: 0 },
]

export default function AdminIntegrationsPage() {
    const { toast } = useToast();
    const [showKey, setShowKey] = useState<string | null>(null);

    const copyToClipboard = (text: string, name: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copied!", description: `API Key for "${name}" copied to clipboard.` });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2"><GitBranch className="w-8 h-8 text-primary"/> API & Integrations</h1>
                    <p className="text-muted-foreground">Manage API keys, webhooks, and third-party connections.</p>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Tabs defaultValue="api_keys">
                        <TabsList className="p-4 border-b w-full justify-start bg-transparent rounded-none">
                            <TabsTrigger value="api_keys"><KeyRound className="mr-2 h-4 w-4"/>API Keys</TabsTrigger>
                            <TabsTrigger value="webhooks"><Webhook className="mr-2 h-4 w-4"/>Webhooks</TabsTrigger>
                            <TabsTrigger value="marketplace"><Settings className="mr-2 h-4 w-4"/>Integrations</TabsTrigger>
                            <TabsTrigger value="docs"><Book className="mr-2 h-4 w-4"/>Documentation</TabsTrigger>
                        </TabsList>
                        
                        <div className="p-6">
                            <TabsContent value="api_keys">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg">API Keys</h3>
                                        <p className="text-muted-foreground text-sm">Manage API access for your applications and services.</p>
                                    </div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="bg-primary hover:bg-primary/90 text-white"><Plus className="mr-2 h-4 w-4"/>Create API Key</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Create New API Key</DialogTitle>
                                                <DialogDescription>Assign a name and select permissions for your new key.</DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <Input placeholder="Key Name (e.g., 'Production Server')" />
                                                <div className="space-y-2">
                                                    <p className="font-medium text-sm">Scopes</p>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="flex items-center gap-2"><Checkbox id="read:all" /><label htmlFor="read:all">read:all</label></div>
                                                        <div className="flex items-center gap-2"><Checkbox id="write:users" /><label htmlFor="write:users">write:users</label></div>
                                                        <div className="flex items-center gap-2"><Checkbox id="read:analytics" /><label htmlFor="read:analytics">read:analytics</label></div>
                                                        <div className="flex items-center gap-2"><Checkbox id="write:billing" /><label htmlFor="write:billing">write:billing</label></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button variant="outline">Cancel</Button>
                                                <Button className="bg-primary hover:bg-primary/90 text-white">Create Key</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Key</TableHead>
                                            <TableHead>Scopes</TableHead>
                                            <TableHead>Last Used</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {apiKeys.map((key) => (
                                        <TableRow key={key.key}>
                                            <TableCell>
                                                <p className="font-semibold">{key.name}</p>
                                                <div className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                                                    {showKey === key.key ? key.key : `sk_live_...${key.key.slice(-4)}`}
                                                    <button onClick={() => setShowKey(showKey === key.key ? null : key.key)}>
                                                        {showKey === key.key ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                                    </button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-xs">
                                                <div className="flex flex-wrap gap-1">
                                                    {key.scopes.map(s => <Badge key={s} variant="outline" className="bg-orange-100 text-primary border-primary/50">{s}</Badge>)}
                                                </div>
                                            </TableCell>
                                            <TableCell>{key.lastUsed}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => copyToClipboard(key.key, key.name)}><Copy className="mr-2 h-4 w-4"/>Copy Key</DropdownMenuItem>
                                                        <DropdownMenuItem><RefreshCw className="mr-2 h-4 w-4"/>Rotate Key</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-500 hover:!text-red-500 hover:!bg-red-50"><Trash2 className="mr-2 h-4 w-4"/>Revoke Key</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                            <TabsContent value="webhooks">
                                <div className="flex justify-between items-center mb-4">
                                     <div>
                                        <h3 className="font-bold text-lg">Webhooks</h3>
                                        <p className="text-muted-foreground text-sm">Send real-time data to external services.</p>
                                    </div>
                                    <Button className="bg-primary hover:bg-primary/90 text-white"><Plus className="mr-2 h-4 w-4"/>Add Webhook</Button>
                                </div>
                                <Table>
                                    <TableHeader><TableRow><TableHead>Event</TableHead><TableHead>URL</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                                    <TableBody>
                                        {webhooks.map(hook => (
                                        <TableRow key={hook.url}>
                                            <TableCell><Badge variant="secondary">{hook.event}</Badge></TableCell>
                                            <TableCell className="font-mono text-sm">{hook.url}</TableCell>
                                            <TableCell>
                                                <Badge className={hook.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                                    {hook.status === 'Active' ? <CheckCircle className="w-3 h-3 mr-1"/> : <AlertTriangle className="w-3 h-3 mr-1"/>}
                                                    {hook.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell><Button variant="outline" size="sm">Test</Button></TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                            <TabsContent value="marketplace">
                                 <div>
                                    <h3 className="font-bold text-lg">Integrations Marketplace</h3>
                                    <p className="text-muted-foreground text-sm">Connect your favorite apps to extend your workflow.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                    {integrations.map(int => (
                                        <Card key={int.name} className="flex flex-col">
                                            <CardHeader className="flex flex-row items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <img src={int.logo} alt={`${int.name} logo`} className="w-10 h-10"/>
                                                    <CardTitle className="text-lg">{int.name}</CardTitle>
                                                </div>
                                                <Badge variant={int.connected ? 'default' : 'outline'} className={int.connected ? 'bg-green-100 text-green-800 border-green-200' : ''}>{int.connected ? 'Connected' : 'Not Connected'}</Badge>
                                            </CardHeader>
                                            <CardContent className="flex-grow">
                                                <CardDescription>{int.description}</CardDescription>
                                            </CardContent>
                                            <CardContent>
                                                <Button variant={int.connected ? "secondary" : "outline"} className="w-full">
                                                    {int.connected ? "Manage" : "Connect"}
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                             <TabsContent value="docs">
                                <h3 className="font-bold text-lg mb-4">API Documentation</h3>
                                <div className="space-y-4">
                                    <Card className="hover:shadow-md transition-shadow">
                                        <CardHeader>
                                            <CardTitle className="text-base">REST API Reference</CardTitle>
                                            <CardDescription>Explore all available API endpoints, parameters, and responses.</CardDescription>
                                            <Button variant="link" className="p-0 justify-start">Go to API Docs <GitBranch className="ml-2 h-4 w-4"/></Button>
                                        </CardHeader>
                                    </Card>
                                     <Card className="hover:shadow-md transition-shadow">
                                        <CardHeader>
                                            <CardTitle className="text-base">Quickstart Guide</CardTitle>
                                            <CardDescription>Get up and running with our API in minutes with this step-by-step guide.</CardDescription>
                                            <Button variant="link" className="p-0 justify-start">View Quickstart <FileText className="ml-2 h-4 w-4"/></Button>
                                        </CardHeader>
                                    </Card>
                                </div>
                                <h3 className="font-bold text-lg mt-8 mb-4">Code Sample: Authenticating a Request</h3>
                                <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-xs">
                                    <pre>
                                        <code>
{`fetch('https://api.chatgenius.com/v1/users', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
                                        </code>
                                    </pre>
                                </div>
                             </TabsContent>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}

    