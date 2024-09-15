"use client";

import { Transaction } from "@/types/types";
import {
  CustomTabPanel,
  StyledTab,
  StyledTabs,
} from "@components/Tab/CustomizedTab";
import { getFormattedDate, getNestedValue } from "@utils/utilFunctions";
import BasicInformation from "./BasicInformation";
import AssetInformation from "./AssetInformation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PersonIcon from '@mui/icons-material/Person';
import { faCubes } from "@fortawesome/free-solid-svg-icons";
import {
  faChartBar,
  faCircleInfo,
  faSignal,
} from "@fortawesome/free-solid-svg-icons";
import CustomerInformation from "./CustomerInformation";
import CustomersInformation from "./CustomersInformation";

interface ShowTransactionProps {
  transaction?: Transaction;
}

const ShowTransaction: React.FC<ShowTransactionProps> = ({ transaction }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const summaryfields = [
    { title: "Transaction Number", key: "transaction_number" },
    {
      title: "Transaction Date",
      key: "transaction_date",
      value: (
        <div className="text-[#515f72] text-xl font-semibold">
          {getFormattedDate(transaction?.transaction_date)}
        </div>
      ),
    },
    { title: "Bill Customer", key: "bill_customer.name" },
    { title: "Ship Customer", key: "ship_customer.name" },
    { title: "Transaction Action", key: "transaction_action" },
    { title: "Transaction Status", key: "transaction_status" },
    { title: "Transaction Source", key: "transaction_source" },
    { title: "Source Ref Number", key: "source_reference_number" },
    { title: "Source Ref Date", key: "source_reference_date" },
    { title: "Source Ref ID", key: "source_reference_id" },
    { title: "Product Type", key: "asset.license_type" },
    { title: "Transaction Quantity", key: "quantity" },
    { title: "Transaction License Key", key: "asset.license_key" },
    {
      title: "Product Part Number",
      key: "asset.osc_product.product_part_number",
    },
    { title: "Seat Count", key: "asset.osc_seat_count" },
    { title: "License Key", key: "asset.license_key" },
  ];
  const halfItems = Math.ceil(summaryfields.length / 2);
  const firstHalfItems = summaryfields.slice(0, halfItems);
  return (
    <div>
      <div className="grid grid-cols-2 mt-8">
        {firstHalfItems.map((item, index) => (
          <>
            <div
              key={index}
              className={`grid grid-cols-5 gap-2 px-12 py-3 items-center border-b border-[#d5dce3]`}
            >
              <div className="col-span-2 text-base font-medium text-[#666f75]">
                {item.title}
              </div>
              <div className="col-span-3 text-base">
                {item.value || getNestedValue(transaction, item.key)}
              </div>
            </div>
            <div
              key={index + halfItems}
              className={`grid grid-cols-5 gap-2 px-12 py-3 items-center border-b border-[#d5dce3]`}
            >
              <div className="col-span-2 text-base font-medium text-[#666f75] col-span-1">
                {summaryfields[index + halfItems]?.title}
              </div>
              <div className="col-span-3 text-base">
                {summaryfields[index + halfItems]?.value ||
                  getNestedValue(transaction, summaryfields[index + halfItems]?.key as string)}
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="">
        <div className="px-12 pt-4">
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <StyledTab
              label={
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCircleInfo} />
                  Transaction Details
                </div>
              }
            />
            <StyledTab
              label={
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCubes} />
                  Product Details
                </div>
              }
            />
            <StyledTab
              label={
                <div className="flex items-center gap-2">
                  <PersonIcon />
                  Customer Details
                </div>
              }
            />
            {/* <StyledTab label="Bill Customer" />
            <StyledTab label="Ship Customer" />
            <StyledTab label="Reseller" /> */}
          </StyledTabs>
        </div>
      </div>
      <CustomTabPanel value={value} index={0}>
        <BasicInformation transaction={transaction} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AssetInformation transaction={transaction} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CustomersInformation transaction={transaction} />
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={2}>
        <CustomerInformation transaction={transaction} type="bill_customer" />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <CustomerInformation transaction={transaction} type="ship_customer" />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <CustomerInformation transaction={transaction} type="reseller" />
      </CustomTabPanel> */}
    </div>
  );
};

export default ShowTransaction;
