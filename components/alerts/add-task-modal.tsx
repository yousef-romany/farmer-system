"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [assignedTo, setAssignedTo] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // هنا يمكنك إضافة المنطق الخاص بإضافة المهمة الجديدة
    console.log("إضافة مهمة جديدة:", { title, description, dueDate, assignedTo })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إضافة مهمة جديدة</DialogTitle>
          <DialogDescription>أدخل معلومات المهمة الجديدة هنا. اضغط على حفظ عند الانتهاء.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">
                العنوان
              </label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                الوصف
              </label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="dueDate" className="text-right">
                تاريخ الاستحقاق
              </label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="assignedTo" className="text-right">
                تم تعيينها لـ
              </label>
              <Input
                id="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="col-span-3"
              />
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

