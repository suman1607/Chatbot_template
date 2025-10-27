
'use client';

import React, { useState } from 'react';
import {
  Inbox,
  Clock,
  User,
  AlertTriangle,
  Flame,
  Search,
  ChevronDown,
  Filter,
  MoreHorizontal,
  Send,
  Paperclip,
  Smile,
  Tag,
  Link as LinkIcon,
  Archive,
  ArrowRight,
  Printer,
  Trash2,
  Bookmark
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const kpiData = [
  { title: 'Open', value: '23', icon: <Inbox /> },
  { title: 'Waiting on Customer', value: '8', icon: <Clock /> },
  { title: 'High Priority', value: '5', icon: <AlertTriangle /> },
  { title: 'SLA Breached', value: '2', icon: <Flame /> },
];

const tickets = [
  { id: '#T7812', subject: "Widget not loading on production", workspace: "Innovate Inc.", requester: "sarah@innovate.com", priority: "High", status: "Open", assignee: "David Chen", updated: "5m ago", active: true },
  { id: '#T7811', subject: "Question about annual pricing discount", workspace: "Creative Co.", requester: "mike@creative.co", priority: "Normal", status: "Waiting on Customer", assignee: "Maria Garcia", updated: "2h ago", active: false },
  { id: '#T7810', subject: "API Integration failed for HubSpot", workspace: "Data Corp", requester: "lisa@datacorp.io", priority: "High", status: "Open", assignee: "Unassigned", updated: "8h ago", active: false },
  { id: '#T7809', subject: "Can I export my chat history?", workspace: "Market Wizards", requester: "brian@marketwizards.co", priority: "Low", status: "Resolved", assignee: "Alex Thompson", updated: "1d ago", active: false },
  { id: '#T7808', subject: "URGENT: Cannot access my account", workspace: "Global Tech", requester: "admin@globaltech.net", priority: "Urgent", status: "Open", assignee: "Sarah Miller", updated: "1d ago", active: false },
];

const selectedTicket = {
    ...tickets[0],
    thread: [
        { type: 'note', author: 'David Chen', text: 'Looks like a CORS policy issue on their end. Requested details from the customer.', time: '15m ago'},
        { type: 'message', author: 'David Chen', text: 'Hi Sarah, thanks for reaching out. Could you please provide your website domain and any error messages you see in the browser console? That will help us investigate.', time: '2h ago'},
        { type: 'message', author: 'Sarah from Innovate Inc.', text: 'Hi team, our chat widget suddenly stopped loading on our production website. It was working fine yesterday. Can you please help?', time: '3h ago'},
    ]
};

const KpiCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
      <div className="p-2 rounded-full bg-orange-100 text-primary">
        {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const PriorityBadge = ({ priority }: { priority: string }) => {
    const priorityColors: {[key: string]: string} = {
        'Low': 'bg-gray-100 text-gray-800',
        'Normal': 'bg-blue-100 text-blue-800',
        'High': 'bg-orange-100 text-orange-800',
        'Urgent': 'bg-red-100 text-red-800 font-bold',
    }
    return <Badge variant="outline" className={`px-3 py-1 ${priorityColors[priority]}`}>{priority}</Badge>;
}

const StatusBadge = ({ status }: { status: string }) => {
    const statusColors: {[key: string]: string} = {
        'Open': 'bg-green-100 text-green-800',
        'Waiting on Customer': 'bg-yellow-100 text-yellow-800',
        'Resolved': 'bg-gray-200 text-gray-800'
    }
    return <Badge variant="secondary" className={statusColors[status]}>{status}</Badge>;
}

export default function AdminSupportPage() {
    const [activeTab, setActiveTab] = useState('All');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Tickets & Support</h1>
                    <p className="text-muted-foreground">Manage and resolve customer support requests.</p>
                </div>
                 <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Create Ticket</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}
            </div>

            <div className="flex h-[calc(100vh-320px)] border bg-card rounded-lg shadow-sm">
                {/* Ticket List */}
                <div className="w-2/5 border-r flex flex-col">
                    <div className="p-4 border-b">
                         <div className="group relative">
                            <Search className="icon absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-900/60" />
                            <Input 
                                placeholder="Search tickets..."
                                className="h-11 w-full pl-10 pr-4 border-2 border-transparent rounded-lg outline-none bg-orange-100/50 text-foreground transition-all duration-300 ease-in-out focus:bg-white focus:border-primary focus:shadow-[0_0_5px_hsl(var(--primary)/0.5)]"
                            />
                        </div>
                        <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">Status <ChevronDown className="w-4 h-4 ml-1"/></Button>
                            <Button variant="outline" size="sm">Priority <ChevronDown className="w-4 h-4 ml-1"/></Button>
                            <Button variant="outline" size="sm">Assignee <ChevronDown className="w-4 h-4 ml-1"/></Button>
                        </div>
                    </div>
                     <div className="p-2 border-b">
                        <Button variant={activeTab === 'All' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTab('All')}>All Tickets</Button>
                        <Button variant={activeTab === 'Unassigned' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTab('Unassigned')}>Unassigned</Button>
                        <Button variant={activeTab === 'My' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTab('My')}>My Tickets</Button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {tickets.map(ticket => (
                            <div key={ticket.id} className={`p-4 border-b cursor-pointer ${ticket.active ? 'bg-orange-50' : 'hover:bg-gray-50'}`}>
                                <div className="flex justify-between items-start">
                                    <p className="font-semibold text-sm max-w-[250px] truncate">{ticket.subject}</p>
                                    <span className="text-xs text-muted-foreground">{ticket.updated}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{ticket.workspace} • {ticket.id}</p>
                                <div className="flex gap-2 mt-2">
                                    <PriorityBadge priority={ticket.priority} />
                                    <StatusBadge status={ticket.status} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ticket Detail */}
                <div className="w-3/5 flex flex-col">
                    <div className="p-4 border-b">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2">
                                     <PriorityBadge priority={selectedTicket.priority} />
                                     <h2 className="text-lg font-bold">{selectedTicket.subject}</h2>
                                </div>
                                <p className="text-sm text-muted-foreground">From {selectedTicket.requester} in <a href="#" className="text-primary font-semibold">{selectedTicket.workspace}</a></p>
                            </div>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem><Printer className="mr-2 h-4 w-4"/> Print</DropdownMenuItem>
                                    <DropdownMenuItem><Archive className="mr-2 h-4 w-4"/> Archive</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-500"><Trash2 className="mr-2 h-4 w-4"/> Delete Ticket</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                         <Separator className="my-3"/>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex gap-2">
                                <span className="font-medium">Assignee:</span>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-auto p-0">{selectedTicket.assignee} <ChevronDown className="w-4 h-4 ml-1"/></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Sarah Miller</DropdownMenuItem>
                                    <DropdownMenuItem>David Chen</DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                             <div className="flex gap-2">
                                <span className="font-medium">Status:</span>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-auto p-0">{selectedTicket.status} <ChevronDown className="w-4 h-4 ml-1"/></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Open</DropdownMenuItem>
                                    <DropdownMenuItem>Waiting on Customer</DropdownMenuItem>
                                    <DropdownMenuItem>Resolved</DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="ml-auto text-red-600 font-semibold flex items-center gap-1">
                                <Clock className="w-4 h-4" /> 2h SLA Breach
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {selectedTicket.thread.map((item, index) => (
                             <div key={index} className={`flex items-start gap-3 ${item.author.includes('from') ? 'justify-end' : ''}`}>
                                { !item.author.includes('from') &&
                                    <Avatar>
                                        <AvatarImage src={`https://picsum.photos/seed/${item.author}/40/40`} />
                                        <AvatarFallback>{item.author.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                }
                                <div className={`max-w-lg p-3 rounded-lg ${item.type === 'note' ? 'bg-yellow-100 border-yellow-200 border' : (item.author.includes('from') ? 'bg-primary/10 rounded-br-none' : 'bg-gray-100 rounded-bl-none')}`}>
                                    <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                                        <span className="font-semibold">{item.author}</span>
                                        <span>{item.time}</span>
                                    </div>
                                    <p className="text-sm">{item.text}</p>
                                </div>
                                { item.author.includes('from') &&
                                    <Avatar>
                                        <AvatarImage src={`https://picsum.photos/seed/customer/40/40`} />
                                        <AvatarFallback>S</AvatarFallback>
                                    </Avatar>
                                }
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t bg-gray-50">
                        <Textarea placeholder="Type your reply or internal note..." className="mb-2" />
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild><Button variant="ghost" size="icon"><Paperclip className="w-5 h-5"/></Button></TooltipTrigger>
                                    <TooltipContent><p>Attach file</p></TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild><Button variant="ghost" size="icon"><Smile className="w-5 h-5"/></Button></TooltipTrigger>
                                    <TooltipContent><p>Insert emoji</p></TooltipContent>
                                </Tooltip>
                                 <Tooltip>
                                    <TooltipTrigger asChild><Button variant="ghost" size="icon"><Bookmark className="w-5 h-5"/></Button></TooltipTrigger>
                                    <TooltipContent><p>Use canned response</p></TooltipContent>
                                </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className="flex gap-2">
                                 <Button variant="outline">Internal Note</Button>
                                 <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Send Reply <Send className="w-4 h-4 ml-2"/></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
