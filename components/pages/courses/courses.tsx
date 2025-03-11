"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatNumber } from "@/utils/formatDate";
import { addMonths, differenceInMonths, subMonths } from "date-fns";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import CreateCourseDialog from "./components/createCourses";
import PagebreadCrumb from "@/components/share/breadCrumb";

type ICourse = {
  id: number;
  courseName: string;
  status: "progress" | "comming" | "completed" | "closed";
  startDate: Date;
  endDate: Date;
  fees: number;
  total: number;
};

export const columns: ColumnDef<ICourse>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return (
        <div className="capitalize size-6 bg-yellow-600 font-semibold flex justify-center items-center text-white rounded">
          {row.index + 1}
        </div>
      );
    },
  },
  {
    accessorKey: "courseName",
    size: 200,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="justify-center w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Courses
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("courseName")}</div>
    ),
  },
  {
    accessorKey: "fees",
    size: 260,
    header: () => <div>Fees</div>,
    cell: ({ renderValue }) => {
      return <p>{formatNumber(renderValue() as number)} MMK</p>;
    },
  },
  {
    accessorKey: "status",
    cell: ({ renderValue }) => {
      return (
        <Badge
          className={cn("font-semibold", {
            "bg-yellow-300 text-yellow-800": renderValue() === "comming",
            "bg-red-300 text-red-800": renderValue() === "closed",
            "bg-green-300 text-green-800": renderValue() === "completed",
            "bg-cyan-300 text-cyan-800": renderValue() === "progress",
          })}
        >
          {renderValue() as string}
        </Badge>
      );
    },
  },
  {
    accessorKey: "total",
    size: 260,
    header: () => <div>Enroll Student</div>,
    cell: ({ renderValue }) => {
      return <p>{formatNumber(renderValue() as number)}</p>;
    },
  },
  {
    accessorKey: "duration",
    size: 260,
    header: () => <div>Duration</div>,
    cell: ({ row }) => {
      return (
        <div className="text-[12px]">
          <p>
            {" "}
            {formatDate(row.original.startDate)} -{" "}
            {formatDate(row.original.endDate)}
          </p>
          <p>
            {" "}
            {differenceInMonths(
              row.original.endDate,
              row.original.startDate
            )}{" "}
            months
          </p>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Link href={`/courses/${row.original.id}`}>
          <Button variant="outline">Details</Button>
        </Link>
      );
    },
  },
];

export function Courses() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: [
      {
        id: 1,
        courseName: "JLPT N5",
        status: "progress",
        startDate: subMonths(new Date(), 4),
        endDate: new Date(),
        fees: 20000,
        total: 25,
      },
      {
        id: 2,
        courseName: "JLPT N4",
        status: "comming",
        startDate: addMonths(new Date(), 2),
        endDate: addMonths(new Date(), 6),
        fees: 200000,
        total: 18,
      },
      {
        id: 3,
        courseName: "JLPT N5",
        status: "completed",
        startDate: subMonths(new Date(), 8),
        endDate: subMonths(new Date(), 4),
        fees: 20000,
        total: 23,
      },
      {
        id: 4,
        courseName: "JLPT N5",
        status: "closed",
        startDate: subMonths(new Date(), 6),
        endDate: addMonths(new Date(), 2),
        fees: 20000,
        total: 4,
      },
    ],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <PagebreadCrumb lists={[{ title: "Courses", href: "/courses" }]} />

      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter role name..."
          value={
            (table.getColumn("courseName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("courseName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <CreateCourseDialog />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div> */}
    </div>
  );
}
