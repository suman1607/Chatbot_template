
'use client';

import React, { useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users2,
  Plus,
  MoreHorizontal,
  Search,
  UserPlus,
  ShieldCheck,
  Activity,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const teamMembers = [
  { name: 'Admin User', email: 'admin.user@example.com', role: 'Super Admin', status: 'Online', lastActive: 'Now', avatarSeed: 'admin' },
  { name: 'Jane Doe', email: 'jane.doe@example.com', role: 'Support Lead', status: 'Online', lastActive: '5m ago', avatarSeed: 'jane' },
  { name: 'John Smith', email: 'john.smith@example.com', role: 'Developer', status: 'Offline', lastActive: '2h ago', avatarSeed: 'john' },
  { name: 'Emily White', email: 'emily.white@example.com', role: 'Billing Manager', status: 'Online', lastActive: '30m ago', avatarSeed: 'emily' },
];

const pendingInvites = [
    { email: 'new.dev@example.com', role: 'Developer', invited: '2 days ago' },
    { email: 'support.specialist@example.com', role: 'Support', invited: '5 days ago' },
]

const recentActivity = [
    { text: "Admin User logged in from new device", time: "5m ago", icon: <ShieldCheck/> },
    { text: "Broadcast 'New Features v2.5' was sent", time: "1h ago", icon: <Activity/> },
    { text: "Jane Doe resolved 5 support tickets", time: "3h ago", icon: <ShieldCheck/> },
];

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name.substring(0, 2).toUpperCase();
}

const RoleBadge = ({ role }: { role: string }) => {
    const roleColors: {[key: string]: string} = {
        'Super Admin': 'bg-primary text-primary-foreground',
        'Support Lead': 'bg-orange-200 text-orange-800',
        'Developer': 'bg-blue-200 text-blue-800',
        'Billing Manager': 'bg-purple-200 text-purple-800',
        'Support': 'bg-green-200 text-green-800',
    }
    return <Badge className={roleColors[role] || 'bg-gray-200 text-gray-800'}>{role}</Badge>;
}

export default function AdminAdminsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const { toast } = useToast();

    const filteredMembers = teamMembers.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleInvite = () => {
        // TODO: Add your API call here to invite a team member.
        console.log("Inviting new member...");
        toast({
            title: "Invitation Sent!",
            description: "The new team member has been invited.",
        });
    }

    return (
    <div className="space-y-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Users2 className="w-8 h-8 text-primary" />
                    Admin Team Management
                </h1>
                <p className="text-muted-foreground">Manage internal staff, roles, and permissions.</p>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Plus className="mr-2 h-4 w-4" />
                        Invite Member
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                           <UserPlus className="w-6 h-6 text-primary"/> Invite a New Team Member
                        </DialogTitle>
                        <DialogDescription>
                            Enter their email address and assign a role to send an invitation.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                            <Input id="email" placeholder="teammate@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="role" className="text-sm font-medium">Role</label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="support">Support</SelectItem>
                                    <SelectItem value="developer">Developer</SelectItem>
                                    <SelectItem value="billing">Billing Manager</SelectItem>
                                    <SelectItem value="lead">Support Lead</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleInvite}>
                            Send Invitation
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Staff Directory</CardTitle>
                        <div className="group relative max-w-sm">
                            <Search className="icon absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-900/60" />
                            <Input 
                                placeholder="Search by name or email..."
                                className="h-11 w-full pl-10 pr-4 border-2 border-transparent rounded-lg outline-none bg-orange-100/50 text-foreground transition-all duration-300 ease-in-out focus:bg-white focus:border-primary focus:shadow-[0_0_5px_hsl(var(--primary)/0.5)]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Member</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Last Active</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMembers.map(member => (
                                    <TableRow key={member.email}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={`https://picsum.photos/seed/${member.avatarSeed}/40/40`} />
                                                    <AvatarFallback className="bg-primary text-primary-foreground font-bold">{getInitials(member.name)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold">{member.name}</p>
                                                    <p className="text-xs text-muted-foreground">{member.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell><RoleBadge role={member.role} /></TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2.5 h-2.5 rounded-full ${member.status === 'Online' ? 'bg-primary animate-pulse' : 'bg-gray-300'}`}></div>
                                                <span className="text-sm">{member.lastActive}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="w-5 h-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                                                    <DropdownMenuSeparator/>
                                                    <DropdownMenuItem className="text-red-500 hover:!bg-red-50 hover:!text-red-600">Remove from Team</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            
            <div className="space-y-8">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Pending Invitations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {pendingInvites.map((invite, index) => (
                             <div key={index} className="flex flex-wrap items-center justify-between gap-2">
                                 <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback className="bg-orange-100 text-primary">?</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-sm truncate">{invite.email}</p>
                                        <p className="text-xs text-muted-foreground">{invite.role} - Invited {invite.invited}</p>
                                    </div>
                                 </div>
                                 <div className="flex gap-1 shrink-0">
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-primary"><RefreshCw className="w-4 h-4"/></Button>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500"><Trash2 className="w-4 h-4"/></Button>
                                 </div>
                             </div>
                        ))}
                    </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Recent Team Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="p-2 bg-orange-100 rounded-full text-primary">
                                    {activity.icon}
                                </div>
                                <div>
                                    <p className="text-sm">{activity.text}</p>
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}

    