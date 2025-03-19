/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/layout/sidebar";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import SummaryBarns from "./components/SummaryBarns";
import { useEffect, useState } from "react";
import { deleteBarnOne, fetchBarnList } from "@/constant/Barns.ifno";
import { AddBarnModal } from "./components/AddBarnModal";
import EditBarnModal from "./components/EditBarnModal";
import { toast } from "@/hooks/use-toast";

export default function BarnsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [selectedBarn, setSelectedBarn] = useState<{
    id: number;
    barns_number: number;
    barns_name: string;
    capactiy: number;
  } | null>();
  const handleFetchBarnsList = async () => {
    try {
      setData(await fetchBarnList());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      const interval = setInterval(() => {
        handleFetchBarnsList();
      }, 1500); // 🔄 استدعاء البيانات كل 1.5 ثانية

      return () => clearInterval(interval);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="flex h-14 items-center border-b px-4 gap-3">
          <h1 className="text-xl font-bold">إدارة العنابر</h1>
          <div className="ml-auto flex items-center gap-4">
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> إضافة عنبر
            </Button>
          </div>
        </div>
        <main className="p-4 md:p-6">
          <SummaryBarns data={data} />

          <Card>
            <CardHeader>
              <CardTitle>قائمة العنابر</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">رقم العنبر</TableHead>
                    <TableHead className="text-center">الاسم</TableHead>
                    <TableHead className="text-center">السعة</TableHead>
                    <TableHead className="text-center">
                      الإشغال الحالي
                    </TableHead>
                    <TableHead className="text-center">نسبة الإشغال</TableHead>
                    <TableHead className="text-center">الحالة</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.length > 0 ? (
                    data.map((item, i: number) => (
                      <TableRow key={i}>
                        <TableCell className="text-center font-medium">
                          {item.barns_number}
                        </TableCell>
                        <TableCell className="text-center">
                          عنبر {item.barns_name}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.capactiy} ماشية
                        </TableCell>
                        <TableCell className="text-center">
                          {item.busy_amount} ماشية
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center gap-2">
                            <Progress
                              value={(item.busy_amount / item.capactiy) * 100}
                              className="h-2"
                            />
                            <span className="text-sm">
                              {(item.busy_amount / item.capactiy) * 100}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              item.busy_amount % 4 === 0
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                : item.busy_amount % 4 === 1
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                : item.busy_amount % 4 === 2
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                            }`}
                          >
                            {item.busy_amount % 4 === 0
                              ? "متاح"
                              : item.busy_amount % 4 === 1
                              ? "شبه ممتلئ"
                              : item.busy_amount % 4 === 2
                              ? "ممتلئ"
                              : "تحت الصيانة"}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setSelectedBarn({
                                id: item.id,
                                barns_number: item.barns_number,
                                barns_name: item.barns_name,
                                capactiy: item.capactiy,
                              });
                              setIsEditModalOpen(true);
                            }}
                          >
                            تعديل
                          </Button>
                          <Button
                            variant="destructive"
                            className="text-white"
                            onClick={() => {
                              try {
                                deleteBarnOne(item.id);
                                toast({
                                  variant: "default",
                                  title: "تمت عمليه بنجاح",
                                });
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          >
                            حذف
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        لا توجد نتائج.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
      <AddBarnModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <EditBarnModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        barn={selectedBarn as any}
      />
    </div>
  );
}
