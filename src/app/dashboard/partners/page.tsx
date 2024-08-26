"use client";
import CustomerTable from "@components/Partners/CustomerTable";
import { CustomTabPanel, StyledTab, StyledTabs } from "@components/Tab/CustomizedTab";
import React, { useState } from "react";

const Page = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="pt-6 pb-2.5 xl:pb-1 overflow-x-auto">
      <div className="!font-satoshi px-12 py-4 text-2xl font-semibold text-[#515f72] flex items-center gap-2">
        Partners
      </div>
      <div className="px-12 pt-4">
        <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <StyledTab label="Bill Customers" />
          <StyledTab label="Ship Customers" />
          <StyledTab label="Reseller" />
        </StyledTabs>
      </div>
      <CustomTabPanel value={value} index={0}>
        <CustomerTable resource="bill-customers"/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <CustomerTable resource="ship-customers"/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <CustomerTable resource="resellers"/>
      </CustomTabPanel>
    </div>
  );
};

export default Page;
