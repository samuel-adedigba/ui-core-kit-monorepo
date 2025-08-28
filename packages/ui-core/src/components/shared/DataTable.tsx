/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    forwardRef,
    useMemo,
    useRef,
    useEffect,
    useState,
    useImperativeHandle,
    useCallback,
} from 'react'
import classNames from 'classnames'
import TableRowSkeleton from './loaders/TableRowSkeleton'
import Loading from './Loading'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    ColumnDef,
    ColumnSort,
    Row,
    CellContext,
} from '@tanstack/react-table'
import type { SkeletonProps } from '../ui/Skeleton'
import type { ForwardedRef, ChangeEvent, ReactNode } from 'react'
import type { CheckboxProps } from '../ui/Checkbox'
import Table from '../ui/Table'
import Pagination from '../ui/Pagination'
import Checkbox from '../ui/Checkbox/Checkbox'
import { Button, Input } from '../ui'
import Select from '../ui/Select'

const { Tr, Th, Td, THead, TBody } = Table

// Theming system for DataTable
interface DataTableTheme {
    container?: string
    table?: string
    header?: {
        container?: string
        row?: string
        cell?: string
        sortable?: string
        sorting?: string
    }
    body?: {
        container?: string
        row?: string
        rowEven?: string
        rowOdd?: string
        rowHover?: string
        rowEditing?: string
        cell?: string
    }
    pagination?: {
        container?: string
        wrapper?: string
    }
    actions?: {
        container?: string
        addButton?: string
        editButton?: string
        saveButton?: string
        cancelButton?: string
    }
    loading?: string
}

// Default theme that works with your UI components
const defaultTheme: DataTableTheme = {
    container: 'w-full',
    table: 'min-w-full divide-y divide-gray-200',
    header: {
        container: 'bg-gray-50',
        row: '',
        cell: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
        sortable:
            'cursor-pointer select-none hover:text-gray-700 transition-colors duration-200',
        sorting: 'text-blue-600',
    },
    body: {
        container: 'bg-white divide-y divide-gray-200',
        row: 'hover:bg-gray-50 transition-colors duration-150',
        rowEven: 'bg-white',
        rowOdd: 'bg-gray-25',
        rowHover: 'hover:bg-gray-50',
        rowEditing: 'bg-blue-50 border-l-4 border-blue-400',
        cell: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
    },
    pagination: {
        container:
            'flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 p-4 bg-white border-t border-gray-200',
        wrapper: 'flex items-center gap-2',
    },
    actions: {
        container:
            'flex items-center justify-start gap-2 mb-4 p-4 bg-gray-50 rounded-lg border',
        addButton:
            'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 shadow-sm',
        editButton:
            'bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs font-medium rounded transition-colors duration-200',
        saveButton:
            'bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs font-medium rounded transition-colors duration-200',
        cancelButton:
            'bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs font-medium rounded transition-colors duration-200',
    },
}

