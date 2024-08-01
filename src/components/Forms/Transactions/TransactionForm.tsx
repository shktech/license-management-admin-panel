"use client";

import { useEffect, useState } from "react";
import { FieldConfig, GenericFormProps } from "../FormControlWrapper";
import { Transaction } from "@/types/types";
import TransactionFormFields from "./TransactionFormFields";
import PartnerFormFields from "../Partners/PartnerFormFields";
import GenericForm from "../GenericForm";
import { Divider } from "@mui/material";

export type TransactionFormProps = GenericFormProps & {
  transaction?: Transaction;
};
const dividerStyle = {
  fontSize: '1.5rem',
  fontWeight: 'medium'
};

const TransactionForm = (props: TransactionFormProps) => {

  return (
    <div className="flex flex-col gap-6">
      <Divider sx={dividerStyle}>Transaction</Divider>
      <div className="px-8 py-8">
        <GenericForm {...{ ...props, fields: TransactionFormFields }} />
      </div>
      <Divider sx={dividerStyle}>Billing Partner Information</Divider>
      <div className="px-8 py-8">
        <GenericForm {...{ ...props, fields: PartnerFormFields.BillingPartnerInformationFormFields }} />
      </div>
      <Divider sx={dividerStyle}>Shipping Partner Information</Divider>
      <div className="px-8 py-8">
        <GenericForm {...{ ...props, fields: PartnerFormFields.ShippingPartnerInformationFormFields }} />
      </div>
    </div>
  );
};

export default TransactionForm;
