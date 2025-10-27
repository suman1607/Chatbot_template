
'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  Users,
  CreditCard,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Filter,
  MoreHorizontal,
  ChevronDown,
  Download,
  AlertTriangle,
  FileText,
  Percent,
  Plus,
  Search,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
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
} from 'recharts';

const kpiData = [
  { title: 'MRR', value: '$42,380', change: '+2.1%', icon: <DollarSign /> },
  { title: 'Active Subscriptions', value: '1,284', change: '+15', icon: <Users /> },
  { title: 'New MRR', value: '$3,120', change: '+8.5%', icon: <TrendingUp /> },
  { title: 'Churned MRR', value: '$840', change: '-5.2%', icon: <TrendingDown /> },
];

const revenueData = [
  { date: 'Jan', revenue: 32000 },
  { date: 'Feb', revenue: 35000 },
  { date: 'Mar', revenue: 38000 },
  { date: 'Apr', revenue: 37000 },
  { date: 'May', revenue: 40000 },
  { date: 'Jun', revenue: 42380 },
];

const planDistributionData = [
    { name: 'Starter', value: 25, color: 'hsl(var(--chart-2))' },
    { name: 'Pro', value: 45, color: 'hsl(var(--primary))' },
    { name: 'Business', value: 30, color: 'hsl(var(--chart-5))' },
];

const subscriptions = [
    { id: 'ws-01', name: 'Innovate Inc.', owner: 'owner@innovate.com', plan: 'Pro', amount: 79, status: 'Active', renewal: '2024-07-15' },
    { id: 'ws-02', name: 'Creative Solutions', owner: 'hello@creative.com', plan: 'Starter', amount: 29, status: 'Active', renewal: '2024-07-20' },
    { id: 'ws-03', name: 'Data Corp', owner: 'admin@datacorp.io', plan: 'Business', amount: 199, status: 'Past Due', renewal: '2024-06-10' },
    { id: 'ws-04', name: 'Market Wizards', owner: 'contact@marketwizards.co', plan: 'Pro', amount: 79, status: 'Trialling', renewal: '2024-06-28' },
    { id: 'ws-05', name: 'Global Tech', owner: 'support@globaltech.net', plan: 'Cancelled', amount: 199, status: 'Cancelled', renewal: '2024-05-21' },
];

const invoices = [
    { id: 'inv-01', date: '2024-06-15', workspace: 'Innovate Inc.', amount: 79, status: 'Paid', paymentMethod: 'Visa **** 4242' },
    { id: 'inv-02', date: '2024-06-10', workspace: 'Data Corp', amount: 199, status: 'Failed', paymentMethod: 'Amex **** 1002' },
    { id: 'inv-03', date: '2024-06-05', workspace: 'Creative Solutions', amount: 29, status: 'Paid', paymentMethod: 'Visa **** 5541' },
    { id: 'inv-04', date: '2024-05-21', workspace: 'Global Tech', amount: 199, status: 'Refunded', paymentMethod: 'Visa **** 8921' },
];

const failedPayments = [
    { workspace: 'Data Corp', amount: 199, reason: 'Insufficient funds', retries: 2, lastAttempt: '2024-06-12' },
    { workspace: 'Another Co.', amount: 79, reason: 'Card expired', retries: 1, lastAttempt: '2024-06-11' },
];

const coupons = [
    { code: 'SUMMER20', percent: 20, status: 'Active', redemptions: '12/100' },
    { code: 'WELCOME10', amount: 10, status: 'Active', redemptions: '45/200' },
    { code: 'EXPIRED50', percent: 50, status: 'Expired', redemptions: '50/50' },
]

