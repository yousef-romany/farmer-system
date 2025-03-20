"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MilkIcon as Cow, Home, PiggyBank, Scale, Warehouse } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function MainNav({ isCollapsed }: { isCollapsed?: boolean }) {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      title: "الرئيسية",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "المواشي",
      href: "/livestock",
      icon: <Cow className="h-5 w-5" />,
    },
    {
      title: "العنابر",
      href: "/barns",
      icon: <Warehouse className="h-5 w-5" />,
    },
    {
      title: "الأوزان",
      href: "/weights",
      icon: <Scale className="h-5 w-5" />,
    },
    // {
    //   title: "الأدوية",
    //   href: "/medications",
    //   icon: <Pill className="h-5 w-5" />,
    // },
    {
      title: "خزنه",
      href: "/expenses",
      icon: <PiggyBank className="h-5 w-5" />,
    },
    // {
    //   title: "التنبيهات",
    //   href: "/alerts",
    //   icon: <BellRing className="h-5 w-5" />,
    // },
    // {
    //   title: "التقارير",
    //   href: "/reports",
    //   icon: <BarChart3 className="h-5 w-5" />,
    // },
  ]

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-primary/10",
            pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground",
            isCollapsed && "justify-center px-2",
          )}
          title={isCollapsed ? item.title : undefined}
        >
          {item.icon}
          {!isCollapsed && item.title}
        </Link>
      ))}
    </nav>
  )
}

