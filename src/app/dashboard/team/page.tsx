
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
  Users,
  Plus,
  MoreHorizontal,
  ChevronDown,
  Star,
  Clock,
  MessageSquare,
  ShieldCheck,
  Search,
  Mail,
  UserPlus,
  Info,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const initialTeamMembers = [
  { name: 'Sarah Miller', email: 'sarah@example.com', role: 'Owner', status: 'Online', joined: 'Jan 15, 2023', lastActive: 'Now', chats: 128, csat: 4.9 },
  { name: 'David Chen', email: 'david@example.com', role: 'Admin', status: 'Online', joined: 'Feb 02, 2023', lastActive: '5m ago', chats: 112, csat: 4.8 },
  { name: 'Maria Garcia', email: 'maria@example.com', role: 'Agent', status: 'Offline', joined: 'Mar 20, 2023', lastActive: '2h ago', chats: 98, csat: 4.8 },
  { name: 'Alex Thompson', email: 'alex@example.com', role: 'Agent', status: 'Online', joined: 'Apr 10, 2023', lastActive: '30m ago', chats: 85, csat: 4.7 },
  { name: 'John Doe', email: 'john.doe@example.com', role: 'Agent', status: 'Offline', joined: 'May 01, 2023', lastActive: '1d ago', chats: 72, csat: 4.6 },
];

const initialPendingInvites = [
    { email: 'new.agent@example.com', role: 'Agent', invited: '2 days ago' },
    { email: 'another.agent@example.com', role: 'Admin', invited: '5 days ago' },
]

const recentActivity = [
    { text: "Nisha resolved ticket #112", time: "5m ago" },
    { text: "Agent Mike joined chat with Sarah", time: "12m ago" },
    { text: "Role changed: John promoted to Admin", time: "1h ago" },
    { text: "New agent David Chen was added", time: "3h ago" },
];

const leaderboard = [
    { name: 'Sarah Miller', value: '128 chats', avatarColor: 'bg-orange-500' },
    { name: 'David Chen', value: '2m 15s avg. resp.', avatarColor: 'bg-orange-400' },
    { name: 'Maria Garcia', value: '95% resolved', avatarColor: 'bg-orange-300' },
];

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name.substring(0, 2);
}

const RoleBadge = ({ role }: { role: string }) => {
    const roleColors: {[key: string]: string} = {
        'Owner': 'bg-primary text-primary-foreground',
        'Admin': 'bg-orange-200 text-orange-800',
        'Agent': 'bg-orange-100 text-orange-700'
    }
    return <Badge className={roleColors[role] || 'bg-gray-200 text-gray-800'}>{role}</Badge>;
}

