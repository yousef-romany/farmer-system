/* eslint-disable @typescript-eslint/no-explicit-any */
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
// import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/layout/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate, formatNumber } from "@/lib/utils"
import { Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AddMedicationModal } from "@/components/medications/add-medication-modal"
import { EditMedicationModal } from "@/components/medications/edit-medication-modal"
import { AddMedicationUsageModal } from "@/components/medications/add-medication-usage-modal"

interface Medication {
  id: string
  name: string
  type: string
  purpose: string
  dosage: string
  quantity: number
  expiryDate: string
  status: string
}

interface MedicationUsage {
  id: string
  date: string
  livestockId: string
  medicationName: string
  dosage: string
  reason: string
  administeredBy: string
}

const medicationsData: Medication[] = [
  {
    id: "1",
    name: "أموكسيسيلين",
    type: "مضاد حيوي",
    purpose: "علاج الالتهابات البكتيرية",
    dosage: "10 مل / 100 كجم",
    quantity: 25,
    expiryDate: "2024-06-30",
    status: "متوفر",
  },
  {
    id: "2",
    name: "فيتامين AD3E",
    type: "فيتامينات",
    purpose: "تحسين الصحة العامة",
    dosage: "5 مل / ماشية",
    quantity: 40,
    expiryDate: "2025-03-15",
    status: "متوفر",
  },
  // ... يمكنك إضافة المزيد من البيانات هنا
]

const medicationUsageData: MedicationUsage[] = [
  {
    id: "1",
    date: "2023-06-01",
    livestockId: "1001",
    medicationName: "أموكسيسيلين",
    dosage: "45 مل",
    reason: "علاج التهاب",
    administeredBy: "د. أحمد محمد",
  },
  {
    id: "2",
    date: "2023-06-05",
    livestockId: "1002",
    medicationName: "فيتامين AD3E",
    dosage: "5 مل",
    reason: "تحسين الصحة العامة",
    administeredBy: "د. محمد علي",
  },
  // ... يمكنك إضافة المزيد من البيانات هنا
]

export default function MedicationsPage() {
  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState("")
  const [isAddMedicationModalOpen, setIsAddMedicationModalOpen] = useState(false)
  const [isEditMedicationModalOpen, setIsEditMedicationModalOpen] = useState(false)
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null)
  const [isAddUsageModalOpen, setIsAddUsageModalOpen] = useState(false)

  const medicationColumns: ColumnDef<Medication>[] = [
    {
      header: "اسم الدواء",
      accessorKey: "name",
    },
    {
      header: "النوع",
      accessorKey: "type",
    },
    {
      header: "الغرض",
      accessorKey: "purpose",
    },
    {
      header: "الجرعة الموصى بها",
      accessorKey: "dosage",
    },
    {
      header: "الكمية المتاحة",
      accessorKey: "quantity",
      cell: ({ getValue }) => formatNumber(getValue() as number),
    },
    {
      header: "تاريخ انتهاء الصلاحية",
      accessorKey: "expiryDate",
      cell: ({ getValue }) => formatDate(getValue() as string),
    },
    {
      header: "الحالة",
      accessorKey: "status",
      cell: ({ getValue }) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            getValue() === "متوفر"
              ? "bg-green-100 text-green-800"
              : getValue() === "منخفض"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
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
            setSelectedMedication(row.original)
            setIsEditMedicationModalOpen(true)
          }}
        >
          تعديل
        </Button>
      ),
    },
  ]

  const usageColumns: ColumnDef<MedicationUsage>[] = [
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
      header: "اسم الدواء",
      accessorKey: "medicationName",
    },
    {
      header: "الجرعة",
      accessorKey: "dosage",
    },
    {
      header: "السبب",
      accessorKey: "reason",
    },
    {
      header: "المسؤول",
      accessorKey: "administeredBy",
    },
  ]

  const medicationTable = useReactTable({
    data: medicationsData,
    columns: medicationColumns,
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
  })

  const usageTable = useReactTable({
    data: medicationUsageData,
    columns: usageColumns,
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
  })

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="flex h-14 items-center border-b px-4 gap-3">
          <h1 className="text-xl font-bold">إدارة الأدوية</h1>
          <div className="ml-auto flex items-center gap-4">
            <Button onClick={() => setIsAddMedicationModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> إضافة دواء
            </Button>
          </div>
        </div>
        <main className="p-4 md:p-6">
          <Tabs defaultValue="inventory">
            <TabsList>
              <TabsTrigger value="inventory">مخزون الأدوية</TabsTrigger>
              <TabsTrigger value="usage">سجل استخدام الأدوية</TabsTrigger>
            </TabsList>
            <TabsContent value="inventory">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {medicationTable.getHeaderGroups().map((headerGroup) => (
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
                    {medicationTable.getRowModel().rows?.length ? (
                      medicationTable.getRowModel().rows.map((row) => (
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
                        <TableCell colSpan={medicationColumns.length} className="h-24 text-center">
                          لا توجد نتائج.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="usage">
              <div className="mb-4">
                <Button onClick={() => setIsAddUsageModalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> تسجيل استخدام دواء
                </Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {usageTable.getHeaderGroups().map((headerGroup) => (
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
                    {usageTable.getRowModel().rows?.length ? (
                      usageTable.getRowModel().rows.map((row) => (
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
                        <TableCell colSpan={usageColumns.length} className="h-24 text-center">
                          لا توجد نتائج.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <AddMedicationModal isOpen={isAddMedicationModalOpen} onClose={() => setIsAddMedicationModalOpen(false)} />

      <EditMedicationModal
        isOpen={isEditMedicationModalOpen}
        onClose={() => setIsEditMedicationModalOpen(false)}
        medication={selectedMedication}
      />

      <AddMedicationUsageModal isOpen={isAddUsageModalOpen} onClose={() => setIsAddUsageModalOpen(false)} />
    </div>
  )
}

