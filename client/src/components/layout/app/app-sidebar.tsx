"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronUp,
  Film,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Sparkles,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Videos",
    href: "/videos",
    icon: Film,
  },
  {
    title: "Conversations",
    href: "/conversations",
    icon: MessageSquare,
  },
];

const secondaryItems = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="border-none"
    >
  
      <SidebarHeader className="px-3 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              tooltip="Clario"
              className="h-12 rounded-xl"
            >
              <Link href="/dashboard">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                  <Sparkles className="size-4" />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                  Clario
                  </span>

                  <span className="truncate text-xs text-muted-foreground">
                    Understand more
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
       
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      className="transition-all duration-200"
                    >
                      <Link href={item.href}>
                        <Icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

       
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Manage</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      className="transition-all duration-200"
                    >
                      <Link href={item.href}>
                        <Icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <SidebarSeparator className="mb-3" />

        <SidebarMenu>
          <SidebarMenuItem>
           <SidebarMenuButton
  asChild
  size="lg"
  tooltip="Profile"
  className="rounded-xl transition-all duration-200"
>
  <Link href="/profile">
    <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
      <User className="size-4" />
    </div>

    <div className="grid flex-1 text-left text-sm leading-tight">
      <span className="truncate font-medium">
        Account
      </span>

      <span className="truncate text-xs text-muted-foreground">
        Manage profile
      </span>
    </div>

    <ChevronUp className="ml-auto size-4 text-muted-foreground" />
  </Link>
</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}