export default function TeamPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
    const [pendingInvites, setPendingInvites] = useState(initialPendingInvites);
    const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteName, setInviteName] = useState('');
    const [invitePassword, setInvitePassword] = useState('');
    const [inviteRole, setInviteRole] = useState('Agent');
    const [showPassword, setShowPassword] = useState(false);
    const { toast } = useToast();

    const filteredMembers = teamMembers.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreateMember = () => {
        if (!inviteEmail || !inviteName || !invitePassword) {
            toast({
                variant: "destructive",
                title: "Missing Fields",
                description: "Please fill out all fields to create a new member.",
            });
            return;
        }
        
        if (teamMembers.some(member => member.email === inviteEmail)) {
             toast({
                variant: "destructive",
                title: "User Exists",
                description: "This user is already a team member.",
            });
            return;
        }

        const newMember = {
            name: inviteName,
            email: inviteEmail,
            role: inviteRole,
            status: 'Online',
            joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            lastActive: 'Just now',
            chats: 0,
            csat: 0
        };

        setTeamMembers(prevMembers => [newMember, ...prevMembers]);
        setIsInviteDialogOpen(false);
        setInviteEmail('');
        setInviteName('');
        setInvitePassword('');
        toast({
            title: "Member Created!",
            description: `${inviteName} has been added to the team.`,
        });
    }

    return (
    <div className="space-y-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Users className="w-8 h-8 text-primary" />
                    Team
                </h1>
                <p className="text-muted-foreground">Manage your agents, assign roles, and track team performance.</p>
            </div>
            <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Plus className="mr-2 h-4 w-4" />
                        Invite Agent
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                           <UserPlus className="w-6 h-6 text-primary"/> Invite Team Member
                        </DialogTitle>
                        <DialogDescription>
                           Create an account for a new team member and add them to your workspace.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                            <Input 
                                id="name" 
                                placeholder="John Doe" 
                                value={inviteName}
                                onChange={(e) => setInviteName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                            <Input 
                                id="email" 
                                type="email"
                                placeholder="agent@example.com" 
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter a strong password"
                                    value={invitePassword}
                                    onChange={(e) => setInvitePassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="role" className="text-sm font-medium">Role</label>
                            <Select value={inviteRole} onValueChange={setInviteRole}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Agent">Agent</SelectItem>
                                    <SelectItem value="Owner">Owner</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>Cancel</Button>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleCreateMember}>
                            Send Invite + Create Account
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Team Members</CardTitle>
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input 
                                placeholder="Search members..."
                                className="pl-10"
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
                                    <TableHead>Performance</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMembers.map(member => (
                                    <TableRow key={member.email}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={`https://picsum.photos/seed/${member.email}/40/40`} />
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
                                        <TableCell>
                                            <div className="flex items-center gap-1 font-medium">
                                                <Star className="w-4 h-4 text-primary fill-current" /> {member.csat}
                                                <Separator orientation="vertical" className="h-4 mx-2" />
                                                <MessageSquare className="w-4 h-4 text-muted-foreground" /> {member.chats}
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
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>Disable</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-500">Remove</DropdownMenuItem>
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
                        <CardTitle className="flex items-center justify-between">
                            Performance Leaderboard
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        This Week <ChevronDown className="w-4 h-4 ml-1" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Today</DropdownMenuItem>
                                    <DropdownMenuItem>This Month</DropdownMenuItem>
                                    <DropdownMenuItem>All Time</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {leaderboard.map((item, index) => (
                             <div key={index} className="flex items-center gap-3">
                                 <Avatar className="h-9 w-9">
                                    <AvatarFallback className={`${item.avatarColor} text-white font-bold`}>{getInitials(item.name)}</AvatarFallback>
                                </Avatar>
                                 <div>
                                     <p className="font-semibold">{item.name}</p>
                                     <p className="text-sm text-muted-foreground">{item.value}</p>
                                 </div>
                                 {index === 0 && <Star className="w-5 h-5 ml-auto text-primary fill-current" />}
                             </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Pending Invitations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {pendingInvites.map((invite, index) => (
                             <div key={index} className="flex flex-wrap items-center justify-between gap-2">
                                 <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-primary"/>
                                    <div>
                                        <p className="font-medium text-sm truncate">{invite.email}</p>
                                        <p className="text-xs text-muted-foreground">{invite.role} - Invited {invite.invited}</p>
                                    </div>
                                 </div>
                                 <div className="flex gap-1 shrink-0">
                                    <Button variant="outline" size="sm">Resend</Button>
                                    <Button variant="ghost" size="sm" className="text-red-500">Cancel</Button>
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
                                <div className="p-2 bg-orange-100 rounded-full">
                                    <Clock className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: activity.text.replace(/(\w+)/, '<strong class="text-primary">$1</strong>') }} />
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>

        <div className="mt-8 p-4 bg-orange-50 border-l-4 border-primary rounded-r-lg flex items-center gap-4">
            <Info className="w-8 h-8 text-primary" />
            <div>
            <h4 className="font-bold text-primary">Pro Tip</h4>
            <p className="text-sm text-muted-foreground">
                Promote active agents to admin to help manage your growing team and delegate tasks.
            </p>
            </div>
        </div>
    </div>
  );
}
