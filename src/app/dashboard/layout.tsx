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
  Home,
  MessageSquare,
  Bot,
  Users,
  LayoutTemplate,
  BarChart2,
  Settings,
  LifeBuoy,
  User as UserIcon,
} from 'lucide-react';
import { useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogoutButton } from '@/components/auth/logout-button';

const menuGroups = [
    {
        label: 'Dashboard',
        items: [
            { href: '/dashboard', icon: Home, label: 'Overview' },
            { href: '/dashboard/conversations', icon: MessageSquare, label: 'Conversations' },
            { href: '/dashboard/analytics', icon: BarChart2, label: 'Analytics' },
        ]
    },
    {
        label: 'Management',
        items: [
            { href: '/dashboard/ai-training', icon: Bot, label: 'AI Training' },
            { href: '/dashboard/team', icon: Users, label: 'Team' },
            { href: '/dashboard/widgets', icon: LayoutTemplate, label: 'Widget' },
        ]
    }
];

const bottomMenuItems = [
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
    { href: '/dashboard/support', icon: LifeBuoy, label: 'Support' },
]


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold group-data-[collapsible=icon]:hidden">ChatGenius</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
            {menuGroups.map((group) => (
                <SidebarGroup key={group.label}>
                    <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                    <SidebarMenu>
                        {group.items.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton href={item.href} tooltip={item.label} isActive={pathname === item.href}>
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
                {bottomMenuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton href={item.href} tooltip={item.label} isActive={pathname === item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
            <SidebarSeparator />
            <div className="flex items-center gap-3 p-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center">
                <Avatar className="w-9 h-9">
                    <AvatarImage src={user.photoURL ?? ''} alt="User avatar" />
                    <AvatarFallback>
                        <UserIcon />
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
                    <p className="text-sm font-semibold truncate">{user.displayName ?? user.email}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                 <div className="group-data-[collapsible=icon]:hidden">
                    <LogoutButton />
                </div>
            </div>
             <div className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                <LogoutButton />
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b bg-background">
            <SidebarTrigger />
            <h2 className="text-xl font-semibold">Dashboard</h2>
        </header>
        <main className="flex-1 p-6 bg-muted/5">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
