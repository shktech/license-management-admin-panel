"use client";

import { Partner } from "@/types/types";
import Loader from "@components/common/Loader";
import { editRefineBtnStyle, refreshRefineBtnStyle } from "@data/MuiStyles";
import { useNavigation, useShow } from "@refinedev/core";
import { EditButton, RefreshButton, Show } from "@refinedev/mui";
import { useParsed } from "@refinedev/core";
import {
  CustomTabPanel,
  StyledTab,
  StyledTabs,
} from "@components/Tab/CustomizedTab";
import { useState } from "react";
import { getNestedValue } from "@utils/utilFunctions";
import AddressTable from "@components/Partners/AddressTable";
import ContactTable from "@components/Partners/ContactTable";
import PartnerTransactionTable from "@components/Partners/PartnerTransactionTable";
import PartnerLicensesTable from "@components/Partners/PartnerLicensesTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faGlassWater, faLocationDot, faRightLeft, faUser } from "@fortawesome/free-solid-svg-icons";

const partnerColors = {
  All: "#4A90E2",
  Channel: "#FFCC00",
  "Direct End User": "#34C759",
};

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
        <EditButton
          {...editButtonProps}
          onClick={() => push(`/dashboard/partners/edit?id=${params?.id}`)}
          sx={editRefineBtnStyle}
        />
        <RefreshButton {...refreshButtonProps} sx={refreshRefineBtnStyle} />
      </div>
    );
  };
  const summaryfields = [
    { title: "Oracle Account", key: "account_id" },
    { title: "Partner Number", key: "partner_number" },
  ];

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
              <div className="text-2xl font-semibold text-[#1f325c] flex items-end gap-2">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faUser} />
                  Partner
                </div>
                <div className="text-lg font-normal">{partner?.name}</div>
              </div>
              <span
                className={`text-xs bg-[${partnerColors[partner?.type as keyof typeof partnerColors]}] text-white px-6 py-1 rounded-full text-center font-semibold`}
              >
                {partner?.type}
              </span>
              <div
                className={`rounded-full ${partner?.active ? "bg-[#11ba82]" : "bg-[#929ea8]"} text-xs font-medium px-4 py-1 text-white`}
              >
                {partner?.active ? "Active" : "Inactive"}
              </div>
            </div>
          </div>
        }
        headerButtons={({ editButtonProps, refreshButtonProps }) =>
          getButtonProps(editButtonProps, refreshButtonProps)
        }
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex gap-16 px-12 mt-8">
              {summaryfields.map((field) => (
                <div key={field.key} className="flex flex-col gap-1">
                  <div className="text-[#778599]">{field.title}</div>
                  <div className="text-[#515f72] text-xl font-semibold">
                    {getNestedValue(partner, field.key)}
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
                  <StyledTab
                    label={
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faLocationDot} />
                        Address
                      </div>
                    }
                  />
                  <StyledTab
                    label={
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faAddressBook} />
                        Contacts
                      </div>
                    }
                  />
                  <StyledTab
                    label={
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faGlassWater} />
                        License Status
                      </div>
                    }
                  />
                  <StyledTab
                    label={
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faRightLeft} />
                        Transactions
                      </div>
                    }
                  />
                </StyledTabs>
              </div>
              <CustomTabPanel value={value} index={0}>
                <AddressTable
                  data={partner?.addresses ?? []}
                  partner_id={params?.id}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <ContactTable
                  data={partner?.contacts ?? []}
                  partner_id={params?.id}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <PartnerLicensesTable partner_id={params?.id} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <PartnerTransactionTable partner_id={params?.id} />
              </CustomTabPanel>
            </div>
          </>
        )}
      </Show>
    </div>
  );
};

export default Item;
