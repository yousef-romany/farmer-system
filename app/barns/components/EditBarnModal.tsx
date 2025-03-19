/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { memo } from "react";
import { useState, useEffect } from "react";
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
import { updateBarnOne } from "@/constant/Barns.ifno";

interface barnDataType {
  id: number
  barns_number: number;
  barns_name: string;
  capactiy: number;
}

interface EditBarnModalProps {
  isOpen: boolean;
  onClose: () => void;
  barn: barnDataType | null;
}

const EditBarnModal = ({ isOpen, onClose, barn }: EditBarnModalProps) => {
  const [barnsNumber, setBarnsNumber] = useState<number>(0);
  const [barnsName, setBarnsName] = useState<any>("");
  const [capactiy, setCapactiy] = useState<number | null>(0);

  useEffect(() => {
    if (barn) {
        setBarnsName(barn.barns_name);
        setBarnsNumber(barn.barns_number);
        setCapactiy(barn.capactiy);
    }
  }, [barn]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // هنا يمكنك إضافة المنطق الخاص بتحديث معلومات الماشية
    console.log("تحديث معلومات الماشية:", {
      barnsNumber,
      barnsName,
      capactiy
    });

    try {
      if (barnsNumber && barnsName && capactiy) {
          await updateBarnOne(
            barnsNumber,
            barnsName,
            capactiy,
            Number(barn?.id)
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
            <Button type="submit">حفظ التغييرات</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default memo(EditBarnModal);
