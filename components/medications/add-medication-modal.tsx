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

interface AddMedicationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddMedicationModal({ isOpen, onClose }: AddMedicationModalProps) {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [purpose, setPurpose] = useState("")
  const [dosage, setDosage] = useState("")
  const [quantity, setQuantity] = useState("")
  const [expiryDate, setExpiryDate] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // هنا يمكنك إضافة المنطق الخاص بإضافة الدواء الجديد
    console.log("إضافة دواء جديد:", { name, type, purpose, dosage, quantity, expiryDate })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إضافة دواء جديد</DialogTitle>
          <DialogDescription>أدخل معلومات الدواء الجديد هنا. اضغط على حفظ عند الانتهاء.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                اسم الدواء
              </label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="type" className="text-right">
                النوع
              </label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر نوع الدواء" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="antibiotic">مضاد حيوي</SelectItem>
                  <SelectItem value="vitamin">فيتامين</SelectItem>
                  <SelectItem value="vaccine">لقاح</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="purpose" className="text-right">
                الغرض
              </label>
              <Input id="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="dosage" className="text-right">
                الجرعة
              </label>
              <Input id="dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="quantity" className="text-right">
                الكمية
              </label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="expiryDate" className="text-right">
                تاريخ الانتهاء
              </label>
              <Input
                id="expiryDate"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
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