// Sorter component for column sorting indicators
const Sorter = ({
    sort,
    theme,
}: {
    sort: false | 'asc' | 'desc'
    theme?: DataTableTheme
}) => {
    return (
        <span className="ml-2 inline-flex flex-col">
            <svg
                className={classNames(
                    'w-3 h-3 transition-colors duration-200',
                    sort === 'asc'
                        ? theme?.header?.sorting || 'text-blue-600'
                        : 'text-gray-400'
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
            </svg>
            <svg
                className={classNames(
                    'w-3 h-3 -mt-1 transition-colors duration-200',
                    sort === 'desc'
                        ? theme?.header?.sorting || 'text-blue-600'
                        : 'text-gray-400'
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
        </span>
    )
}

// Helper function to merge themes
const mergeThemes = (customTheme?: Partial<DataTableTheme>): DataTableTheme => {
    // if (!customTheme) return defaultTheme

    return {
        container: customTheme?.container,
        table: customTheme?.table,
        header: {
            //  ...defaultTheme.header,
            ...customTheme?.header,
        },
        body: {
            // ...defaultTheme.body,
            ...customTheme?.body,
        },
        pagination: {
            //  ...defaultTheme.pagination,
            ...customTheme?.pagination,
        },
        actions: {
            //  ...defaultTheme.actions,
            ...customTheme?.actions,
        },
        loading: customTheme?.loading,
    }
}

// Helper function to ensure ReactNode compatibility
const renderSafeNode = (node: unknown): ReactNode => {
    if (typeof node === 'bigint') {
        return String(node)
    }
    if (typeof node === 'symbol') {
        return String(node)
    }
    if (typeof node === 'function') {
        return String(node)
    }
    return node as ReactNode
}

export type OnSortParam = { order: 'asc' | 'desc' | ''; key: string | number }

type DataTableProps<T> = {
    columns: ColumnDef<T>[]
    data?: T[]
    loading?: boolean
    onCheckBoxChange?: (checked: boolean, row: T) => void
    onIndeterminateCheckBoxChange?: (checked: boolean, rows: Row<T>[]) => void
    onPaginationChange?: (page: number) => void
    onSelectChange?: (num: number) => void
    onSort?: (sort: OnSortParam) => void
    pageSizes?: number[]
    selectable?: boolean
    skeletonAvatarColumns?: number[]
    skeletonAvatarProps?: SkeletonProps
    pagingData?: {
        total: number
        pageIndex: number
        pageSize: number
    }
    disablePagination?: boolean // A new prop to disable pagination
    onRowUpdate?: (delta: Partial<T> & { id: any }) => Promise<void>
    editable?: boolean
    allowAddRow?: boolean
}

function EditableCell<T>({
    ctx,
    editing,
    setEditing,
}: {
    ctx: CellContext<T, unknown>
    editing: { rowIndex: number; values: Partial<T> } | null
    setEditing: React.Dispatch<
        React.SetStateAction<{ rowIndex: number; values: Partial<T> } | null>
    >
}) {
    const inputRef = useRef<HTMLInputElement>(null)
    const {
        row: { index },
        column,
        getValue,
    } = ctx
    const isEditing = editing?.rowIndex === index
    const canEdit = !!(column.columnDef.meta as DataTableColumnMeta)?.editable

    // Check if this specific row is editable
    const rowData = ctx.row.original as any
    const isRowEditable = rowData?.editable !== false // Default to true for backward compatibility

    // Cell is editable only if both column allows it AND row allows it
    const isCellEditable = canEdit && isRowEditable

    const [localValue, setLocalValue] = useState<string>(
        editing ? String((editing.values as any)[column.id] ?? '') : ''
    )

    useEffect(() => {
        if (isEditing) {
            setLocalValue(
                String((editing.values as any)[column.id] ?? getValue() ?? '')
            )
        } else {
            setLocalValue('')
        }
    }, [isEditing, column.id, getValue, editing])

    useCallback(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus()
            inputRef.current.select()
        }
    }, [isEditing])

    if (!isEditing || !isCellEditable) {
        return <span>{String(getValue() ?? '')}</span>
    }

    return (
        <Input
            ref={inputRef}
            value={localValue}
            //value={(editing.values as any)[column.id] || ''}
            className="w-auto max-w-full border-yellow-500"
            // onChange={(e) =>
            //     setEditing((prev) =>
            //         prev && prev.rowIndex === index
            //             ? {
            //                   rowIndex: index,
            //                   values: {
            //                       ...prev.values,
            //                       [column.id]: e.target.value,
            //                   },
            //               }
            //             : prev
            //     )
            // }
            onChange={(e) => setLocalValue(e.target.value)}
            onBlur={() => {
                if (isEditing) {
                    setEditing((prev) =>
                        prev && prev.rowIndex === index
                            ? {
                                  rowIndex: index,
                                  values: {
                                      ...prev.values,
                                      [column.id]: localValue,
                                  },
                              }
                            : prev
                    )
                }
            }}
            onKeyDown={(e) => {
                if (e.key === 'Escape') {
                    setEditing(null) // Cancel editing on Escape key
                }
                e.stopPropagation()
            }}
        />
    )
}

type CheckBoxChangeEvent = ChangeEvent<HTMLInputElement>
type DataTableColumnMeta = {
    editable?: boolean
}

interface IndeterminateCheckboxProps extends Omit<CheckboxProps, 'onChange'> {
    onChange: (event: CheckBoxChangeEvent) => void
    indeterminate: boolean
    onCheckBoxChange?: (event: CheckBoxChangeEvent) => void
    onIndeterminateCheckBoxChange?: (event: CheckBoxChangeEvent) => void
}


const IndeterminateCheckbox = (props: IndeterminateCheckboxProps) => {
    const {
        indeterminate,
        onChange,
        onCheckBoxChange,
        onIndeterminateCheckBoxChange,
        ...rest
    } = props

    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (typeof indeterminate === 'boolean' && ref.current) {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, indeterminate])

    const handleChange = (e: CheckBoxChangeEvent) => {
        onChange(e)
        onCheckBoxChange?.(e)
        onIndeterminateCheckBoxChange?.(e)
    }

    return (
        <Checkbox
            ref={ref}
            className="mb-0"
            onChange={(_, e) => handleChange(e)}
            {...rest}
        />
    )
}

export type DataTableResetHandle = {
    resetSorting: () => void
    resetSelected: () => void
}
type WithId = { id: any }
function _DataTable<T extends WithId>(
    props: DataTableProps<T>,
    ref: ForwardedRef<DataTableResetHandle>
) {
    const {
        skeletonAvatarColumns,
        columns: columnsProp = [],
        data = [],
        loading = false,
        onCheckBoxChange,
        onIndeterminateCheckBoxChange,
        onPaginationChange,
        onSelectChange,
        onSort,
        pageSizes = [10, 25, 50, 100],
        selectable = false,
        skeletonAvatarProps,
        pagingData = {
            total: 0,
            pageIndex: 1,
            pageSize: 10,
        },
        onRowUpdate,
        editable = false,
        allowAddRow = false,
    } = props

    // Manage internal data state for editing
    const [tableData, setTableData] = useState<T[]>(data)
    useEffect(() => {
        setTableData(data) // sync when props.data changes
    }, [data])

    const { disablePagination = false } = props // Destructuring the new prop

    const { pageSize, pageIndex, total } = pagingData

    const [sorting, setSorting] = useState<ColumnSort[] | null>(null)

    const pageSizeOption = useMemo(
        () =>
            pageSizes.map((number) => ({
                value: number,
                label: `${number} / page`,
            })),
        [pageSizes]
    )

    const handleCheckBoxChange = (checked: boolean, row: T) => {
        if (!loading) {
            onCheckBoxChange?.(checked, row)
        }
    }

    const handleIndeterminateCheckBoxChange = (
        checked: boolean,
        rows: Row<T>[]
    ) => {
        if (!loading) {
            onIndeterminateCheckBoxChange?.(checked, rows)
        }
    }

    const handlePaginationChange = (page: number) => {
        if (!loading) {
            onPaginationChange?.(page)
        }
    }

    const handleSelectChange = (value?: number) => {
        if (!loading) {
            onSelectChange?.(Number(value))
        }
    }

    useEffect(() => {
        if (Array.isArray(sorting)) {
            const sortOrder =
                sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : ''
            const id = sorting.length > 0 ? sorting[0].id : ''
            onSort?.({ order: sortOrder, key: id })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sorting])

    const [editing, setEditing] = useState<{
        rowIndex: number
        values: Partial<T>
    } | null>(null)
    // const startEditRow = (rowIndex: number) =>
    //     setEditing({ rowIndex, values: { ...(tableData[rowIndex] as any) } })
    const startEditRow = (rowIndex: number) => {
        // Check if this row is editable before starting edit
        const rowData = tableData[rowIndex] as any
        const isRowEditable = rowData?.editable !== false // Default to true for backward compatibility

        if (isRowEditable) {
            setEditing({
                rowIndex,
                values: { ...(tableData[rowIndex] as any) },
            })
        }
    }

    const cancelEdit = () => setEditing(null)
    const saveEdit = async () => {
        if (!editing) return
        const { rowIndex, values } = editing
        const orig = tableData[rowIndex]!
        // build only changed fields + correct primary key
        const changed = Object.entries(values)
            .filter(([k, v]) => (orig as any)[k] !== v)
            .reduce(
                (a, [k, v]) => ({ ...a, [k]: v }),
                {} as Record<string, any>
            )

        // assume your PK is called "asset_id"—change to your real field
        const delta = { id: (orig as any).id, ...changed }

        await onRowUpdate?.(delta as any)
        setTableData((old) =>
            old.map((r, i) =>
                i === rowIndex ? ({ ...r, ...changed } as T) : r
            )
        )
        cancelEdit()
    }
    // inside DataTable's component scope
    const handleAddBlankRow = useCallback(() => {
        // compute next id from current tableData (handles existing + previously added rows)
        const maxId = tableData.reduce((m, r) => {
            const n = Number((r as any).id)
            return Number.isFinite(n) ? Math.max(m, n) : m
        }, 0)
        const nextId = maxId + 1

        // Determine column keys
        const keys = columnsProp
            .map((c) => (c as any).id ?? (c as any).accessorKey)
            .filter(Boolean)
            .filter((k) => k !== 'select' && k !== 'actions') as Array<
            string | number
        >

        const newRow: Record<string | number, any> = {
            id: nextId,
            __local: true,
            editable: true, // Mark new rows as editable by default
        }
        keys.forEach((k) => {
            newRow[k] = ''
        })

        // Add new row at top and set editing to that row
        setTableData((prev) => [newRow as T, ...prev])
        setEditing({ rowIndex: 0, values: newRow as Partial<T> })
    }, [columnsProp, tableData])

    const defaultColumn: Partial<ColumnDef<T>> = useMemo(
        () => ({
            meta: { editable: false },
        }),
        []
    )

    // — build final columns
    const finalColumns = useMemo<ColumnDef<T>[]>(() => {
        const cols: ColumnDef<T>[] = []

        if (selectable) {
            cols.push({
                id: 'select',
                header: ({ table }) => (
                    <IndeterminateCheckbox
                        checked={table.getIsAllRowsSelected()}
                        indeterminate={table.getIsSomeRowsSelected()}
                        onChange={table.getToggleAllRowsSelectedHandler()}
                        onIndeterminateCheckBoxChange={(e) => {
                            handleIndeterminateCheckBoxChange(
                                e.target.checked,
                                table.getRowModel().rows
                            )
                        }}
                    />
                ),
                cell: ({ row }) => (
                    <IndeterminateCheckbox
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        indeterminate={row.getIsSomeSelected()}
                        onChange={row.getToggleSelectedHandler()}
                        onCheckBoxChange={(e) =>
                            handleCheckBoxChange(e.target.checked, row.original)
                        }
                    />
                ),
            })
        }

        for (const col of columnsProp) {
            const isEditable = Boolean((col.meta as any)?.editable)

            if (isEditable) {
                // wrap editable cells
                cols.push({
                    ...col,
                    cell: (ctx) => (
                        <EditableCell
                            ctx={ctx}
                            editing={editing}
                            setEditing={setEditing}
                        />
                    ),
                })
            } else {
                // keep whatever the user passed in: either a custom cell or the default
                cols.push(col)
            }
        }

        if (editable) {
            cols.push({
                id: 'actions',
                header: 'Actions',
                cell: ({ row: { index, original } }) => {
                    // Check if this specific row is editable
                    const rowData = original as any
                    const isRowEditable = rowData?.editable !== false // Default to true for backward compatibility

                    // Don't show actions for non-editable rows
                    if (!isRowEditable) {
                        return null
                    }

                    return editing?.rowIndex === index ? (
                        <div className="flex gap-2">
                            <Button
                                block
                                variant="solid"
                                className="bg-green-600 hover:bg-green-700 text-center flex items-center justify-center"
                                disabled={loading}
                                onClick={saveEdit}
                            >
                                Save
                            </Button>
                            <Button
                                block
                                variant="solid"
                                className="bg-red-500 hover:bg-red-500 flex items-center justify-center"
                                onClick={cancelEdit}
                            >
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="solid"
                            className="text-center items-center justify-center"
                            onClick={() => startEditRow(index)}
                        >
                            Edit
                        </Button>
                    )
                },
            })
        }

        return cols
    }, [columnsProp, selectable, editable, editing, loading])

    const table = useReactTable({
        //data,
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        // columns: finalColumns as ColumnDef<unknown | object | any[], any>[],
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        manualSorting: true,
        onSortingChange: (sorter) => {
            setSorting(sorter as ColumnSort[])
        },
        state: {
            sorting: sorting as ColumnSort[],
        },
        defaultColumn,
        columns: finalColumns,
        data: tableData,
    })

    const resetSorting = () => {
        table.resetSorting()
    }

    const resetSelected = () => {
        table.toggleAllRowsSelected(false)
    }

    useImperativeHandle(ref, () => ({
        resetSorting,
        resetSelected,
        cancelEdit,
    }))

    return (
        <Loading loading={loading && tableData.length !== 0} type="cover">
            {allowAddRow && (
                <div className="flex items-center justify-start gap-2 mb-3">
                    <Button
                        variant="solid"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleAddBlankRow}
                    >
                        Add blank row
                    </Button>
                </div>
            )}
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={classNames(
                                                    header.column.getCanSort() &&
                                                        'font-bold select-none point',
                                                    loading &&
                                                        'pointer-events-none'
                                                )}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {renderSafeNode(
                                                    flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )
                                                )}
                                                {/* {header.column.getCanSort() && (
                                                    <Sorter
                                                        sort={header.column.getIsSorted()}
                                                    />
                                                )} */}
                                            </div>
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                {loading && tableData.length === 0 ? (
                    <TableRowSkeleton
                        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                        columns={(finalColumns as Array<T>).length}
                        rows={pagingData.pageSize}
                        avatarInColumns={skeletonAvatarColumns}
                        avatarProps={skeletonAvatarProps}
                    />
                ) : (
                    <TBody>
                        {table
                            .getRowModel()
                            .rows.slice(0, pageSize)
                            .map((row) => {
                                return (
                                    <Tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <Td key={cell.id}>
                                                    {renderSafeNode(
                                                        flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext()
                                                        )
                                                    )}
                                                </Td>
                                            )
                                        })}
                                    </Tr>
                                )
                            })}
                    </TBody>
                )}
            </Table>
            {!disablePagination && (
                <div className="flex items-center justify-between mt-4">
                    <Pagination
                        pageSize={pageSize}
                        currentPage={pageIndex}
                        total={total}
                        onChange={handlePaginationChange}
                    />
                    <div style={{ minWidth: 130 }}>
                        <Select
                            size="sm"
                            menuPlacement="top"
                            isSearchable={false}
                            value={pageSizeOption.filter(
                                (option) => option.value === pageSize
                            )}
                            options={pageSizeOption}
                            onChange={(option) =>
                                handleSelectChange(option?.value)
                            }
                        />
                    </div>
                </div>
            )}
        </Loading>
    )
}

