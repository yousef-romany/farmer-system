"use client"

import { useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/layout/sidebar"
import { formatDate, formatNumber } from "@/lib/utils"
import { Filter, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddLivestockModal } from "@/components/livestock/add-livestock-modal"
import { EditLivestockModal } from "@/components/livestock/edit-livestock-modal"
import { GlobalFilter } from "@/components/global-filter"
import { LazyTable } from "@/components/lazy-table"

interface Livestock {
  id: string
  tagNumber: string
  breed: string
  age: number
  weight: number
  barn: string
  addedDate: string
  status: string
}

const data: Livestock[] = [
  {
    id: "1",
    tagNumber: "1001",
    breed: "هولشتاين",
    age: 24,
    weight: 450,
    barn: "عنبر 1",
    addedDate: "2023-01-15",
    status: "نشط",
  },
  {
    id: "2",
    tagNumber: "1002",
    breed: "سيمنتال",
    age: 18,
    weight: 400,
    barn: "عنبر 2",
    addedDate: "2023-03-20",
    status: "تحت المراقبة",
  },
  // ... يمكنك إضافة المزيد من البيانات هنا
]

export default function LivestockPage() {
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedLivestock, setSelectedLivestock] = useState<Livestock | null>(null)

  const columns: ColumnDef<Livestock>[] = [
    {
      header: "الرقم التعريفي",
      accessorKey: "tagNumber",
    },
    {
      header: "السلالة",
      accessorKey: "breed",
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
      accessorKey: "barn",
    },
    {
      header: "تاريخ الإضافة",
      accessorKey: "addedDate",
      cell: ({ getValue }) => formatDate(getValue() as string),
    },
    {
      header: "الحالة",
      accessorKey: "status",
      cell: ({ getValue }) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            getValue() === "نشط" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {getValue() as string}
        </span>
      ),
    },
    {
      header: "الإجراءات",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          onClick={() => {
            setSelectedLivestock(row.original)
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
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="flex h-14 items-center border-b px-4">
          <h1 className="text-xl font-bold">إدارة المواشي</h1>
          <div className="ml-auto flex items-center gap-4">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> إضافة ماشية
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
                  <SelectValue placeholder="جميع العنابر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع العنابر</SelectItem>
                  <SelectItem value="1">عنبر 1</SelectItem>
                  <SelectItem value="2">عنبر 2</SelectItem>
                  <SelectItem value="3">عنبر 3</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="جميع السلالات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع السلالات</SelectItem>
                  <SelectItem value="holstein">هولشتاين</SelectItem>
                  <SelectItem value="simmental">سيمنتال</SelectItem>
                  <SelectItem value="jersey">جيرسي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                إجمالي: {formatNumber(table.getFilteredRowModel().rows.length)} ماشية
              </span>
            </div>
          </div>

          <div className="rounded-md border">
            <LazyTable columns={columns} data={data} pageSize={20} />
          </div>
        </main>
      </div>

      <AddLivestockModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      <EditLivestockModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        livestock={selectedLivestock}
      />
    </div>
  )
}

