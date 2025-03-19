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
import { fetchBarnList } from "@/constant/Barns.ifno";
import { updateLiveStockOne } from "@/constant/LiveStock.info";
import { toast } from "@/hooks/use-toast";

interface Livestock {
  id: string;
  idintifer_number: number;
  type: string;
  age: number;
  weight: number;
  barn_id: number;
  barns_name: string;
  create_at: string;
  status: "normal" | "under_eye";
}

interface EditLivestockModalProps {
  isOpen: boolean;
  onClose: () => void;
  livestock: Livestock | null;
}

export function EditLivestockModal({
  isOpen,
  onClose,
  livestock,
}: EditLivestockModalProps) {
  const [tagNumber, setTagNumber] = useState<any>("");
  const [breed, setBreed] = useState<any>("");
  const [age, setAge] = useState<any>("");
  const [weight, setWeight] = useState<any>("");
  const [barn, setBarn] = useState<any>("");
  const [status, setStatus] = useState<any>("");
  const [barnsList, setBarnsList] = useState<any[]>([]);

  useEffect(() => {
    if (livestock) {
      setTagNumber(livestock.idintifer_number);
      setBreed(livestock.type);
      setAge(livestock.age.toString());
      setWeight(livestock.weight.toString());
      setBarn(livestock.barn_id);
      setStatus(livestock.status);
    }
  }, [livestock]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // هنا يمكنك إضافة المنطق الخاص بتحديث معلومات الماشية
    console.log("تحديث معلومات الماشية:", {
      tagNumber,
      breed,
      age,
      weight,
      barn,
      status,
    });

    try {
      if (tagNumber && breed && age && weight && breed) {
        await updateLiveStockOne(
          tagNumber,
          breed,
          age,
          weight,
          barn,
          String(livestock?.create_at),
          status,
          Number(livestock?.id)
        );
        toast({
          variant: "default",
          title: "تمت عمليه بنجاح",
        });
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
          <DialogTitle>تعديل معلومات الماشية</DialogTitle>
          <DialogDescription>
            قم بتعديل معلومات الماشية هنا. اضغط على حفظ عند الانتهاء.
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
                value={tagNumber}
                onChange={(e) => setTagNumber(e.target.value)}
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
              <Select value={String(barn)} onValueChange={setBarn} dir="rtl">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">
                الحالة
              </label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">نشط</SelectItem>
                  <SelectItem value="under_eye">تحت المراقبة</SelectItem>
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
  );
}
