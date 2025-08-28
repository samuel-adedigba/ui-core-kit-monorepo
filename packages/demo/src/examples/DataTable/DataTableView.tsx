import { useEffect, useState, useCallback } from 'react'
import debounce from 'lodash/debounce'
import UsersDataTable, {
    User,
    UsersApiResponse,
} from './UsersDataTable.examples'
import axios from 'axios'

export const TableExamples = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [pageIndex, setPageIndex] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [data, setData] = useState<User[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [loading, setLoading] = useState(false)

    // Updated fetchUsers to accept params
    const fetchUsers = async ({
        searchTerm = '',
        limit,
        offset,
    }: {
        searchTerm?: string
        limit: number
        offset: number
    }): Promise<UsersApiResponse | null> => {
        try {
            setLoading(true)
            const response = await axios.get<UsersApiResponse>(
                `https://dummyjson.com/users/search?q=${encodeURIComponent(
                    searchTerm
                )}&limit=${limit}&skip=${offset}`
            )

            if (response.status === 200 && response.data) {
                setData(response.data.users)
                setTotalCount(response.data.total)
                console.log(
                    '✅ Users fetched successfully:',
                    response.data.users.length
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
        } finally {
            setLoading(false)
        }
    }

    // Debounced search
    const fetchDurationLog = useCallback(
        debounce((term: string) => {
            fetchUsers({
                searchTerm: term || '',
                limit: term ? 10 : pageSize,
                offset: term ? 0 : (pageIndex - 1) * pageSize,
            })
        }, 500),
        [pageIndex, pageSize]
    )

    // Handle search input changes
    const handleSearchChange = useCallback(
        (term: string) => {
            setSearchTerm(term)
            setPageIndex(1)
            fetchDurationLog(term)
        },
        [fetchDurationLog]
    )

    // Fetch data when page or size changes (only if not searching)
    useEffect(() => {
        if (!searchTerm) {
            fetchUsers({
                limit: pageSize,
                offset: (pageIndex - 1) * pageSize,
            })
        }
    }, [pageIndex, pageSize, searchTerm])

    const handlePageChange = (newPageIndex: number) => {
        setPageIndex(newPageIndex)
    }

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize)
        setPageIndex(1)
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="lg:flex items-center justify-between">
                {/* <h4 className="">User List</h4> */}
            </div>
            <div className="mt-5" />
            {/* Example Search Bar */}
            {/* <AssetTrackingSearchBar
        placeholder="Search..."
        onSearch={handleSearchChange}
      /> */}
            <UsersDataTable
                searchTerm={searchTerm}
                data={data}
                totalCount={totalCount}
                loading={loading}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />
        </div>
    )
}
