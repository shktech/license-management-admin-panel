"use client";

import { Transaction } from "@/types/types";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import DetailsIcon from '@mui/icons-material/Details';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { GenericFormProps } from "../FormControlWrapper";
import GenericForm from "../GenericForm";
import PartnerFormFields from "../Partners/PartnerFormFields";
import GeneralTxnFormField from "./GeneralTxnFormField";
import { LicensingDetailFormFields } from "./LicensingDetailFormFields";
import { useEffect, useState } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

export type TransactionFormProps = GenericFormProps & {
  transaction?: Transaction;
  transaction_action?: string;
};

interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

const countries: readonly CountryType[] = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  {
    code: 'AE',
    label: 'United Arab Emirates',
    phone: '971',
  },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  {
    code: 'AG',
    label: 'Antigua and Barbuda',
    phone: '1-268',
  },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AQ', label: 'Antarctica', phone: '672' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
  {
    code: 'AU',
    label: 'Australia',
    phone: '61',
    suggested: true,
  },
  { code: 'AW', label: 'Aruba', phone: '297' },
  { code: 'AX', label: 'Alland Islands', phone: '358' },
  { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  {
    code: 'BA',
    label: 'Bosnia and Herzegovina',
    phone: '387',
  },
]

const TransactionForm = (props: TransactionFormProps) => {
  const [expandedPanels, setExpandedPanels] = useState<Record<string, boolean>>({ "Transaction": true });

  // useEffect(() => {
  //   const errors = props.errors;
  //   const newExpandedPanels = FormGroups.reduce((acc, group, index) => {
  //     const hasErrors = group.fields.some((field: any) => errors?.[field.name]);;
  //     const shouldExpand = hasErrors || index === 0;
  //     return { ...acc, [group.title]: shouldExpand };
  //   }, {});
  //   setExpandedPanels(newExpandedPanels);
  // }, [props]);

  const handleAccordionChange = (panel: string) => {
    setExpandedPanels((prev) => ({
      ...prev,
      [panel]: !prev[panel],
    }));
  };

  const FormGroups = [
    {
      icon: <PaidOutlinedIcon />,
      title: 'Transaction',
      description: 'Setup your Transaction data',
      fields: props.transaction ?
        GeneralTxnFormField.EditTransactionForm :
        (props.transaction_action == "New" ? GeneralTxnFormField.CreateTransactionForm.newAction : GeneralTxnFormField.CreateTransactionForm.notNewAction)
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
      fields: PartnerFormFields.ResellerPartnerInformationFormFields
    },
    {
      icon: <DetailsIcon />,
      title: 'Licensing Details',
      description: 'Setup your Reseller Information',
      fields: props.transaction_action == "New" ? LicensingDetailFormFields.newAction : LicensingDetailFormFields.notNewAction
    },
  ]
  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex flex-col gap-2">
        {/* {
          FormGroups.map((formGroup, i) => (
            <Accordion
              key={formGroup.title}
              expanded={expandedPanels[formGroup.title] || false}
              onChange={() => handleAccordionChange(formGroup.title)}
              sx={{
                borderTop: '2px solid #1f325c',
                '&::before': { display: 'none' },
                borderRadius: '0.5rem',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);'
              }}
            >
              <AccordionSummary
                expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: '#536175' }} />}
                aria-controls={`${formGroup.title}-content`}
                id={`${formGroup.title}-content`}
                sx={{
                  py: 1,
                  flexDirection: 'row-reverse',
                  color: '#536175',
                  transitionDuration: '500ms',
                  "&:hover": {
                    color: "#003133",
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
        } */}
        <Accordion
          key='test'
          expanded={true}
          sx={{
            borderTop: '2px solid #1f325c',
            '&::before': { display: 'none' },
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);'
          }}
        >
          <AccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: '#536175' }} />}
            aria-controls={`test-content`}
            id={`test-content`}
            sx={{
              py: 1,
              flexDirection: 'row-reverse',
              color: '#536175',
              transitionDuration: '500ms',
              "&:hover": {
                color: "#003133",
              },
              '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                transform: 'rotate(90deg)',
              },
            }}
          >
            <div className="pl-2 text-md font-medium">test</div>
          </AccordionSummary>
          <AccordionDetails>
            <Autocomplete
              id="country-select-demo"
              sx={{ width: 300 }}
              options={countries}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <Box
                    key={key}
                    component="li"
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    {...optionProps}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      alt=""
                    />
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose a country"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
            <GenericForm {...{ ...props, fields: PartnerFormFields.BillingPartnerInformationFormFields }} />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default TransactionForm;