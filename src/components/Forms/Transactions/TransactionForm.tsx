"use client";

import { Customer, Transaction } from "@/types/types";
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
import { useOne, useTable } from "@refinedev/core";

export type TransactionFormProps = GenericFormProps & {
  transaction?: Transaction;
  transaction_action?: string;
  reset?: any
};


const TransactionForm = ({ reset, ...props }: TransactionFormProps) => {

  const [value, setValue] = useState<Customer | null>();
  const [inputValue, setInputValue] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const {
    tableQueryResult: { data, isLoading },
    setFilters,
  } = useTable<Customer>({
    resource: "customers/bill-customers"
  });

  const handleValueChange = (event: any, newValue: Customer | null) => {
    setValue(newValue);
    reset({
      bill_customer_account: newValue?.account,
      bill_customer_name: newValue?.name,
      bill_address1: newValue?.contact.address?.address1,
      bill_address2: newValue?.contact.address?.address2,
      bill_city: newValue?.contact.address?.city,
      bill_state: newValue?.contact.address?.state,
      bill_postal_code: newValue?.contact.address?.postal_code,
      bill_country: newValue?.contact.address?.country,
      bill_contact_first_name: newValue?.contact.first_name,
      bill_contact_last_name: newValue?.contact.last_name,
      bill_contact_phone: newValue?.contact.phone,
      bill_contact_email: newValue?.contact.email,
    });
  }

  const handleSearch = (value: string) => setFilters([{ field: 'searchKey', operator: 'contains', value: value }])
  const handleInputChange = (event: any, newInputValue: any) => {
    setInputValue(newInputValue);
    handleSearch(newInputValue)
  }

  useEffect(() => {
    setCustomers(data?.data as Customer[])
  }, [data])

  return (
    <div className="flex justify-center flex-col gap-4">
      <Autocomplete
        id="country-select-demo"
        value={value}
        onChange={handleValueChange}
        sx={{ width: 300 }}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={customers}
        autoHighlight
        loading={isLoading}
        getOptionLabel={(option) => option.account as string}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box
              key={key}
              component="li"
              {...optionProps}
            >
              <div className="text-sm flex flex-col gap-2 py-2">
                <div className="flex gap-4">
                  <div className="border-b">{option.account}</div>
                  <div className="border-b">{option.contact.first_name + " " + option.contact.last_name}</div>
                </div>
                <div className="flex gap-2">
                  <div className="border-b">{option.contact.address?.address1}</div>
                  <div className="border-b">{option.contact.address?.address2}</div>
                  <div className="border-b">{option.contact.address?.state}</div>
                  <div className="border-b">{option.contact.address?.country}</div>
                </div>
              </div>
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
    </div>
  );
};

export default TransactionForm;