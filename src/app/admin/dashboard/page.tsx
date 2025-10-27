
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, CreditCard, DollarSign, Activity, AlertTriangle, CheckCircle, ArrowRight, LifeBuoy } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const overviewStats = [
    { title: "Total Users", value: "1,254", icon: <Users className="w-6 h-6 text-blue-500" />, change: "+12% this month" },
    { title: "Active Subscriptions", value: "980", icon: <CreditCard className="w-6 h-6 text-green-500" />, change: "+5.2% this month" },
    { title: "Monthly Recurring Revenue", value: "$12,450", icon: <DollarSign className="w-6 h-6 text-purple-500" />, change: "+8.1% this month" },
    { title: "Open Support Tickets", value: "23", icon: <LifeBuoy className="w-6 h-6 text-orange-500" />, change: "-5 since yesterday" },
];

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
];

const recentSignups = [
    { name: "Innovate Inc.", plan: "Pro", signupDate: "2 hours ago" },
    { name: "Creative Solutions", plan: "Starter", signupDate: "5 hours ago" },
    { name: "Data Corp", plan: "Business", signupDate: "1 day ago" },
    { name: "Market Wizards", plan: "Pro", signupDate: "2 days ago" },
]

const criticalAlerts = [
    { text: "Payment failed for workspace 'Alpha Corp'", icon: <AlertTriangle className="w-5 h-5 text-red-500" /> },
    { text: "Subscription for 'Beta LLC' expires in 3 days", icon: <AlertTriangle className="w-5 h-5 text-orange-500" /> },
    { text: "New high-priority ticket from 'Gamma Ent.'", icon: <AlertTriangle className="w-5 h-5 text-yellow-500" /> },
]

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewStats.map(stat => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                            {stat.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-gray-500">{stat.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Revenue Growth</CardTitle>
                        <CardDescription>Monthly revenue over the last 6 months.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                                <Tooltip />
                                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="url(#revenueGradient)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Critical Alerts</CardTitle>
                        <CardDescription>Immediate attention required.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {criticalAlerts.map((alert, index) => (
                            <div key={index} className="flex items-start gap-3">
                                {alert.icon}
                                <p className="text-sm text-gray-700">{alert.text}</p>
                            </div>
                        ))}
                         <Button variant="outline" className="w-full mt-4">
                            View All Alerts <ArrowRight className="ml-2 w-4 h-4" />
                         </Button>
                    </CardContent>
                </Card>
            </div>
            
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Signups</CardTitle>
                        <CardDescription>New workspaces on the platform.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Workspace</TableHead>
                                    <TableHead>Plan</TableHead>
                                    <TableHead>Signup Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentSignups.map(signup => (
                                    <TableRow key={signup.name}>
                                        <TableCell className="font-medium">{signup.name}</TableCell>
                                        <TableCell>{signup.plan}</TableCell>
                                        <TableCell>{signup.signupDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Recent Admin Activity</CardTitle>
                        <CardDescription>Latest actions taken in the admin panel.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-full"><CheckCircle className="w-4 h-4 text-green-600"/></div>
                            <div>
                                <p className="text-sm">You suspended workspace 'Old Project'.</p>
                                <p className="text-xs text-gray-500">5 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-full"><Activity className="w-4 h-4 text-blue-600"/></div>
                            <div>
                                <p className="text-sm">You impersonated user 'jane.doe@example.com'.</p>
                                <p className="text-xs text-gray-500">1 hour ago</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}
