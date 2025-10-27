
'use client';

import React from 'react';
import {
  User,
  Paintbrush,
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
  Plus,
  Settings as SettingsIcon,
  Palette,
  Power,
  Server,
  Wrench,
  Sparkles
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


export default function AdminSettingsPage() {
    const [apiKey, setApiKey] = React.useState('****************************');
    const [showApiKey, setShowApiKey] = React.useState(false);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
            <SettingsIcon className="w-8 h-8 text-primary"/>
            Platform Settings
        </h1>
        <p className="text-muted-foreground">
          Manage global configuration for your SaaS application.
        </p>
      </div>

      <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-8 items-start">
        <TabsList className="flex flex-row md:flex-col h-auto md:h-full justify-start bg-transparent p-0 w-full md:w-1/5">
          <TabsTrigger value="profile" className="w-full justify-start text-base px-4 py-3 data-[state=active]:bg-orange-50 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:font-bold">
            <Building className="w-5 h-5 mr-3" /> Profile
          </TabsTrigger>
          <TabsTrigger value="branding" className="w-full justify-start text-base px-4 py-3 data-[state=active]:bg-orange-50 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:font-bold">
            <Palette className="w-5 h-5 mr-3" /> Branding
          </TabsTrigger>
          <TabsTrigger value="security" className="w-full justify-start text-base px-4 py-3 data-[state=active]:bg-orange-50 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:font-bold">
            <Shield className="w-5 h-5 mr-3" /> Security
          </TabsTrigger>
          <TabsTrigger value="communication" className="w-full justify-start text-base px-4 py-3 data-[state=active]:bg-orange-50 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:font-bold">
            <Mail className="w-5 h-5 mr-3" /> Communication
          </TabsTrigger>
           <TabsTrigger value="integrations" className="w-full justify-start text-base px-4 py-3 data-[state=active]:bg-orange-50 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:font-bold">
            <Plug className="w-5 h-5 mr-3" /> Integrations
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1">
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Platform Profile</CardTitle>
                <CardDescription>Update your global platform details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="font-medium">Platform Name</label>
                        <Input defaultValue="ChatGenius" />
                    </div>
                    <div className="space-y-2">
                        <label className="font-medium">Primary Domain</label>
                        <Input defaultValue="chatgenius.com" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <label className="font-medium">Company Logo</label>
                    <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                            <AvatarImage src="/placeholder.svg?text=CG" />
                            <AvatarFallback><Building/></AvatarFallback>
                        </Avatar>
                        <Button variant="outline">Upload Logo</Button>
                         <Button variant="outline">Upload Favicon</Button>
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
          <TabsContent value="branding">
             <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Branding & UI Defaults</CardTitle>
                    <CardDescription>Customize the look and feel of your platform.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <label className="font-medium">Brand Color</label>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <input type="color" defaultValue="#F97316" className="w-10 h-10 rounded-md border-none cursor-pointer" />
                                <span className="text-sm">Primary</span>
                            </div>
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
                    <CardTitle className="text-xl font-bold">Security & Compliance</CardTitle>
                    <CardDescription>Manage security settings for the entire platform.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <h4 className="font-medium">Enforce 2FA for all admins</h4>
                            <p className="text-sm text-muted-foreground">Require two-factor authentication for all admin accounts.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                        <label className="font-medium">Password Expiry (days)</label>
                        <Input type="number" defaultValue="90"/>
                    </div>
                     <div className="space-y-2">
                        <label className="font-medium">Data Retention Policy (days)</label>
                        <Input type="number" defaultValue="365"/>
                    </div>
                     <div className="pt-4 flex justify-end">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90"><Save className="w-4 h-4 mr-2"/>Save Changes</Button>
                    </div>
                </CardContent>
             </Card>
          </TabsContent>
           <TabsContent value="communication">
             <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Communication & Email</CardTitle>
                    <CardDescription>Configure default email settings and notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <label className="font-medium">Default "From" Name</label>
                        <Input defaultValue="ChatGenius Support"/>
                    </div>
                     <div className="space-y-2">
                        <label className="font-medium">Default "From" Email</label>
                        <Input type="email" defaultValue="support@chatgenius.com"/>
                    </div>
                     <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <h4 className="font-medium">Product Update Emails</h4>
                            <p className="text-sm text-muted-foreground">Send notifications about new features and updates.</p>
                        </div>
                        <Switch defaultChecked />
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
                    <CardTitle className="text-xl font-bold">Integrations</CardTitle>
                    <CardDescription>Manage global settings for third-party integrations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <h4 className="font-medium">Slack Integration</h4>
                            <p className="text-sm text-muted-foreground">Enable or disable the Slack integration for all workspaces.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <h4 className="font-medium">Zapier Integration</h4>
                            <p className="text-sm text-muted-foreground">Allow workspaces to connect to Zapier.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                     <div className="pt-4 flex justify-end">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90"><Save className="w-4 h-4 mr-2"/>Save Changes</Button>
                    </div>
                </CardContent>
             </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
