"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function CustomersTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },

    // Set the initial pagination state
    initialState: {
      pagination: {
        pageSize: 5, // Set the page size to 5
      },
    },
  });

  return (
    <div className="rounded-md text-darkElement dark:text-lightElement">
      <div className="flex items-center py-12">
        <Input
          placeholder="Filter Identity number..."
          value={
            (table.getColumn("identity_number")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table.getColumn("identity_number")?.setFilterValue(event.target.value)
          }
          className="w-full border-0 border-b-2 border-auroraGreen-700 dark:border-auroraGreen-300 rounded-none ring-0 focus-visible:outline-none focus-visible:ring-0 text-center"
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-auroraGreen-700 dark:border-auroraGreen-300"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="font-bold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-auroraGreen-700 dark:border-auroraGreen-300 border-b-4"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={cn("font-semibold capitalize")}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-darkElement dark:text-lightElement"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center py-4 bg-auroraGreen-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ArrowRightIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
