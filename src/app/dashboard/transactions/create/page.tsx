"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { Create, SaveButton } from "@refinedev/mui";
import { InputTransaction, Product } from "@/types/types";
import TransactionForm from "@components/Forms/Transactions/TransactionForm";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { useBack, useList, useParsed } from "@refinedev/core";
import { getDurationFromString } from "@utils/utilFunctions";
import CreateTransaction from "@components/Transactions/CreateTransaction";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';

const TransactionEdit = () => {
  const searchParams = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  return (
    <CreateTransaction initialInfo={paramsObject}/>
  );
};

export default TransactionEdit;