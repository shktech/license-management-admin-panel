'use client'

import { Transaction } from '@/types/types';
import GenericTable from '@components/Table/GenericTable';
import { TxtActionColor, TxtStatusColor } from '@data/ColorData';
import { tagStyle } from '@data/MuiStyles';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box } from '@mui/material';
import {
    type MRT_ColumnDef
} from 'material-react-table';
import { useMemo, useState } from 'react';
import TransactionDetailDrawer from './TransactionDetailDrawer';

interface TransactionHistoryTableProps {
    transactions?: Transaction[];
}

const TransactionHistoryTable: React.FC<TransactionHistoryTableProps> = ({ transactions }) => {

    const [openDrawer, setOpenDrawer] = useState(false);
    const [clickedTransaction, setClickedTransaction] = useState<string | null>(null);
    const handleShowClick = (row: Transaction) => {
        setClickedTransaction(row.transaction_id);
        setOpenDrawer(true);
    };
    const handleClose = () => {
        setOpenDrawer(false);
    }
    const columns = useMemo<MRT_ColumnDef<Transaction>[]>(
        () => [
            {
                accessorKey: 'transaction_id',
                header: 'Transaction ID',
                size: 150,
            },
            {
                accessorKey: 'transaction_date',
                header: 'Txn Date',
                size: 100,
            },

            {
                accessorKey: 'transaction_status',
                header: 'Txn Status',
                size: 150,
                Cell: ({ renderedCellValue }) => (
                    <Box component="span" sx={(theme) => ({ backgroundColor: TxtStatusColor[renderedCellValue as string], ...tagStyle })} >
                        {renderedCellValue}
                    </Box>
                ),
            },
            {
                accessorKey: 'transaction_action',
                header: 'Txn Action',
                size: 100,
                Cell: ({ renderedCellValue }) => (
                    <Box component="span" sx={{ backgroundColor: TxtActionColor[renderedCellValue as string], ...tagStyle }} >
                        {renderedCellValue}
                    </Box>
                ),
            },
            {
                accessorKey: "actions",
                header: "Action",
                size: 50,
                enableSorting: false,
                pin: 'right',
                Cell: ({ row }) => (
                    <div className="w-full h-full">
                        <RemoveRedEyeIcon onClick={() => handleShowClick(row.original)} fontSize='small' className="text-[#818f99] hover:text-black cursor-pointer" />
                    </div>
                ),
            },
        ],
        [],
    );

    return (
        <>
            <GenericTable
                data={transactions}
                title="Transaction History"
                columns={columns}
            />
            <TransactionDetailDrawer
                open={openDrawer}
                onClose={() => handleClose()}
                transaction_id={clickedTransaction}
            />
        </>
    )
};

export default TransactionHistoryTable;
