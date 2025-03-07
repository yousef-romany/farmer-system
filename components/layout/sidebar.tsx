import { MainNav } from "@/components/layout/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Notifications } from "@/components/notifications"
import { MilkIcon as Cow } from "lucide-react"
import Link from "next/link"

export function Sidebar() {
  return (
    <div className="flex h-full flex-col border-l">
      <div className="flex h-14 items-center justify-between border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Cow className="h-6 w-6" />
          <span>نظام إدارة المواشي</span>
        </Link>
        <div className="flex items-center gap-2">
          <Notifications />
          <ModeToggle />
        </div>
      </div>
      <div className="flex-1 overflow-auto py-2 px-4">
        <MainNav />
      </div>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10">
              <span className="flex h-full w-full items-center justify-center text-sm font-medium text-primary">م</span>
            </div>
            <div>
              <p className="text-sm font-medium">محمد أحمد</p>
              <p className="text-xs text-muted-foreground">مدير</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