const DataTable = forwardRef(_DataTable) as <T>(
    props: DataTableProps<T> & {
        ref?: ForwardedRef<DataTableResetHandle>
    }
) => ReturnType<typeof _DataTable>

export type { ColumnDef, Row, CellContext, DataTableTheme }
export default DataTable

// export type OnSortParam = { order: 'asc' | 'desc' | ''; key: string | number }

// type DataTableProps<T> = {
//     columns: ColumnDef<T>[]
//     data?: T[]
//     loading?: boolean
//     onCheckBoxChange?: (checked: boolean, row: T) => void
//     onIndeterminateCheckBoxChange?: (checked: boolean, rows: Row<T>[]) => void
//     onPaginationChange?: (page: number) => void
//     onSelectChange?: (num: number) => void
//     onSort?: (sort: OnSortParam) => void
//     pageSizes?: number[]
//     selectable?: boolean
//     skeletonAvatarColumns?: number[]
//     skeletonAvatarProps?: SkeletonProps
//     pagingData?: {
//         total: number
//         pageIndex: number
//         pageSize: number
//     }
//     disablePagination?: boolean
//     onRowUpdate?: (delta: Partial<T> & { id: any }) => Promise<void>
//     editable?: boolean
//     allowAddRow?: boolean
//     // Theming props
//     theme?: Partial<DataTableTheme>
//     className?: string
//     tableClassName?: string
//     // Component override props for external projects
//     components?: {
//         Table?: typeof Table
//         Button?: typeof Button
//         Input?: typeof Input
//         Select?: typeof Select
//         Pagination?: typeof Pagination
//         Checkbox?: typeof Checkbox
//         Loading?: typeof Loading
//     }
// }

