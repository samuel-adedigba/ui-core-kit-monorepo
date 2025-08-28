import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import dayjs from 'dayjs'
import {
    Loading,
    type ColumnDef,
    DataTable,
    type DataTableResetHandle,
    DataTableTheme,
} from 'ui-core-kit'
import axios from 'axios'
// import NoData from '../NoData/NoData'
// import { Loading } from '../shared'
// import { Notification } from '../ui'

// User Type
export interface User {
    id: number
    firstName: string
    lastName: string
    gender: 'male' | 'female'
    email: string
    phone: string
    username: string
    birthDate: string // ISO date string
    bloodGroup: string
    university: string
    userAgent: string
    role: 'admin' | 'moderator' | 'user'
}

// API Response Type
export interface UsersApiResponse {
    users: User[]
    total: number
    skip: number
    limit: number
}
type Props = {
    searchTerm: string
    data: User[]
    totalCount: number
    loading: boolean
    onPageChange?: (pageIndex: number) => void
    onPageSizeChange?: (pageSize: number) => void
}

const UsersDataTable = ({
    searchTerm,
    data,
    totalCount,
    loading,
    onPageChange,
    onPageSizeChange,
}: Props) => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const [pageIndex, setPageIndex] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    // const dispatch = useAppDispatch()

    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        if (!searchTerm) setPageIndex(1)
    }, [searchTerm])

    async function handleRowUpdate(
        delta: Partial<User> & { id: any }
    ): Promise<void> {
        const { id, ...fields } = delta
        const updatedCustomerData = Object.fromEntries(
            Object.entries(fields).filter(([, v]) => v != null)
        ) 

        if (Object.keys(updatedCustomerData).length === 0) {
            const message = 'Please fill all fields before saving.'
            setErrorMessage(message)
            setTimeout(() => setErrorMessage(null), 5000)
            throw new Error(message)
        }
        try {
            await updateUser({
                id,
                ...updatedCustomerData,
            })
            setSuccessMessage('Row updated successfully!')
            setTimeout(() => setSuccessMessage(null), 3000)
        } catch (err: any) {
            setErrorMessage(
                err?.message ?? 'Oops — something went wrong updating this row.'
            )
            setTimeout(() => setErrorMessage(null), 5000)
            throw err
        }
    }
    const updateUser = async (userData: Partial<User> & { id: number }): Promise<User | null> => {
        const { id, ...updateData } = userData
        try {
            const response = await axios.put<User>(
                `https://dummyjson.com/users/${id}`,
                updateData
            )

            // Optional: Check if response is valid
            if (response.status === 200 && response.data) {
                console.log(
                    '✅ User updated successfully:',
                    response.data
                )
                return response.data
            } else {
                console.warn('⚠️ Unexpected response:', response)
                return null
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('❌ Axios Error:', error.message)
            } else {
                console.error('❌ Unexpected Error:', error)
            }
            return null
        }
    }
    const handlePageIndexChange = (newPageIndex: number) => {
        setPageIndex(newPageIndex)
        if (onPageChange) {
            onPageChange(newPageIndex)
        }
    }

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize)
        setPageIndex(1)
        if (onPageSizeChange) {
            onPageSizeChange(newPageSize)
        }
    }

    // const CustomThemedDataTable = () => {
        const customTheme: Partial<DataTableTheme> = {
            container: 'w-full my-custom-container',
            table: 'min-w-full border-collapse border border-slate-400',
            header: {
                container: 'bg-slate-100',
                cell: 'border border-slate-300 px-4 py-2 text-left font-semibold text-slate-700',
                sortable: 'cursor-pointer hover:bg-slate-200 transition-colors',
                sorting: 'text-blue-500',
            },
            body: {
                container: 'bg-white',
                row: 'hover:bg-slate-50',
                rowEven: 'bg-white',
                rowOdd: 'bg-slate-25',
                rowEditing: 'bg-yellow-50 border-l-4 border-yellow-400',
                cell: 'border border-slate-300 px-4 py-2 text-slate-600',
            },
            actions: {
                addButton:
                    'bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium',
                editButton:
                    'bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 text-sm rounded',
                saveButton:
                    'bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 text-sm rounded',
                cancelButton:
                    'bg-red-500 hover:bg-rose-600 text-white px-3 py-1 text-sm rounded',
            },
        }