const KpiCard = ({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
            <div className="p-2 rounded-full bg-orange-100 text-primary">
                {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
            </div>
        </CardHeader>
        <CardContent>
            <div className="text-3xl font-bold">{value}</div>
            <p className={`text-xs ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{change}</p>
        </CardContent>
    </Card>
);

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
        'Trialling': 'bg-blue-100 text-blue-800',
        'Past Due': 'bg-red-100 text-red-800 animate-pulse',
        'Cancelled': 'bg-gray-100 text-gray-800',
        'Paid': 'bg-green-100 text-green-800',
        'Failed': 'bg-red-100 text-red-800',
        'Refunded': 'bg-yellow-100 text-yellow-800'
    }
    return <Badge variant="outline" className={statusColors[status]}>{status}</Badge>;
}

export default function AdminBillingPage() {
    const [activeTimeRange, setActiveTimeRange] = useState('30d');

    const topPlan = planDistributionData.reduce((prev, current) => (prev.value > current.value) ? prev : current);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Billing & Subscriptions</h1>
                    <p className="text-muted-foreground">Manage revenue, subscriptions, and payments across the platform.</p>
                </div>
                <Button>
                    <Download className="mr-2 h-4 w-4" /> Export Reports
                </Button>
            </div>

             <div className="p-4 bg-orange-50 border-l-4 border-primary rounded-r-lg flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-primary" />
                <div>
                    <h4 className="font-bold text-primary">Anomaly Detected</h4>
                    <p className="text-sm text-orange-900/80">There was a 15% spike in failed payments yesterday. <a href="#" className="font-semibold underline">Investigate now</a></p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                       <div>
                         <CardTitle>Revenue Growth</CardTitle>
                         <CardDescription>MRR growth over the last 6 months.</CardDescription>
                       </div>
                        <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-md">
                            <Button size="sm" variant={activeTimeRange === '7d' ? 'outline' : 'ghost'} onClick={() => setActiveTimeRange('7d')}>7d</Button>
                            <Button size="sm" variant={activeTimeRange === '30d' ? 'outline' : 'ghost'} onClick={() => setActiveTimeRange('30d')}>30d</Button>
                            <Button size="sm" variant={activeTimeRange === '90d' ? 'outline' : 'ghost'} onClick={() => setActiveTimeRange('90d')}>90d</Button>
                        </div>
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
                                <Tooltip content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-background border p-2 rounded-lg shadow-lg">
                                                    <p className="font-bold text-base">${payload[0].value.toLocaleString()}</p>
                                                    <p className="text-sm text-muted-foreground">{label}</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}/>
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
                                <Pie data={planDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} startAngle={90} endAngle={450}>
                                    {planDistributionData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />)}
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

            <Card>
                <CardContent className="p-0">
                    <Tabs defaultValue="subscriptions">
                        <TabsList className="p-4 border-b w-full justify-start bg-transparent rounded-none">
                            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
                            <TabsTrigger value="invoices">Invoices & Payments</TabsTrigger>
                            <TabsTrigger value="dunning">Failed Payments</TabsTrigger>
                            <TabsTrigger value="coupons">Coupons & Credits</TabsTrigger>
                        </TabsList>

                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <div className="group relative max-w-sm">
                                    <Search className="icon absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-900/60" />
                                    <Input 
                                        placeholder="Search by workspace or owner..."
                                        className="h-11 w-full pl-10 pr-4 border-2 border-transparent rounded-lg outline-none bg-orange-100/50 text-foreground transition-all duration-300 ease-in-out focus:bg-white focus:border-primary focus:shadow-[0_0_5px_hsl(var(--primary)/0.5)]"
                                    />
                                </div>
                                <div className="flex gap-2">
                                <Button variant="outline"><Filter className="mr-2 h-4 w-4"/>Filter</Button>
                                 <Button variant="outline">Export CSV</Button>
                                </div>
                            </div>
                            <TabsContent value="subscriptions">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Workspace</TableHead>
                                            <TableHead>Plan</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Renewal Date</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {subscriptions.map((sub) => (
                                        <TableRow key={sub.id}>
                                            <TableCell>
                                                <p className="font-semibold">{sub.name}</p>
                                                <p className="text-xs text-gray-500">{sub.owner}</p>
                                            </TableCell>
                                            <TableCell><PlanBadge plan={sub.plan} /></TableCell>
                                            <TableCell><StatusBadge status={sub.status} /></TableCell>
                                            <TableCell>{sub.renewal}</TableCell>
                                            <TableCell className="text-right font-medium">${sub.amount}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                                        <DropdownMenuItem>Change Plan</DropdownMenuItem>
                                                        <DropdownMenuItem>Add Credit</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-500">Cancel Subscription</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                             <TabsContent value="invoices">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Workspace</TableHead>
                                            <TableHead>Invoice #</TableHead>
                                            <TableHead>Payment Method</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {invoices.map((inv) => (
                                        <TableRow key={inv.id}>
                                            <TableCell>{inv.date}</TableCell>
                                            <TableCell>{inv.workspace}</TableCell>
                                            <TableCell className="font-medium text-primary">{inv.id}</TableCell>
                                            <TableCell>{inv.paymentMethod}</TableCell>
                                            <TableCell><StatusBadge status={inv.status} /></TableCell>
                                            <TableCell className="text-right font-medium">${inv.amount}</TableCell>
                                            <TableCell className="text-right"><Button variant="outline" size="sm"><Download className="h-3 w-3 mr-2" /> Download</Button></TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                             </TabsContent>
                             <TabsContent value="dunning">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Workspace</TableHead>
                                            <TableHead>Reason</TableHead>
                                            <TableHead>Retries Left</TableHead>
                                            <TableHead>Last Attempt</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {failedPayments.map((p) => (
                                        <TableRow key={p.workspace}>
                                            <TableCell>{p.workspace}</TableCell>
                                            <TableCell className="text-red-600">{p.reason}</TableCell>
                                            <TableCell className="text-center">{p.retries}</TableCell>
                                            <TableCell>{p.lastAttempt}</TableCell>
                                            <TableCell className="text-right font-medium">${p.amount}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm">Retry</Button>
                                            </TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                             </TabsContent>
                             <TabsContent value="coupons">
                                <div className="flex justify-end mb-4">
                                     <Button><Plus className="mr-2 h-4 w-4"/>Create Coupon</Button>
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Code</TableHead>
                                            <TableHead>Discount</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Redemptions</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {coupons.map((c) => (
                                        <TableRow key={c.code}>
                                            <TableCell className="font-semibold text-primary">{c.code}</TableCell>
                                            <TableCell>{c.percent ? `${c.percent}%` : `$${c.amount}`}</TableCell>
                                            <TableCell><Badge variant={c.status === 'Active' ? 'default' : 'secondary'} className={c.status === 'Active' ? 'bg-green-100 text-green-800' : ''}>{c.status}</Badge></TableCell>
                                            <TableCell>{c.redemptions}</TableCell>
                                            <TableCell className="text-right"><Button variant="outline" size="sm">Deactivate</Button></TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                             </TabsContent>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
