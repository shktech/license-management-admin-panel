"use client"
import SearchInput from '@components/Input/SearchInput';
import { tableAddButton } from '@data/MuiStyles';
import { Button } from '@mui/material';
import {
    MRT_TableContainer,
    MRT_TablePagination,
    MRT_ToolbarAlertBanner,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_RowData,
} from 'material-react-table';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';

interface CommonTableProps<T extends MRT_RowData> {
    title?: React.ReactNode;
    data?: T[];
    columns: MRT_ColumnDef<T>[];
    handleCreate: () => void
    addText?: string;
    canCreate?: boolean;
}

const CommonTable = <T extends MRT_RowData>({ title, data, columns, handleCreate, addText, canCreate }: CommonTableProps<T>) => {
    const table = useMaterialReactTable({
        columns: columns,
        data: data || [],
        enableColumnActions: false,
        enableColumnPinning: true,
        muiTableBodyRowProps: ({ row }) => ({
            className: `bg-[#f2f6fa]`,
        }),
        muiTableHeadRowProps: {
            sx: {
                backgroundColor: 'transparent',
            }
        },
        muiTableBodyCellProps: ({ cell }) => ({
            sx: {
                padding: cell.column.getIndex() === 0 ? '1rem 1rem 1rem 3rem' : '', // Set padding for the first column
                backgroundColor: cell.column.id == "actions" ? '#0080ff' : 'inherit'
            }
        }),
        muiTableHeadCellProps: ({ column }) => ({
            sx: {
                padding: column.getIndex() === 0 ? '1rem 1rem 1rem 3rem' : '',
                backgroundColor: column.id == "actions" ? '#0080ff' : 'inherit',
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
    });

    return (
        <div className='scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'>
            <div className='flex justify-between px-12 py-4 gap-2'>
                <div className="text-xl text-xl font-semibold text-black">{title}</div>
                <div className='flex gap-2'>
                    <SearchInput />
                    {canCreate && <Button onClick={handleCreate} variant="contained" sx={tableAddButton}><AddIcon /> {addText ?? "Add"}</Button>}
                </div>
            </div>
            <MRT_TableContainer table={table} />
            <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
            <div className='flex justify-end'>
                <MRT_TablePagination table={table} />
            </div>
        </div>
    );
};

export default CommonTable;
