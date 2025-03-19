"use client"

import { MainNav } from "@/components/layout/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Notifications } from "@/components/notifications"
import { MilkIcon as Cow, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSidebar } from "./sidebar-provider"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar()

  return (
    <div
      className={cn(
        "fixed top-0 right-0 z-40 h-full border-l transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-4">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Cow className="h-6 w-6" />
            <span>نظام إدارة المواشي</span>
          </Link>
        )}
        {isCollapsed && <Cow className="h-6 w-6 mx-auto" />}
        <div className={cn("flex items-center gap-2", isCollapsed && "mx-auto")}>
          {!isCollapsed && (
            <>
              <Notifications />
              <ModeToggle />
            </>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:flex hidden">
            {isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto py-2 px-4">
        <MainNav isCollapsed={isCollapsed} />
      </div>
      {!isCollapsed && (
        <div className="mt-auto border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10">
                <span className="flex h-full w-full items-center justify-center text-sm font-medium text-primary">
                  م
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">محمد أحمد</p>
                <p className="text-xs text-muted-foreground">مدير</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {isCollapsed && (
        <div className="mt-auto border-t p-2 flex justify-center">
          <div className="h-8 w-8 rounded-full bg-primary/10">
            <span className="flex h-full w-full items-center justify-center text-sm font-medium text-primary">م</span>
          </div>
        </div>
      )}
    </div>
  )
}

