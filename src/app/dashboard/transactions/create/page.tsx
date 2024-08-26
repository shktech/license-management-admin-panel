"use client";

import React from "react";
import CreateTransaction from "@components/Transactions/CreateTransaction";
import { useSearchParams } from 'next/navigation';

const TransactionEdit = () => {
  const searchParams = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  return (
    <CreateTransaction initialInfo={paramsObject}/>
  );
};

export default TransactionEdit;