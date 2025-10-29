
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarFooter,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
  useSidebar
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  LifeBuoy,
  Package,
  BarChart3,
  Shield,
  Send,
  FileText,
  Bot,
  User as UserIcon,
  Bell,
  Mail,
  LogOut,
  Power,
  Users2,
  GitBranch,
  KeyRound,
  Settings,
  PanelLeft,
  CheckCheck,
  Archive,
  AlertTriangle,
  Info
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { mockUser } from '@/lib/mock-data';


const menuGroups = [
    {
        label: 'Platform',
        items: [
            { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { href: '/admin/users', icon: Users, label: 'Users / Workspaces' },
            { href: '/admin/billing', icon: CreditCard, label: 'Subscriptions & Billing' },
            { href: '/admin/support', icon: LifeBuoy, label: 'Tickets & Support' },
            { href: '/admin/analytics', icon: BarChart3, label: 'Analytics & Reports' },
        ]
    },
    {
        label: 'Management',
        items: [
            { href: '/admin/product', icon: Package, label: 'Product & Updates' },
            { href: '/admin/broadcasts', icon: Send, label: 'Broadcasts' },
            { href: '/admin/status', icon: Power, label: 'System Health' },
            { href: '/admin/admins', icon: Users2, label: 'Admin Team' },
            { href: '/admin/integrations', icon: GitBranch, label: 'API & Integrations' },
        ]
    },
    {
        label: 'Administration',
        items: [
            { href: '/admin/security', icon: Shield, label: 'Security & Audit' },
            { href: '/admin/docs', icon: FileText, label: 'Docs & Legal' },
            { href: '/admin/settings', icon: Settings, label: 'Settings' },
        ]
    }
];

const messages = [
    { id: 1, from: 'Support Team', subject: 'New high-priority ticket #T1234', preview: 'A user is reporting a critical issue...', unread: true },
    { id: 2, from: 'Billing Alert', subject: 'Payment failed for Innovate Inc.', preview: 'The monthly subscription payment failed...', unread: true },
    { id: 3, from: 'Admin User', subject: 'Re: Project Phoenix Update', preview: 'Great work on the latest release...', unread: false },
]

const notifications = [
    { id: 1, type: 'alert', text: 'High CPU usage detected on API servers.', time: '5m ago', link: '/admin/status', icon: <AlertTriangle className="w-5 h-5 text-red-500" /> },
    { id: 2, type: 'info', text: 'Release v2.5.1 has been successfully deployed.', time: '1h ago', link: '/admin/product', icon: <Info className="w-5 h-5 text-blue-500" /> },
    { id: 3, type: 'update', text: 'New documentation for the API is available.', time: '3h ago', link: '/admin/docs', icon: <FileText className="w-5 h-5 text-primary" /> },
]

const Header = () => {
    const user = mockUser;
    const { state, toggleSidebar } = useSidebar();
    const [unreadMessages, setUnreadMessages] = useState(messages.filter(m => m.unread).length);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
    
    return (
        <header className="flex items-center justify-between p-4 h-20 border-b bg-background">
            <div className="flex items-center gap-4">
                 <button 
                    onClick={toggleSidebar}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <PanelLeft className={cn("w-5 h-5 transition-transform", state === 'expanded' ? 'rotate-180' : '')} />
                </button>
            </div>
            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon" className="relative">
                            <Mail className="w-5 h-5 text-muted-foreground"/>
                            {unreadMessages > 0 && <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{unreadMessages}</span>}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel className="flex justify-between items-center">
                            <span>Messages</span>
                            <Link href="#" className="text-xs font-normal text-primary hover:underline">View all</Link>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {messages.length > 0 ? (
                           messages.slice(0, 3).map(msg => (
                             <DropdownMenuItem key={msg.id} className="flex flex-col items-start gap-1">
                                <div className="flex justify-between w-full">
                                    <span className="font-semibold text-sm">{msg.from}</span>
                                    {msg.unread && <Badge variant="default" className="h-4 px-1.5 text-[10px] bg-primary">New</Badge>}
                                </div>
                                <p className="text-xs text-muted-foreground truncate w-full">{msg.subject}</p>
                            </DropdownMenuItem>
                           ))
                        ) : (
                             <div className="text-center text-sm text-muted-foreground p-4">No new messages</div>
                        )}
                         <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setUnreadMessages(0)}>
                            <CheckCheck className="mr-2 h-4 w-4"/> Mark all as read
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="w-5 h-5 text-muted-foreground"/>
                            {hasUnreadNotifications && <span className="absolute top-2.5 right-2.5 flex h-2 w-2 rounded-full bg-primary" />}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                         {notifications.length > 0 ? (
                           notifications.map(notif => (
                            <DropdownMenuItem key={notif.id} asChild>
                                <Link href={notif.link} className="flex items-start gap-3">
                                    <div className="mt-1">{notif.icon}</div>
                                    <div>
                                        <p className="text-sm whitespace-normal">{notif.text}</p>
                                        <p className="text-xs text-muted-foreground">{notif.time}</p>
                                    </div>
                                </Link>
                             </DropdownMenuItem>
                           ))
                        ) : (
                            <div className="text-center text-sm text-muted-foreground p-4">All caught up!</div>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setHasUnreadNotifications(false)}>
                            <Archive className="mr-2 h-4 w-4"/> Clear all
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9">
                        <AvatarImage src={user?.photoURL ?? ''} alt="Admin avatar" />
                        <AvatarFallback>
                            <UserIcon />
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold truncate text-foreground">{user?.displayName ?? 'Admin User'}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const user = mockUser; // Use mock user for static template

  if (pathname === '/admin/login') {
      return <>{children}</>;
  }

  const handleLogout = () => {
    // TODO: Implement your own logout logic.
    // For this template, we just redirect to the login page.
    console.log("Logging out...");
    router.push('/admin/login');
  };


  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="icon" className="bg-background text-foreground border-r">
        <SidebarHeader className="h-20">
          <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold group-data-[collapsible=icon]:hidden text-foreground">Admin</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
            {menuGroups.map((group) => (
                <SidebarGroup key={group.label}>
                    <SidebarGroupLabel className="text-muted-foreground">{group.label}</SidebarGroupLabel>
                    <SidebarMenu>
                        {group.items.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton 
                                    href={item.href} 
                                    tooltip={item.label} 
                                    isActive={pathname === item.href}
                                    className="text-muted-foreground hover:bg-accent hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                                >
                                <item.icon />
                                <span>{item.label}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </SidebarContent>
        <SidebarFooter>
             <SidebarMenu className="flex items-center justify-center">
                <SidebarMenuItem>
                  <button
                    onClick={handleLogout}
                    className="group flex items-center justify-start w-[45px] h-[45px] bg-white border-none rounded-full cursor-pointer relative overflow-hidden transition-all duration-300 shadow-md hover:w-[125px] hover:rounded-[40px] hover:bg-black active:translate-y-0.5"
                    aria-label="Logout"
                  >
                    <div className="sign w-full transition-all duration-300 flex items-center justify-center group-hover:w-[30%] group-hover:pl-5">
                      <svg viewBox="0 0 512 512" className="w-[17px]">
                        <path
                          d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                          className="fill-black group-hover:fill-white"
                        />
                      </svg>
                    </div>
                    <div className="text absolute right-0 w-0 opacity-0 text-white text-base font-semibold transition-all duration-300 group-hover:opacity-100 group-hover:w-[70%] group-hover:pr-2.5">
                      Logout
                    </div>
                  </button>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-6 bg-muted/40">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
