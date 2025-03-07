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
import { formatDate } from "@/lib/utils"
import { Check, Plus, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { AddAlertModal } from "@/components/alerts/add-alert-modal"
import { AddTaskModal } from "@/components/alerts/add-task-modal"

interface Alert {
  id: string
  priority: string
  message: string
  date: string
  related: string
  status: string
}

interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  assignedTo: string
  completed: boolean
}

const alertsData: Alert[] = [
  {
    id: "1",
    priority: "عاجل",
    message: "ماشية #1003 تحتاج إلى علاج طارئ",
    date: "2023-06-10",
    related: "ماشية #1003",
    status: "جديد",
  },
  {
    id: "2",
    priority: "متوسط",
    message: "موعد تطعيم الماشية #1005",
    date: "2023-06-15",
    related: "ماشية #1005",
    status: "مجدول",
  },
  // ... يمكنك إضافة المزيد من البيانات هنا
]

const tasksData: Task[] = [
  {
    id: "1",
    title: "تحديث سجلات الأوزان الأسبوعية",
    description: "قياس وتسجيل أوزان جميع المواشي",
    dueDate: "2023-06-12",
    assignedTo: "محمد أحمد",
    completed: false,
  },
  {
    id: "2",
    title: "شراء مخزون جديد من العلف",
    description: "التواصل مع المورد وطلب 2 طن من العلف المركز",
    dueDate: "2023-06-11",
    assignedTo: "أحمد علي",
    completed: false,
  },
  // ... يمكنك إضافة المزيد من البيانات هنا
]

export default function AlertsPage() {
  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState("")
  const [isAddAlertModalOpen, setIsAddAlertModalOpen] = useState(false)
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)

  const alertColumns: ColumnDef<Alert>[] = [
    {
      header: "الأولوية",
      accessorKey: "priority",
      cell: ({ getValue }) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            getValue() === "عاجل"
              ? "bg-red-100 text-red-800"
              : getValue() === "متوسط"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-blue-100 text-blue-800"
          }`}
        >
          {getValue() as string}
        </span>
      ),
    },
    {
      header: "التنبيه",
      accessorKey: "message",
    },
    {
      header: "التاريخ",
      accessorKey: "date",
      cell: ({ getValue }) => formatDate(getValue() as string),
    },
    {
      header: "المتعلق بـ",
      accessorKey: "related",
    },
    {
      header: "الحالة",
      accessorKey: "status",
      cell: ({ getValue }) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            getValue() === "جديد"
              ? "bg-purple-100 text-purple-800"
              : getValue() === "قيد المعالجة"
                ? "bg-orange-100 text-orange-800"
                : "bg-green-100 text-green-800"
          }`}
        >
          {getValue() as string}
        </span>
      ),
    },
    {
      header: "الإجراءات",
      cell: () => (
        <Button variant="ghost" size="sm">
          <Check className="h-4 w-4 mr-2" />
          تمت المعالجة
        </Button>
      ),
    },
  ]

  const taskColumns: ColumnDef<Task>[] = [
    {
      id: "completed",
      header: "تم",
      cell: ({ row }) => (
        <Checkbox
          checked={row.original.completed}
          onCheckedChange={(checked) => {
            // هنا يمكنك إضافة المنطق الخاص بتحديث حالة المهمة
            console.log(`تغيير حالة المهمة ${row.original.id} إلى ${checked}`)
          }}
        />
      ),
    },
    {
      header: "العنوان",
      accessorKey: "title",
    },
    {
      header: "الوصف",
      accessorKey: "description",
    },
    {
      header: "تاريخ الاستحقاق",
      accessorKey: "dueDate",
      cell: ({ getValue }) => formatDate(getValue() as string),
    },
    {
      header: "تم تعيينها لـ",
      accessorKey: "assignedTo",
    },
  ]

  const alertsTable = useReactTable({
    data: alertsData,
    columns: alertColumns,
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

  const tasksTable = useReactTable({
    data: tasksData,
    columns: taskColumns,
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
          <h1 className="text-xl font-bold">المهام والتنبيهات</h1>
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
          </div>
        </div>
        <main className="p-4 md:p-6">
          <Tabs defaultValue="alerts">
            <TabsList>
              <TabsTrigger value="alerts">التنبيهات</TabsTrigger>
              <TabsTrigger value="tasks">المهام</TabsTrigger>
            </TabsList>
            <TabsContent value="alerts">
              <div className="mb-4">
                <Button onClick={() => setIsAddAlertModalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> إضافة تنبيه
                </Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {alertsTable.getHeaderGroups().map((headerGroup) => (
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
                    {alertsTable.getRowModel().rows?.length ? (
                      alertsTable.getRowModel().rows.map((row) => (
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
                        <TableCell colSpan={alertColumns.length} className="h-24 text-center">
                          لا توجد نتائج.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="tasks">
              <div className="mb-4">
                <Button onClick={() => setIsAddTaskModalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> إضافة مهمة
                </Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {tasksTable.getHeaderGroups().map((headerGroup) => (
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
                    {tasksTable.getRowModel().rows?.length ? (
                      tasksTable.getRowModel().rows.map((row) => (
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
                        <TableCell colSpan={taskColumns.length} className="h-24 text-center">
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

      <AddAlertModal isOpen={isAddAlertModalOpen} onClose={() => setIsAddAlertModalOpen(false)} />

      <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} />
    </div>
  )
}

