
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
  CircleDollarSign,
  MoreVertical,
  Rocket,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const barChartData = [
  { name: 'Jan', hot: 28, warm: 45, crm: 60 },
  { name: 'Feb', hot: 42, warm: 65, crm: 75 },
  { name: 'Mar', hot: 55, warm: 30, crm: 85 },
  { name: 'Apr', hot: 35, warm: 50, crm: 70 },
  { name: 'May', hot: 60, warm: 40, crm: 90 },
  { name: 'Jun', hot: 48, warm: 55, crm: 80 },
  { name: 'Jul', hot: 70, warm: 35, crm: 95 },
  { name: 'Aug', hot: 58, warm: 62, crm: 88 },
  { name: 'Sep', hot: 45, warm: 50, crm: 78 },
  { name: 'Oct', hot: 65, warm: 70, crm: 92 },
  { name: 'Nov', hot: 75, warm: 45, crm: 98 },
  { name: 'Dec', hot: 80, warm: 55, crm: 100 },
];

const pieChartData = [
  { name: 'Income', value: 400, color: '#F97316' },
  { name: 'Expand', value: 300, color: '#C4B5FD' },
  { name: 'Booking', value: 300, color: '#FDE68A' },
  { name: 'Other', value: 200, color: '#E5E7EB' },
];

