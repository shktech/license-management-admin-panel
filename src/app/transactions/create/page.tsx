"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { Create, SaveButton } from "@refinedev/mui";
import { Product, Transaction } from "@/types/types";
import TransactionForm from "@components/Forms/Transactions/TransactionForm";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { useBack, useList } from "@refinedev/core";

const TransactionEdit = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    reset,
    trigger,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Transaction>();

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

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

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
      {formLoading || productDataLoading ? (
        <Loader />
      ) : (
        <div className="bg-white px-8 rounded-xl">
          <TransactionForm isCreate
            {...{ control, errors, trigger }}
          />
        </div>
      )}
    </Create>
  );
};

export default TransactionEdit;