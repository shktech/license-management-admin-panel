"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { Create } from "@refinedev/mui";
import { Transaction } from "@/types/types";
import TransactionForm from "@components/Forms/Transactions/TransactionForm";
import Loader from "@components/common/Loader";

const TransactionEdit = () => {
  // const [isLastStep, setIsLastStep] = useState(false);
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    reset,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<Transaction>();

  //   const transaction: Transaction = queryResult?.data?.data as Transaction;

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <Create
      breadcrumb={false}
      headerButtons={<></>}
      saveButtonProps={{ ...saveButtonProps, hidden: false }}
    >
      {formLoading ? (
        <Loader />
      ) : (
        <div className="bg-white px-8 rounded-xl">
          <TransactionForm
            {...{ control, errors, trigger }}
          />
        </div>
      )}
    </Create>
  );
};

export default TransactionEdit;