const topChannels = [
    { name: 'Layers', orders: '20k orders', percentage: '20%', icon: <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><Rocket className="w-5 h-5 text-white" /></div> },
    { name: 'Quotient', orders: '18k orders', percentage: '18%', icon: <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center"><Users className="w-5 h-5 text-white" /></div> },
    { name: 'Hourglass', orders: '15k orders', percentage: '15%', icon: <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center"><CircleDollarSign className="w-5 h-5 text-white" /></div> },
    { name: 'Sisyphus', orders: '12k orders', percentage: '12%', icon: <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-white" /></div> },
];

const recentOrders = [
  {
    name: 'Arifbillah',
    handle: '@adamesy',
    avatar: 'https://picsum.photos/seed/ab/40/40',
    device: 'Macbook pro',
    orderNumber: '#025NMLO',
    date: 'Jul 21, 2023',
    status: 'Complete',
  },
  {
    name: 'John Doe',
    handle: '@johndoe',
    avatar: 'https://picsum.photos/seed/jd/40/40',
    device: 'Mobile',
    orderNumber: '#025NMLP',
    date: 'Jul 22, 2023',
    status: 'In process',
  },
  {
    name: 'Jane Smith',
    handle: '@janesmith',
    avatar: 'https://picsum.photos/seed/js/40/40',
    device: 'Windows PC',
    orderNumber: '#025NMLQ',
    date: 'Jul 22, 2023',
    status: 'Complete',
  },
   {
    name: 'Emily White',
    handle: '@emwhite',
    avatar: 'https://picsum.photos/seed/ew/40/40',
    device: 'iPhone 14',
    orderNumber: '#025NMLR',
    date: 'Jul 23, 2023',
    status: 'Canceled',
  },
];

const StatsCard = ({ title, value, percentage, icon, timeframe, description }: { title: string, value: string, percentage: string, icon: React.ReactNode, timeframe: string, description: string }) => (
    <Card className="shadow-sm">
        <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
                    <CardTitle className="text-base font-semibold">{title}</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="text-xs h-8">
                    {timeframe} <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-3xl font-bold">{value}</p>
            <div className="flex items-center gap-2 text-sm">
                <span className="text-green-500 font-semibold">{percentage}</span>
                <p className="text-gray-500">{description}</p>
            </div>
        </CardContent>
    </Card>
);


export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatsCard title="Balance" value="$24,006" percentage="+27.4%" icon={<TrendingUp className="w-5 h-5 text-gray-600" />} timeframe="Last 30 day" description="Average values of won deals" />
                <StatsCard title="Spending" value="$24,006" percentage="+10.0%" icon={<CircleDollarSign className="w-5 h-5 text-gray-600" />} timeframe="Last 30 day" description="Average values of won deals" />
                <StatsCard title="Investing" value="$24,006" percentage="+27.4%" icon={<Rocket className="w-5 h-5 text-gray-600" />} timeframe="Last 30 day" description="Average values of won deals" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 shadow-sm">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>CRM Traffic</CardTitle>
                             <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-orange-500" />Hot lead</div>
                                <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-purple-300" />Warm lead</div>
                                <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-amber-200" />CRM Traffic</div>
                                <Button variant="outline" size="sm" className="h-8">Monthly <ChevronDown className="w-4 h-4 ml-1" /></Button>
                             </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                <Tooltip
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-black text-white p-3 rounded-lg shadow-lg">
                                                <p className="font-bold">{`-${payload[0].value}`}</p>
                                                <p className="font-bold">{`${payload[0].value}`}</p>
                                            </div>
                                        );
                                        }
                                        return null;
                                    }}
                                    cursor={{fill: 'rgba(0,0,0,0.05)', radius: 8}}
                                />
                                <Bar dataKey="hot" fill="#F97316" radius={[8, 8, 0, 0]} barSize={10} />
                                <Bar dataKey="warm" fill="#C4B5FD" radius={[8, 8, 0, 0]} barSize={10}/>
                                <Bar dataKey="crm" fill="#FDE68A" radius={[8, 8, 0, 0]} barSize={10}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>CRM Traffic</CardTitle>
                            <Button variant="outline" size="sm" className="h-8">Week <ChevronDown className="w-4 h-4 ml-1" /></Button>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center">
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="text-center -mt-20">
                            <p className="text-3xl font-bold">$24,006</p>
                            <p className="text-sm text-gray-500">Business Spend</p>
                        </div>
                        <div className="flex justify-center gap-4 mt-6">
                            <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-orange-500" />Income</div>
                            <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-purple-300" />Expand</div>
                            <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-amber-200" />Booking</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="shadow-sm">
                    <CardHeader>
                         <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">Top seals channel</CardTitle>
                            <MoreVertical className="w-5 h-5 text-gray-400" />
                        </div>
                        <CardDescription>Last 90 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="space-y-4">
                           {topChannels.map(channel => (
                               <div key={channel.name} className="flex items-center">
                                   {channel.icon}
                                   <div className="ml-4 flex-grow">
                                       <p className="font-semibold">{channel.name}</p>
                                   </div>
                                   <div className="text-right">
                                       <p className="font-medium">{channel.orders}</p>
                                       <p className="text-sm text-gray-500">{channel.percentage}</p>
                                   </div>
                               </div>
                           ))}
                       </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2 shadow-sm">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">Top seals channel</CardTitle>
                            <Button variant="outline" size="sm" className="h-8">Monthly <ChevronDown className="w-4 h-4 ml-1" /></Button>
                        </div>
                        <CardDescription>Last 90 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-1/4">Status</TableHead>
                                    <TableHead className="w-1/4">Name</TableHead>
                                    <TableHead className="w-1/4">Device</TableHead>
                                    <TableHead className="w-1/4">Order number</TableHead>
                                    <TableHead className="w-1/4 text-right">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentOrders.map((order, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Badge variant={
                                                order.status === 'Complete' ? 'default' : 
                                                order.status === 'In process' ? 'secondary' : 'destructive'
                                            } className={
                                                order.status === 'Complete' ? 'bg-green-100 text-green-800' :
                                                order.status === 'In process' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                            }>
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={order.avatar} />
                                                    <AvatarFallback>{order.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold">{order.name}</p>
                                                    <p className="text-xs text-gray-500">{order.handle}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{order.device}</TableCell>
                                        <TableCell>{order.orderNumber}</TableCell>
                                        <TableCell className="text-right">{order.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

