/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useEffect, useState } from "react";
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
import { createLiveStockOne } from "@/constant/LiveStock.info";
import { fetchBarnList } from "@/constant/Barns.ifno";
import { toast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/formatDate";

interface AddLivestockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddLivestockModal({ isOpen, onClose }: AddLivestockModalProps) {
  const [tagNumber, setTagNumber] = useState<number | null>(0);
  const [breed, setBreed] = useState<any>("");
  const [age, setAge] = useState<number | null>(0);
  const [weight, setWeight] = useState<number | null>(0);
  const [barn, setBarn] = useState<any>("");
  const [barnsList, setBarnsList] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // هنا يمكنك إضافة المنطق الخاص بإضافة الماشية الجديدة
    console.log("إضافة ماشية جديدة:", { tagNumber, breed, age, weight, barn });
    try {
      if (tagNumber && breed && age && weight && breed) {
        createLiveStockOne(
          tagNumber,
          breed,
          age,
          weight,
          Number(barn),
          `${formatDate(Date.now())}`,
          "normal"
        );
        toast({
          variant: "default",
          title: "تمت عمليه بنجاح",
        });
        setTagNumber(0);
        setBreed("");
        setAge(0);
        setWeight(0);
        setBarn("");
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBarns = async () => {
    try {
      setBarnsList(await fetchBarnList());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBarns();
  }, []);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إضافة ماشية جديدة</DialogTitle>
          <DialogDescription>
            أدخل معلومات الماشية الجديدة هنا. اضغط على حفظ عند الانتهاء.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="tagNumber" className="text-right">
                الرقم التعريفي
              </label>
              <Input
                id="tagNumber"
                type="number"
                value={tagNumber || 0}
                onChange={(e) => setTagNumber(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="breed" className="text-right">
                السلالة
              </label>
              <Input
                id="breed"
                onChange={(e) => setBreed(e.target.value)}
                value={breed}
                className="col-span-3"
                placeholder="السلالة"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="age" className="text-right">
                العمر (شهر)
              </label>
              <Input
                id="age"
                type="number"
                value={age || 0}
                onChange={(e) => setAge(Number(e.target.value))}
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
                value={weight || 0}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="barn" className="text-right">
                العنبر
              </label>
              <Select value={barn} onValueChange={setBarn} dir="rtl">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر العنبر" />
                </SelectTrigger>
                <SelectContent>
                  {barnsList.length > 0 ? (
                    barnsList.map((item) => (
                      <SelectItem key={item.id} value={String(item.id)}>
                        {item.barns_number}, {item.barns_name}
                      </SelectItem>
                    ))
                  ) : (
                    <p className="p-2 text-center">لا يوجد عنابر.</p>
                  )}
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
  );
}
