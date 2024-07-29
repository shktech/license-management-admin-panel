"use client"
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_RowData,
} from 'material-react-table';
import React from 'react';

interface GenericTableProps<T extends MRT_RowData> {
    title?: React.ReactNode;
    data?: T[];
    columns: MRT_ColumnDef<T>[];
    onRowClick?: (row: T) => void;
}

const GenericTable = <T extends MRT_RowData>({ title, data, columns, onRowClick }: GenericTableProps<T>) => {

    const handleRowClick = (row: T) => {
        if (!!onRowClick) {
            onRowClick(row);
        }
    };

    const enhancedColumns = columns.map((col) => ({
        ...col,
        Cell: ({ cell }: { cell: any }) => {
            const value = cell.getValue();
            return value?.toString();
        },
    }));

    const table = useMaterialReactTable({
        columns: enhancedColumns,
        data: data || [],
        enableColumnPinning: true,
        enableRowActions: false,
        // enableColumnResizing: true,
        initialState: {
            columnPinning: { left: [], right: ['mrt-row-actions'] },
        },
        muiTableBodyRowProps: ({ row }) => ({
            onClick: () => handleRowClick(row.original),
            className: `${!!onRowClick && 'cursor-pointer'} hover:bg-gray-100`,
        }),
        muiTableProps: {
            className: '!font-satoshi',
        },
        muiTableHeadCellProps: {
            className: '!font-satoshi',
        },
        muiTableBodyCellProps: {
            className: '!font-satoshi',
        },
        renderTopToolbarCustomActions: () => (
            <div className="text-xl font-semibold">{title}</div>
        ),
    });

    return <MaterialReactTable table={table} />;
};

export default GenericTable;
