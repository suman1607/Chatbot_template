
'use client';

import React, { useState } from 'react';
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MoreHorizontal, User, Eye, Edit, Trash2, Phone } from 'lucide-react';

const users = [
  { id: 1, name: 'Innovate Inc.', email: 'owner@innovate.com', plan: 'Pro', status: 'Active', region: 'US-East', joined: '2023-01-15', usage: 75, avatar: 'https://picsum.photos/seed/1/40/40' },
  { id: 2, name: 'Creative Solutions', email: 'hello@creative.com', plan: 'Starter', status: 'Active', region: 'EU-West', joined: '2023-02-20', usage: 30, avatar: 'https://picsum.photos/seed/2/40/40' },
  { id: 3, name: 'Data Corp', email: 'admin@datacorp.io', plan: 'Business', status: 'Suspended', region: 'APAC', joined: '2023-03-10', usage: 90, avatar: 'https://picsum.photos/seed/3/40/40' },
  { id: 4, name: 'Market Wizards', email: 'contact@marketwizards.co', plan: 'Pro', status: 'Active', region: 'US-West', joined: '2023-04-05', usage: 60, avatar: 'https://picsum.photos/seed/4/40/40' },
  { id: 5, name: 'Global Tech', email: 'support@globaltech.net', plan: 'Business', status: 'Active', region: 'EU-Central', joined: '2023-05-21', usage: 85, avatar: 'https://picsum.photos/seed/5/40/40' },
];

const PlanBadge = ({ plan }: { plan: string }) => {
    const planColors: {[key: string]: string} = {
        'Starter': 'bg-green-100 text-green-800',
        'Pro': 'bg-orange-100 text-orange-800',
        'Business': 'bg-purple-100 text-purple-800'
    }
    return <Badge variant="outline" className={planColors[plan]}>{plan}</Badge>;
}

const StatusBadge = ({ status }: { status: string }) => {
    const statusColors: {[key: string]: string} = {
        'Active': 'bg-green-100 text-green-800',
        'Suspended': 'bg-red-100 text-red-800',
    }
    return <Badge variant="outline" className={statusColors[status]}>{status}</Badge>;
}

export default function AdminUsersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>User & Workspace Management</CardTitle>
                    <CardDescription>Oversee all workspaces and take administrative actions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center mb-4">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <Input 
                                placeholder="Search by name or email..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button className="bg-primary hover:bg-primary/90 text-white">Add User</Button>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Workspace</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Region</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={user.avatar} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell><PlanBadge plan={user.plan} /></TableCell>
                                    <TableCell><StatusBadge status={user.status} /></TableCell>
                                    <TableCell>{user.region}</TableCell>
                                    <TableCell>{user.joined}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="w-5 h-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem><User className="mr-2 h-4 w-4"/>View Details</DropdownMenuItem>
                                                <DropdownMenuItem><Eye className="mr-2 h-4 w-4"/>Impersonate</DropdownMenuItem>
                                                <DropdownMenuItem><Edit className="mr-2 h-4 w-4"/>Edit Workspace</DropdownMenuItem>
                                                <DropdownMenuItem><Phone className="mr-2 h-4 w-4"/>Contact User</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-700">
                                                    <Trash2 className="mr-2 h-4 w-4"/>Delete Workspace
                                                </DropdownMenuItem>
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
    );
}
