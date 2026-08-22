import type { ReactNode } from "react";

import { AppHeader } from "@/components/layout/app/app-header";
import { AppSidebar } from "@/components/layout/app/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <AppHeader />

          <main className="flex min-h-[calc(100vh-4rem)] flex-1 flex-col">
            <div className="w-full flex-1 p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}