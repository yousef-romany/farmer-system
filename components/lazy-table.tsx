/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";

interface LazyTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  pageSize?: number;
}

export function LazyTable<T>({
  columns,
  data,
  pageSize = 10,
}: LazyTableProps<T>) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [visibleData, setVisibleData] = useState(data.slice(0, pageSize));
  const [searchId, setSearchId] = useState(""); // New state for search by ID

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
    onSortingChange: setSorting as any,
    onGlobalFilterChange: setGlobalFilter,
  });

  useEffect(() => {
    const filteredData = searchId
      ? data.filter(
          (item: any) => item.idintifer_number.toString().includes(searchId) // ✅ Filter by رقم التعريفي
        )
      : data.filter((item: any) =>
          Object.values(item).some(
            (value) =>
              value &&
              value
                .toString()
                .toLowerCase()
                .includes(globalFilter.toLowerCase())
          )
        );
    setVisibleData(filteredData.slice(0, pageSize));
  }, [data, globalFilter, pageSize, searchId]);

  const loadMore = () => {
    setVisibleData(data.slice(0, visibleData.length + pageSize));
  };

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="ابحث برقم التعريفي"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead className="text-center" key={header.id}>
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
      {visibleData.length < data.length && (
        <div className="mt-4 text-center">
          <Button onClick={loadMore}>تحميل المزيد</Button>
        </div>
      )}
    </div>
  );
}
