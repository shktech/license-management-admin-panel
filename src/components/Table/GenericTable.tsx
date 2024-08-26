"use client"
import { Box, Button, Pagination } from '@mui/material';
import {
    MRT_ShowHideColumnsButton,
    MRT_SortingState,
    MRT_TableContainer,
    MRT_ToolbarAlertBanner,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_RowData,
} from 'material-react-table';
import React, { useEffect, useState } from 'react';
import SearchInput from '@components/Input/SearchInput';
import { tableAddButton } from '@data/MuiStyles';
import AddIcon from '@mui/icons-material/Add';


interface GenericTableProps<T extends MRT_RowData> {
    title?: React.ReactNode;
    data?: T[];
    totalCount?: number,
    columns: MRT_ColumnDef<T>[];
    onRowClick?: (row: T) => void;
    handleCreate?: () => void;
    handlePage?: (value: number) => void;
    handleSearch?: (value: string) => void;
    handleSorting?: (value: MRT_SortingState) => void,
    canCreate?: boolean;
    canDelete?: boolean;
    canEdit?: boolean;
    noCreateNeed?: boolean;
    noSearchNeed?: boolean;
    maxWidth?: string | number;
    minWidth?: string | number;

}

const GenericTable = <T extends MRT_RowData>({ title, data, columns, totalCount, noCreateNeed, noSearchNeed, onRowClick, handleCreate, handleSearch, handlePage, handleSorting, canCreate, maxWidth, minWidth,
}: GenericTableProps<T>) => {
    const handleRowClick = (row: T) => {
        if (!!onRowClick) {
            onRowClick(row);
        }
    };

    const enhancedColumns = columns.map((col) => {
        if (col.Cell) return col;
        return ({
            ...col,
            Cell: ({ cell }: { cell: any }) => {
                const value = cell.getValue();
                return value?.toString();
            },
        })
    });

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        if (handlePage) {
            handlePage(value);
        }
    };

    const [sorting, setSorting] = useState<MRT_SortingState>([]);

    const handleSortingChange = (newSorting: any) => {
        setSorting(newSorting);
        handleSorting?.(sorting);
    }

    const table = useMaterialReactTable({
        columns: enhancedColumns,
        data: data || [],
        enableColumnActions: false,
        enableColumnPinning: true,
        onSortingChange: handleSortingChange,
        manualSorting: true,
        muiTableBodyRowProps: ({ row }) => ({
            onClick: () => handleRowClick(row.original),
            className: `${!!onRowClick && 'cursor-pointer'} bg-transparent`,
        }),
        muiTableHeadRowProps: {
            sx: {
                backgroundColor: 'transparent',
            }
        },
        muiTableBodyCellProps: ({ cell }) => ({
            sx: {
                padding: cell.column.getIndex() === 0 ? '1rem 1rem 1rem 3rem' : '', // Set padding for the first column
                // backgroundColor: cell.column.id == "actions" ? '#0080ff' : 'inherit'
            }
        }),
        muiTableHeadCellProps: ({ column }) => ({
            sx: {
                padding: column.getIndex() === 0 ? '1rem 1rem 1rem 3rem' : '',
                // backgroundColor: column.id == "actions" ? '#0080ff' : 'inherit',
                verticalAlign: 'middle'
            }
        }),
        muiPaginationProps: {
            color: 'primary',
            shape: 'rounded',
            showRowsPerPage: false,
            variant: 'outlined',
        },
        paginationDisplayMode: 'pages',
        initialState: {
            columnPinning: {
                left: [],
                right: ['actions'],
            },
        },
        state: {
            sorting
        }
    });

    return (
        <div className='scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'>
            <div className='flex justify-between px-12 py-4 gap-2'>
                <div className="text-xl font-semibold">{title}</div>
                <div className='flex gap-2'>

                    {!noSearchNeed && <SearchInput handleChange={handleSearch} />}
                    {!noCreateNeed && canCreate && <Button onClick={handleCreate} variant="contained" sx={tableAddButton}><AddIcon /> Add</Button>}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MRT_ShowHideColumnsButton table={table} />
                    </Box>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <div style={{ maxWidth, minWidth, width: '100%' }}>
                    <MRT_TableContainer table={table} />
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {
                                totalCount ?
                                    <div className='p-8'>
                                        <Pagination
                                            onChange={handlePageChange}
                                            count={Math.floor(totalCount / 10) + 1}
                                            color="primary"
                                            shape='rounded'
                                        />
                                    </div> :
                                    // <MRT_TablePagination table={table} />
                                    null
                            }
                        </Box>
                        <Box sx={{ display: 'grid', width: '100%' }}>
                            <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
                        </Box>
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default GenericTable;