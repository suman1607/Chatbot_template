
'use client';

import React, { useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  Bot,
  Clock,
  MessageSquare,
  Search,
  Send,
  Smile,
  Star,
  Paperclip,
  MoreVertical,
  Check,
  Phone,
  Video,
  User,
  Users,
  Tag,
  Ticket,
  Archive,
  Ban,
  Download,
  Filter,
  ChevronDown,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const stats = [
    { title: "Avg Response Time", value: "3m 12s" },
    { title: "CSAT", value: "4.7/5" },
    { title: "AI Resolution %", value: "74%" },
    { title: "Chats Today", value: "152" },
];

const conversations = [
    { id: 1, name: "Elena Rodriguez", location: "Spain", avatar: "https://picsum.photos/seed/1/40/40", channel: "widget", lastMessage: "Thanks for the help! Everything is working now.", status: "closed", time: "2h ago", unread: 0, starred: false },
    { id: 2, name: "John Smith", location: "USA", avatar: "https://picsum.photos/seed/2/40/40", channel: "whatsapp", lastMessage: "I'm having an issue with my latest invoice...", status: "active", time: "5m ago", unread: 2, starred: true },
    { id: 3, name: "Aisha Khan", location: "UAE", avatar: "https://picsum.photos/seed/3/40/40", channel: "messenger", lastMessage: "The AI is asking for my order number again.", status: "ai", time: "15m ago", unread: 0, starred: false },
    { id: 4, name: "Kenji Tanaka", location: "Japan", avatar: "https://picsum.photos/seed/4/40/40", channel: "widget", lastMessage: "I have a question about your enterprise plan.", status: "waiting", time: "30m ago", unread: 1, starred: false },
    { id: 5, name: "Maria Garcia", location: "Mexico", avatar: "https://picsum.photos/seed/5/40/40", channel: "widget", lastMessage: "This is great, thank you!", status: "closed", time: "1d ago", unread: 0, starred: false },
    { id: 6, name: "Fatima Al-Fahim", location: "Saudi Arabia", avatar: "https://picsum.photos/seed/6/40/40", channel: "whatsapp", lastMessage: "The link you sent is broken.", status: "flagged", time: "1h ago", unread: 1, starred: true },
    { id: 7, name: "David Miller", location: "USA", avatar: "https://picsum.photos/seed/7/40/40", channel: "widget", lastMessage: "Can you help me with setting up the widget?", status: "active", time: "2m ago", unread: 0, starred: false },
];

const selectedConversationDetails = {
    id: 2,
    customer: {
        name: "John Smith",
        email: "john.smith@example.com",
        avatar: "https://picsum.photos/seed/2/40/40",
        location: "USA",
        since: "Nov 2023",
        device: "Desktop, Chrome",
        priorChats: 5
    },
    messages: [
        { sender: "customer", text: "Hi, I'm having an issue with my latest invoice.", time: "10:30 AM", avatar: "https://picsum.photos/seed/2/32/32" },
        { sender: "ai", text: "I can help with that. Could you please provide the invoice number?", time: "10:31 AM", avatar: "/bot-avatar.png" },
        { sender: "customer", text: "Sure, it's #INV-2024-00123.", time: "10:32 AM", avatar: "https://picsum.photos/seed/2/32/32" },
        { type: "system", text: "AI escalated the chat to a human agent.", time: "10:33 AM" },
        { sender: "agent", name: "Sarah", text: "Hi John, Sarah here. Let me take a look at that invoice for you.", time: "10:34 AM", avatar: "https://picsum.photos/seed/agent1/32/32" },
    ]
};

const ChannelIcon = ({ channel, className }: { channel: string, className?: string }) => {
    switch (channel) {
        case 'widget': return <MessageSquare className={className} />;
        case 'whatsapp': return <Phone className={className} />; // Placeholder
        case 'messenger': return <MessageSquare className={className} />; // Placeholder
        default: return <MessageSquare className={className} />;
    }
};

const StatusBadge = ({ status }: { status: string }) => {
    const statusStyles: { [key: string]: string } = {
        active: "bg-blue-100 text-blue-800 border-blue-300",
        ai: "bg-green-100 text-green-800 border-green-300",
        closed: "bg-gray-100 text-gray-600 border-gray-300",
        waiting: "bg-yellow-100 text-yellow-800 border-yellow-300",
        flagged: "bg-red-100 text-red-800 border-red-300",
    };
    return (
        <Badge variant="outline" className={`capitalize font-medium text-xs ${statusStyles[status] || 'bg-gray-100 text-gray-600'}`}>
            {status}
        </Badge>
    );
};

export default function ConversationsPage() {
    const [selectedConversation, setSelectedConversation] = useState(conversations[1]);

    return (
        <div className="flex flex-col h-full bg-muted/30">
            <header className="p-4 border-b bg-background">
                <div className="grid gap-4 md:grid-cols-4 mb-4">
                    {stats.map(stat => (
                        <Card key={stat.title} className="shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </header>
            
            <div className="flex-grow flex min-h-0">
                {/* Left Panel: Conversation List */}
                <div className="w-full md:w-2/5 lg:w-1/3 xl:w-1/4 flex flex-col border-r bg-background">
                    <div className="p-4 border-b">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Conversations</h2>
                            <Button variant="ghost" size="icon"><Filter className="w-5 h-5" /></Button>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input placeholder="Search..." className="pl-10 h-10 rounded-full bg-muted/50" />
                        </div>
                        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
                            {["All", "Active", "Waiting", "AI", "Closed"].map(status => (
                                <Button key={status} variant={status === "Active" ? "default" : "outline"} size="sm" className="rounded-full shrink-0">
                                    {status} <Badge className="ml-2">{status === "Active" ? 2 : (status === "All" ? conversations.length : 1)}</Badge>
                                </Button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex-grow overflow-y-auto">
                        {conversations.map(convo => (
                            <div
                                key={convo.id}
                                className={`flex items-start gap-4 p-4 cursor-pointer border-l-4 ${selectedConversation?.id === convo.id ? 'bg-primary/5 border-primary' : 'border-transparent hover:bg-muted/50'}`}
                                onClick={() => setSelectedConversation(convo)}
                            >
                                <Checkbox className="mt-1" />
                                <Avatar className="w-10 h-10 border">
                                    <AvatarImage src={convo.avatar} />
                                    <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow overflow-hidden">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold truncate">{convo.name}</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                                            <span>{convo.time}</span>
                                            {convo.starred && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <StatusBadge status={convo.status} />
                                        <ChannelIcon channel={convo.channel} className="w-4 h-4 text-muted-foreground" />
                                        {convo.unread > 0 && <Badge variant="default" className="rounded-full w-5 h-5 flex items-center justify-center p-0">{convo.unread}</Badge>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel: Chat Detail */}
                <div className="flex-grow flex flex-col bg-muted/30">
                    {selectedConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="flex items-center justify-between p-4 border-b bg-background shadow-sm">
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-10 h-10 border">
                                        <AvatarImage src={selectedConversationDetails.customer.avatar} />
                                        <AvatarFallback>{selectedConversationDetails.customer.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold text-lg">{selectedConversationDetails.customer.name}</p>
                                        <p className="text-sm text-muted-foreground">Online</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                     <TooltipProvider>
                                        {[
                                            { icon: Users, label: "Assign Agent" },
                                            { icon: Ticket, label: "Create Ticket" },
                                            { icon: Tag, label: "Add Tag" },
                                            { icon: Archive, label: "Close" },
                                            { icon: Ban, label: "Block" },
                                            { icon: Download, label: "Export" }
                                        ].map(action => (
                                            <Tooltip key={action.label}>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="icon"><action.icon className="w-5 h-5" /></Button>
                                                </TooltipTrigger>
                                                <TooltipContent><p>{action.label}</p></TooltipContent>
                                            </Tooltip>
                                        ))}
                                    </TooltipProvider>
                                    <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5" /></Button>
                                </div>
                            </div>

                            {/* Chat View */}
                            <div className="flex-grow overflow-y-auto p-6 space-y-6">
                                {selectedConversationDetails.messages.map((msg, index) => (
                                    <div key={index}>
                                        {msg.type === 'system' ? (
                                            <div className="text-center text-xs text-muted-foreground my-4">{msg.text} - {msg.time}</div>
                                        ) : (
                                            <div className={`flex items-end gap-3 ${msg.sender === 'customer' ? 'justify-start' : 'justify-end'}`}>
                                                {msg.sender === 'customer' && (
                                                    <Avatar className="w-8 h-8">
                                                        <AvatarImage src={msg.avatar} />
                                                        <AvatarFallback>{selectedConversationDetails.customer.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div className={`max-w-md p-3 rounded-2xl ${
                                                    msg.sender === 'customer' ? 'bg-white rounded-bl-none shadow-sm' : 
                                                    msg.sender === 'agent' ? 'bg-primary text-primary-foreground rounded-br-none' :
                                                    'bg-green-100 text-green-900 rounded-br-none'
                                                }`}>
                                                    <p className="text-sm">{msg.text}</p>
                                                    <p className="text-xs mt-1 text-right opacity-70">{msg.time}</p>
                                                </div>
                                                {msg.sender !== 'customer' && (
                                                    <Avatar className="w-8 h-8">
                                                        <AvatarImage src={msg.avatar} />
                                                        <AvatarFallback>{msg.name?.charAt(0) || 'A'}</AvatarFallback>
                                                    </Avatar>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Input Bar */}
                            <div className="p-4 border-t bg-background">
                                <div className="relative">
                                    <Input placeholder="Type your message..." className="pr-24 h-12 rounded-full" />
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                                        <Button variant="ghost" size="icon"><Smile className="w-5 h-5 text-muted-foreground" /></Button>
                                        <Button variant="ghost" size="icon"><Paperclip className="w-5 h-5 text-muted-foreground" /></Button>
                                        <Button size="icon" className="rounded-full w-9 h-9 ml-1">
                                            <Send className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                            <MessageSquare className="w-16 h-16 mb-4" />
                            <h3 className="text-lg font-semibold">Select a conversation</h3>
                            <p className="max-w-xs">Choose a conversation from the list to see the details and reply to messages.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

