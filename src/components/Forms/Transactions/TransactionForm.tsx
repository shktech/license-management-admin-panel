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
import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from "next/dist/shared/lib/constants";

export type TransactionFormProps = GenericFormProps & {
  transaction?: Transaction;
  transaction_action?: string;
  reset?: any
};

const ADDLABEL = "New Customer";

const TransactionForm = ({ reset, ...props }: TransactionFormProps) => {

  const [value, setValue] = useState<any>({
    isAdd: true,
    account: ADDLABEL
  });
  const [inputValue, setInputValue] = useState(ADDLABEL);
  const [customers, setCustomers] = useState<any[]>([]);
  const {
    tableQueryResult: { data, isLoading },
    setFilters,
  } = useTable<Customer>({
    resource: "customers/bill-customers",
    syncWithLocation: false
  });

  const handleValueChange = (event: any, newValue: any) => {
    setValue(newValue);
  }


  useEffect(() => {
    if (value?.isAdd) {
      reset({
        bill_customer_account: '',
        bill_customer_name: '',
        bill_address1: '',
        bill_address2: '',
        bill_city: '',
        bill_state: '',
        bill_postal_code: '',
        bill_country: '',
        bill_contact_first_name: '',
        bill_contact_last_name: '',
        bill_contact_phone: '',
        bill_contact_email: '',
      })
    } else {
      reset({
        bill_customer_account: value?.account,
        bill_customer_name: value?.name,
        bill_address1: value?.contact.address?.address1,
        bill_address2: value?.contact.address?.address2,
        bill_city: value?.contact.address?.city,
        bill_state: value?.contact.address?.state,
        bill_postal_code: value?.contact.address?.postal_code,
        bill_country: value?.contact.address?.country,
        bill_contact_first_name: value?.contact.first_name,
        bill_contact_last_name: value?.contact.last_name,
        bill_contact_phone: value?.contact.phone,
        bill_contact_email: value?.contact.email,
      });
    }
  }, [value])

  const handleSearch = (value: string) => setFilters([{ field: 'searchKey', operator: 'contains', value: value }])
  const handleInputChange = (event: any, newInputValue: any) => {
    setInputValue(newInputValue);
    if (newInputValue == ADDLABEL) {
      handleSearch('')
    } else {
      handleSearch(newInputValue)
    }
  }

  useEffect(() => {
    if (data?.data) {
      setCustomers(data?.data as any[])
    }
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
        options={[
          {
            isAdd: true,
            account: ADDLABEL
          },
          ...customers
        ]}
        loading={isLoading}
        filterOptions={(options) => options}
        getOptionLabel={(option) => option.account as string}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box
              key={key}
              component="li"
              {...optionProps}
            >
              {
                option.isAdd == true ?
                  <div className="border-b">{option.account}</div> :
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
              }
            </Box>
          );
        }}
        renderInput={(params) => {
          return (
            <TextField {...params} variant="outlined" />
          )
        }}
      />
      <GenericForm {...{ ...props, fields: PartnerFormFields.BillingPartnerInformationFormFields }} />
    </div>
  );
};

export default TransactionForm;