//    }
    const columns: ColumnDef<User>[] = useMemo(
        () => [
            {
                header: 'Full Name',
                accessorFn: (row) => `${row.firstName} ${row.lastName}`,
                cell: ({ row }) => (
                    <span>
                        {row.original.firstName} {row.original.lastName}
                    </span>
                ),
            },
            {
                header: 'Email',
                accessorKey: 'email',
                meta: { editable: true },
            },
            {
                header: 'Phone',
                accessorKey: 'phone',
            },
            {
                header: 'Username',
                accessorKey: 'username',
            },
            {
                header: 'Birth Date',
                accessorKey: 'birthDate',
                cell: ({ getValue }) => (
                    <span>
                        {dayjs(getValue() as string).format('ddd DD, MMM YYYY')}
                    </span>
                ),
            },
            {
                header: 'Blood Group',
                accessorKey: 'bloodGroup',
            },
            {
                header: 'University',
                accessorKey: 'university',
            },
            {
                header: 'Role',
                accessorKey: 'role',
            },
        ],
        []
    )
    // Search filter
    const filteredData = useMemo(() => {
        if (!searchTerm) return data
        const lowerSearch = searchTerm.toLowerCase()

        return data.filter((user) =>
            [
                user.firstName,
                user.lastName,
                user.email,
                user.phone,
                user.username,
                user.bloodGroup,
                user.university,
                user.role,
            ]
                .filter(Boolean)
                .some((field) =>
                    field.toString().toLowerCase().includes(lowerSearch)
                )
        )
    }, [searchTerm, data])

    const hasSearchTerm = !!searchTerm
    const currentData = hasSearchTerm ? filteredData : data

    const hasData = filteredData?.length > 0

    return (
        <>
            {loading ? (
                <Loading loading={loading} />
            ) : !hasData ? (
                // <NoData />
                <h1>NO DATA</h1>
            ) : (
                <DataTable<User>
                    ref={tableRef}
                    columns={columns}
                    data={currentData}
                    loading={loading}
                     //theme={customTheme}
                    // components={{
                    //     Button: CustomButton,
                    //     Input: CustomInput,
                    //     // You can override any component used by DataTable
                    // }}
                    pagingData={{
                        total: totalCount ?? 0,
                        pageIndex: pageIndex ?? null,
                        pageSize: pageSize ?? null,
                    }}
                    editable={true}
                    onRowUpdate={handleRowUpdate}
                    onSelectChange={handlePageSizeChange}
                    onPaginationChange={handlePageIndexChange}
                />
            )}
            {/* {successMessage && (
                <Notification
                    closable
                    type="success"
                    duration={3000}
                    style={{
                        position: 'fixed',
                        left: '50%',
                        top: 20,
                        transform: 'translateX(-50%)',
                        zIndex: 1000,
                        backgroundColor: '#194da3',
                        color: '#fff',
                    }}
                >
                    <div className="flex items-center gap-2">
                        <span>{successMessage}</span>
                    </div>
                </Notification>
            )} */}

            {/* {errorMessage && (
                <Notification
                    closable
                    type="warning"
                    duration={5000}
                    style={{
                        position: 'fixed',
                        left: '50%',
                        top: 20,
                        transform: 'translateX(-50%)',
                        zIndex: 1000,
                        backgroundColor: '#c53030',
                        color: '#fff',
                    }}
                >
                    <div className="flex items-center gap-2">
                        <span>{errorMessage}</span>
                    </div>
                </Notification>
            )} */}
        </>
    )
}

export default UsersDataTable
