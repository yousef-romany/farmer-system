"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDate } from "@/lib/utils"

interface Notification {
  id: string
  message: string
  date: string
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // هنا يمكنك إضافة منطق لجلب الإشعارات من الخادم
    const mockNotifications: Notification[] = [
      { id: "1", message: "تم إضافة ماشية جديدة", date: new Date().toISOString() },
      { id: "2", message: "موعد تطعيم الماشية #1005", date: new Date().toISOString() },
    ]
    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.length)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
    setUnreadCount(Math.max(0, unreadCount - 1))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} className="flex flex-col items-start">
            <span>{notification.message}</span>
            <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
            <Button variant="link" size="sm" className="mt-1" onClick={() => markAsRead(notification.id)}>
              تحديد كمقروء
            </Button>
          </DropdownMenuItem>
        ))}
        {notifications.length === 0 && <DropdownMenuItem disabled>لا توجد إشعارات جديدة</DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

