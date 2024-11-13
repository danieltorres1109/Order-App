import * as React from "react";
import ReactDOM from "react-dom/client";

import {
    SortingState,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    getFilteredRowModel,
} from "@tanstack/react-table";
import { NoFound } from "../NoFound";

interface Props {
    data: any[];
    columns: any[];
    TitleDashComponent: any;
}

export const CustomTable = ({
    data: defaultData,
    columns,
    TitleDashComponent,
}: Props) => {
    const [data, setData] = React.useState(() => [...defaultData]);
    // const rerender = React.useReducer(() => ({}), {})[1];

    const [sorting, setSorting] = React.useState<SortingState>([]);

    const [filtering, setfiltering] = React.useState("");

    const TitleDashWithSearch = React.cloneElement(TitleDashComponent, {
        onSearch: (e: any) => setfiltering(e.target.value),
    });

    const table = useReactTable({
        data,
        columns,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setfiltering,
    });

    const { rows } = table.getRowModel();

    React.useEffect(() => {
        setData(defaultData);
    }, [defaultData]);

    React.useEffect(() => {
        table.setPageSize(10);
    }, [table]);

    return (
        <div className="p-2">
            {TitleDashWithSearch}

            <div className="overflow-auto ">
                <table className="table-fixed ">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    {...{
                                                        className:
                                                            header.column.getCanSort()
                                                                ? "cursor-pointer select-none py-4"
                                                                : "py-4",
                                                        onClick:
                                                            header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: " 🔼",
                                                        desc: " 🔽",
                                                    }[
                                                        header.column.getIsSorted() as string
                                                    ] ?? null}
                                                </div>
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        {table.getFooterGroups().map((footerGroup) => (
                            <tr key={footerGroup.id}>
                                {footerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .footer,
                                                  header.getContext()
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </tfoot>
                </table>
            </div>

            {/* Filtering */}
            {rows.length === 0 && <NoFound text="ningun resultado por aquí" />}

            <div className="h-4" />

            {table.getPageCount() > 1 && <Paginator {...table} />}
        </div>
    );
};

export const Paginator = (table: any) => {
    return (
        <div className="md:flex md:items-center md:justify-end gap-5">
            {/* Flechas */}
            <div className="flex md:justify-end  justify-center  items-center  gap-2">
                <button
                    className={`border rounded p-1 md:text-xl  font-extrabold ${
                        !table.getCanPreviousPage()
                            ? "text-gray-400"
                            : "text-purple-800 tracking-tighter"
                    }`}
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"<<"}
                </button>
                <button
                    className={`border w-7  rounded p-1 md:text-xl  font-extrabold ${
                        !table.getCanPreviousPage()
                            ? "text-gray-400"
                            : "text-purple-800"
                    }`}
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"<"}
                </button>

                {Array.from({ length: table.getPageCount() }, (_, i) => i).map(
                    (pageNumber) => {
                        return (
                            <button
                                key={pageNumber}
                                className={`border w-7 rounded p-1 text-sm ${
                                    table.getState().pagination.pageIndex ===
                                    pageNumber
                                        ? "bg-purple-500 text-white"
                                        : "hover:bg-blue-100"
                                }`}
                                onClick={() => table.setPageIndex(pageNumber)}
                            >
                                {pageNumber + 1}
                            </button>
                        );
                    }
                )}

                <button
                    className={`border rounded w-7 p-1 md:text-xl font-extrabold ${
                        !table.getCanNextPage()
                            ? "text-gray-400"
                            : "text-purple-800"
                    }`}
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {">"}
                </button>
                <button
                    className={`border rounded p-1 md:text-xl font-extrabold ${
                        !table.getCanNextPage()
                            ? "text-gray-400"
                            : "text-purple-800 tracking-tighter"
                    }`}
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {">>"}
                </button>
            </div>

            {/* Ir a paginas */}
            <div className="flex items-center gap-2 justify-between mt-2 md:mt-0">
                {/* <span className="flex text-sm items-center gap-1">
                    <div>Página</div>
                    <strong>
                        <span className="text-purple-800 font-bold ">
                            {table.getState().pagination.pageIndex + 1}
                        </span>{" "}
                        de {table.getPageCount()}
                    </strong>
                </span> */}

                <select
                    className="text-sm border-gray-300 py-2 rounded px-2"
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Mostrar {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