// function EditableCell<T>({
//     ctx,
//     editing,
//     setEditing,
//     InputComponent = Input,
// }: {
//     ctx: CellContext<T, unknown>
//     editing: { rowIndex: number; values: Partial<T> } | null
//     setEditing: React.Dispatch<
//         React.SetStateAction<{ rowIndex: number; values: Partial<T> } | null>
//     >
//     InputComponent?: typeof Input
// }) {
//     const inputRef = useRef<HTMLInputElement>(null)
//     const {
//         row: { index },
//         column,
//         getValue,
//     } = ctx
//     const isEditing = editing?.rowIndex === index
//     const canEdit = !!(column.columnDef.meta as DataTableColumnMeta)?.editable

//     const rowData = ctx.row.original as any
//     const isRowEditable = rowData?.editable !== false

//     const isCellEditable = canEdit && isRowEditable

//     const [localValue, setLocalValue] = useState<string>(
//         editing ? String((editing.values as any)[column.id] ?? '') : ''
//     )

//     useEffect(() => {
//         if (isEditing) {
//             setLocalValue(
//                 String((editing.values as any)[column.id] ?? getValue() ?? '')
//             )
//         } else {
//             setLocalValue('')
//         }
//     }, [isEditing, column.id, getValue, editing])

//     useCallback(() => {
//         if (isEditing && inputRef.current) {
//             inputRef.current.focus()
//             inputRef.current.select()
//         }
//     }, [isEditing])

