import React, { useMemo } from "react";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
  flexRender,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

import type { Contact } from "../types/contacts";
import Loading from "./Loading";

interface ContactTableProps {
  contacts: Contact[];
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
  onView: (contact: Contact) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}

const columnHelper = createColumnHelper<Contact>();

export function ContactTable({
  contacts,
  isLoading,
  isError,
  error,
  onView,
  onEdit,
  onDelete,
}: ContactTableProps) {

  
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = useMemo(
    () => [
      columnHelper.accessor("firstName", {
        header: ({ column }) => {
          return (
            <button
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold flex"
              aria-label={`Sort by first name ${
                column.getIsSorted() === "asc" ? "descending" : "ascending"
              }`}
            >
              First Name
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" aria-hidden="true" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" aria-hidden="true" />
              )}
            </button>
          );
        },
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("firstName")}</div>
        ),
      }),
      columnHelper.accessor("lastName", {
        header: ({ column }) => {
          return (
            <button
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold flex"
              aria-label={`Sort by last name ${
                column.getIsSorted() === "asc" ? "descending" : "ascending"
              }`}
            >
              Last Name
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" aria-hidden="true" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" aria-hidden="true" />
              )}
            </button>
          );
        },
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("lastName")}</div>
        ),
      }),
      columnHelper.accessor("email", {
        header: ({ column }) => {
          return (
            <button
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold flex"
              aria-label={`Sort by email ${
                column.getIsSorted() === "asc" ? "descending" : "ascending"
              }`}
            >
              Email
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" aria-hidden="true" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" aria-hidden="true" />
              )}
            </button>
          );
        },
        cell: ({ row }) => (
          <div className="text-blue-600 hover:text-blue-800">
            <a
              aria-label={`Send Eamail to ${row.getValue("email")}`}
              href={`mailto:${row.getValue("email")}`}
              className="hover:underline"
              onClick={(e) => {
                e.stopPropagation();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  e.currentTarget.click();
                }
              }}
            >
              {row.getValue("email")}
            </a>
          </div>
        ),
      }),
      columnHelper.accessor("role", {
        header: ({ column }) => {
          return (
            <button
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold flex"
              aria-label={`Sort by role ${
                column.getIsSorted() === "asc" ? "descending" : "ascending"
              }`}
            >
              Role
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" aria-hidden="true" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" aria-hidden="true" />
              )}
            </button>
          );
        },
        cell: ({ row }) => {
          const role = row.getValue("role") as string;
          return <span>{role}</span>;
        },
      }),
      columnHelper.accessor("isActive", {
        header: ({ column }) => {
          return (
            <button
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold flex"
              aria-label={`Sort by status ${
                column.getIsSorted() === "asc" ? "descending" : "ascending"
              }`}
            >
              Status
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" aria-hidden="true" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" aria-hidden="true" />
              )}
            </button>
          );
        },
        cell: ({ row }) => {
          const isActive = row.getValue("isActive") as boolean;
          return <span>{isActive ? "Active" : "Inactive"}</span>;
        },
      }),
      columnHelper.accessor("birthDate", {
        header: ({ column }) => {
          return (
            <button
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold flex"
              aria-label={`Sort by birth date ${
                column.getIsSorted() === "asc" ? "descending" : "ascending"
              }`}
            >
              Birth Date
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" aria-hidden="true" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" aria-hidden="true" />
              )}
            </button>
          );
        },
        cell: ({ row }) => {
          const date = new Date(row.getValue("birthDate"));
          return <div>{date.toLocaleDateString()}</div>;
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const contact = row.original;
          return (
            <div
              className="flex items-center space-x-4"
              role="group"
              aria-label="Contact actions"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onView(contact);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    onView(contact);
                  }
                }}
                aria-label={`View details for ${contact.firstName} ${contact.lastName}`}
                title={`View ${contact.firstName} ${contact.lastName}`}
                className="hover:text-gray-600 text-black dark:text-white"
              >
                <Eye className="h-4 w-4 " aria-hidden="true" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(contact);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit(contact);
                  }
                }}
                aria-label={`Edit ${contact.firstName} ${contact.lastName}`}
                title={`Edit ${contact.firstName} ${contact.lastName}`}
                className="hover:text-gray-600 text-black dark:text-white"
              >
                <Edit className="h-4 w-4 " aria-hidden="true" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(contact);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete(contact);
                  }
                }}
                aria-label={`Delete ${contact.firstName} ${contact.lastName}`}
                title={`Delete ${contact.firstName} ${contact.lastName}`}
                className="text-red-600 hover:text-red-800 "
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          );
        },
      }),
    ],
    [onView, onEdit, onDelete]
  );

  const table = useReactTable({
    data: contacts,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  if (isLoading) {
    return (
      <div>
        <div className="p-6">
          <div className="flex items-center justify-center h-32">
            <Loading />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <div>
        <div className="p-6">
          <div
            className=" flex flex-col
           items-center justify-center h-32"
          >
            <p>
              There is Error when loading the contacts, Please try againg later!
            </p>
           
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h3 aria-label="Contacts Count">Contacts ({contacts.length})</h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center  justify-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                placeholder="Search contacts..."
                value={globalFilter ?? ""}
                onChange={(event) =>
                  setGlobalFilter(String(event.target.value))
                }
                aria-label="Search contacts"
                type="search"
                id="search"
                className=" pl-8 w-full sm:w-64 block  p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="rounded-md border overflow-x-auto">
          <table  aria-label="Contact lists " className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} className="font-semibold px-6 py-3">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="cursor-pointer hover:bg-muted/50 focus-within:bg-muted/50 bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                    onClick={() => onView(row.original)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onView(row.original);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${row.original.firstName} ${row.original.lastName}`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-3 ">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <p className="text-muted-foreground">
                        No contacts found.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search or add a new contact.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Info */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {table.getFilteredRowModel().rows.length} of{" "}
            {contacts.length} contact(s)
            {globalFilter && (
              <span className="ml-1">matching "{globalFilter}"</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
