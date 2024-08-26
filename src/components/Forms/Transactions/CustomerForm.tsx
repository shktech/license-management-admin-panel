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
import { Autocomplete, Box, FormControlLabel, TextField } from "@mui/material";
import { useOne, useTable } from "@refinedev/core";
import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from "next/dist/shared/lib/constants";
import { getInputCustomer } from "@utils/utilFunctions";
import { IOSSwitch } from "@components/Input/GeneralSwitch";

export type CustomerFormProps = GenericFormProps & {
  reset?: any,
  watch?: any,
  setValue?: any,
  fields: FieldConfig[],
  transaction_action?: string,
  customer: any,
  disabledSearch?: boolean
};

const ADDLABEL = "New Customer";

const CustomerForm = ({ transaction_action, watch, setValue: setValueProps, disabledSearch, fields, customer, ...props }: CustomerFormProps) => {
  const [isSameBillShipping, setIsSameBillShipping] = useState(false);

  const handleSameBillShipping = () => {
    if (!isSameBillShipping) {
      setValueProps?.('bill_address1', watch('ship_address1'));
      setValueProps?.('bill_address2', watch('ship_address2'));
      setValueProps?.('bill_city', watch('ship_city'));
      setValueProps?.('bill_state', watch('ship_state'));
      setValueProps?.('bill_postal_code', watch('ship_postal_code'));
      setValueProps?.('bill_country', watch('ship_country'));
      setValueProps?.('bill_customer_account', watch('ship_customer_account'));
      setValueProps?.('bill_customer_name', watch('ship_customer_name'));
      setValueProps?.('bill_contact_first_name', watch('ship_contact_first_name'));
      setValueProps?.('bill_contact_last_name', watch('ship_contact_last_name'));
      setValueProps?.('bill_contact_email', watch('ship_contact_email'));
      setValueProps?.('bill_contact_phone', watch('ship_contact_phone'));
    }
    setIsSameBillShipping((prev) => !prev);
  };
  const [value, setValue] = useState<Customer>(customer.data as Customer || { account: ADDLABEL });
  const [inputValue, setInputValue] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  useEffect(() => {
    if (customer.data) {
      setValue(customer.data as Customer);
      handleReset(customer.data as Customer);
    } else {
      setValue({
        account: ADDLABEL
      })
    }
  }, [customer.data])

  const {
    tableQueryResult: { data, isLoading },
    setFilters,
  } = useTable<Customer>({
    resource: `customers/${customer.resource}`,
    syncWithLocation: false
  });

  const handleValueChange = (event: any, newValue: Customer | null) => {
    setValue(newValue as Customer);
    handleReset(newValue as Customer);
  }

  const handleReset = (value: Customer) => {
    Object.keys(getInputCustomer(value, customer.prefix)).forEach(key => {
      setValueProps?.(key, value?.account == ADDLABEL ? '' : getInputCustomer(value, customer.prefix)[key])
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

  return (
    <div className="flex justify-center flex-col gap-4">
      <Autocomplete
        id="country-select-demo"
        value={value}
        onChange={handleValueChange}
        disabled={disabledSearch}
        fullWidth
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
                      <div className=""><span className="font-bold">Account: </span>{option.account}</div>
                      <div className=""><span className="font-bold">Name: </span>{option.first_name + " " + option.last_name}</div>
                    </div>
                    <div className="flex gap-2">
                      <div className=""><span className="font-bold">Address: </span>{option.address1} {option.address2}</div>
                      <div className=""><span className="font-bold">State: </span>{option.state}</div>
                      <div className=""><span className="font-bold">Country: </span>{option.country}</div>
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
      {
        customer?.prefix == "bill_" && !(transaction_action == "Revoke" || transaction_action == "Renewal") &&
        <FormControlLabel
          control={
            <IOSSwitch
              checked={isSameBillShipping}
              onChange={handleSameBillShipping}
              sx={{ mx: 1 }}
            />
          }
          label="Same with shipping address"
        />
      }
      <GenericForm {...{ ...props, fields: fields }} />
    </div>
  );
};

export default CustomerForm;