'use client'

import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { Transaction } from '@/types/types';
import { useRouter } from 'next/navigation';

interface TransactionTableProps {
    transactions?: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
    const router = useRouter();

    const columns = useMemo<MRT_ColumnDef<Transaction>[]>(
        () => [
            {
                accessorKey: 'transaction_number',
                header: 'Txn Number',
                size: 50,
            },
            {
                accessorKey: 'transaction_date',
                header: 'Txn Date',
                size: 150,
            },
            {
                accessorKey: 'transaction_source',
                header: 'Txn Source',
                size: 150,
            },
            {
                accessorKey: 'transaction_type',
                header: 'Txn Type',
                size: 150,
            },
            {
                accessorKey: 'transaction_action',
                header: 'Txn Action',
                size: 150,
            },
            {
                accessorKey: 'organization',
                header: 'Organization',
                size: 150,
            },
            {
                accessorKey: 'source_reference_number',
                header: 'Source Ref Number',
                size: 150,
            },
            {
                accessorKey: 'source_reference_date',
                header: 'Source Ref Date',
                size: 150,
            },
            {
                accessorKey: 'transaction_status',
                header: 'Txn Status',
                size: 150,
            },
        ],
        [],
    );

    // const handleMenuItemClick = (transaction: Transaction) => {
    //     router.push(`/transactions/edit/${transaction.id}`)
    // };

    const handleRowClick = (row: Transaction) => {
        router.push(`/transactions/show/${row.id}`);
    };

    const table = useMaterialReactTable({
        columns,
        data: transactions || [],
        enableColumnPinning: true,
        enableRowActions: false,
        enableColumnResizing: true,
        // renderRowActionMenuItems: ({ row }) => [
        //     <MenuItem key="detail" onClick={() => handleMenuItemClick(row.original)}>
        //         Edit
        //     </MenuItem>,
        // ],
        initialState: {
            columnPinning: { left: [], right: ['mrt-row-actions'] },
        },
        muiTableBodyRowProps: ({ row }) => ({
            onClick: () => handleRowClick(row.original),
            className: 'cursor-pointer hover:bg-gray-100'
        }),
        muiTableProps: {
            className: '!font-satoshi',
        },
        muiTableHeadCellProps: {
            className: '!font-satoshi'
        },
        muiTableBodyCellProps: {
            className: '!font-satoshi',
        },
    });

    return <MaterialReactTable table={table} />;
};

export default TransactionTable;
