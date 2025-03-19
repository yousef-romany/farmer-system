/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/formatDate";
import { createBarnOne } from "@/constant/Barns.ifno";

interface AddBarnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddBarnModal({ isOpen, onClose }: AddBarnModalProps) {
  const [barnsNumber, setBarnsNumber] = useState<number | null>(0);
  const [barnsName, setBarnsName] = useState<any>("");
  const [capactiy, setCapactiy] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // هنا يمكنك إضافة المنطق الخاص بإضافة الماشية الجديدة
    console.log("إضافة ماشية جديدة:", { barnsNumber, barnsName, capactiy });
    try {
      if (barnsNumber && barnsName && capactiy && barnsName) {
        createBarnOne(
          barnsNumber,
          barnsName,
          capactiy,
          `${formatDate(Date.now())}`,
        );
        toast({
          variant: "default",
          title: "تمت عمليه بنجاح",
        });
        setBarnsNumber(0);
        setBarnsName("");
        setCapactiy(0);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إضافة عنبر جديدة</DialogTitle>
          <DialogDescription>
            أدخل معلومات العانبر الجديدة هنا. اضغط على حفظ عند الانتهاء.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="barnsNumber" className="text-right">
                الرقم التعريفي
              </label>
              <Input
                id="barnsNumber"
                type="number"
                value={barnsNumber || 0}
                onChange={(e) => setBarnsNumber(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="barns_name" className="text-right">
                أسم العنبر
              </label>
              <Input
                id="barns_name"
                onChange={(e) => setBarnsName(e.target.value)}
                value={barnsName}
                className="col-span-3"
                placeholder="أسم العنبر"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="capactiy" className="text-right">
                سعه
              </label>
              <Input
                id="capactiy"
                type="number"
                value={capactiy || 0}
                onChange={(e) => setCapactiy(Number(e.target.value))}
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
