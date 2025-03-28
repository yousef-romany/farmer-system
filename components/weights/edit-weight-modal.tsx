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

interface WeightRecord {
  id: string;
  liveStock_id: number;
  weight: number;
  net_weight: number;
  comment: string;
  create_at: string;
  barns_name: string;
  idintifer_number: number;
}

interface EditWeightModalProps {
  isOpen: boolean
  onClose: () => void
  weightRecord: WeightRecord | null
}

export function EditWeightModal({ isOpen, onClose, weightRecord }: EditWeightModalProps) {
  const [date, setDate] = useState("")
  const [livestockId, setLivestockId] = useState("")
  const [weight, setWeight] = useState("")
  const [recordedBy, setRecordedBy] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    if (weightRecord) {
      setDate(weightRecord.create_at)
      setLivestockId(String(weightRecord.liveStock_id))
      setWeight(weightRecord.weight.toString())
      // setRecordedBy(weightRecord.recordedBy)
      setNotes(weightRecord.comment)
    }
  }, [weightRecord])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // هنا يمكنك إضافة المنطق الخاص بتحديث سجل الوزن
    console.log("تحديث سجل الوزن:", { date, livestockId, weight, recordedBy, notes })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تعديل سجل الوزن</DialogTitle>
          <DialogDescription>قم بتعديل معلومات سجل الوزن هنا. اضغط على حفظ عند الانتهاء.</DialogDescription>
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
              <label htmlFor="weight" className="text-right">
                الوزن (كجم)
              </label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="recordedBy" className="text-right">
                المسؤول
              </label>
              <Input
                id="recordedBy"
                value={recordedBy}
                onChange={(e) => setRecordedBy(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="notes" className="text-right">
                ملاحظات
              </label>
              <Input id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="col-span-3" />
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

