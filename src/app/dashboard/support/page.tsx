
'use client';

import React, { useState } from 'react';
import {
  LifeBuoy,
  Search,
  BookOpen,
  DollarSign,
  Bot,
  PlusCircle,
  ChevronRight,
  Send,
  Paperclip,
  CheckCircle2,
  CircleDot,
  FileText,
  MessageSquare,
  Lightbulb,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

const quickLinks = [
  { title: "Widget Setup", icon: <Bot className="w-5 h-5 text-primary" />, description: "Installation & customization" },
  { title: "AI Training", icon: <Lightbulb className="w-5 h-5 text-primary" />, description: "Improve your chatbot" },
  { title: "Billing & Plans", icon: <DollarSign className="w-5 h-5 text-primary" />, description: "Manage your subscription" },
  { title: "Integrations", icon: <BookOpen className="w-5 h-5 text-primary" />, description: "Connect with other apps" },
];

const myTickets = [
    { id: "T-23481", subject: "Widget not appearing on mobile", status: "Open", lastUpdated: "2 hours ago" },
    { id: "T-23479", subject: "Question about yearly billing", status: "Closed", lastUpdated: "1 day ago" },
    { id: "T-23475", subject: "How to retrain my AI model?", status: "Awaiting your reply", lastUpdated: "3 days ago" },
]

const TicketStatusBadge = ({ status } : { status: string }) => {
    const statusClasses: { [key: string]: string } = {
        "Open": "bg-green-100 text-green-800 border-green-200",
        "Closed": "bg-gray-100 text-gray-800 border-gray-200",
        "Awaiting your reply": "bg-orange-100 text-orange-800 border-orange-200 animate-pulse",
    }
    return <Badge variant="outline" className={statusClasses[status] || ""}>{status}</Badge>
}

export default function SupportPage() {
    const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="space-y-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <LifeBuoy className="w-8 h-8 text-primary" />
                    Support Center
                </h1>
                <p className="text-muted-foreground">Get help, find answers, and contact our team.</p>
            </div>
             <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Submit a Ticket
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Create a New Support Ticket</DialogTitle>
                        <DialogDescription>
                            Our team will get back to you as soon as possible.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Subject</label>
                            <Input placeholder="e.g., Widget is not loading on my site" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Category</label>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="technical">Technical Issue</SelectItem>
                                        <SelectItem value="billing">Billing Question</SelectItem>
                                        <SelectItem value="widget">Widget Problem</SelectItem>
                                        <SelectItem value="account">Account Inquiry</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Priority</label>
                                <Select defaultValue="normal">
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="normal">Normal</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                         <div className="space-y-2">
                            <label className="text-sm font-medium">Message</label>
                            <Textarea placeholder="Please describe your issue in detail..." className="min-h-[120px]" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Attachments</label>
                            <div className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-md">
                                <Button variant="outline" type="button">
                                    <Paperclip className="mr-2 h-4 w-4" />
                                    Attach Files
                                </Button>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            <Send className="mr-2 h-4 w-4" />
                            Submit Ticket
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>How can we help?</CardTitle>
                <CardDescription>Search our knowledge base for answers to your questions.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input 
                        placeholder="Search for articles, guides, and FAQs..." 
                        className="pl-10 h-12 text-base"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickLinks.map(link => (
                        <a href="#" key={link.title} className="group p-4 flex items-start gap-4 bg-gray-50 hover:bg-orange-50 rounded-lg transition-colors">
                            <div className="p-2 bg-orange-100 rounded-md">
                                {link.icon}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">{link.title}</p>
                                <p className="text-sm text-muted-foreground">{link.description}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>My Support Tickets</CardTitle>
                        <CardDescription>Track the status of your support requests.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ticket ID</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                    <TableHead className="text-right"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {myTickets.map(ticket => (
                                    <TableRow key={ticket.id}>
                                        <TableCell className="font-medium text-primary">{ticket.id}</TableCell>
                                        <TableCell>{ticket.subject}</TableCell>
                                        <TableCell><TicketStatusBadge status={ticket.status} /></TableCell>
                                        <TableCell>{ticket.lastUpdated}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">View</Button>
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
                        <CardTitle>Contact Us</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <Button variant="outline" className="w-full justify-start text-base py-6">
                            <MessageSquare className="w-5 h-5 mr-3 text-primary"/> Chat with Support
                         </Button>
                         <div className="text-center text-sm text-muted-foreground">or email us at <a href="mailto:support@chatgenius.com" className="text-primary font-medium">support@chatgenius.com</a></div>
                    </CardContent>
                </Card>
                 <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>System Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                           <CheckCircle2 className="w-6 h-6 text-green-600" />
                           <div>
                                <p className="font-semibold text-green-800">All Systems Operational</p>
                                <p className="text-sm text-green-700">No issues reported.</p>
                           </div>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="shadow-sm bg-orange-50 border-orange-200">
                    <CardHeader>
                        <CardTitle className="text-primary">Have an idea?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-orange-800 mb-4">Help us improve by suggesting a feature or reporting a bug.</p>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                            Give Feedback
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
         <div className="mt-8 p-4 bg-orange-50 border-l-4 border-primary rounded-r-lg flex items-center gap-4">
            <Info className="w-8 h-8 text-primary shrink-0" />
            <div>
            <h4 className="font-bold text-primary">Pro Tip</h4>
            <p className="text-sm text-muted-foreground">
                Before submitting a ticket, try searching the help center. You might find an instant answer!
            </p>
            </div>
        </div>
    </div>
  );
}

    