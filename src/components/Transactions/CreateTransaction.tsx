"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { Create, SaveButton } from "@refinedev/mui";
import {
  Asset,
  Customer,
  InputTransaction,
  Product,
  Transaction,
} from "@/types/types";
// import TransactionForm from "@components/Forms/Transactions/TransactionForm";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { useBack, useList, useOne } from "@refinedev/core";
import { getDurationFromString, getInputCustomer } from "@utils/utilFunctions";
import TransactionForm from "@components/Forms/Transactions/TransactionForm";

interface ShowTransactionProps {
  initialInfo: any;
}

const CreateTransaction: React.FC<ShowTransactionProps> = ({ initialInfo }) => {
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    trigger,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<InputTransaction>();
  useEffect(() => {
    if (initialInfo.transaction_action == "New") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split("T")[0];
      const resetTransaction: InputTransaction = {
        // source_reference_date: nowDateString,
        start_date: yesterdayString,
        end_date: yesterdayString,
        transaction_action: initialInfo.transaction_action,
      };
      reset({ ...resetTransaction });
    }
  }, []);

  const { data: productData, isLoading: productLoading } = useList<Product>({
    resource: "products",
    hasPagination: false,
  });

  const { data: assetData, isLoading: assetLoading } = useOne<Asset>({
    resource: "assets",
    id: initialInfo.asset_id,
  });

  const transaction = {
    ship_customer: assetData?.data?.owner,
    ...(assetData?.data as Transaction),
  };

  useEffect(() => {
    if (initialInfo.transaction_action != "New") {
      setValue(
        "osc_part_number",
        assetData?.data.osc_product?.product_part_number
      );
      setValue("transaction_action", initialInfo.transaction_action);
      setValue("license_key", assetData?.data.license_key);
      setValue("license_type", assetData?.data.license_type);
      setValue("start_date", assetData?.data.start_date);
      setValue("end_date", assetData?.data.end_date);
    }
  }, [assetData, assetLoading]);

  const start_date = watch("start_date");
  const osc_part_number = watch("osc_part_number");

  useEffect(() => {
    let duration;
    if (productData?.data) {
      duration = productData.data.find(
        (p) => p.product_part_number == osc_part_number
      )?.duration;
    }
    if (start_date) {
      const originalDate = new Date(start_date);
      originalDate.setFullYear(
        originalDate.getFullYear() + getDurationFromString(duration as string)
      );
      if (duration != "EA" && osc_part_number) {
        originalDate.setDate(originalDate.getDate() - 1);
      }

      const end_date = originalDate.toISOString().split("T")[0];
      setValue("end_date", end_date);
    }
  }, [start_date, osc_part_number]);

  return (
    <Create
      goBack={
        <button
          onClick={useBack()}
          className="inline-block mx-2 p-2 rounded-xl border duration-500 border-transparent hover:border-black"
        >
          {" "}
          <ArrowIcon />
        </button>
      }
      breadcrumb={false}
      headerButtons={<></>}
      title={
        <div className="!font-satoshi text-2xl font-semibold text-[#1f325c] flex items-center">
          Create Transaction
        </div>
      }
      wrapperProps={{
        className: "rounded-none bg-[#f2f6fa] shadow-none",
      }}
      saveButtonProps={{ ...saveButtonProps, hidden: false }}
      footerButtons={({ saveButtonProps }) => (
        <SaveButton {...saveButtonProps} sx={sendEmailBtnStyle} />
      )}
    >
      {formLoading ||
      productLoading ||
      (initialInfo.transaction_action != "New" && assetLoading) ? (
        <Loader />
      ) : (
        <div className="rounded-xl">
          <TransactionForm
            {...{ control, errors, trigger }}
            transaction_action={initialInfo.transaction_action}
            setValue={setValue}
            reset={reset}
            watch={watch}
            transaction={transaction}
            // customers={{
            //     bill_customers: billCustomer,
            //     ship_customers: shipCustomer,
            //     resellers: reseller
            // }}
          />
        </div>
      )}
    </Create>
  );
};

export default CreateTransaction;
