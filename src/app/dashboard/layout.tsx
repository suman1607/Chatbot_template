
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
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUser, mockUserPermissions } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const menuGroups = [
    {
        label: 'Dashboard',
        items: [
            { href: '/dashboard', icon: Home, label: 'Overview', permission: 'Dashboard' },
            { href: '/dashboard/conversations', icon: MessageSquare, label: 'Conversations', permission: 'Conversations' },
            { href: '/dashboard/analytics', icon: BarChart2, label: 'Analytics', permission: 'Analytics' },
        ]
    },
    {
        label: 'Management',
        items: [
            { href: '/dashboard/ai-training', icon: Bot, label: 'AI Training', permission: 'AI Training' },
            { href: '/dashboard/team', icon: Users, label: 'Team', permission: 'Team' },
            { href: '/dashboard/widgets', icon: LayoutTemplate, label: 'Widget', permission: 'Widget' },
        ]
    }
];

const bottomMenuItems = [
    { href: '/dashboard/settings', icon: Settings, label: 'Settings', permission: 'Settings' },
    { href: '/dashboard/support', icon: LifeBuoy, label: 'Support', permission: 'Support' },
]

const LogoutButton = () => (
    // TODO: A real logout button should be implemented here.
    // For the template, this can link to the homepage or a login page.
    <Button asChild variant="destructive" size="sm" className="w-full">
        <Link href="/">Logout</Link>
    </Button>
);


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = mockUser;
  const userPermissions = mockUserPermissions;
  const pathname = usePathname();

  const filteredMenuGroups = menuGroups.map(group => ({
    ...group,
    items: group.items.filter(item => userPermissions.includes(item.permission))
  })).filter(group => group.items.length > 0);

  const filteredBottomMenuItems = bottomMenuItems.filter(item => userPermissions.includes(item.permission));


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
            {filteredMenuGroups.map((group) => (
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
                {filteredBottomMenuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton href={item.href} tooltip={item.label} isActive={pathname === item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
            <SidebarSeparator />
            <div className="flex flex-col items-center gap-3 p-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center">
                <div className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center">
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
                </div>
                <div className="w-full flex justify-center">
                    <LogoutButton />
                </div>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b bg-background">
            <SidebarTrigger />
            <h2 className="text-xl font-semibold capitalize">{pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}</h2>
        </header>
        <main className="flex-1 p-6 bg-muted/5">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
