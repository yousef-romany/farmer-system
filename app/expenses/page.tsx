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
import { formatCurrency, formatDate } from "@/lib/utils"
import { BarChart, LineChart } from "@/components/charts"
import { Filter, Plus, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddExpenseModal } from "@/components/expenses/add-expense-modal"
import { EditExpenseModal } from "@/components/expenses/edit-expense-modal"

interface Expense {
  id: string
  date: string
  category: string
  description: string
  amount: number
  responsiblePerson: string
}

const expensesData: Expense[] = [
  {
    id: "1",
    date: "2023-06-01",
    category: "علف",
    description: "شراء علف مركز",
    amount: 2500,
    responsiblePerson: "محمد أحمد",
  },
  {
    id: "2",
    date: "2023-06-05",
    category: "أدوية",
    description: "شراء لقاحات",
    amount: 1200,
    responsiblePerson: "أحمد علي",
  },
  // ... يمكنك إضافة المزيد من البيانات هنا
]

export default function ExpensesPage() {
  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState("")
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false)
  const [isEditExpenseModalOpen, setIsEditExpenseModalOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)

  const columns: ColumnDef<Expense>[] = [
    {
      header: "التاريخ",
      accessorKey: "date",
      cell: ({ getValue }) => formatDate(getValue() as string),
    },
    {
      header: "الفئة",
      accessorKey: "category",
    },
    {
      header: "الوصف",
      accessorKey: "description",
    },
    {
      header: "المبلغ",
      accessorKey: "amount",
      cell: ({ getValue }) => formatCurrency(getValue() as number),
    },
    {
      header: "المسؤول",
      accessorKey: "responsiblePerson",
    },
    {
      header: "الإجراءات",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          onClick={() => {
            setSelectedExpense(row.original)
            setIsEditExpenseModalOpen(true)
          }}
        >
          تعديل
        </Button>
      ),
    },
  ]

  const table = useReactTable({
    data: expensesData,
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
          <h1 className="text-xl font-bold">إدارة المصروفات</h1>
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
            <Button onClick={() => setIsAddExpenseModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> إضافة مصروف
            </Button>
          </div>
        </div>
        <main className="p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <ExpenseSummaryCard title="إجمالي المصروفات (الشهر الحالي)" amount={25000} />
            <ExpenseSummaryCard title="مصروفات العلف" amount={12000} percentage={48} />
            <ExpenseSummaryCard title="مصروفات الأدوية" amount={5000} percentage={20} />
            <ExpenseSummaryCard title="مصروفات الصيانة" amount={3000} percentage={12} />
          </div>

          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <ExpenseDistributionChart />
            <MonthlyExpenseSummary />
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                تصفية
              </Button>
              <ExpenseCategoryFilter />
              <ExpensePeriodFilter />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
        </main>
      </div>

      <AddExpenseModal isOpen={isAddExpenseModalOpen} onClose={() => setIsAddExpenseModalOpen(false)} />

      <EditExpenseModal
        isOpen={isEditExpenseModalOpen}
        onClose={() => setIsEditExpenseModalOpen(false)}
        expense={selectedExpense}
      />
    </div>
  )
}

function ExpenseSummaryCard({ title, amount, percentage }: { title: string; amount: number; percentage?: number }) {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <p className="mt-2 text-2xl font-bold">{formatCurrency(amount)}</p>
      {percentage && <p className="text-xs text-muted-foreground">{percentage}% من الإجمالي</p>}
    </div>
  )
}

function ExpenseDistributionChart() {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 text-lg font-semibold">توزيع المصروفات</h2>
      <div className="h-[300px]">
        <BarChart className="h-full" />
      </div>
    </div>
  )
}

function MonthlyExpenseSummary() {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 text-lg font-semibold">ملخص المصروفات الشهرية</h2>
      <div className="h-[300px]">
        <LineChart className="h-full" />
      </div>
    </div>
  )
}

function ExpenseCategoryFilter() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="جميع الفئات" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">جميع الفئات</SelectItem>
        <SelectItem value="feed">علف</SelectItem>
        <SelectItem value="medication">أدوية</SelectItem>
        <SelectItem value="maintenance">صيانة</SelectItem>
        <SelectItem value="other">أخرى</SelectItem>
      </SelectContent>
    </Select>
  )
}

function ExpensePeriodFilter() {
  return (
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
  )
}

