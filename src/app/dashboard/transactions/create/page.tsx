"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { Create, SaveButton } from "@refinedev/mui";
import { InputTransaction, Product } from "@/types/types";
import TransactionForm from "@components/Forms/Transactions/TransactionForm";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { useBack, useList } from "@refinedev/core";
import { getDurationFromString } from "@utils/utilFunctions";

const TransactionEdit = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    trigger,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InputTransaction>();

  useEffect(() => {
    const nowDateString = (new Date()).toISOString().split('T')[0];
    const resetTransaction: InputTransaction = {
      source_reference_date: nowDateString,
      start_date: nowDateString,
      end_date: nowDateString,
      transaction_action: 'New'
    };
    reset({ ...resetTransaction });
  }, []);

  const [newAction, setNewAction] = useState(true);

  const { data: productData, refetch, isLoading: productLoading } = useList<Product>({
    resource: "products",
    hasPagination: false
  });

  const start_date = watch('start_date');
  const osc_part_number = watch('osc_part_number');
  const transaction_action = watch('transaction_action');

  useEffect(() => {
    setNewAction(transaction_action == "New");
  }, [transaction_action])

  useEffect(() => {
    let duration;
    if (productData?.data) {
      duration = productData.data.find(p => p.product_part_number == osc_part_number)?.duration;
    }
    if (start_date) {
      const originalDate = new Date(start_date);
      originalDate.setMonth(originalDate.getMonth() + getDurationFromString(duration as string));
      const end_date = originalDate.toISOString().split('T')[0];
      setValue('end_date', end_date);
    }
  }, [start_date, osc_part_number])

  return (
    <Create
      goBack={<button onClick={useBack()} className="inline-block mx-2 p-2 rounded-xl border duration-500 border-transparent hover:border-black"> <ArrowIcon /></button>}
      breadcrumb={false}
      headerButtons={<></>}
      title={
        <div className="!font-satoshi text-2xl font-semibold text-[#536175] flex items-center">
          Create Transaction
        </div>
      }
      saveButtonProps={{ ...saveButtonProps, hidden: false }}
      footerButtons={({ saveButtonProps }) => (
        <SaveButton {...saveButtonProps} sx={sendEmailBtnStyle} />
      )}
    >
      {formLoading || productLoading ? (
        <Loader />
      ) : (
        <div className="bg-white px-8 rounded-xl">
          <TransactionForm {...{ control, errors, trigger }} newAction={newAction} />
        </div>
      )}
    </Create>
  );
};

export default TransactionEdit;