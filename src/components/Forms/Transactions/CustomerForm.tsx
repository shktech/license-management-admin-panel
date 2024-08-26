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
import { FieldConfig, GenericFormProps } from "../FormControlWrapper";
import GenericForm from "../GenericForm";
import PartnerFormFields from "../Partners/PartnerFormFields";
import GeneralTxnFormField from "./GeneralTxnFormField";
import { LicensingDetailFormFields } from "./LicensingDetailFormFields";
import { useEffect, useState } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useOne, useTable } from "@refinedev/core";
import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from "next/dist/shared/lib/constants";
import { getInputCustomer } from "@utils/utilFunctions";

export type CustomerFormProps = GenericFormProps & {
  reset?: any,
  watch?: any,
  setValue?: any,
  fields: FieldConfig[],
  customerType: any
};

const ADDLABEL = "New Customer";

const CustomerForm = ({ watch, setValue: setValueProps, fields, customerType, ...props }: CustomerFormProps) => {

  const [value, setValue] = useState<Customer>({
    account: ADDLABEL
  });
  const [inputValue, setInputValue] = useState(ADDLABEL);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const {
    tableQueryResult: { data, isLoading },
    setFilters,
  } = useTable<Customer>({
    resource: `customers/${customerType.resource}`,
    syncWithLocation: false
  });

  const customer_account = watch(`${customerType.prefix}customer_account`);

  useEffect(() => {
    if (customer_account) {
      console.log('customer_account', customer_account)
      setInputValue(customer_account)
    }
  }, [customer_account])
  const handleValueChange = (event: any, newValue: Customer | null) => {
    setValue(newValue as Customer);
    handleReset(newValue as Customer);
  }

  const handleReset = (value: Customer) => {
    Object.keys(getInputCustomer(value, customerType.prefix)).forEach(key => {
      setValueProps?.(key, value?.account == ADDLABEL ? '' : getInputCustomer(value, customerType.prefix)[key])
    })
  }
  const handleSearch = (value: string) => setFilters([{ field: 'searchKey', operator: 'contains', value: value }])
  const handleInputChange = (event: any, newInputValue: string) => {
    setInputValue(newInputValue);
    if (newInputValue == ADDLABEL) {
      handleSearch('')
    } else {
      handleSearch(newInputValue)
    }
  }

  useEffect(() => {
    if (data?.data) {
      setCustomers(data?.data as Customer[])
    }
  }, [data])

  useEffect(() => {
    
  }, [])
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
                option.account == ADDLABEL ?
                  <div className="border px-4 py-2 rounded-lg w-full text-center bg-[#1f325c] text-white">{option.account}</div> :
                  <div className="text-sm flex flex-col gap-2 py-2">
                    <div className="flex gap-4">
                      <div className="border-b">{option.account}</div>
                      <div className="border-b">{option.first_name + " " + option.last_name}</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="border-b">{option.address1}</div>
                      <div className="border-b">{option.address2}</div>
                      <div className="border-b">{option.state}</div>
                      <div className="border-b">{option.country}</div>
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
      <GenericForm {...{ ...props, fields: fields }} />
    </div>
  );
};

export default CustomerForm;