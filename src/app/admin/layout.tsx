
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
} from 'lucide-react';
import { useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogoutButton } from '@/components/auth/logout-button';

const menuGroups = [
    {
        label: 'Management',
        items: [
            { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { href: '/admin/users', icon: Users, label: 'Users' },
            { href: '/admin/billing', icon: CreditCard, label: 'Billing' },
            { href: '/admin/support', icon: LifeBuoy, label: 'Support' },
        ]
    },
    {
        label: 'Platform',
        items: [
            { href: '/admin/product', icon: Package, label: 'Product' },
            { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
            { href: '/admin/broadcasts', icon: Send, label: 'Broadcasts' },
            { href: '/admin/docs', icon: FileText, label: 'Docs' },
        ]
    }
];

const bottomMenuItems = [
    { href: '/admin/security', icon: Shield, label: 'Security' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  // This is a simplified check. A real app would have role-based access control.
  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-600"></div>
      </div>
    );
  }

  // If not logged in and not on the login page, redirect.
  if (!user && pathname !== '/admin/login') {
    router.push('/admin/login');
    return null;
  }
  
  // If logged in but on the login page, redirect to dashboard.
  if(user && pathname === '/admin/login') {
    router.push('/admin/dashboard');
    return null;
  }

  // Don't render the layout for the login page
  if (pathname === '/admin/login') {
      return <>{children}</>;
  }


  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon" className="bg-gray-900 text-white border-gray-700">
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold group-data-[collapsible=icon]:hidden text-white">Admin</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
            {menuGroups.map((group) => (
                <SidebarGroup key={group.label}>
                    <SidebarGroupLabel className="text-gray-400">{group.label}</SidebarGroupLabel>
                    <SidebarMenu>
                        {group.items.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton 
                                    href={item.href} 
                                    tooltip={item.label} 
                                    isActive={pathname === item.href}
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white data-[active=true]:bg-blue-600 data-[active=true]:text-white"
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
                {bottomMenuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton 
                            href={item.href} 
                            tooltip={item.label} 
                            isActive={pathname === item.href}
                            className="text-gray-300 hover:bg-gray-700 hover:text-white data-[active=true]:bg-blue-600 data-[active=true]:text-white"
                        >
                        <item.icon />
                        <span>{item.label}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
            <SidebarSeparator className="bg-gray-700"/>
            <div className="flex flex-col items-center gap-3 p-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center">
                <div className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center">
                    <Avatar className="w-9 h-9">
                        <AvatarImage src={user?.photoURL ?? ''} alt="Admin avatar" />
                        <AvatarFallback>
                            <UserIcon />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
                        <p className="text-sm font-semibold truncate text-white">{user?.displayName ?? 'Admin User'}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <LogoutButton />
                </div>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b bg-white">
            <SidebarTrigger />
            <h2 className="text-xl font-semibold text-gray-800 capitalize">
                {pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
            </h2>
        </header>
        <main className="flex-1 p-6 bg-gray-50">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
