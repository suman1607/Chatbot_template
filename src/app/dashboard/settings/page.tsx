
'use client';

import React from 'react';
import {
  User,
  Paintbrush,
  Users,
  Shield,
  Plug,
  Save,
  Building,
  Mail,
  Clock,
  Globe,
  Bell,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const timezones = [
  'GMT-12:00', 'GMT-11:00', 'GMT-10:00', 'GMT-09:00', 'GMT-08:00', 
  'GMT-07:00', 'GMT-06:00', 'GMT-05:00', 'GMT-04:00', 'GMT-03:00', 
  'GMT-02:00', 'GMT-01:00', 'GMT+00:00', 'GMT+01:00', 'GMT+02:00',
  'GMT+03:00', 'GMT+04:00', 'GMT+05:00', 'GMT+06:00', 'GMT+07:00',
  'GMT+08:00', 'GMT+09:00', 'GMT+10:00', 'GMT+11:00', 'GMT+12:00',
];

const loggedDevices = [
    { device: "Chrome on macOS", location: "New York, USA", last_seen: "2 hours ago" },
    { device: "Safari on iPhone", location: "San Francisco, USA", last_seen: "1 day ago" },
    { device: "Firefox on Windows", location: "London, UK", last_seen: "3 days ago" },
];

const integrations = [
    { name: "Slack", description: "Send chat notifications to Slack channels.", connected: true },
    { name: "Zapier", description: "Connect ChatGenius to thousands of apps.", connected: false },
    { name: "HubSpot", description: "Sync contacts and conversations with your CRM.", connected: false },
];


export default function SettingsPage() {
    const [apiKey, setApiKey] = React.useState('****************************');
    const [showApiKey, setShowApiKey] = React.useState(false);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your workspace, branding, and integration settings.
        </p>
      </div>

      <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-8">
        <TabsList className="flex flex-row md:flex-col h-auto md:h-full justify-start bg-transparent p-0 w-full md:w-1/5">
          <TabsTrigger value="profile" className="w-full justify-start text-base px-4 py-3 data-[state=active]:bg-accent data-[state=active]:text-primary data-[state=active]:shadow-none">
            <User className="w-5 h-5 mr-3" /> Profile
          </TabsTrigger>
          <TabsTrigger value="appearance" className="w-full justify-start text-base px-4 py-3 data-[state=active]:bg-accent data-[state=active]:text-primary data-[state=active]:shadow-none">
            <Paintbrush className="w-5 h-5 mr-3" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="team" className="w-full justify-start text-base px-4 py-3 data-[state=active]:bg-accent data-[state=active]:text-primary data-[state=active]:shadow-none">
            <Users className="w-5 h-5 mr-3" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="w-full justify-start text-base px-4 py-3 data-[state=active]:bg-accent data-[state=active]:text-primary data-[state=active]:shadow-none">
            <Shield className="w-5 h-5 mr-3" /> Security
          </TabsTrigger>
          <TabsTrigger value="integrations" className="w-full justify-start text-base px-4 py-3 data-[state=active]:bg-accent data-[state=active]:text-primary data-[state=active]:shadow-none">
            <Plug className="w-5 h-5 mr-3" /> Integrations
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1">
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">Workspace Profile</CardTitle>
                <CardDescription>Update your workspace details and branding.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="font-medium">Workspace Name</label>
                        <Input defaultValue="My Awesome Corp" />
                    </div>
                    <div className="space-y-2">
                        <label className="font-medium">Workspace URL</label>
                        <div className="flex items-center">
                            <span className="px-3 py-2 bg-gray-100 border border-r-0 rounded-l-md text-sm text-muted-foreground">chatgenius.io/</span>
                            <Input defaultValue="my-awesome-corp" className="rounded-l-none" />
                        </div>
                    </div>
                </div>
                 <div className="space-y-2">
                    <label className="font-medium">Workspace Logo</label>
                    <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                            <AvatarImage src="https://picsum.photos/seed/logo/64/64" />
                            <AvatarFallback><Building/></AvatarFallback>
                        </Avatar>
                        <Button variant="outline">Upload Logo</Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="font-medium">Time Zone</label>
                        <Select defaultValue="GMT-05:00">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {timezones.map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="font-medium">Default Language</label>
                         <Select defaultValue="en">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <div className="pt-4 flex justify-end">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90"><Save className="w-4 h-4 mr-2"/>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="appearance">
             <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary">Branding & Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of your chat widgets.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <label className="font-medium">Brand Colors</label>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <input type="color" defaultValue="#F97316" className="w-10 h-10 rounded-md border-none cursor-pointer" />
                                <span className="text-sm">Primary</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="color" defaultValue="#FB923C" className="w-10 h-10 rounded-md border-none cursor-pointer" />
                                <span className="text-sm">Accent</span>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90"><Save className="w-4 h-4 mr-2"/>Save Changes</Button>
                    </div>
                </CardContent>
             </Card>
          </TabsContent>
          <TabsContent value="team">
             <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary">Notification Settings</CardTitle>
                    <CardDescription>Manage how your team receives notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold">New Chat Alerts</h4>
                                <p className="text-sm text-muted-foreground">Notify when a new conversation is started.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold">Missed Chat Alerts</h4>
                                <p className="text-sm text-muted-foreground">Notify when a chat is missed by an agent.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                         <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold">Daily Summary Report</h4>
                                <p className="text-sm text-muted-foreground">Send a daily performance summary email.</p>
                            </div>
                            <Switch />
                        </div>
                    </div>
                     <div className="pt-4 flex justify-end">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90"><Save className="w-4 h-4 mr-2"/>Save Changes</Button>
                    </div>
                </CardContent>
             </Card>
          </TabsContent>
          <TabsContent value="security">
             <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary">Security</CardTitle>
                    <CardDescription>Manage your account security settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <label className="font-medium">Change Password</label>
                        <Input type="password" placeholder="Current password"/>
                        <Input type="password" placeholder="New password"/>
                        <Input type="password" placeholder="Confirm new password"/>
                    </div>
                    <Separator/>
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium">Two-Factor Authentication (2FA)</h4>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                        </div>
                        <Button variant="outline">Enable 2FA</Button>
                    </div>
                     <Separator/>
                     <div>
                        <h4 className="font-medium mb-2">Logged-in Devices</h4>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Device</TableHead>
                                    <TableHead>Last Seen</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loggedDevices.map(d => (
                                <TableRow key={d.device}>
                                    <TableCell>
                                        <p className="font-medium">{d.device}</p>
                                        <p className="text-xs text-muted-foreground">{d.location}</p>
                                    </TableCell>
                                    <TableCell>{d.last_seen}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">Revoke</Button>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                     </div>
                     <div className="pt-4 flex justify-end">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90"><Save className="w-4 h-4 mr-2"/>Save Changes</Button>
                    </div>
                </CardContent>
             </Card>
          </TabsContent>
           <TabsContent value="integrations">
             <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary">API & Integrations</CardTitle>
                    <CardDescription>Connect ChatGenius with your other tools.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h4 className="font-medium mb-2">API Key</h4>
                        <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md">
                            <Input readOnly value={showApiKey ? "cg_live_xxxxxxxxxxxxxxxxxxxx" : apiKey} className="border-none bg-transparent shadow-none font-mono" />
                            <Button variant="ghost" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                            <Button variant="ghost" size="icon"><Copy className="w-4 h-4"/></Button>
                        </div>
                    </div>
                     <Separator/>
                     <div>
                        <h4 className="font-medium mb-2">Integrations</h4>
                        <div className="space-y-4">
                            {integrations.map(int => (
                                <div key={int.name} className="flex items-start justify-between p-4 border rounded-lg">
                                    <div>
                                        <h5 className="font-semibold">{int.name}</h5>
                                        <p className="text-sm text-muted-foreground">{int.description}</p>
                                    </div>
                                    <Button variant={int.connected ? 'secondary' : 'outline'}>
                                        {int.connected ? 'Manage' : 'Connect'}
                                    </Button>
                                </div>
                            ))}
                        </div>
                     </div>
                </CardContent>
             </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

    