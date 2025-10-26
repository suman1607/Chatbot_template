
'use client';

import { useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  MessageSquare,
  Bot,
  Smile,
  Users,
  Ticket,
  Puzzle,
  Tag,
  DollarSign,
  ArrowUp,
  ArrowDown,
  BarChart,
  List,
  Plus,
  Settings,
  Flame,
  CheckCircle,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import {
  Area,
  AreaChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 273 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

const pieChartConfig = {
  widget: { label: 'Widget', color: 'hsl(var(--chart-1))' },
  whatsapp: { label: 'WhatsApp', color: 'hsl(var(--chart-2))' },
  messenger: { label: 'Messenger', color: 'hsl(var(--chart-3))' },
} satisfies ChartConfig;

const pieChartData = [
  { name: 'widget', value: 60, fill: 'hsl(var(--chart-1))' },
  { name: 'whatsapp', value: 25, fill: 'hsl(var(--chart-2))' },
  { name: 'messenger', value: 15, fill: 'hsl(var(--chart-3))' },
];

const recentActivities = [
    { icon: <CheckCircle className="w-4 h-4 text-green-500" />, text: "AI auto-resolved a billing question", time: "2m ago" },
    { icon: <MessageSquare className="w-4 h-4 text-blue-500" />, text: "Agent Sarah replied in 2m", time: "10m ago" },
    { icon: <Puzzle className="w-4 h-4 text-indigo-500" />, text: "Widget installed on myshop.com", time: "1h ago" },
    { icon: <Flame className="w-4 h-4 text-red-500" />, text: "SLA breached: 1 ticket", time: "2h ago" },
]

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="flex-1 space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Hey, {user?.displayName || 'Creator'}! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to scale support? Here’s your business at a glance.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Conversations
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,430</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Resolved</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">74%</div>
            <Progress value={74} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              AI Savings: 7.2hr
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CSAT</CardTitle>
            <Smile className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7/5</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              +0.2 point last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Agents
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex -space-x-2 overflow-hidden mt-2">
              <Avatar className="inline-block h-6 w-6 rounded-full ring-2 ring-background">
                <AvatarImage src="https://picsum.photos/seed/1/32/32" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <Avatar className="inline-block h-6 w-6 rounded-full ring-2 ring-background">
                <AvatarImage src="https://picsum.photos/seed/2/32/32" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <Avatar className="inline-block h-6 w-6 rounded-full ring-2 ring-background">
                <AvatarImage src="https://picsum.photos/seed/3/32/32" />
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Ticket className="w-5 h-5 text-muted-foreground" /> New Ticket Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">9</div>
            <p className="text-sm text-muted-foreground">Tickets unassigned</p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Assign</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Puzzle className="w-5 h-5 text-muted-foreground" /> Widget Installs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">4</div>
            <p className="text-sm text-muted-foreground">Websites live</p>
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="outline">View Widgets</Button>
          </CardFooter>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                    <Tag className="w-5 h-5 text-muted-foreground" /> Subscription & Usage
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex justify-between items-end'>
                    <div>
                        <p className="text-lg font-semibold">Pro Plan ($79/mo)</p>
                        <p className="text-sm text-muted-foreground">Next invoice: Nov 7</p>
                    </div>
                    <Button size="sm">Upgrade</Button>
                </div>
                <div className='mt-4'>
                    <Progress value={73} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1 text-right">Usage: 73% (conversations)</p>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Conversation Analytics</CardTitle>
            <CardDescription>Conversations per day (last 30 days)</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -30, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area type="monotone" dataKey="desktop" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Most Active Channels</CardTitle>
            <CardDescription>Top sources for conversations</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={pieChartData} dataKey="value" nameKey="name" innerRadius={50}>
                    {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center gap-3">
                            {activity.icon}
                            <p className="text-sm flex-1">{activity.text}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <Button variant="outline"><MessageSquare className="w-4 h-4 mr-2" />New Chat</Button>
                <Button variant="outline"><Plus className="w-4 h-4 mr-2" />Add Agent</Button>
                <Button variant="outline"><Bot className="w-4 h-4 mr-2" />Train AI</Button>
                <Button variant="outline"><ArrowUp className="w-4 h-4 mr-2" />Upgrade</Button>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}

    