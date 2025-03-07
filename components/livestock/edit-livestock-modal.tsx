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

interface Livestock {
  id: string
  tagNumber: string
  breed: string
  age: number
  weight: number
  barn: string
  addedDate: string
  status: string
}

interface EditLivestockModalProps {
  isOpen: boolean
  onClose: () => void
  livestock: Livestock | null
}

export function EditLivestockModal({ isOpen, onClose, livestock }: EditLivestockModalProps) {
  const [tagNumber, setTagNumber] = useState("")
  const [breed, setBreed] = useState("")
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [barn, setBarn] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    if (livestock) {
      setTagNumber(livestock.tagNumber)
      setBreed(livestock.breed)
      setAge(livestock.age.toString())
      setWeight(livestock.weight.toString())
      setBarn(livestock.barn)
      setStatus(livestock.status)
    }
  }, [livestock])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // هنا يمكنك إضافة المنطق الخاص بتحديث معلومات الماشية
    console.log("تحديث معلومات الماشية:", { tagNumber, breed, age, weight, barn, status })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تعديل معلومات الماشية</DialogTitle>
          <DialogDescription>قم بتعديل معلومات الماشية هنا. اضغط على حفظ عند الانتهاء.</DialogDescription>
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
                  <SelectItem value="عنبر 1">عنبر 1</SelectItem>
                  <SelectItem value="عنبر 2">عنبر 2</SelectItem>
                  <SelectItem value="عنبر 3">عنبر 3</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="تحت المراقبة">تحت المراقبة</SelectItem>
                  <SelectItem value="غير نشط">غير نشط</SelectItem>
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

