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
import { Switch } from "@/components/ui/switch";
import DeleteDialog from "@/components/share/deleteDialog";
import CreateDialog from "@/components/share/createDialog";
import { IRole } from "@/types";
import {
  useDeleteRole,
  useGetRole,
  useToggleStatus,
} from "@/lib/services/setting/role";
import { queryClient } from "@/provider/QueryProvider";
import { toast } from "sonner";
import { formatDate } from "@/utils/formatDate";

export type Payment = {
  id: string;
  roleName: string;
  active: boolean;
  email: string;
  createdBy: string;
};

export const columns: ColumnDef<IRole>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
    accessorKey: "roleName",
    size: 200,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          RoleName
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("roleName")}</div>
    ),
  },
  {
    accessorKey: "createdBy",
    header: () => <div>createdBy</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("createdBy")}</div>;
    },
  },
  {
    accessorKey: "status",
    size: 260,
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const { mutate } = useToggleStatus();

      const handleRowStatusChange = () => {
        mutate(+row.original.id, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["role"] });
          },
        });
      };
      return (
        <div className="text-center font-medium">
          <Switch
            checked={row.getValue("status")}
            onCheckedChange={handleRowStatusChange}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    size: 260,
    header: () => <div className="text-center">Created On</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {formatDate(row.original.createdAt)}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { mutate } = useDeleteRole();
      const handleDelete = () => {
        mutate(row.original.id, {
          onSuccess: (resp) => {
            queryClient.invalidateQueries({ queryKey: ["role"] });
            toast.success(resp.data.message);
          },
        });
      };
      return (
        <DeleteDialog fun={handleDelete}>
          <Button variant="outline" className="border-red-500 text-red-500">
            Delete
          </Button>
        </DeleteDialog>
      );
    },
  },
];

export function Role() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { data: roleList, isLoading } = useGetRole();

  const table = useReactTable({
    data: (isLoading ? [] : roleList?.data.roles) as IRole[],
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
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter role name..."
          value={
            (table.getColumn("roleName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("roleName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <CreateDialog />
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
