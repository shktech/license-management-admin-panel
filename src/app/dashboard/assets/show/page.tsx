"use client";

import { Asset, Permission, Seat, Transaction } from "@/types/types";
import TransactionHistoryTable from "@components/Assets/TransactionHistoryTable";
import Loader from "@components/common/Loader";
import GeneralInformation from "@components/common/View/GeneralInformation";
import {
  CustomTabPanel,
  StyledTab,
  StyledTabs,
} from "@components/Tab/CustomizedTab";
import GenericTable from "@components/Table/GenericTable";
import { refreshRefineBtnStyle } from "@data/MuiStyles";
import { Button } from "@mui/material";
import { useNavigation, useParsed, usePermissions, useShow } from "@refinedev/core";
import { RefreshButton, Show } from "@refinedev/mui";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo, useState } from "react";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useRouter } from "next/router";

const Page = () => {
  const { params } = useParsed();
  const [value, setValue] = useState(0);
  const { push } = useNavigation();
  const { data: permissionsData } = usePermissions<Permission>({
    params: { codename: "asset" },
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { queryResult } = useShow<Asset>({
    resource: "assets",
    id: params?.id,
  });
  const { data, isLoading } = queryResult;

  const asset: Asset = data?.data as Asset;
  const transactions: Transaction[] = data?.data?.transactions as Transaction[];
  const seats: Seat[] = data?.data?.seats as Seat[];

  const handleReActionBtn = (action: string) => {
    const path = '/dashboard/transactions/create?'; // your target route
    const queryParams = {
      transaction_action: action,
      license_key: asset.license_key as string,
      license_type: asset.license_type as string,
      start_date: asset.start_date as string,
      end_date: asset.end_date as string,
      osc_part_number: asset.osc_product?.product_part_number as string
    };

    // Navigate to the path with the query parameters
    push(path + (new URLSearchParams(queryParams).toString()));
  }

  const SeatsColumns = useMemo<MRT_ColumnDef<Seat>[]>(
    () => [
      {
        accessorKey: "seat_id",
        header: "Seat ID",
        size: 100,
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "license_server_status",
        header: "License Server Status",
      },
      {
        accessorKey: "asset",
        header: "Asset",
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
  ];

  const getNestedValue = (obj: any, key: string) => {
    return key.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  return (
    <div className="no-padding-card">
      <Show
        goBack={null}
        isLoading={isLoading}
        breadcrumb={false}
        wrapperProps={{
          className: "rounded-none bg-[#f2f6fa] shadow-none pt-8 pb-2.5",
        }}
        title={
          <div className="!font-satoshi px-12">
            <div className="flex items-end gap-4 text-2xl font-semibold text-[#515f72]">
              Asset <div className="text-lg font-normal">{asset?.asset_id}</div>
            </div>
          </div>
        }
        headerButtons={({ refreshButtonProps }) => (
          <div className="flex gap-2 pr-10">
            <Button sx={refreshRefineBtnStyle} onClick={() => handleReActionBtn("Renewal")}>
              <AutorenewIcon fontSize="small" />
              Renew
            </Button>
            <Button sx={refreshRefineBtnStyle} onClick={() => handleReActionBtn("Revoke")}>
              <AutorenewIcon fontSize="small" />Revoke
            </Button>

            <RefreshButton {...refreshButtonProps} sx={refreshRefineBtnStyle} />

          </div>
        )}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-4 px-12 mt-8 gap-y-4 gap-x-4">
              {summaryfields.map((field) => (
                <div className="flex flex-col gap-1">
                  <div className="text-[#778599]">{field.title}</div>
                  <div className="text-[#515f72] text-xl font-medium">
                    {getNestedValue(asset, field.key)}
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
                      value: asset?.asset_id,
                    },
                    {
                      label: "active",
                      value: asset?.active ? "Yes" : "No",
                    },
                    {
                      label: "License Key",
                      value: asset?.license_key,
                    },
                    {
                      label: "License Key",
                      value: asset?.license_key,
                    },
                    {
                      label: "Organization",
                      value: asset?.organization,
                    },
                    {
                      label: "Bill Customer",
                      value: asset?.bill_customer,
                    },
                    {
                      label: "Ship Customer",
                      value: asset?.ship_customer,
                    },
                    {
                      label: "Reseller",
                      value: asset?.reseller,
                    },
                    {
                      label: "Start Date",
                      value: asset?.start_date,
                    },
                    {
                      label: "End Date",
                      value: asset?.end_date,
                    },
                    {
                      label: "OSC Seat Count",
                      value: asset?.osc_seat_count?.toString(),
                    },
                    {
                      label: "License Server Seat Count",
                      value: asset?.license_server_seat_count?.toString(),
                    },
                    {
                      label: "Active Seats",
                      value: asset?.active_seats?.toString(),
                    },
                    {
                      label: "Renewal Seats",
                      value: asset?.renewal_seats?.toString(),
                    },
                    {
                      label: "Revoked Seats",
                      value: asset?.revoked_seats?.toString(),
                    },
                    {
                      label: "Suspended Seats",
                      value: asset?.suspended_seats?.toString(),
                    },
                    {
                      label: "Terminated Seats",
                      value: asset?.terminated_seats?.toString(),
                    },
                    {
                      label: "Expired Seats",
                      value: asset?.expired_seats?.toString(),
                    },
                  ]}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <GeneralInformation
                  singleColumn={true}
                  items={[
                    {
                      label: "Product ID",
                      value: asset?.osc_product?.product_id,
                    },
                    {
                      label: "Product Name",
                      value: asset?.osc_product?.product_id,
                    },
                    {
                      label: "Product Part Number",
                      value: asset?.osc_product?.product_part_number,
                    },
                    {
                      label: "Product Description",
                      value: asset?.osc_product?.product_description,
                    },
                    {
                      label: "Product Type",
                      value: asset?.osc_product?.product_type,
                    },
                    {
                      label: "Vender Name",
                      value: asset?.osc_product?.vendor_name,
                    },
                    {
                      label: "Vendor Part Number",
                      value: asset?.osc_product?.vendor_part_number,
                    },
                    {
                      label: "Active",
                      value: asset?.osc_product?.active,
                    },
                    {
                      label: "Duration",
                      value: asset?.osc_product?.duration,
                    },
                    {
                      label: "Eval Set name",
                      value: asset?.osc_product?.eval_set_name,
                    },
                    {
                      label: "License Source Set",
                      value: asset?.osc_product?.license_source_set,
                    },
                    {
                      label: "New Set Name",
                      value: asset?.osc_product?.new_set_name,
                    },
                    {
                      label: "Organization",
                      value: asset?.osc_product?.organization,
                    },
                    {
                      label: "Attribute1",
                      value: asset?.osc_product?.attribute1,
                    },
                    {
                      label: "Attribute2",
                      value: asset?.osc_product?.attribute2,
                    },
                    {
                      label: "Attribute3",
                      value: asset?.osc_product?.attribute3,
                    },
                    {
                      label: "Attribute4",
                      value: asset?.osc_product?.attribute4,
                    },
                    {
                      label: "Attribute5",
                      value: asset?.osc_product?.attribute5,
                    },
                  ]}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <GeneralInformation
                  singleColumn={true}
                  items={[
                    {
                      label: "Account",
                      value: asset?.owner?.account,
                    },
                    {
                      label: "Account ID",
                      value: asset?.owner?.account_id,
                    },
                    {
                      label: "Address",
                      value: asset?.owner?.address,
                    },
                    {
                      label: "Address1",
                      value: asset?.owner?.contact?.address?.address1,
                    },
                    {
                      label: "Address2",
                      value: asset?.owner?.contact?.address?.address2,
                    },
                    {
                      label: "Address ID",
                      value: asset?.owner?.contact?.address?.address_id,
                    },
                    {
                      label: "City",
                      value: asset?.owner?.contact?.address?.city,
                    },
                    {
                      label: "Country",
                      value: asset?.owner?.contact?.address?.country,
                    },
                    {
                      label: "Postal Code",
                      value: asset?.owner?.contact?.address?.postal_code,
                    },
                    {
                      label: "State",
                      value: asset?.owner?.contact?.address?.state,
                    },
                    {
                      label: "Contact ID",
                      value: asset?.owner?.contact?.contact_id,
                    },
                    {
                      label: "Contact Email",
                      value: asset?.owner?.contact?.email,
                    },
                    {
                      label: "Contact Phone",
                      value: asset?.owner?.contact?.phone,
                    },
                    {
                      label: "Contact First Name",
                      value: asset?.owner?.contact?.first_name,
                    },
                    {
                      label: "Contact Last Name",
                      value: asset?.owner?.contact?.last_name,
                    },
                    {
                      label: "Organization",
                      value: asset?.owner?.organization,
                    },
                  ]}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <div className="max-w-full overflow-x-auto">
                  <TransactionHistoryTable transactions={transactions} />
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
          </>
        )}
      </Show>
    </div>
  );
};

export default Page;
