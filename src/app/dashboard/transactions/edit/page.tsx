"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { Product, Transaction } from "@/types/types";
import TransactionForm from "@components/Forms/Transactions/TransactionForm";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import {
  useBack,
  useList,
  useNavigation,
  useParsed,
  useUpdate,
} from "@refinedev/core";
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
    getValues,
    setError,
    formState: { errors },
  } = useForm<Transaction>({
    mode: "onChange",
    reValidateMode: "onSubmit",
    refineCoreProps: {
      action: "edit",
      resource: "transactions",
      id: params?.id,
    },
  });

  const {
    data: productData,
    refetch,
    isLoading: productLoading,
  } = useList<Product>({
    resource: "products",
    hasPagination: false,
  });

  const transaction: Transaction = queryResult?.data?.data as Transaction;

  const { mutate: updateCode } = useUpdate();
  const { push } = useNavigation();
  const handleSubmit = async () => {
    const payload = getValues();
    const isValid = await trigger(); // Triggers validation for all fields
    if (payload.transaction_source == "Prod Reg") {
      if (!payload.source_reference_number) {
        setError("source_reference_number", {
          type: "manual",
          message: "This field is required",
        });
        return;
      }
    }
    if (isValid) {
      updateCode(
        {
          resource: `transactions`,
          values: payload,
          id: params?.id,
        },
        {
          onError: (error) => console.log("error", error),
          onSuccess: () =>
            push(`/dashboard/transactions/show?id=${params?.id}`),
        }
      );
    }
  };

  useEffect(() => {
    if (!formLoading && transaction) {
      setValue("transaction_source", transaction.transaction_source);
      setValue("transaction_action", transaction.transaction_action);
      setValue(
        "license_type",
        transaction.license_type || transaction.asset?.license_type
      );
      setValue("license_key", transaction.asset?.license_key);
      setValue("source_reference_number", transaction.source_reference_number);
      setValue("source_reference_date", transaction.source_reference_date);
      setValue("source_reference_id", transaction.source_reference_id);
      setValue(
        "osc_part_number",
        transaction.product_part_number ||
          transaction.asset?.osc_product?.product_part_number
      );
      setValue("quantity", transaction.quantity);
      setValue("start_date", transaction.start_date);
      setValue("end_date", transaction.end_date);
    }
  }, [formLoading, transaction]);

  const start_date = watch("start_date");
  const osc_part_number = watch("osc_part_number");
  useEffect(() => {
    let duration = transaction?.asset?.osc_product?.duration;
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
      if (duration != "EA") {
        originalDate.setDate(originalDate.getDate() - 1);
      }
      const end_date = originalDate.toISOString().split("T")[0];
      setValue("end_date", end_date);
    }
  }, [start_date, osc_part_number]);

  return (
    <div className="flex justify-center py-6">
      <div className="w-2/3">
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
            <div className="!font-satoshi text-2xl font-semibold text-[#1f325c] flex items-center">
              Edit Transaction
            </div>
          }
          breadcrumb={false}
          headerButtons={<div></div>}
          wrapperProps={{
            className: "rounded-none bg-[#f2f6fa] shadow-none",
          }}
          saveButtonProps={{ ...saveButtonProps, hidden: false }}
          footerButtons={({ saveButtonProps }) => (
            <SaveButton onClick={handleSubmit} sx={sendEmailBtnStyle} />
          )}
        >
          {formLoading || productLoading ? (
            <Loader />
          ) : (
            <TransactionForm
              {...{ control, errors, trigger }}
              transaction_action="Edit"
              transaction={transaction}
              setValue={setValue}
              watch={watch}
            />
          )}
        </Edit>
      </div>
    </div>
  );
};

export default TransactionEdit;