//     if (!isEditing || !isCellEditable) {
//         return (
//             <span className="block truncate max-w-xs" title={String(getValue() ?? '')}>
//                 {String(getValue() ?? '')}
//             </span>
//         )
//     }

//     return (
//         <InputComponent
//             ref={inputRef}
//             value={localValue}
//             className="w-full min-w-0 border-2 border-blue-400 focus:border-blue-600"
//             onChange={(e) => setLocalValue(e.target.value)}
//             onBlur={() => {
//                 if (isEditing) {
//                     setEditing((prev) =>
//                         prev && prev.rowIndex === index
//                             ? {
//                                   rowIndex: index,
//                                   values: {
//                                       ...prev.values,
//                                       [column.id]: localValue,
//                                   },
//                               }
//                             : prev
//                     )
//                 }
//             }}
//             onKeyDown={(e) => {
//                 if (e.key === 'Escape') {
//                     setEditing(null)
//                 }
//                 if (e.key === 'Enter') {
//                     e.currentTarget.blur()
//                 }
//                 e.stopPropagation()
//             }}
//         />
//     )
// }

// type CheckBoxChangeEvent = ChangeEvent<HTMLInputElement>
// type DataTableColumnMeta = {
//     editable?: boolean
// }

// interface IndeterminateCheckboxProps extends Omit<CheckboxProps, 'onChange'> {
//     onChange: (event: CheckBoxChangeEvent) => void
//     indeterminate: boolean
//     onCheckBoxChange?: (event: CheckBoxChangeEvent) => void
//     onIndeterminateCheckBoxChange?: (event: CheckBoxChangeEvent) => void
// }

// const IndeterminateCheckbox = (props: IndeterminateCheckboxProps & { CheckboxComponent?: typeof Checkbox }) => {
//     const {
//         indeterminate,
//         onChange,
//         onCheckBoxChange,
//         onIndeterminateCheckBoxChange,
//         CheckboxComponent = Checkbox,
//         ...rest
//     } = props

//     const ref = useRef<HTMLInputElement>(null)

//     useEffect(() => {
//         if (typeof indeterminate === 'boolean' && ref.current) {
//             ref.current.indeterminate = !rest.checked && indeterminate
//         }
//     }, [ref, indeterminate, rest.checked])

