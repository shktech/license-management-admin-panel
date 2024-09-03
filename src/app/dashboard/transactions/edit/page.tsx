"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { InputTransaction, Product, Transaction } from "@/types/types";
import TransactionForm from "@components/Forms/Transactions/TransactionForm";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { useBack, useList, useParsed } from "@refinedev/core";
import { Edit, SaveButton } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { getDurationFromString } from "@utils/utilFunctions";
import { useEffect, useState } from "react";

const TransactionEdit = () => {
  const { params } = useParsed();
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    reset,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Transaction>({
    refineCoreProps: {
      action: "edit",
      resource: "transactions",
      id: params?.id,
    },
  });

  const { data: productData, refetch, isLoading: productLoading } = useList<Product>({
    resource: "products",
    hasPagination: false
  });

  const transaction: Transaction = queryResult?.data?.data as Transaction;

  useEffect(() => {
    if (!formLoading && transaction) {
      const resetTransaction: InputTransaction = {
        transaction_source: transaction.transaction_source,
        transaction_action: transaction.transaction_action,
        license_type: transaction.asset?.license_type,
        source_reference_number: transaction.source_reference_number,
        source_reference_date: transaction.source_reference_date,
        source_reference_id: transaction.source_reference_id,
        osc_part_number: transaction.asset?.osc_product?.product_part_number,
        quantity: transaction.quantity,
        start_date: transaction.start_date,
        end_date: transaction.end_date,
      };
      reset({ ...resetTransaction });
    }
  }, [formLoading, transaction]);


  const start_date = watch('start_date');
  const osc_part_number = watch('osc_part_number');
  useEffect(() => {
    let duration = transaction?.asset?.osc_product?.duration;
    if (productData?.data) {
      duration = productData.data.find(p => p.product_part_number == osc_part_number)?.duration;
    }
    if (start_date) {
      const originalDate = new Date(start_date);
      originalDate.setFullYear(originalDate.getFullYear() + getDurationFromString(duration as string));
      const end_date = originalDate.toISOString().split('T')[0];
      setValue('end_date', end_date);
    }
  }, [start_date, osc_part_number])

  return (
    <Edit
      goBack={
        <button
          onClick={useBack()}
          className="inline-block mx-2 p-2 rounded-xl border duration-500 border-transparent hover:border-black"
        >
          {" "}
          <ArrowIcon />
        </button>
      }
      canDelete={false}
      title={
        <div className="!font-satoshi text-2xl font-semibold text-[#536175] flex items-center">
          Edit Transaction {transaction?.transaction_number}
        </div>
      }
      breadcrumb={false}
      headerButtons={<></>}
      wrapperProps={{
        className: "rounded-none bg-[#f2f6fa] shadow-none pt-6 pb-2.5",
      }}
      saveButtonProps={{ ...saveButtonProps, hidden: false }}
      footerButtons={({ saveButtonProps }) => (
        <SaveButton {...saveButtonProps} sx={sendEmailBtnStyle} />
      )}
    >
      {formLoading || productLoading ? (
        <Loader />
      ) : (
        <div className="px-8">
          <TransactionForm {...{ control, errors, trigger }} transaction={transaction} setValue={setValue} watch={watch} />
        </div>
      )}
    </Edit>
  );
};

export default TransactionEdit;
