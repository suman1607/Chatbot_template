
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
} from 'lucide-react';
import { useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAuth, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

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
