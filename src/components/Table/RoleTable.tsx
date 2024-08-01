"use client"
import { Box, Button, Checkbox, FormControl, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import {
    MRT_TableContainer,
    MRT_TablePagination,
    MRT_ToolbarAlertBanner,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_RowData,
} from 'material-react-table';
import React, { useEffect } from 'react';
import SearchIcon from "@/assets/icons/search.svg?icon";
import { AnyAaaaRecord } from 'dns';

interface RoleTableProps<T extends MRT_RowData> {
    title?: React.ReactNode;
    data?: T[];
    columns: MRT_ColumnDef<T>[];
    handleCreate: () => void
}

const permissions = [1, 2, 3, 4]; //Read, Create, Update, Delete

const checkboxGroupInfo = [
    {
        title: "Users",
        key: "users",
    },
    {
        title: "Assets",
        key: "assets",
    },
    {
        title: "Transactions",
        key: "transactions",
    },
    {
        title: "Products",
        key: "products",
    },
]

const MyCheckbox = ({ checked }: any) => {
    return (
        <div className='text-center flex-1'>
            <Checkbox
                defaultChecked={checked}
                sx={{
                    color: '#4580ff',
                    '&.Mui-checked': {
                        color: '#4580ff',
                    },
                    '& .MuiSvgIcon-root': {
                        fontSize: 20, // Change this to adjust the size
                    },
                }}
            />
        </div>
    )
}
const RoleTable = <T extends MRT_RowData>({ title, data, columns, handleCreate }: RoleTableProps<T>) => {

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
        enableRowSelection: true,
        muiTableBodyRowProps: ({ row }) => ({
            className: `${'hover:bg-[#f6fbff]'} bg-[#f7f9fa]`,
        }),
        muiTableHeadCellProps: () => ({
            className: 'align-middle bg-[#f7f9fa]',
        }),
        muiPaginationProps: {
            color: 'primary',
            shape: 'rounded',
            showRowsPerPage: false,
            variant: 'outlined',
        },
        paginationDisplayMode: 'pages',
        initialState: {
            columnPinning: { left: [], right: ['showHide'] },
        },
    });

    return (
        <div className='scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'>
            <div className='flex justify-between py-4 gap-2'>
                <div className="text-xl font-semibold">{title}</div>
                <div className='flex gap-2'>
                    <FormControl className=''>
                        <TextField
                            size="small"
                            placeholder='Search'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                backgroundColor: '#e6eaed', // Change to your desired color
                                borderRadius: 8, // Optional: Add border-radius for rounded corners,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        border: 'none', // Remove the border
                                    },
                                    '&:hover fieldset': {
                                        border: 'none', // Remove the border on hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        border: 'none', // Remove the border when focused
                                    },
                                },
                            }}
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        onClick={handleCreate}
                        sx={{
                            bgcolor: '#db1a34', // Background color
                            color: 'white', // Text color
                            '&:hover': {
                                bgcolor: '#db1a34', // Background color on hover
                                opacity: 0.9, // Adjust opacity on hover
                                boxShadow: 'none',
                            },
                            px: 4, // Horizontal padding
                            borderRadius: '50px', // Rounded corners
                            boxShadow: 'none',
                            textTransform: 'none',
                            fontWeight: '500',
                            fontSize: '0.75rem',
                        }}
                    >
                        Add New
                    </Button>
                </div>
            </div>
            <MRT_TableContainer
                table={table}
            />
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

export default RoleTable;
