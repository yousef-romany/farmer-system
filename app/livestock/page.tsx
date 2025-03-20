/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatDate, formatNumber } from "@/lib/utils";
import { Plus } from "lucide-react";
import { AddLivestockModal } from "@/components/livestock/add-livestock-modal";
import { EditLivestockModal } from "@/components/livestock/edit-livestock-modal";
import { PageLayout } from "@/components/layout/page-layout";
import { LazyTable } from "@/components/lazy-table";
import {
  deleteLiveStockOne,
  fetchLiveStockList,
} from "@/constant/LiveStock.info";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

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

export default function LivestockPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLivestock, setSelectedLivestock] = useState<Livestock | null>(
    null
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState<any[]>([]);

  const columns: ColumnDef<Livestock>[] = [
    {
      header: "الرقم التعريفي",
      accessorKey: "idintifer_number",
      cell: ({ row }) => <Link href={"/livestock/oneLiveStock"} onClick={async () => {
        try {
          localStorage.setItem("liveStock_id", row.original.id)
        } catch (error) {
          console.log(error)
        }
      }}>{row.original.idintifer_number}</Link>
    },
    {
      header: "السلالة",
      accessorKey: "type",
    },
    {
      header: "العمر (شهر)",
      accessorKey: "age",
      cell: ({ getValue }) => formatNumber(getValue() as number),
    },
    {
      header: "الوزن (كجم)",
      accessorKey: "weight",
      cell: ({ getValue }) => formatNumber(getValue() as number),
    },
    {
      header: "العنبر",
      accessorKey: "barns_name",
    },
    {
      header: "تاريخ الإضافة",
      accessorKey: "create_at",
      cell: ({ getValue }) => formatDate(getValue() as string),
    },
    {
      header: "الحالة",
      accessorKey: "status",
      cell: ({ getValue }) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            getValue() === "normal"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {getValue() === "normal" ? "نشط" : "تحت المراقبه"}
        </span>
      ),
    },
    {
      header: "الإجراءات",
      cell: ({ row }) => (
        <div>
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedLivestock(row.original);
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
                deleteLiveStockOne(Number(row.original.id));
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
        </div>
      ),
    },
  ];

  const handleFetchLiveStockList = async () => {
    try {
      setData(await fetchLiveStockList());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      const interval = setInterval(() => {
        handleFetchLiveStockList();
      }, 1500); // 🔄 استدعاء البيانات كل 1.5 ثانية

      return () => clearInterval(interval);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <PageLayout
      title="إدارة المواشي"
      filter={globalFilter}
      setFilter={setGlobalFilter}
      actions={
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> إضافة ماشية
        </Button>
      }
    >
      <div className="mt-6 rounded-md border">
        <LazyTable columns={columns} data={data} pageSize={20} />
      </div>

      <AddLivestockModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <EditLivestockModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        livestock={selectedLivestock}
      />
    </PageLayout>
  );
}
