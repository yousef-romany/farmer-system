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
import { formatCurrency, formatDate } from "@/lib/utils";
import { BarChart, BarChartPlus } from "@/components/charts";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddExpenseModal } from "@/components/expenses/add-expense-modal";
import SummaryCardsPermits from "./components/SummaryCardsPermits";
import { deletePermitsOne, fetchPermitsList } from "@/constant/Permits.info";
import { EditExpenseModal } from "@/components/expenses/edit-expense-modal";
import { toast } from "@/hooks/use-toast";

interface Expense {
  id: number;
  type: "buy" | "sale" | "expense" | "deposit";
  category: "drug" | "animal" | "food" | "setting" | "else";
  comment: string;
  amount: number;
  create_at: string;
  relation_liveStock: number;
}

export default function ExpensesPage() {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isEditExpenseModalOpen, setIsEditExpenseModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [data, setData] = useState([]);

  const columns: ColumnDef<Expense>[] = [
    {
      header: "رقم التسلسلى",
      accessorKey: "id",
    },
    {
      header: "النوع",
      accessorKey: "type",
      cell: ({ getValue }) => {
        if (getValue() == "buy") {
          return "شراء";
        } else if (getValue() == "sale") {
          return "بيع";
        } else if (getValue() == "expense") {
          return "صرف";
        } else if (getValue() == "deposit") {
          return "ايراد";
        }
      },
    },
    {
      header: "الفئة",
      accessorKey: "category",
      cell: ({ getValue }) => {
        if (getValue() == "drug") {
          return "دواء";
        } else if (getValue() == "animal") {
          return "ماشيه";
        } else if (getValue() == "food") {
          return "علف";
        } else if (getValue() == "setting") {
          return "صيانه";
        } else return "اخرى";
      },
    },
    {
      header: "الوصف",
      accessorKey: "comment",
    },
    {
      header: "المبلغ",
      accessorKey: "amount",
      cell: ({ getValue }) => formatCurrency(getValue() as number),
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
          <Button
            disabled={Number(row.original.relation_liveStock) == 0 ? false : true}
            variant="ghost"
            onClick={() => {
              setSelectedExpense(row.original);
              setIsEditExpenseModalOpen(true);
            }}
          >
            تعديل
          </Button>
          <Button
            disabled={Number(row.original.relation_liveStock) == 0 ? false : true}
            variant="destructive"
            className="text-white"
            onClick={async () => {
              try {
                await deletePermitsOne(Number(row.original.amount));
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

  const handleGetPermits = async () => {
    try {
      setData(await fetchPermitsList());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleGetPermits();
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="flex h-14 items-center border-b px-4 gap-3">
          <h1 className="text-xl font-bold">إدارة مخزن</h1>
          <div className="ml-auto flex items-center gap-4">
            <Button onClick={() => setIsAddExpenseModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> إضافة عمليه
            </Button>
          </div>
        </div>
        <main className="p-4 md:p-6">
          <SummaryCardsPermits data={data} />

          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <ExpenseDistributionChart data={data} />
            <ExpenseDistributionChartPlus data={data} />
          </div>

          <div className="rounded-md border">
            <Table>
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
        </main>
      </div>

      <AddExpenseModal
        isOpen={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
      />

      <EditExpenseModal
        isOpen={isEditExpenseModalOpen}
        onClose={() => setIsEditExpenseModalOpen(false)}
        expense={selectedExpense}
      />
    </div>
  );
}

function ExpenseDistributionChart({ data }: any) {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 text-lg font-semibold">توزيع المصروفات</h2>
      <div className="h-[300px]">
        <BarChart data={data} className="h-full" />
      </div>
    </div>
  );
}

function ExpenseDistributionChartPlus({ data }: any) {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 text-lg font-semibold">توزيع أيرادات</h2>
      <div className="h-[300px]">
        <BarChartPlus data={data} className="h-full" />
      </div>
    </div>
  );
}
