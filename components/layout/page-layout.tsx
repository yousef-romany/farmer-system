"use client";

import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { useSidebar } from "./sidebar-provider";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  filter?: string;
  setFilter?: (value: string) => void;
  actions?: ReactNode;
}

export function PageLayout({
  children,
  title,
  actions,
}: PageLayoutProps) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div
        className={cn(
          "flex-1 transition-all duration-300",
          isCollapsed ? "md:mr-16" : "md:mr-64"
        )}
      >
        <div className="flex h-14 items-center border-b px-4 gap-3">
          <div className="md:hidden mr-2">
            <MobileSidebar />
          </div>
          <h1 className="text-xl font-bold">{title}</h1>
          <div className="ml-auto flex items-center gap-4">{actions}</div>
        </div>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
