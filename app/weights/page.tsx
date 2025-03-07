"use client"

import { useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/layout/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate, formatNumber } from "@/lib/utils"
import { Filter, Plus, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart } from "@/components/charts"
import { AddWeightModal } from "@/components/weights/add-weight-modal"
import { EditWeightModal } from "@/components/weights/edit-weight-modal"

interface WeightRecord {
  id: string
  date: string
  livestockId: string
  weight: number
  change: number
  recordedBy: string
  notes: string
}

const data: WeightRecord[] = [
  {
    id: "1",
    date: "2023-06-01",
    livestockId: "1001",
    weight: 450,
    change: 10,
    recordedBy: "أحمد محمد",
    notes: "زيادة طبيعية في الوزن",
  },
  {
    id: "2",
    date: "2023-06-08",
    livestockId: "1002",
    weight: 420,
    change: 5,
    recordedBy: "محمد علي",
    notes: "تحت المراقبة",
  },
  // ... يمكنك إضافة المزيد من البيانات هنا
]

export default function WeightsPage() {
  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedWeight, setSelectedWeight] = useState<WeightRecord | null>(null)

  const columns: ColumnDef<WeightRecord>[] = [
    {
      header: "التاريخ",
      accessorKey: "date",
      cell: ({ getValue }) => formatDate(getValue() as string),
    },
    {
      header: "رقم الماشية",
      accessorKey: "livestockId",
    },
    {
      header: "الوزن (كجم)",
      accessorKey: "weight",
      cell: ({ getValue }) => formatNumber(getValue() as number),
    },
    {
      header: "التغيير",
      accessorKey: "change",
      cell: ({ getValue }) => {
        const change = getValue() as number
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              change > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {change > 0 ? `+${formatNumber(change)}` : formatNumber(change)} كجم
          </span>
        )
      },
    },
    {
      header: "المسؤول",
      accessorKey: "recordedBy",
    },
    {
      header: "ملاحظات",
      accessorKey: "notes",
    },
    {
      header: "الإجراءات",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          onClick={() => {
            setSelectedWeight(row.original)
            setIsEditModalOpen(true)
          }}
        >
          تعديل
        </Button>
      ),
    },
  ]

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
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  })

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="flex h-14 items-center border-b px-4">
          <h1 className="text-xl font-bold">تتبع الأوزان</h1>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="بحث..."
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
                className="w-64 pl-8"
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> تسجيل وزن جديد
            </Button>
          </div>
        </div>
        <main className="p-4 md:p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                تصفية
              </Button>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="جميع المواشي" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المواشي</SelectItem>
                  <SelectItem value="1001">ماشية #1001</SelectItem>
                  <SelectItem value="1002">ماشية #1002</SelectItem>
                  <SelectItem value="1003">ماشية #1003</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="الفترة الزمنية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الفترات</SelectItem>
                  <SelectItem value="week">آخر أسبوع</SelectItem>
                  <SelectItem value="month">آخر شهر</SelectItem>
                  <SelectItem value="quarter">آخر 3 شهور</SelectItem>
                  <SelectItem value="year">آخر سنة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="table">
            <TabsList>
              <TabsTrigger value="table">جدول الأوزان</TabsTrigger>
              <TabsTrigger value="chart">الرسم البياني</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
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
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                  التالي
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="chart">
              <div className="rounded-md border p-4">
                <h2 className="text-lg font-semibold mb-4">تطور الأوزان</h2>
                <div className="h-[400px]">
                  <LineChart className="h-full" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <AddWeightModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      <EditWeightModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        weightRecord={selectedWeight}
      />
    </div>
  )
}

