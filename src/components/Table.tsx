import { useContext, useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import { Table as MantineTable } from "@mantine/core";
import { MachineContext } from "../machines";

type Props = { tableData: Todo[] };

const columnHelper = createColumnHelper<Todo>();

export const Table = ({ tableData }: Props) => {
  const { send } = useContext(MachineContext);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columns, data] = useMemo(() => {
    const columns = [
      columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
        header: () => <span>ID</span>,
      }),
      columnHelper.accessor("userId", {
        cell: (info) => info.getValue(),
        header: () => <span>User</span>,
      }),
      columnHelper.accessor("todo", {
        cell: (info) => info.getValue(),
        header: () => <span>To do</span>,
      }),
      columnHelper.accessor("completed", {
        cell: ({ cell }) => (
          <span>{cell.getValue() === true ? "✅" : "❌"}</span>
        ),
        header: () => <span>Completed</span>,
      }),
    ];

    return [columns, tableData];
  }, [tableData]);

  const handleModal = (todo: Todo) => send({ type: "MODAL_VIEW", todo })

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (

    <MantineTable
      striped
      highlightOnHover
      withBorder
      verticalSpacing="sm"
      fontSize="md"
    >
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} style={{ cursor: 'pointer' }}>
                {header.isPlaceholder ? null : (
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                )}{" "}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} onClick={() => handleModal(row.original)}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </MantineTable>

  );
};
