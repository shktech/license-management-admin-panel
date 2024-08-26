import React from 'react';
import { Drawer } from '@mui/material';
import { useOne } from '@refinedev/core';
import { Transaction } from '../../types/types';
import ShowTransaction from '@components/Transactions/Show/ShowTransaction';
import Loader from '@components/common/Loader';


interface TransactionDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  transaction_id: string | null
}

const TransactionDetailDrawer: React.FC<TransactionDetailDrawerProps> = ({ open, onClose, transaction_id }) => {
  const { data, isLoading, error } = useOne({
    resource: "transactions",
    id: transaction_id as string
  });

  const transaction = data?.data as Transaction

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="min-w-[700px] pb-4 flex flex-col min-h-screen">
        <div className="pt-4 px-4 text-lg font-bold text-[#65758c] flex items-center">
          Detail Information
        </div>
        { isLoading ? <Loader /> : <ShowTransaction transaction={transaction}/> }
      </div>
    </Drawer>
  );
};

export default TransactionDetailDrawer;
