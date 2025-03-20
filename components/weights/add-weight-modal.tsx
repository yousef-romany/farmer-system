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
import { createWeightOne } from "@/constant/Weight.info";
import { toast } from "@/hooks/use-toast";
import { fetchLiveStockList } from "@/constant/LiveStock.info";

interface AddWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddWeightModal({ isOpen, onClose }: AddWeightModalProps) {
  const [livestockId, setLivestockId] = useState("");
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [netWeight, setNetWeight] = useState("");
  const [liveStockList, setLiveStockList] = useState([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا يمكنك إضافة المنطق الخاص بإضافة سجل الوزن الجديد
    console.log("إضافة سجل وزن جديد:", { date, livestockId, weight, notes });

    try {
      if (date && livestockId && netWeight && weight && notes) {
        createWeightOne(
          Number(livestockId),
          Number(weight),
          Number(netWeight),
          notes,
          date
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

  const handleGetLiveStock = async () => {
    setLiveStockList(await fetchLiveStockList());
  };

  useEffect(() => {
    handleGetLiveStock();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تسجيل وزن جديد</DialogTitle>
          <DialogDescription>
            أدخل معلومات الوزن الجديد هنا. اضغط على حفظ عند الانتهاء.
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
              <label htmlFor="livestockId" className="text-right">
                رقم الماشية
              </label>
              <Select value={livestockId} onValueChange={setLivestockId}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر الماشية" />
                </SelectTrigger>
                <SelectContent>
                  {liveStockList.length > 0
                    ? liveStockList.map((item: any, key: number) => (
                        <SelectItem key={key} value={String(item.id)}>
                          ماشية #{item.idintifer_number} من عنبر{" "}
                          {item.barns_name}
                        </SelectItem>
                      ))
                    : "no data"}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="net_weight" className="text-right">
                وزن الزياده (كجم)
              </label>
              <Input
                id="net_weight"
                type="number"
                value={netWeight}
                onChange={(e) => setNetWeight(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="weight" className="text-right">
                الوزن (كجم) أجمالى
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
              <label htmlFor="notes" className="text-right">
                ملاحظات
              </label>
              <Input
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
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
