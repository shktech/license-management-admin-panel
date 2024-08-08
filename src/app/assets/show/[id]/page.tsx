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
import { Asset, Permission, Seat } from "@/types/types";
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



const Page = () => {
  const [value, setValue] = useState(0);
  const { data: permissionsData } = usePermissions<Permission>({ params: { codename: "asset" } });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { queryResult } = useShow<Asset>();
  const { data, isLoading } = queryResult;

  const asset: Asset = data?.data as Asset;
  const seats: Seat[] = data?.data?.seats as Seat[];
  const columns = useMemo<MRT_ColumnDef<Seat>[]>(
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
            <div className="text-2xl font-semibold text-[#515f72]">Asset</div>
            <div className="flex gap-4 text-sm text-[#656f7c] mt-2">
              <div className="">Asset ID</div>
              <div className="">{asset?.id}</div>
            </div>
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
        <div className="flex gap-16 px-12 mt-8">
          {
            summaryfields.map(field => (
              <div className="flex flex-col gap-1">
                <div className="text-[#778599]">{field.title}</div>
                <div className="text-[#515f72] text-xl font-semibold">{getNestedValue(asset, field.key)}</div>
              </div>
            ))
          }
        </div>
        <div className="">
          <div className="px-12 pt-4">
            <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <StyledTab label="General Information" />
              <StyledTab label="Last Transaction Detail" />
              <StyledTab label="Asset Status" />
              <StyledTab label="Seats" />
            </StyledTabs>
          </div>

          <CustomTabPanel value={value} index={0}>
            <GeneralInformation
              singleColumn={true}
              items={[
                { label: "Asset Id", value: asset?.id },
                { label: "Organization", value: asset?.organization },
                {
                  label: "Asset number (LicKey/Srl#)",
                  value: asset?.license_key,
                },
                {
                  label: "Product part number",
                  value: asset?.osc_product.osc_part_number,
                },
                {
                  label: "Asset type",
                  value: asset?.osc_product.product_type,
                },
                {
                  label: "Vender name",
                  value: asset?.osc_product.vendor_name,
                },
                {
                  label: "Vendor part",
                  value: asset?.osc_product.product_name,
                },
              ]}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <GeneralInformation
              singleColumn={true}
              items={[
                {
                  label: "Transaction number",
                  value: asset?.last_transaction?.transaction_number,
                },
                {
                  label: "Transaction date",
                  value: asset?.last_transaction?.transaction_date,
                },
                {
                  label: "Transaction type",
                  value: asset?.last_transaction?.transaction_type,
                },
                {
                  label: "Owner account",
                  value: "",
                },
                {
                  label: "Owner name",
                  value: "",
                },
                {
                  label: "UOM (Duration/Each)",
                  value: asset?.osc_product.duration,
                },
                {
                  label: "Start date",
                  value: asset?.last_transaction?.start_date,
                },
                {
                  label: "End date",
                  value: asset?.last_transaction?.end_date,
                },
              ]}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <GeneralInformation
              singleColumn={true}
              items={[
                { label: "Seats - OSC Master", value: asset?.osc_seat_count },
                {
                  label: "Seats - License Server",
                  value: asset?.license_server_seat_count.toString(),
                },
                {
                  label: "Asset status",
                  value: asset?.status,
                },
                {
                  label: "Status date",
                  value: asset?.status_update_date,
                },
                {
                  label: "Active",
                  value: asset?.active_seats.toString(),
                },
                {
                  label: "Renewal Due",
                  value: asset?.renewal_seats.toString(),
                },
                {
                  label: "Suspended",
                  value: asset?.suspended_seats.toString(),
                },
                {
                  label: "Expired",
                  value: asset?.expired_seats.toString(),
                },
                {
                  label: "Revoked",
                  value: asset?.revoked_seats.toString(),
                },
                {
                  label: "Terminated",
                  value: asset?.terminated_seats.toString(),
                },
              ]}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <div className="flex justify-between">
              <div className="text-xl font-semibold text-black flex items-center gap-2">
                <LicenseIcon />
                Seats
              </div>
            </div>
            <div className="max-w-full overflow-x-auto">
              <GenericTable
                data={seats}
                columns={columns}
              />
            </div>
          </CustomTabPanel>
        </div>
      </Show>
      {/* <div className="flex flex-col gap-10 mt-6">
        <div className="rounded-xl shadow-md bg-white px-5 pt-6 pb-2.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex justify-between">
            <div className="text-xl font-semibold text-black flex items-center gap-2">
              <LicenseIcon />
              Seats
            </div>
          </div>
          <div className="max-w-full overflow-x-auto">
            <GenericTable
              data={seats}
              columns={columns}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Page;