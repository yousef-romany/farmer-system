"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { MainNav } from "./main-nav"
import { MilkIcon as Cow } from "lucide-react"
import Link from "next/link"

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64 p-0">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Cow className="h-6 w-6" />
            <span>نظام إدارة المواشي</span>
          </Link>
        </div>
        <div className="py-4 px-4">
          <MainNav />
        </div>
        <div className="mt-auto border-t p-4">
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
      </SheetContent>
    </Sheet>
  )
}

