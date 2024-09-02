"use client";

import { Permission, Partner, Transaction } from "@/types/types";
import ShowTransaction from "@components/Transactions/Show/ShowTransaction";
import Loader from "@components/common/Loader";
import { TxtActionColor, TxtStatusColor, TxtTypeColor } from "@data/ColorData";
import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import {
  editRefineBtnStyle,
  refreshRefineBtnStyle,
  tagStyle,
} from "@data/MuiStyles";
import { Box } from "@mui/material";
import { useBack, useNavigation, usePermissions, useShow, useTable } from "@refinedev/core";
import { EditButton, RefreshButton, Show } from "@refinedev/mui";
import { useParsed } from "@refinedev/core";
import { CustomTabPanel, StyledTab, StyledTabs } from "@components/Tab/CustomizedTab";
import { useState } from "react";
import GeneralInformation from "@components/common/View/GeneralInformation";
import { getNestedValue } from "@utils/utilFunctions";
import AddressTable from "@components/Partners/AddressTable";
import ContactTable from "@components/Partners/ContactTable";
import PartnerTransactionTable from "@components/Partners/PartnerTransactionTable";
import PartnerLicensesTable from "@components/Partners/PartnerLicensesTable";

const Item = () => {
  const { params } = useParsed();
  const { queryResult } = useShow<Partner>({
    resource: "partners",
    id: params?.id,
  });
  const { data, isLoading } = queryResult;



  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { push } = useNavigation();

  const partner = data?.data;

  const getButtonProps = (editButtonProps: any, refreshButtonProps: any) => {
    return (
      <div className="flex gap-2 px-12">
        <EditButton {...editButtonProps} onClick={() => push(`/dashboard/partners/edit?id=${params?.id}`)} sx={editRefineBtnStyle} />
        <RefreshButton {...refreshButtonProps} sx={refreshRefineBtnStyle} />
      </div>
    );
  };
  const summaryfields = [
    { title: "Account ID", key: 'account_id' },
    { title: "Partner Name", key: "name" },
    { title: "Partner Type", key: "type" },
  ]

  return (
    <div className="no-padding-card">
      <Show
        goBack={null}
        isLoading={isLoading}
        breadcrumb={false}
        wrapperProps={{
          className: "rounded-none bg-[#f2f6fa] shadow-none pt-10 pb-2.5",
        }}
        title={
          <div className="!font-satoshi px-12">
            <div className="flex gap-4 items-center">
              <div className="text-2xl font-semibold text-[#515f72]">
                Partner
              </div>
              <div className={`rounded-full ${partner?.active ? 'bg-[#11ba82]' : 'bg-[#929ea8]'} text-xs font-medium px-4 py-1 text-white`}>{partner?.active ? "Active" : "Deactive"}</div>
            </div>
          </div>
        }
        headerButtons={({ editButtonProps, refreshButtonProps }) =>
          getButtonProps(editButtonProps, refreshButtonProps)
        }
      >
        {isLoading ? <Loader /> :
          <>
            <div className="flex gap-16 px-12 mt-8">
              {
                summaryfields.map(field => (
                  <div key={field.key} className="flex flex-col gap-1">
                    <div className="text-[#778599]">{field.title}</div>
                    <div className="text-[#515f72] text-xl font-semibold">{getNestedValue(partner, field.key)}</div>
                  </div>
                ))
              }
            </div>
            <div className="">
              <div className="px-12 pt-4">
                <StyledTabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <StyledTab label="Address" />
                  <StyledTab label="Contacts" />
                  <StyledTab label="Licenses" />
                  <StyledTab label="Transactions" />
                </StyledTabs>
              </div>
              <CustomTabPanel value={value} index={0}>
                <AddressTable data={partner?.addresses ?? []} partner_id={params?.id} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <ContactTable data={partner?.contacts ?? []} partner_id={params?.id}/>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <PartnerLicensesTable partner_id={params?.id} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <PartnerTransactionTable partner_id={params?.id} />
              </CustomTabPanel>
            </div>
          </>
        }
      </Show>
    </div>
  );
};

export default Item;
