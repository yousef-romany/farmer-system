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

interface AddLivestockModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddLivestockModal({ isOpen, onClose }: AddLivestockModalProps) {
  const [tagNumber, setTagNumber] = useState("")
  const [breed, setBreed] = useState("")
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [barn, setBarn] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // هنا يمكنك إضافة المنطق الخاص بإضافة الماشية الجديدة
    console.log("إضافة ماشية جديدة:", { tagNumber, breed, age, weight, barn })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إضافة ماشية جديدة</DialogTitle>
          <DialogDescription>أدخل معلومات الماشية الجديدة هنا. اضغط على حفظ عند الانتهاء.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="tagNumber" className="text-right">
                الرقم التعريفي
              </label>
              <Input
                id="tagNumber"
                value={tagNumber}
                onChange={(e) => setTagNumber(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="breed" className="text-right">
                السلالة
              </label>
              <Select value={breed} onValueChange={setBreed}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر السلالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="holstein">هولشتاين</SelectItem>
                  <SelectItem value="simmental">سيمنتال</SelectItem>
                  <SelectItem value="jersey">جيرسي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="age" className="text-right">
                العمر (شهر)
              </label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="col-span-3"
              />
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
              <label htmlFor="barn" className="text-right">
                العنبر
              </label>
              <Select value={barn} onValueChange={setBarn}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر العنبر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">عنبر 1</SelectItem>
                  <SelectItem value="2">عنبر 2</SelectItem>
                  <SelectItem value="3">عنبر 3</SelectItem>
                </SelectContent>
              </Select>
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

