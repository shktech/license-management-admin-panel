"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { Edit, SaveButton } from "@refinedev/mui";
import { Transaction } from "@/types/types";
import TransactionForm from "@components/Forms/Transactions/TransactionForm";
import Loader from "@components/common/Loader";
import Link from "next/link";
import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { useBack, useList } from "@refinedev/core";
import { modalOkBtnStyle, sendEmailBtnStyle } from "@data/MuiStyles";

const TransactionEdit = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    reset,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Transaction>();

  const transaction: Transaction = queryResult?.data?.data as Transaction;

  const {data: productsData, isLoading: productDataLoading} = useList({
    resource: 'products'
  })
  const product_part_number = watch('osc_product.osc_part_number');

  useEffect(() => {
    const vendor_name = productsData?.data.find((pd: any) => pd.osc_part_number == product_part_number)?.vendor_name;
    const vendor_part_number = productsData?.data.find((pd: any) => pd.osc_part_number == product_part_number)?.vendor_part_number;
    setValue('osc_product.vendor_name', vendor_name);
    setValue('osc_product.vendor_part_number', vendor_part_number);
  }, [product_part_number])

  useEffect(() => {
    if (!formLoading && transaction) {
      reset({ ...transaction });
    }
  }, [formLoading, transaction]);

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <Edit
      goBack={<button onClick={useBack()} className="inline-block mx-2 p-2 rounded-xl border duration-500 border-transparent hover:border-black"> <ArrowIcon /></button>}
      canDelete={false}
      title={
        <div className="!font-satoshi text-2xl font-semibold text-[#536175] flex items-center">
          Edit Transaction {transaction?.transaction_number}
        </div>
      }
      breadcrumb={false}
      headerButtons={<></>}
      wrapperProps={{ className: "pt-6" }}
      saveButtonProps={{ ...saveButtonProps, hidden: false }}
      footerButtons={({ saveButtonProps }) => (
        <SaveButton {...saveButtonProps} sx={sendEmailBtnStyle}/>
      )}
    >
      {formLoading || productDataLoading ? (
        <Loader />
      ) : (
        <div className="bg-white px-8 rounded-xl">
          <TransactionForm
            {...{ control, errors, trigger }}
          />
        </div>
      )}
    </Edit>
  );
};

export default TransactionEdit;