//     const handleChange = (e: CheckBoxChangeEvent) => {
//         onChange(e)
//         onCheckBoxChange?.(e)
//         onIndeterminateCheckBoxChange?.(e)
//     }

//     return (
//         <CheckboxComponent
//             ref={ref}
//             className="mb-0"
//             onChange={(_, e) => handleChange(e)}
//             {...rest}
//         />
//     )
// }

// export type DataTableResetHandle = {
//     resetSorting: () => void
//     resetSelected: () => void
//     cancelEdit: () => void
// }

// type WithId = { id: any }

// function _DataTable<T extends WithId>(
//     props: DataTableProps<T>,
//     ref: ForwardedRef<DataTableResetHandle>
// ) {
//     const {
//         skeletonAvatarColumns,
//         columns: columnsProp = [],
//         data = [],
//         loading = false,
//         onCheckBoxChange,
//         onIndeterminateCheckBoxChange,
//         onPaginationChange,
//         onSelectChange,
//         onSort,
//         pageSizes = [10, 25, 50, 100],
//         selectable = false,
//         skeletonAvatarProps,
//         pagingData = {
//             total: 0,
//             pageIndex: 1,
//             pageSize: 10,
//         },
//         onRowUpdate,
//         editable = false,
//         allowAddRow = false,
//         theme: customTheme,
//         className = '',
//         tableClassName = '',
//         components = {},
//         disablePagination = false,
//     } = props

//     // Merge themes
//     const theme = mergeThemes(customTheme)

//     // Component overrides for external projects
//     const {
//         Table: TableComponent = Table,
//         Button: ButtonComponent = Button,
//         Input: InputComponent = Input,
//         Select: SelectComponent = Select,
//         Pagination: PaginationComponent = Pagination,
//         Checkbox: CheckboxComponent = Checkbox,
//         Loading: LoadingComponent = Loading,
//     } = components

//     const { Tr: TrComponent, Th: ThComponent, Td: TdComponent, THead: THeadComponent, TBody: TBodyComponent } = TableComponent

//     const [tableData, setTableData] = useState<T[]>(data)
//     useEffect(() => {
//         setTableData(data)
//     }, [data])

//     const { pageSize, pageIndex, total } = pagingData
//     const [sorting, setSorting] = useState<ColumnSort[] | null>(null)

//     const pageSizeOption = useMemo(
//         () =>
//             pageSizes.map((number) => ({
//                 value: number,
//                 label: `${number} / page`,
//             })),
//         [pageSizes]
//     )

//     const handleCheckBoxChange = (checked: boolean, row: T) => {
//         if (!loading) {
//             onCheckBoxChange?.(checked, row)
//         }
//     }

//     const handleIndeterminateCheckBoxChange = (
//         checked: boolean,
//         rows: Row<T>[]
//     ) => {
//         if (!loading) {
//             onIndeterminateCheckBoxChange?.(checked, rows)
//         }
//     }

//     const handlePaginationChange = (page: number) => {
//         if (!loading) {
//             onPaginationChange?.(page)
//         }
//     }

//     const handleSelectChange = (value?: number) => {
//         if (!loading) {
//             onSelectChange?.(Number(value))
//         }
//     }

//     useEffect(() => {
//         if (Array.isArray(sorting)) {
//             const sortOrder =
//                 sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : ''
//             const id = sorting.length > 0 ? sorting[0].id : ''
//             onSort?.({ order: sortOrder, key: id })
//         }
//     }, [sorting, onSort])

//     const [editing, setEditing] = useState<{
//         rowIndex: number
//         values: Partial<T>
//     } | null>(null)

//     const startEditRow = (rowIndex: number) => {
//         const rowData = tableData[rowIndex] as any
//         const isRowEditable = rowData?.editable !== false

//         if (isRowEditable) {
//             setEditing({
//                 rowIndex,
//                 values: { ...(tableData[rowIndex] as any) },
//             })
//         }
//     }

//     const cancelEdit = () => setEditing(null)

//     const saveEdit = async () => {
//         if (!editing) return
//         const { rowIndex, values } = editing
//         const orig = tableData[rowIndex]!

//         const changed = Object.entries(values)
//             .filter(([k, v]) => (orig as any)[k] !== v)
//             .reduce(
//                 (a, [k, v]) => ({ ...a, [k]: v }),
//                 {} as Record<string, any>
//             )

//         const delta = { id: (orig as any).id, ...changed }

//         try {
//             await onRowUpdate?.(delta as any)
//             setTableData((old) =>
//                 old.map((r, i) =>
//                     i === rowIndex ? ({ ...r, ...changed } as T) : r
//                 )
//             )
//             cancelEdit()
//         } catch (error) {
//             console.error('Failed to save row:', error)
//         }
//     }

//     const handleAddBlankRow = useCallback(() => {
//         const maxId = tableData.reduce((m, r) => {
//             const n = Number((r as any).id)
//             return Number.isFinite(n) ? Math.max(m, n) : m
//         }, 0)
//         const nextId = maxId + 1

