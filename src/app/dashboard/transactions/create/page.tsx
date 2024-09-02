"use client";

import React from "react";
import CreateTransaction from "@components/Transactions/CreateTransaction";
import { useSearchParams } from "next/navigation";

const TransactionEdit = () => {
  const searchParams = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  return (
    <div className="flex justify-center py-6">
      <div className="w-2/3">
        <CreateTransaction initialInfo={paramsObject} />
      </div>
    </div>
  );
};

export default TransactionEdit;
