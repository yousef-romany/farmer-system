"use client"

import type React from "react"

import { useState, useEffect } from "react"
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

interface Expense {
  id: string
  date: string
  category: string
  description: string
  amount: number
  responsiblePerson: string
}

interface EditExpenseModalProps {
  isOpen: boolean
  onClose: () => void
  expense: Expense | null
}

export function EditExpenseModal({ isOpen, onClose, expense }: EditExpenseModalProps) {
  const [date, setDate] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [responsiblePerson, setResponsiblePerson] = useState("")

  useEffect(() => {
    if (expense) {
      setDate(expense.date)
      setCategory(expense.category)
      setDescription(expense.description)
      setAmount(expense.amount.toString())
      setResponsiblePerson(expense.responsiblePerson)
    }
  }, [expense])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // هنا يمكنك إضافة المنطق الخاص بتحديث معلومات المصروف
    console.log("تحديث معلومات المصروف:", { date, category, description, amount, responsiblePerson })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تعديل معلومات المصروف</DialogTitle>
          <DialogDescription>قم بتعديل معلومات المصروف هنا. اضغط على حفظ عند الانتهاء.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
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
              <label htmlFor="category" className="text-right">
                الفئة
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر فئة المصروف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feed">علف</SelectItem>
                  <SelectItem value="medication">أدوية</SelectItem>
                  <SelectItem value="maintenance">صيانة</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
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
              <label htmlFor="amount" className="text-right">
                المبلغ
              </label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="responsiblePerson" className="text-right">
                المسؤول
              </label>
              <Input
                id="responsiblePerson"
                value={responsiblePerson}
                onChange={(e) => setResponsiblePerson(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">حفظ التغييرات</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

