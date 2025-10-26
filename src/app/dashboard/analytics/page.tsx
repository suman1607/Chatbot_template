
'use client';

import React from 'react';
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
  } from "@/components/ui/dropdown-menu"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChevronDown,
  MessageSquare,
  Bot,
  Clock,
  Star,
  Users,
  Smile,
  Frown,
  TrendingUp,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const conversationVolumeData = [
  { name: 'Jan', conversations: 420 },
  { name: 'Feb', conversations: 480 },
  { name: 'Mar', conversations: 550 },
  { name: 'Apr', conversations: 520 },
  { name: 'May', conversations: 600 },
  { name: 'Jun', conversations: 680 },
  { name: 'Jul', conversations: 710 },
  { name: 'Aug', conversations: 650 },
  { name: 'Sep', conversations: 750 },
  { name: 'Oct', conversations: 820 },
  { name: 'Nov', conversations: 900 },
  { name: 'Dec', conversations: 850 },
];

const aiPerformanceData = [
  { name: 'Resolved by AI', value: 75, color: '#10B981' },
  { name: 'Handed to Agent', value: 25, color: '#F97316' },
];

const agentLeaderboard = [
    { name: 'Sarah Miller', avatar: 'https://picsum.photos/seed/sm/40/40', chats: 128, avgResponse: '2m 15s', csat: '4.9/5' },
    { name: 'David Chen', avatar: 'https://picsum.photos/seed/dc/40/40', chats: 112, avgResponse: '2m 45s', csat: '4.8/5' },
    { name: 'Maria Garcia', avatar: 'https://picsum.photos/seed/mg/40/40', chats: 98, avgResponse: '3m 02s', csat: '4.8/5' },
    { name: 'Alex Thompson', avatar: 'https://picsum.photos/seed/at/40/40', chats: 85, avgResponse: '3m 30s', csat: '4.7/5' },
];

const satisfactionData = [
    { icon: <Smile className="w-8 h-8 text-green-500" />, title: 'Positive', percentage: '92%', description: '3,280 ratings' },
    { icon: <Frown className="w-8 h-8 text-red-500" />, title: 'Negative', percentage: '8%', description: '212 ratings' },
];


const StatsCard = ({ title, value, change, icon, timeframe, description }: { title: string, value: string, change: string, icon: React.ReactNode, timeframe: string, description: string }) => (
    <Card className="shadow-sm">
        <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gray-100 rounded-lg">{icon}</div>
                    <CardTitle className="text-base font-semibold">{title}</CardTitle>
                </div>
                <div className="text-sm font-semibold flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4"/> {change}
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-sm text-gray-500">{description}</p>
        </CardContent>
    </Card>
);


export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = React.useState('Last 30 days');

    return (
        <div className="space-y-6">
             <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Analytics</h1>
                    <p className="text-muted-foreground">Insights into your support performance and customer engagement.</p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9">
                            {timeRange} <ChevronDown className="w-4 h-4 ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTimeRange('Last 24 hours')}>Last 24 hours</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTimeRange('Last 7 days')}>Last 7 days</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTimeRange('Last 30 days')}>Last 30 days</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTimeRange('Last 90 days')}>Last 90 days</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTimeRange('All time')}>All time</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatsCard title="Total Conversations" value="12,430" change="+12%" icon={<MessageSquare className="w-6 h-6 text-primary" />} timeframe="Last 30 days" description="Compared to last month" />
                <StatsCard title="AI Resolution Rate" value="74%" change="+5.2%" icon={<Bot className="w-6 h-6 text-primary" />} timeframe="Last 30 days" description="AI-handled vs. total chats" />
                <StatsCard title="Avg. Response Time" value="2m 45s" change="-15s" icon={<Clock className="w-6 h-6 text-primary" />} timeframe="Last 30 days" description="First response to customers" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 shadow-sm">
                    <CardHeader>
                        <CardTitle>Conversation Volume</CardTitle>
                        <CardDescription>Total chats handled per month</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={conversationVolumeData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-background border p-3 rounded-lg shadow-lg">
                                                <p className="font-bold text-lg">{payload[0].value} conversations</p>
                                                <p className="text-sm text-muted-foreground">{label}</p>
                                            </div>
                                        );
                                        }
                                        return null;
                                    }}
                                    cursor={{fill: 'hsla(var(--primary)/0.1)', radius: 8}}
                                />
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="conversations" stroke="hsl(var(--primary))" fill="url(#colorUv)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>AI Performance</CardTitle>
                        <CardDescription>Breakdown of AI vs. agent handling</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center">
                        <div className="relative w-full h-[200px] mb-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={aiPerformanceData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={2}
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={450}
                                    >
                                        {aiPerformanceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <p className="text-3xl font-bold">75%</p>
                                <p className="text-sm text-gray-500">Resolved by AI</p>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4">
                            <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-green-500" />AI Resolved</div>
                            <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-orange-500" />Agent Handled</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="shadow-sm lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Agent Leaderboard</CardTitle>
                        <CardDescription>Top performing agents this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-2/5">Agent</TableHead>
                                    <TableHead className="w-1/5 text-center">Chats</TableHead>
                                    <TableHead className="w-1/5 text-center">Avg. Response</TableHead>
                                    <TableHead className="w-1/5 text-right">CSAT</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {agentLeaderboard.map((agent, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarImage src={agent.avatar} />
                                                    <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold">{agent.name}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center font-medium">{agent.chats}</TableCell>
                                        <TableCell className="text-center text-muted-foreground">{agent.avgResponse}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end font-semibold">
                                                <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                                                {agent.csat}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                         <CardTitle>Customer Satisfaction (CSAT)</CardTitle>
                        <CardDescription>Overall score from user feedback</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="text-center my-4">
                           <div className="text-5xl font-bold flex items-baseline justify-center">4.8<span className="text-3xl text-muted-foreground">/5</span></div>
                       </div>
                       <div className="w-full space-y-4">
                           {satisfactionData.map(item => (
                               <div key={item.title} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                   {item.icon}
                                   <div className="ml-4 flex-grow">
                                       <p className="font-semibold">{item.title}</p>
                                       <p className="text-sm text-gray-500">{item.description}</p>
                                   </div>
                                   <div className="text-lg font-bold">
                                       {item.percentage}
                                   </div>
                               </div>
                           ))}
                       </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