//         const keys = columnsProp
//             .map((c) => (c as any).id ?? (c as any).accessorKey)
//             .filter(Boolean)
//             .filter((k) => k !== 'select' && k !== 'actions') as Array<
//             string | number
//         >

//         const newRow: Record<string | number, any> = {
//             id: nextId,
//             __local: true,
//             editable: true,
//         }
//         keys.forEach((k) => {
//             newRow[k] = ''
//         })

//         setTableData((prev) => [newRow as T, ...prev])
//         setEditing({ rowIndex: 0, values: newRow as Partial<T> })
//     }, [columnsProp, tableData])

//     const defaultColumn: Partial<ColumnDef<T>> = useMemo(
//         () => ({
//             meta: { editable: false },
//         }),
//         []
//     )

//     const finalColumns = useMemo<ColumnDef<T>[]>(() => {
//         const cols: ColumnDef<T>[] = []

//         if (selectable) {
//             cols.push({
//                 id: 'select',
//                 header: ({ table }) => (
//                     <div className="flex items-center justify-center">
//                         <IndeterminateCheckbox
//                             checked={table.getIsAllRowsSelected()}
//                             indeterminate={table.getIsSomeRowsSelected()}
//                             onChange={table.getToggleAllRowsSelectedHandler()}
//                             onIndeterminateCheckBoxChange={(e) => {
//                                 handleIndeterminateCheckBoxChange(
//                                     e.target.checked,
//                                     table.getRowModel().rows
//                                 )
//                             }}
//                             CheckboxComponent={CheckboxComponent}
//                         />
//                     </div>
//                 ),
//                 cell: ({ row }) => (
//                     <div className="flex items-center justify-center">
//                         <IndeterminateCheckbox
//                             checked={row.getIsSelected()}
//                             disabled={!row.getCanSelect()}
//                             indeterminate={row.getIsSomeSelected()}
//                             onChange={row.getToggleSelectedHandler()}
//                             onCheckBoxChange={(e) =>
//                                 handleCheckBoxChange(e.target.checked, row.original)
//                             }
//                             CheckboxComponent={CheckboxComponent}
//                         />
//                     </div>
//                 ),
//                 size: 50,
//             })
//         }

//         for (const col of columnsProp) {
//             const isEditable = Boolean((col.meta as any)?.editable)

//             if (isEditable) {
//                 cols.push({
//                     ...col,
//                     cell: (ctx) => (
//                         <EditableCell
//                             ctx={ctx}
//                             editing={editing}
//                             setEditing={setEditing}
//                             InputComponent={InputComponent}
//                         />
//                     ),
//                 })
//             } else {
//                 cols.push(col)
//             }
//         }

//         if (editable) {
//             cols.push({
//                 id: 'actions',
//                 header: () => (
//                     <div className="text-center font-semibold">Actions</div>
//                 ),
//                 cell: ({ row: { index, original } }) => {
//                     const rowData = original as any
//                     const isRowEditable = rowData?.editable !== false

//                     if (!isRowEditable) {
//                         return null
//                     }

//                     return editing?.rowIndex === index ? (
//                         <div className="flex gap-1 justify-center">
//                             <ButtonComponent
//                                 size="sm"
//                                 variant="solid"
//                                 className={theme.actions?.saveButton}
//                                 disabled={loading}
//                                 onClick={saveEdit}
//                             >
//                                 Save
//                             </ButtonComponent>
//                             <ButtonComponent
//                                 size="sm"
//                                 variant="solid"
//                                 className={theme.actions?.cancelButton}
//                                 onClick={cancelEdit}
//                             >
//                                 Cancel
//                             </ButtonComponent>
//                         </div>
//                     ) : (
//                         <div className="flex justify-center">
//                             <ButtonComponent
//                                 size="sm"
//                                 variant="solid"
//                                 className={theme.actions?.editButton}
//                                 onClick={() => startEditRow(index)}
//                             >
//                                 Edit
//                             </ButtonComponent>
//                         </div>
//                     )
//                 },
//                 size: 120,
//             })
//         }

//         return cols
//     }, [columnsProp, selectable, editable, editing, loading, theme, ButtonComponent, InputComponent, CheckboxComponent, handleIndeterminateCheckBoxChange, handleCheckBoxChange])

//     const table = useReactTable({
//         getCoreRowModel: getCoreRowModel(),
//         getFilteredRowModel: getFilteredRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         manualPagination: true,
//         manualSorting: true,
//         onSortingChange: (sorter) => {
//             setSorting(sorter as ColumnSort[])
//         },
//         state: {
//             sorting: sorting as ColumnSort[],
//         },
//         defaultColumn,
//         columns: finalColumns,
//         data: tableData,
//     })

//     const resetSorting = () => {
//         table.resetSorting()
//     }

//     const resetSelected = () => {
//         table.toggleAllRowsSelected(false)
//     }

//     useImperativeHandle(ref, () => ({
//         resetSorting,
//         resetSelected,
//         cancelEdit,
//     }))

