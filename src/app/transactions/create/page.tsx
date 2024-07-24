"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { Create } from "@refinedev/mui";
import { Transaction } from "@/types/types";
import TransactionForm from "@components/Forms/Transactions/TransactionForm";
import Loader from "@components/common/Loader";

const TransactionEdit = () => {
  const [isLastStep, setIsLastStep] = useState(false);
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Transaction>();

//   const transaction: Transaction = queryResult?.data?.data as Transaction;

//   useEffect(() => {
//     if (!formLoading && transaction) {
//       reset({ ...transaction });
//     }
//   }, [formLoading, transaction]);

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <Create
      breadcrumb={false}
      headerButtons={<></>}
      saveButtonProps={{ ...saveButtonProps, hidden: !isLastStep }}
    >
      {formLoading ? (
        <Loader />
      ) : (
        <div className="bg-white px-8 rounded-xl">
          <TransactionForm
            {...{ control, errors, trigger }}
            onStepChange={(isLast) => setIsLastStep(isLast)}
          />
        </div>
      )}
    </Create>
  );
};

export default TransactionEdit;
