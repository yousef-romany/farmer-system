/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updatePermitsOne } from "@/constant/Permits.info";

interface Expense {
  id: number;
  type: "buy" | "sale" | "expense" | "deposit";
  category: "drug" | "animal" | "food" | "setting" | "else";
  comment: string;
  amount: number;
  create_at: string;
}

interface EditExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense | null;
}

const formatDateForInputAddZero = (dateStr: string) => {
  const dateObj = new Date(dateStr);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // يضيف صفر في البداية إذا كان الشهر أقل من 10
  const day = String(dateObj.getDate()).padStart(2, "0"); // يضيف صفر في البداية إذا كان اليوم أقل من 10
  return `${year}-${month}-${day}`;
};

export function EditExpenseModal({
  isOpen,
  onClose,
  expense,
}: EditExpenseModalProps) {
  const [date, setDate] = useState("");
  const [type, setType] = useState<any>("");
  const [category, setCategory] = useState<any>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    if (expense) {
      setDate(formatDateForInputAddZero(expense.create_at));
      setCategory(String(expense.category));
      setDescription(expense.comment);
      setAmount(expense.amount);
      setType(String(expense.type));
    }
  }, [expense]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // هنا يمكنك إضافة المنطق الخاص بتحديث معلومات العمليه
    console.log("تحديث معلومات العمليه:", {
      date,
      category,
      description,
      amount,
    });

    try {
      await updatePermitsOne(
        type, category, description, amount, date, Number(expense?.id)
      )
      onClose();
    } catch(error) {
      console.log(error)
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تعديل معلومات العمليه</DialogTitle>
          <DialogDescription>
            قم بتعديل معلومات العمليه هنا. اضغط على حفظ عند الانتهاء.
          </DialogDescription>
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
              <Select value={String(type)} onValueChange={setType}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر نوع " />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">صرف</SelectItem>
                  <SelectItem value="deposit">توريد</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right">
                الفئة
              </label>
              <Select value={String(category)} onValueChange={setCategory}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر فئة " />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">علف</SelectItem>
                  <SelectItem value="drug">أدوية</SelectItem>
                  <SelectItem value="setting">صيانة</SelectItem>
                  <SelectItem value="else">أخرى</SelectItem>
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
                onChange={(e) => setAmount(Number(e.target.value))}
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
  );
}
