
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Users, CreditCard, DollarSign, LifeBuoy, Activity, AlertTriangle, ArrowRight, Plus, CheckCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

const overviewStats = [
    { title: "Total Users", value: "1,254", icon: <Users className="w-8 h-8 text-primary" />, change: "+12% this month", bgColor: "bg-orange-100" },
    { title: "Active Subscriptions", value: "980", icon: <CreditCard className="w-8 h-8 text-green-500" />, change: "+5.2% this month", bgColor: "bg-green-100" },
    { title: "Revenue", value: "$12,450", icon: <DollarSign className="w-8 h-8 text-purple-500" />, change: "+8.1% this month", bgColor: "bg-purple-100" },
    { title: "Open Tickets", value: "23", icon: <LifeBuoy className="w-8 h-8 text-red-500" />, change: "-5", bgColor: "bg-red-100"},
];

const retentionData = [
  { name: 'Jan', retention: 98 },
  { name: 'Feb', retention: 97 },
  { name: 'Mar', retention: 96 },
  { name: 'Apr', retention: 95 },
  { name: 'May', retention: 94 },
  { name: 'Jun', retention: 93 },
];

const recentSignups = [
    { name: "Innovate Inc.", status: "Completed", avatar: "https://picsum.photos/seed/1/32/32" },
    { name: "Creative Solutions", status: "In Progress", avatar: "https://picsum.photos/seed/2/32/32" },
    { name: "Data Corp", status: "Pending", avatar: "https://picsum.photos/seed/3/32/32" },
    { name: "Market Wizards", status: "In Progress", avatar: "https://picsum.photos/seed/4/32/32" },
]

const ticketStatusData = [
    { name: 'Closed', value: 182, fill: 'hsl(var(--primary))' },
    { name: 'Open', value: 23, fill: 'hsl(var(--muted))' }
]


export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-muted-foreground">Plan, prioritize, and accomplish your tasks with ease.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewStats.map(stat => (
                    <Card key={stat.title} className={`${stat.title === "Total Users" ? 'bg-primary text-primary-foreground' : 'bg-card'}`}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className={`text-sm font-medium ${stat.title === "Total Users" ? 'text-primary-foreground/80' : 'text-gray-600'}`}>{stat.title}</CardTitle>
                             <div className={`p-2 rounded-full ${stat.title !== "Total Users" ? stat.bgColor : 'bg-white/20'}`}>
                                {React.cloneElement(stat.icon, { className: `w-5 h-5 ${stat.title === "Total Users" ? 'text-white' : ''}` })}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stat.value}</div>
                            <p className={`text-xs ${stat.title === "Total Users" ? 'text-primary-foreground/90' : 'text-gray-500'}`}>{stat.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Churn & Retention</CardTitle>
                        <CardDescription>Monthly customer churn and retention rates.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={retentionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="retentionGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis domain={[90, 100]} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                                <Tooltip
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-background border p-2 rounded-lg shadow-lg">
                                                    <p className="font-bold text-base">{`${label}: ${payload[0].value}% Retention`}</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Area type="monotone" dataKey="retention" stroke="hsl(var(--primary))" fill="url(#retentionGradient)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                         <div className="flex justify-between items-center">
                            <CardTitle>Recently Joined Workspaces</CardTitle>
                            <Button variant="outline" size="sm">View All</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                        {recentSignups.map(signup => (
                            <div key={signup.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src={signup.avatar} alt={signup.name} className="w-9 h-9 rounded-full" />
                                    <div>
                                        <p className="font-semibold">{signup.name}</p>
                                        <p className="text-xs text-muted-foreground">Joined 2 days ago</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                    signup.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                                    signup.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                }`}>Pro Plan</span>
                            </div>
                        ))}
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Support Tickets</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center">
                         <div className="relative h-[150px] w-[150px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie 
                                        data={ticketStatusData} 
                                        cx="50%" 
                                        cy="50%" 
                                        innerRadius={50} 
                                        outerRadius={70} 
                                        startAngle={90} 
                                        endAngle={450} 
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {ticketStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <p className="text-3xl font-bold">23</p>
                                <p className="text-sm text-muted-foreground">Open Tickets</p>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-4 text-xs">
                             <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary"/>Closed</div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-muted"/>Open</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
