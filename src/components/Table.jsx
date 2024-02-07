import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";


function Table({ data, columns, setSelectedUsers }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
      rowSelection: rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onRowSelectionChange: setRowSelection, 
    enableRowSelection: true, 
  });

  const handleClearSelection = () => {
    setRowSelection({});
  };

  useEffect(() => {
    setSelectedUsers([])
    table.getSelectedRowModel().flatRows.map(row => {
        setSelectedUsers((users)=> [
            ...users, row.original
        ])
    })
  }, [table.getSelectedRowModel().flatRows])

  useEffect(() => {
    handleClearSelection()
  }, [data])
  
  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          <input
            className="form-control form-control-sm mt-4 mb-4"
            placeholder="Buscar"
            type="search"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
          />
        </div>
      </div>

      <div className="row dt-row">
        <div className="col-sm-12">
          <table className="table table-hover table-light ">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      scope="col"
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                          {
                            { asc: "▲", desc: "▼" }[
                              header.column.getIsSorted() ?? null
                            ]
                          }
                        </div>
                      )}
                    </th>
                  ))}
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
          </table>
          {table.getRowModel().rows.length === 0 ? (
            <p className="text-center"> No se encontraron usuarios</p>
          ) : null}
        </div>
      </div>

      <div className="row pt-1 pb-2">
        <div className="col-sm-12 col-md-5">
          <div className="">
            #Registros: {table.getFilteredRowModel().rows.length}
          </div>
        </div>
        <div className="col-sm-12 col-md-7 justify-content-end pagination">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </button>
          <span className="ml-2 mr-2">
            {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </span>

          <button
            className={`btn btn-sm btn-primary `}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;
