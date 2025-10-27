
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
  SidebarTrigger,
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
} from 'lucide-react';
import { useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAuth, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

const Header = () => {
    const { user } = useUser();
    const { state, toggleSidebar } = useSidebar();
    
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
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon"><Mail className="w-5 h-5 text-muted-foreground"/></Button>
                <Button variant="ghost" size="icon"><Bell className="w-5 h-5 text-muted-foreground"/></Button>
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
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isUserLoading) return;

    if (!user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
    
    if(user && pathname === '/admin/login') {
      router.push('/admin/dashboard');
    }
  }, [user, isUserLoading, pathname, router]);

  if (isUserLoading || (!user && pathname !== '/admin/login')) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  if (pathname === '/admin/login') {
      return <>{children}</>;
  }

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
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
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout} tooltip="Logout" className="text-muted-foreground hover:bg-accent hover:text-foreground">
                        <LogOut />
                        <span>Logout</span>
                    </SidebarMenuButton>
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
