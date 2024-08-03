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
}

const CommonTable = <T extends MRT_RowData>({ title, data, columns, handleCreate }: CommonTableProps<T>) => {
    const table = useMaterialReactTable({
        columns: columns,
        data: data || [],
        enableColumnActions: false,
        enableColumnPinning: true,
        enableRowSelection: true,
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
            <div className='flex justify-between py-4 gap-2'>
                <div className="text-xl text-xl font-semibold text-black">{title}</div>
                <div className='flex gap-2'>
                    <SearchInput />
                    <Button onClick={handleCreate} variant="contained" sx={tableAddButton}><AddIcon /> Add</Button>
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
