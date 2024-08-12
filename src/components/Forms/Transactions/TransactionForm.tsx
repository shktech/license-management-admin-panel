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
import LicensingDetailFormFields from "./LicensingDetailFormFields";
import ResellerFormFields from "./ResellerFormFields";
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
    },
    {
      icon: <ProductionQuantityLimitsOutlinedIcon />,
      title: 'Reseller Information',
      description: 'Setup your Reseller Information',
      fields: ResellerFormFields
    },
    {
      icon: <ProductionQuantityLimitsOutlinedIcon />,
      title: 'Reseller Information',
      description: 'Setup your Reseller Information',
      fields: LicensingDetailFormFields
    },
  ]
  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex flex-col gap-2">
        {
          FormGroups.map((formGroup, i) => (
            <Accordion
              key={i}
              // elevation={0}
              // disableGutters
              defaultExpanded={i == 0}
              sx={{
                borderTop: '2px solid #1f325c',
                '&::before': { display: 'none' },
                borderRadius: '0.5rem',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);'
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
                <GenericForm {...{ ...props, fields: formGroup.fields }} />
              </AccordionDetails>
            </Accordion>
          ))
        }
      </div>
    </div>
  );
};

export default TransactionForm;