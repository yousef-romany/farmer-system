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

interface Medication {
  id: string
  name: string
  type: string
  purpose: string
  dosage: string
  quantity: number
  expiryDate: string
  status: string
}

interface EditMedicationModalProps {
  isOpen: boolean
  onClose: () => void
  medication: Medication | null
}

export function EditMedicationModal({ isOpen, onClose, medication }: EditMedicationModalProps) {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [purpose, setPurpose] = useState("")
  const [dosage, setDosage] = useState("")
  const [quantity, setQuantity] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    if (medication) {
      setName(medication.name)
      setType(medication.type)
      setPurpose(medication.purpose)
      setDosage(medication.dosage)
      setQuantity(medication.quantity.toString())
      setExpiryDate(medication.expiryDate)
      setStatus(medication.status)
    }
  }, [medication])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // هنا يمكنك إضافة المنطق الخاص بتحديث معلومات الدواء
    console.log("تحديث معلومات الدواء:", { name, type, purpose, dosage, quantity, expiryDate, status })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تعديل معلومات الدواء</DialogTitle>
          <DialogDescription>قم بتعديل معلومات الدواء هنا. اضغط على حفظ عند الانتهاء.</DialogDescription>
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
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">
                الحالة
              </label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">متوفر</SelectItem>
                  <SelectItem value="low">منخفض</SelectItem>
                  <SelectItem value="out_of_stock">نفذ المخزون</SelectItem>
                </SelectContent>
              </Select>
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