//     return (
//         <div className={classNames(theme.container, className)}>
//             <LoadingComponent loading={loading && tableData.length !== 0} type="cover">
//                 {allowAddRow && (
//                     <div className={theme.actions?.container}>
//                         <ButtonComponent
//                             variant="solid"
//                             className={theme.actions?.addButton}
//                             onClick={handleAddBlankRow}
//                         >
//                             + Add New Row
//                         </ButtonComponent>
//                     </div>
//                 )}

//                 <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
//                     <div className="overflow-x-auto">
//                         <TableComponent className={classNames(theme.table, tableClassName)}>
//                             <THeadComponent className={theme.header?.container}>
//                                 {table.getHeaderGroups().map((headerGroup) => (
//                                     <TrComponent key={headerGroup.id} className={theme.header?.row}>
//                                         {headerGroup.headers.map((header) => {
//                                             return (
//                                                 <ThComponent
//                                                     key={header.id}
//                                                     colSpan={header.colSpan}
//                                                     className={theme.header?.cell}
//                                                 >
//                                                     {header.isPlaceholder ? null : (
//                                                         <div
//                                                             className={classNames(
//                                                                 'flex items-center gap-2',
//                                                                 header.column.getCanSort() &&
//                                                                     theme.header?.sortable,
//                                                                 loading &&
//                                                                     'pointer-events-none opacity-50'
//                                                             )}
//                                                             onClick={header.column.getToggleSortingHandler()}
//                                                         >
//                                                             {renderSafeNode(
//                                                                 flexRender(
//                                                                     header.column.columnDef.header,
//                                                                     header.getContext()
//                                                                 )
//                                                             )}
//                                                             {/* {header.column.getCanSort() && (
//                                                                 <Sorter
//                                                                     sort={header.column.getIsSorted()}
//                                                                     theme={theme}
//                                                                 />
//                                                             )} */}
//                                                         </div>
//                                                     )}
//                                                 </ThComponent>
//                                             )
//                                         })}
//                                     </TrComponent>
//                                 ))}
//                             </THeadComponent>
//                             {loading && tableData.length === 0 ? (
//                                 <TableRowSkeleton
//                                     columns={finalColumns.length}
//                                     rows={pagingData.pageSize}
//                                     avatarInColumns={skeletonAvatarColumns}
//                                     avatarProps={skeletonAvatarProps}
//                                 />
//                             ) : (
//                                 <TBodyComponent className={theme.body?.container}>
//                                     {table
//                                         .getRowModel()
//                                         .rows.slice(0, pageSize)
//                                         .map((row, index) => {
//                                             const isEvenRow = index % 2 === 0
//                                             return (
//                                                 <TrComponent
//                                                     key={row.id}
//                                                     className={classNames(
//                                                         theme.body?.row,
//                                                         isEvenRow ? theme.body?.rowEven : theme.body?.rowOdd,
//                                                         editing?.rowIndex === index && theme.body?.rowEditing
//                                                     )}
//                                                 >
//                                                     {row.getVisibleCells().map((cell) => {
//                                                         return (
//                                                             <TdComponent
//                                                                 key={cell.id}
//                                                                 className={theme.body?.cell}
// >
//     {renderSafeNode(
//         flexRender(
//             cell.column.columnDef.cell,
//             cell.getContext()
//         )
//     )}
//                                                             </TdComponent>
//                                                         )
//                                                     })}
//                                                 </TrComponent>
//                                             )
//                                         })}
//                                 </TBodyComponent>
//                             )}
//                         </TableComponent>
//                     </div>
//                 </div>

//                 {!disablePagination && (
//                     <div className={theme.pagination?.container}>
//                         <div className="flex-1">
//                             <PaginationComponent
//                                 pageSize={pageSize}
//                                 currentPage={pageIndex}
//                                 total={total}
//                                 onChange={handlePaginationChange}
//                                 className="justify-center sm:justify-start"
//                             />
//                         </div>
//                         <div className={theme.pagination?.wrapper}>
//                             <span className="text-sm text-gray-700 whitespace-nowrap">
//                                 Rows per page:
//                             </span>
//                             <div style={{ minWidth: 130 }}>
//                                 <SelectComponent
//                                     size="sm"
//                                     menuPlacement="top"
//                                     isSearchable={false}
//                                     value={pageSizeOption.filter(
//                                         (option) => option.value === pageSize
//                                     )}
//                                     options={pageSizeOption}
//                                     onChange={(option) =>
//                                         handleSelectChange(option?.value)
//                                     }
//                                     className="text-sm"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </LoadingComponent>
//         </div>
//     )
// }

// const DataTable = forwardRef(_DataTable) as <T extends WithId>(
//     props: DataTableProps<T> & {
//         ref?: ForwardedRef<DataTableResetHandle>
//     }
// ) => ReturnType<typeof _DataTable>

// export type { ColumnDef, Row, CellContext, DataTableTheme }
// export default DataTable
