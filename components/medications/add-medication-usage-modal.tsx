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

interface AddMedicationUsageModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddMedicationUsageModal({ isOpen, onClose }: AddMedicationUsageModalProps) {
  const [date, setDate] = useState("")
  const [livestockId, setLivestockId] = useState("")
  const [medicationName, setMedicationName] = useState("")
  const [dosage, setDosage] = useState("")
  const [reason, setReason] = useState("")
  const [administeredBy, setAdministeredBy] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // هنا يمكنك إضافة المنطق الخاص بتسجيل استخدام الدواء
    console.log("تسجيل استخدام دواء:", { date, livestockId, medicationName, dosage, reason, administeredBy })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تسجيل استخدام دواء</DialogTitle>
          <DialogDescription>أدخل معلومات استخدام الدواء هنا. اضغط على حفظ عند الانتهاء.</DialogDescription>
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
              <label htmlFor="livestockId" className="text-right">
                رقم الماشية
              </label>
              <Select value={livestockId} onValueChange={setLivestockId}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر الماشية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1001">ماشية #1001</SelectItem>
                  <SelectItem value="1002">ماشية #1002</SelectItem>
                  <SelectItem value="1003">ماشية #1003</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="medicationName" className="text-right">
                اسم الدواء
              </label>
              <Select value={medicationName} onValueChange={setMedicationName}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر الدواء" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amoxicillin">أموكسيسيلين</SelectItem>
                  <SelectItem value="vitamin_ad3e">فيتامين AD3E</SelectItem>
                  <SelectItem value="fmd_vaccine">لقاح الحمى القلاعية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="dosage" className="text-right">
                الجرعة
              </label>
              <Input id="dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="reason" className="text-right">
                السبب
              </label>
              <Input id="reason" value={reason} onChange={(e) => setReason(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="administeredBy" className="text-right">
                المسؤول
              </label>
              <Input
                id="administeredBy"
                value={administeredBy}
                onChange={(e) => setAdministeredBy(e.target.value)}
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

