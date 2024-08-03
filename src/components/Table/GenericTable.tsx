"use client"
import { Box, Button } from '@mui/material';
import {
    MRT_ShowHideColumnsButton,
    MRT_TableContainer,
    MRT_TablePagination,
    MRT_ToolbarAlertBanner,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_RowData,
} from 'material-react-table';
import React from 'react';
import SearchInput from '@components/Input/SearchInput';
import { tableAddButton } from '@data/MuiStyles';
import AddIcon from '@mui/icons-material/Add';

interface GenericTableProps<T extends MRT_RowData> {
    title?: React.ReactNode;
    data?: T[];
    columns: MRT_ColumnDef<T>[];
    onRowClick?: (row: T) => void;
    handleCreate?: () => void
}

const GenericTable = <T extends MRT_RowData>({ title, data, columns, onRowClick, handleCreate }: GenericTableProps<T>) => {
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
    const table = useMaterialReactTable({
        columns: enhancedColumns,
        data: data || [],
        enableColumnActions: false,
        enableColumnPinning: true,
        muiTableBodyRowProps: ({ row }) => ({
            onClick: () => handleRowClick(row.original),
            className: `${!!onRowClick && 'cursor-pointer'}`,
        }),
        muiPaginationProps: {
            color: 'primary',
            shape: 'rounded',
            showRowsPerPage: false,
            variant: 'outlined',
        },
        paginationDisplayMode: 'pages'
    });

    return (
        <div className='scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'>
            <div className='flex justify-between py-4 gap-2'>
                <div className="text-xl font-semibold">{title}</div>
                <div className='flex gap-2'>
                    <SearchInput />
                    <Button onClick={handleCreate} variant="contained" sx={tableAddButton}><AddIcon /> Add</Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MRT_ShowHideColumnsButton table={table} />
                    </Box>
                </div>
            </div>
            <MRT_TableContainer table={table} />
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <MRT_TablePagination table={table} />
                </Box>
                <Box sx={{ display: 'grid', width: '100%' }}>
                    <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
                </Box>
            </Box>
        </div>
    );
};

export default GenericTable;
