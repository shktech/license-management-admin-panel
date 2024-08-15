"use client";

import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { Create, SaveButton } from "@refinedev/mui";
import { InputTransaction } from "@/types/types";
import TransactionForm from "@components/Forms/Transactions/TransactionForm";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { useBack } from "@refinedev/core";

const TransactionEdit = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    trigger,
    formState: { errors },
  } = useForm<InputTransaction>();

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
      {formLoading ? (
        <Loader />
      ) : (
        <div className="bg-white px-8 rounded-xl">
          <TransactionForm {...{ control, errors, trigger }}/>
        </div>
      )}
    </Create>
  );
};

export default TransactionEdit;