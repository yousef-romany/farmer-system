"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AddAlertModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddAlertModal({ isOpen, onClose }: AddAlertModalProps) {
  const [priority, setPriority] = useState("")
  const [message, setMessage] = useState("")
  const [date, setDate] = useState("")
  const [related, setRelated] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // هنا يمكنك إضافة المنطق الخاص بإضافة التنبيه الجديد
    console.log("إضافة تنبيه جديد:", { priority, message, date, related })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إضافة تنبيه جديد</DialogTitle>
          <DialogDescription>أدخل معلومات التنبيه الجديد هنا. اضغط على حفظ عند الانتهاء.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="priority" className="text-right">
                الأولوية
              </label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر الأولوية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">عاجل</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="low">منخفض</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="message" className="text-right">
                الرسالة
              </label>
              <Input id="message" value={message} onChange={(e) => setMessage(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right">
                التاريخ
              </label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="related" className="text-right">
                المتعلق بـ
              </label>
              <Input id="related" value={related} onChange={(e) => setRelated(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">حفظ</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

