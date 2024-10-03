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
import {
  useBack,
  useCreate,
  useList,
  useNavigation,
  useOne,
} from "@refinedev/core";
import { getEndDate, getInputCustomer } from "@utils/utilFunctions";
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
    setError,
    formState: { errors },
  } = useForm<InputTransaction>({
    mode: "onChange",
    reValidateMode: "onSubmit",
  });
  useEffect(() => {
    if (initialInfo.transaction_action == "New") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split("T")[0];

      setValue("start_date", yesterdayString);
      setValue("end_date", yesterdayString);
      setValue("transaction_action", initialInfo.transaction_action);
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
      const end_date = getEndDate(start_date, duration as string);
      setValue("end_date", end_date);
    }
  }, [start_date, osc_part_number]);

  const { mutate: createCode } = useCreate();
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
      createCode(
        {
          resource: `transactions`,
          values: payload,
        },
        {
          onError: (error) => console.log("error", error),
          onSuccess: () => push(`/dashboard/transactions/list`),
        }
      );
    }
  };
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
        <div
          className="!font-satoshi text-2xl font-semibold text-[#1f325c] flex items-center"
          onClick={() => console.log(getValues())}
        >
          Create Transaction
        </div>
      }
      wrapperProps={{
        className: "rounded-none bg-[#f2f6fa] shadow-none",
      }}
      saveButtonProps={{ ...saveButtonProps, hidden: false }}
      footerButtons={({ saveButtonProps }) => (
        <SaveButton onClick={handleSubmit} sx={sendEmailBtnStyle} />
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
