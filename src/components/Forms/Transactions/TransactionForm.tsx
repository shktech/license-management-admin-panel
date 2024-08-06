"use client";

import { useEffect, useState } from "react";
import { FieldConfig, GenericFormProps } from "../FormControlWrapper";
import { Transaction } from "@/types/types";
import TransactionFormFields from "./TransactionFormFields";
import PartnerFormFields from "../Partners/PartnerFormFields";
import GenericForm from "../GenericForm";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NoteIcon from "@/assets/icons/note.svg?icon";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ProductFormFields from "./ProductFormFields";
import AssetFormFields from "./AssetFormFields";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

export type TransactionFormProps = GenericFormProps & {
  transaction?: Transaction;
  isCreate?: boolean,
};
const dividerStyle = { fontSize: '1.5rem', py: '1.5rem', fontWeight: 'bold', color: '#65758c' }

const TransactionForm = (props: TransactionFormProps) => {
  console.log(props);
  const FormGroups = [
    {
      icon: <PaidOutlinedIcon />,
      title: 'Transaction',
      description: 'Setup your Transaction data',
      fields: TransactionFormFields
    },
    {
      icon: <ProductionQuantityLimitsOutlinedIcon />,
      title: 'Product',
      description: 'Setup your Product data',
      fields: ProductFormFields
    },
    {
      icon: <CategoryOutlinedIcon />,
      title: 'Asset',
      description: 'Setup your Asset data',
      fields: props.isCreate? AssetFormFields.map(f => ({...f, disabled: true})) : AssetFormFields
    },
    {
      icon: <AccountBalanceWalletOutlinedIcon />,
      title: 'Billing Partner Information',
      description: 'Setup your Billing Partner Information',
      fields: PartnerFormFields.BillingPartnerInformationFormFields
    },
    {
      icon: <PaidOutlinedIcon />,
      title: 'Shipping Parter Information',
      description: 'Setup your Shipping Partner Information',
      fields: PartnerFormFields.ShippingPartnerInformationFormFields
    }
  ]
  return (
    <div className="flex flex-col">
      {
        FormGroups.map((formGroup, i) => (
          <Accordion
            key={i}
            elevation={0}
            disableGutters
            defaultExpanded={i == 0}
            sx={{
              // border: '1px solid #d7dde4',
              borderBottom: '1px solid #d7dde4',
              '&::before': { display: 'none' },
            }}
          >
            <AccordionSummary
              expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: '#536175' }} />}
              aria-controls="panel1-content"
              id={formGroup.title}
              sx={{
                py: 1,
                flexDirection: 'row-reverse',
                color: '#536175',
                transitionDuration: '500ms',
                "&:hover": {
                  color: "#003133", // Light grey background on hover
                },
                '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                  transform: 'rotate(90deg)',
                },
              }}
            >
              <div className="pl-4">{formGroup.icon}</div>
              <div className="pl-2 text-md font-medium">{formGroup.title}</div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="pl-10 text-sm text-[#2f80eb]">
                  { formGroup.description }
                </div>
                <div className="col-span-2">
                  <GenericForm {...{ ...props, fields: formGroup.fields }} />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))
      }
    </div>
  );
};

export default TransactionForm;