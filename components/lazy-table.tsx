"use client"

import { useState, useEffect } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface LazyTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  pageSize?: number
}

export function LazyTable<T>({ columns, data, pageSize = 10 }: LazyTableProps<T>) {
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [visibleData, setVisibleData] = useState(data.slice(0, pageSize))

  const table = useReactTable({
    data: visibleData,
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

  useEffect(() => {
    const filteredData = data.filter((item) =>
      Object.values(item).some((value) => value && value.toString().toLowerCase().includes(globalFilter.toLowerCase())),
    )
    setVisibleData(filteredData.slice(0, pageSize))
  }, [data, globalFilter, pageSize])

  const loadMore = () => {
    setVisibleData(data.slice(0, visibleData.length + pageSize))
  }

  return (
    <>
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
      {visibleData.length < data.length && (
        <div className="mt-4 text-center">
          <Button onClick={loadMore}>تحميل المزيد</Button>
        </div>
      )}
    </>
  )
}

