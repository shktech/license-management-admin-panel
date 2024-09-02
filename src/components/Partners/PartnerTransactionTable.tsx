'use client'

import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { Transaction } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useTable } from '@refinedev/core';
import GenericTable from '@components/Table/GenericTable';

interface PartnerTransactionTableProps {
    partner_id?: string;
}

const PartnerTransactionTable: React.FC<PartnerTransactionTableProps> = ({ partner_id }) => {
    const {
        tableQueryResult: { data: transactions, isLoading: codeIsLoading, refetch },
        setCurrent,
        setFilters,
        setSorters,
    } = useTable<Transaction>({
        syncWithLocation: false,
        resource: "transactions",
        initialFilter: [
            { field: "partner", operator: "eq", value: partner_id },
        ],
    });

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

    const handleRowClick = (row: Transaction) => {
        router.push(`/dashboard/transactions/show?id=${row.transaction_id}`);
    };

    return (
        <GenericTable
            title="Transactions"
            data={transactions?.data}
            columns={columns}
            onRowClick={handleRowClick}
        />
    );
};

export default PartnerTransactionTable;
