"use client";

import { Transaction } from "@/types/types";
import {
  CustomTabPanel,
  StyledTab,
  StyledTabs,
} from "@components/Tab/CustomizedTab";
import { getNestedValue } from "@utils/utilFunctions";
import BasicInformation from "./BasicInformation";
import AssetInformation from "./AssetInformation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faCircleInfo, faSignal } from "@fortawesome/free-solid-svg-icons";

interface ShowTransactionProps {
  transaction?: Transaction;
}

const ShowTransaction: React.FC<ShowTransactionProps> = ({ transaction }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const summaryfields = [
    { title: "Transaction Quantity", key: "quantity" },
    { title: "Transaction Action", key: "transaction_action" },
    { title: "Transaction License Key", key: "asset.license_key" },
    {
      title: "Product Part Number",
      key: "asset.osc_product.product_part_number",
    },
    { title: "Duration", key: "asset.osc_product.duration" },
  ];

  return (
    <div>
      <div className="flex gap-16 px-12 mt-8">
        {summaryfields.map((field) => (
          <div key={field.key} className="flex flex-col gap-1">
            <div className="text-[#778599]">{field.title}</div>
            <div className="text-[#515f72] text-xl font-semibold">
              {getNestedValue(transaction, field.key)}
            </div>
          </div>
        ))}
      </div>
      <div className="">
        <div className="px-12 pt-4">
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <StyledTab label={
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCircleInfo} />
                Basic Information
              </div>
            } />
            <StyledTab label={
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faSignal} />
                License Status
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
