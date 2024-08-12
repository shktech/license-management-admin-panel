"use client";

import { usePermissions, useShow } from "@refinedev/core";
import {
  Show,
  EditButton,
  DeleteButton,
  RefreshButton,
} from "@refinedev/mui";
import Link from "next/link";
import GeneralInformation from "@components/common/View/GeneralInformation";
import { Asset, LicenseOwner, Permission, Product, Seat, Transaction } from "@/types/types";
import GeneralInformationIcon from "@/assets/icons/generalinfo.svg?icon";
import TransactionIcon from "@/assets/icons/transaction.svg?icon";
import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import Grid from "@mui/material/Unstable_Grid2";
import GenericTable from "@components/Table/GenericTable";
import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import LicenseIcon from "@/assets/icons/license.svg?icon";
import AssetIcon from "@/assets/icons/asset.svg?icon"
import { Box, Fade, styled, Tab, Tabs } from "@mui/material";
import { deleteRefineBtnStyle, editRefineBtnStyle, refreshRefineBtnStyle } from "@data/MuiStyles";
import { CustomTabPanel, StyledTab, StyledTabs } from "@components/Tab/CustomizedTab";
import TransactionHistoryTable from "@components/Assets/TransactionHistoryTable";

const Page = () => {
  const [value, setValue] = useState(0);
  const { data: permissionsData } = usePermissions<Permission>({ params: { codename: "asset" } });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { queryResult } = useShow<Asset>();
  const { data, isLoading } = queryResult;

  const asset: Asset = data?.data as Asset;
  const transactions: Transaction[] = data?.data?.transactions as Transaction[];
  const seats: Seat[] = data?.data?.seats as Seat[];
  const toTitleCase = (snakeCaseString: string) => {
    return snakeCaseString
      .split('_')          // Split the string by underscores
      .map(word =>          // Capitalize each word
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(' ');          // Join the words with spaces
  }

  const SeatsColumns = useMemo<MRT_ColumnDef<Seat>[]>(
    () => [
      {
        accessorKey: "seat_number",
        header: "Seat",
        size: 100,
      },
      {
        accessorKey: "osc_start_date",
        header: "OSC Start date",
      },
      {
        accessorKey: "osc_end_date",
        header: "OSC End date",
      },
      {
        accessorKey: "osc_license_status",
        header: "OSC License status",
      },
      {
        accessorKey: "license_server_start_date",
        header: "License server start date",
      },
      {
        accessorKey: "license_server_end_date",
        header: "License server end date",
      },
      {
        accessorKey: "license_server_status",
        header: "License server status",
      },
    ],
    []
  );

  const summaryfields = [
    { title: "Start Date", key: "start_date" },
    { title: "End Date", key: "end_date" },
    { title: "License Key", key: "license_key" },
    { title: "License Status", key: "osc_license_status" },
    { title: "License server status", key: "license_server_status" },
    { title: "Owner Name", key: "license_onwer.customer_name" },
    { title: "Product Part Name", key: "osc_product.product_name" },
    { title: "Vender Part Name", key: "osc_product.vendor_name" },
  ]

  const getNestedValue = (obj: any, key: string) => {
    return key.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  return (
    <div className="no-padding-card">
      <Show
        goBack={null}
        isLoading={isLoading}
        breadcrumb={false}
        wrapperProps={{ className: "rounded-none bg-[#f2f6fa] shadow-none pt-6 pb-2.5" }}
        title={
          <div className="!font-satoshi px-12">
            <div className="flex items-end gap-4 text-2xl font-semibold text-[#515f72]">Asset <div className="text-lg font-normal">{asset?.id}</div></div>
          </div>
        }
        headerButtons={({
          deleteButtonProps,
          editButtonProps,
          refreshButtonProps,
        }) => (
          <div className="flex gap-2 pr-10">
            {permissionsData?.update && <EditButton {...editButtonProps} sx={editRefineBtnStyle} />}
            {permissionsData?.delete && <DeleteButton {...deleteButtonProps} sx={deleteRefineBtnStyle} />}
            <RefreshButton {...refreshButtonProps} sx={refreshRefineBtnStyle} />
          </div>
        )}
      >
        <div className="grid grid-cols-4 px-12 mt-8 gap-y-4 gap-x-4">
          {
            summaryfields.map(field => (
              <div className="flex flex-col gap-1">
                <div className="text-[#778599]">{field.title}</div>
                <div className="text-[#515f72] text-xl font-medium">{getNestedValue(asset, field.key)}</div>
              </div>
            ))
          }
        </div>
        <div className="">
          <div className="px-12 pt-4">
            <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <StyledTab label="General Information" />
              <StyledTab label="Products" />
              <StyledTab label="License Owner" />
              <StyledTab label="Transaction History" />
              <StyledTab label="Seats" />
            </StyledTabs>
          </div>

          <CustomTabPanel value={value} index={0}>
            <GeneralInformation
              singleColumn={true}
              items={[
                {
                  label: "Asset Id",
                  value: asset?.id
                },
                {
                  label: "Active Seats",
                  value: asset?.active_seats
                },
                {
                  label: "Creation Date",
                  value: asset?.creation_date
                },
                {
                  label: "active",
                  value: asset?.active ? "Yes" : "No"
                },
                {
                  label: "Start Date",
                  value: asset?.start_date
                },
                {
                  label: "End Date",
                  value: asset?.end_date
                },
                {
                  label: "Expired Seats",
                  value: asset?.expired_seats
                },
                {
                  label: "License Key",
                  value: asset?.license_key
                },
                {
                  label: "License Server Seat Count",
                  value: asset?.license_server_seat_count
                },
                {
                  label: "Organization",
                  value: asset?.organization
                },
                {
                  label: "OSC Seat Count",
                  value: asset?.osc_seat_count
                },
                {
                  label: "Renewal Seats",
                  value: asset?.renewal_seats
                },
                {
                  label: "Revoked Seats",
                  value: asset?.revoked_seats
                },
                {
                  label: "Suspended Seats",
                  value: asset?.suspended_seats
                },
                {
                  label: "Terminated Seats",
                  value: asset?.terminated_seats
                },
              ]}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <GeneralInformation
              singleColumn={true}
              items={
                asset?.osc_product ?
                  Object.keys(asset?.osc_product).map(val => ({
                    label: toTitleCase(val),
                    value: asset?.osc_product?.[val as keyof Product]?.toString()
                  })) : []
              }
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <GeneralInformation
              singleColumn={true}
              items={
                asset?.license_owner ?
                  Object.keys(asset?.license_owner).map(val => ({
                    label: toTitleCase(val),
                    value: asset?.license_owner?.[val as keyof LicenseOwner]?.toString()
                  })) : []
              }
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <div className="max-w-full overflow-x-auto">
              <TransactionHistoryTable 
                transactions={transactions}
              />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <div className="max-w-full overflow-x-auto">
              <GenericTable
                data={seats}
                title="Seats"
                columns={SeatsColumns}
              />
            </div>
          </CustomTabPanel>
        </div>
      </Show>
    </div>
  );
};

export default Page;