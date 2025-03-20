/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate, formatNumber } from "@/lib/utils";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddWeightModal } from "@/components/weights/add-weight-modal";
import { deleteWeightOne, fetchWeightList } from "@/constant/Weight.info";
import { toast } from "@/hooks/use-toast";

interface WeightRecord {
  id: string;
  liveStock_id: number;
  weight: number;
  net_weight: number;
  comment: string;
  create_at: string;
  barns_name: string;
  idintifer_number: number;
}

export default function WeightsPage() {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [selectedWeight, setSelectedWeight] = useState<WeightRecord | null>(
  //   null
  // );
  const [data, setData] = useState([]);

  const columns: ColumnDef<WeightRecord>[] = [
    {
      header: "رقم الماشية",
      accessorKey: "idintifer_number",
    },
    {
      header: "الوزن (كجم)",
      accessorKey: "weight",
      cell: ({ getValue }) => formatNumber(getValue() as number),
    },
    {
      header: "التغيير",
      accessorKey: "net_weight",
      cell: ({ getValue }) => {
        const change = getValue() as number;
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              change > 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {change > 0 ? `+${formatNumber(change)}` : formatNumber(change)} كجم
          </span>
        );
      },
    },
    {
      header: "عنبر",
      accessorKey: "barns_name",
    },
    {
      header: "ملاحظات",
      accessorKey: "comment",
    },
    {
      header: "التاريخ",
      accessorKey: "create_at",
      cell: ({ getValue }) => formatDate(getValue() as string),
    },
    {
      header: "الإجراءات",
      cell: ({ row }) => (
        <>
          {/* <Button
            variant="ghost"
            onClick={() => {
              setSelectedWeight(row.original);
              setIsEditModalOpen(true);
            }}
          >
            تعديل
          </Button> */}

          <Button
            variant="ghost"
            onClick={async () => {
              try {
                await deleteWeightOne(Number(row.original.weight - row.original.net_weight), Number(row.original.id));
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
        </>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting as any,
    onGlobalFilterChange: setFiltering,
  });
  const handleGetWeights = async () => {
    setData(await fetchWeightList());
  };

  useEffect(() => {
    try {
      const interval = setInterval(() => {
        handleGetWeights();
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
          <h1 className="text-xl font-bold">تتبع الأوزان</h1>
          <div className="ml-auto flex items-center gap-4">
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> تسجيل وزن جديد
            </Button>
          </div>
        </div>
        <main className="p-4 md:p-6">
          <Tabs defaultValue="table">
            <TabsList>
              <TabsTrigger value="table">جدول الأوزان</TabsTrigger>
              {/* <TabsTrigger value="chart">الرسم البياني</TabsTrigger> */}
            </TabsList>
            <TabsContent value="table">
              <div className="rounded-md border">
                <Table dir="rtl">
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id} className="text-center">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="text-center">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          لا توجد نتائج.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  السابق
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  التالي
                </Button>
              </div>
            </TabsContent>
            {/* <TabsContent value="chart">
              <div className="rounded-md border p-4">
                <h2 className="text-lg font-semibold mb-4">تطور الأوزان</h2>
                <div className="h-[400px]">
                  <LineChart className="h-full" />
                </div>
              </div>
            </TabsContent> */}
          </Tabs>
        </main>
      </div>

      <AddWeightModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* <EditWeightModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        weightRecord={selectedWeight}
      /> */}
    </div>
  );
}
