
'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Filter,
  MoreHorizontal,
  ChevronDown,
  Download,
  Calendar,
  BarChart,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  HelpCircle,
  Settings,
  Smile,
  Clock,
  CheckCircle,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Bar as RechartsBar,
  BarChart as RechartsBarChart,
  Legend,
  LineChart,
  Line
} from 'recharts';

const kpiData = [
  { title: 'MRR', value: '$42,380', change: '+2.1%', icon: <DollarSign /> },
  { title: 'Active Users (MAU)', value: '8,421', change: '+120', icon: <Users /> },
  { title: 'New MRR', value: '$3,120', change: '+8.5%', icon: <TrendingUp /> },
  { title: 'Churn %', value: '1.8%', change: '-0.2%', icon: <TrendingDown /> },
  { title: 'ARPU', value: '$32.50', change: '+1.5%', icon: <DollarSign /> },
  { title: 'CSAT', value: '92%', change: '+1.2%', icon: <TrendingUp /> },
];

const revenueData = [
  { date: 'Jan', revenue: 32000 }, { date: 'Feb', revenue: 35000 }, { date: 'Mar', revenue: 38000 },
  { date: 'Apr', revenue: 37000 }, { date: 'May', revenue: 40000 }, { date: 'Jun', revenue: 42380 },
];

const planRevenueData = [
    { name: 'Starter', value: 25, color: 'hsl(var(--chart-2))' },
    { name: 'Pro', value: 45, color: 'hsl(var(--primary))' },
    { name: 'Business', value: 30, color: 'hsl(var(--chart-5))' },
];

const userSignupsData = [
  { name: 'Jan', signups: 400, activations: 320 }, { name: 'Feb', signups: 450, activations: 380 },
  { name: 'Mar', signups: 520, activations: 450 }, { name: 'Apr', signups: 480, activations: 410 },
  { name: 'May', signups: 550, activations: 490 }, { name: 'Jun', signups: 600, activations: 530 },
];

const chatVolumeData = [
    { name: 'Mon', volume: 1200 }, { name: 'Tue', volume: 1500 }, { name: 'Wed', volume: 1400 },
    { name: 'Thu', volume: 1800 }, { name: 'Fri', volume: 2200 }, { name: 'Sat', volume: 2500 },
    { name: 'Sun', volume: 1900 },
];

const retentionData = [
    { week: 'Week 0', d1: 100, d7: 100, d30: 100 },
    { week: 'Week 1', d1: 85, d7: 65, d30: 45 },
    { week: 'Week 2', d1: 88, d7: 68, d30: 48 },
    { week: 'Week 3', d1: 82, d7: 62, d30: 42 },
    { week: 'Week 4', d1: 90, d7: 70, d30: 50 },
    { week: 'Week 5', d1: 91, d7: 72, d30: 51 },
];

const supportKPIData = [
  { title: 'Avg. First Response Time', value: '2m 15s', change: '-10%', icon: <Clock /> },
  { title: 'Avg. Resolution Time', value: '5h 30m', change: '-5%', icon: <CheckCircle /> },
  { title: 'CSAT', value: '92%', change: '+1.2%', icon: <Smile /> },
];

const responseTimeData = [
  { name: 'Jan', frt: 2.5, resolution: 6 }, { name: 'Feb', frt: 2.3, resolution: 5.8 },
  { name: 'Mar', frt: 2.8, resolution: 6.2 }, { name: 'Apr', frt: 2.1, resolution: 5.5 },
  { name: 'May', frt: 2.0, resolution: 5.2 }, { name: 'Jun', frt: 2.2, resolution: 5.4 },
];

