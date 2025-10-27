
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
  Search,
  Bell,
  Mail,
} from 'lucide-react';
import { useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogoutButton } from '@/components/auth/logout-button';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const menuGroups = [
    {
        label: 'Menu',
        items: [
            { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { href: '/admin/users', icon: Users, label: 'Users' },
            { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
            { href: '/admin/team', icon: Users, label: 'Team' },
        ]
    },
    {
        label: 'General',
        items: [
            { href: '/admin/settings', icon: Package, label: 'Settings' },
            { href: '/admin/support', icon: LifeBuoy, label: 'Help' },
            { href: '/admin/billing', icon: CreditCard, label: 'Billing' },
            
        ]
    }
];


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


  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="icon" className="bg-background text-foreground border-r">
        <SidebarHeader className="h-20">
          <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold group-data-[collapsible=icon]:hidden text-foreground">Donezo</span>
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
                    <SidebarMenuButton href="/admin/logout" tooltip="Logout" className="text-muted-foreground hover:bg-accent hover:text-foreground">
                        <LogoutButton />
                        <span>Logout</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 h-20 border-b bg-background">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                 <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input placeholder="Search task" className="pl-10 w-64 bg-muted border-none" />
                </div>
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
        <main className="flex-1 p-6 bg-muted/40">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