const KpiCard = ({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
            <div className="p-2 rounded-lg bg-orange-100 text-primary">
                {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
            </div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className={`text-xs ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{change}</p>
            {/* Placeholder for sparkline */}
            <div className="h-8 mt-2 w-full bg-gray-100 rounded-md"></div>
        </CardContent>
    </Card>
);

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background border p-2 rounded-lg shadow-lg">
                <p className="font-bold text-base">{payload.map((pld: any) => `${pld.name}: ${pld.value.toLocaleString()}${pld.unit || ''}`).join(", ")}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
            </div>
        );
    }
    return null;
};


export default function AdminAnalyticsPage() {
    const [activeTimeRange, setActiveTimeRange] = useState('30d');
    const topPlan = planRevenueData.reduce((prev, current) => (prev.value > current.value) ? prev : current);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Analytics & Reports</h1>
                    <p className="text-muted-foreground">Platform-wide insights on revenue, users, and performance.</p>
                </div>
                <div className="flex gap-2">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline"><Calendar className="mr-2 h-4 w-4"/>Last 30 days <ChevronDown className="ml-2 h-4 w-4"/></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                            <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                            <DropdownMenuItem>All Time</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button>
                        <Download className="mr-2 h-4 w-4" /> Export Reports
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {kpiData.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}
            </div>

            <Tabs defaultValue="revenue">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="revenue"><DollarSign className="mr-2 h-4 w-4"/>Revenue</TabsTrigger>
                    <TabsTrigger value="users"><Users className="mr-2 h-4 w-4"/>Users</TabsTrigger>
                    <TabsTrigger value="product"><BarChart className="mr-2 h-4 w-4"/>Product</TabsTrigger>
                    <TabsTrigger value="support"><HelpCircle className="mr-2 h-4 w-4"/>Support</TabsTrigger>
                </TabsList>
                
                <TabsContent value="revenue" className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-2">
                            <CardHeader>
                               <CardTitle>Revenue Growth</CardTitle>
                               <CardDescription>MRR growth over the last 6 months.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={250}>
                                    <AreaChart data={revenueData}>
                                        <defs>
                                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="date" axisLine={false} tickLine={false} fontSize={12} />
                                        <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={(val) => `$${val/1000}k`} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#revenueGradient)" strokeWidth={2} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Revenue by Plan</CardTitle>
                                <CardDescription>MRR contribution from each subscription plan.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex items-center justify-center relative">
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie data={planRevenueData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} startAngle={90} endAngle={450}>
                                            {planRevenueData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />)}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-3xl font-bold" style={{color: topPlan.color}}>{topPlan.value}%</span>
                                    <span className="text-sm font-medium text-muted-foreground">{topPlan.name}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="users" className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                           <CardHeader>
                               <CardTitle>Signups vs Activations</CardTitle>
                               <CardDescription>New user acquisition and engagement.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={250}>
                                    <RechartsBarChart data={userSignupsData}>
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                                        <YAxis axisLine={false} tickLine={false} fontSize={12} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend verticalAlign="top" height={36}/>
                                        <RechartsBar dataKey="signups" fill="hsl(var(--primary) / 0.3)" radius={[4, 4, 0, 0]} />
                                        <RechartsBar dataKey="activations" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                    </RechartsBarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                         <Card>
                           <CardHeader>
                               <CardTitle>Retention Curve</CardTitle>
                               <CardDescription>Day 1, 7, and 30 retention rates.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={250}>
                                    <LineChart data={retentionData}>
                                        <XAxis dataKey="week" axisLine={false} tickLine={false} fontSize={12} />
                                        <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={(val) => `${val}%`}/>
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend verticalAlign="top" height={36}/>
                                        <Line type="monotone" dataKey="d1" name="Day 1" stroke="hsl(var(--primary))" strokeWidth={2} />
                                        <Line type="monotone" dataKey="d7" name="Day 7" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                                        <Line type="monotone" dataKey="d30" name="Day 30" stroke="hsl(var(--chart-5))" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="product" className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                           <CardTitle>Chat Volume</CardTitle>
                           <CardDescription>Total chats per day.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={chatVolumeData}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                                    <YAxis axisLine={false} tickLine={false} fontSize={12} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line type="monotone" dataKey="volume" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="support" className="mt-6 space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {supportKPIData.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}
                    </div>
                    <Card>
                        <CardHeader>
                           <CardTitle>Response & Resolution Times</CardTitle>
                           <CardDescription>Average time metrics for customer support.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={responseTimeData}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                                    <YAxis yAxisId="left" axisLine={false} tickLine={false} fontSize={12} tickFormatter={(val) => `${val}m`} />
                                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} fontSize={12} tickFormatter={(val) => `${val}h`} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend verticalAlign="top" height={36}/>
                                    <Line yAxisId="left" type="monotone" dataKey="frt" name="First Response Time" stroke="hsl(var(--primary))" strokeWidth={2} unit="m" />
                                    <Line yAxisId="right" type="monotone" dataKey="resolution" name="Resolution Time" stroke="hsl(var(--chart-2))" strokeWidth={2} unit="h" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
                
            </Tabs>
            
             <Card>
                <CardHeader>
                    <CardTitle>Reports</CardTitle>
                    <CardDescription>Build and export custom reports.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full md:w-auto"><BarChart className="mr-2 h-4 w-4"/> Choose Metrics</Button>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full md:w-auto"><Filter className="mr-2 h-4 w-4"/> Group By</Button>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                    <div className="flex-grow"/>
                    <Button variant="outline">Export CSV</Button>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Generate Report</Button>
                </CardContent>
            </Card>

        </div>
    );
}
