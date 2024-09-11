"use client";

import { Asset, Seat, Transaction } from "@/types/types";
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
import { useNavigation, useParsed, useShow } from "@refinedev/core";
import { RefreshButton, Show } from "@refinedev/mui";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo, useState } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import EmailHistoryTable from "@components/Assets/EmailHistoryTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCube,
  faCubes,
  faEnvelope,
  faGlassWater,
  faTentArrowLeftRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Page = () => {
  const { params } = useParsed();
  const [value, setValue] = useState(0);
  const { push } = useNavigation();

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
    const path = "/dashboard/transactions/create?"; // your target route
    const queryParams = {
      asset_id: asset.asset_id as string,
      transaction_action: action,
    };

    // Navigate to the path with the query parameters
    push(path + new URLSearchParams(queryParams).toString());
  };

  const SeatsColumns = useMemo<MRT_ColumnDef<Seat>[]>(
    () => [
      {
        accessorKey: "seat_id",
        header: "Seat Number",
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
        accessorKey: "vendor_part_number",
        header: "Vendor part number",
      },
      {
        accessorKey: "start_date",
        header: "Start Date",
      },
      {
        accessorKey: "end_date",
        header: "End Date",
      },
    ],
    []
  );

  const summaryfields = [
    { title: "Start Date", key: "start_date" },
    { title: "End Date", key: "end_date" },
    { title: "License Key", key: "license_key" },
    { title: "Owner Name", key: "owner.name" },
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
          className: "rounded-none bg-[#f2f6fa] shadow-none pt-10 pb-2.5",
        }}
        title={
          <div className="!font-satoshi px-12">
            <div className="flex items-end gap-4 text-2xl font-semibold text-[#1f325c]">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faGlassWater} />
                License{" "}
              </div>
              <div className="text-lg font-normal">{asset?.license_key}</div>
            </div>
          </div>
        }
        headerButtons={({ refreshButtonProps }) => (
          <div className="flex gap-2 pr-10">
            <Button
              sx={refreshRefineBtnStyle}
              onClick={() => handleReActionBtn("Renewal")}
            >
              <AutorenewIcon fontSize="small" />
              Renew
            </Button>
            <Button
              sx={refreshRefineBtnStyle}
              onClick={() => handleReActionBtn("Revoke")}
            >
              <AutorenewIcon fontSize="small" />
              Revoke
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
                  <StyledTab
                    label={
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCircleInfo} />
                        General Information
                      </div>
                    }
                  />
                  <StyledTab
                    label={
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCubes} />
                        Products
                      </div>
                    }
                  />
                  <StyledTab
                    label={
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faUser} />
                        License Status
                      </div>
                    }
                  />
                  <StyledTab
                    label={
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faTentArrowLeftRight} />
                        Transaction History
                      </div>
                    }
                  />
                  <StyledTab
                    label={
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faEnvelope} />
                        Email History
                      </div>
                    }
                  />
                  <StyledTab
                    label={
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCube} />
                        Seats
                      </div>
                    }
                  />
                </StyledTabs>
              </div>

              <CustomTabPanel value={value} index={0}>
                <GeneralInformation
                  singleColumn={true}
                  items={[
                    {
                      label: "Active",
                      value: (
                        <div
                          className={`rounded-full h-4 w-4 ${asset?.active ? "bg-[#11ba82]" : "bg-[#929ea8]"}`}
                        ></div>
                      ),
                    },
                    {
                      label: "License Key",
                      value: asset?.license_key,
                    },
                    {
                      label: "Bill Customer",
                      value: asset?.bill_customer?.name,
                    },
                    {
                      label: "Reseller",
                      value: asset?.reseller?.name,
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
                      label: "Product Name",
                      value: asset?.osc_product?.product_name,
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
                      value: (
                        <div
                          className={`rounded-full h-4 w-4 ${asset?.osc_product?.active ? "bg-[#11ba82]" : "bg-[#929ea8]"}`}
                        ></div>
                      ),
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
                      value: asset?.owner?.account_id,
                    },
                    {
                      label: "Address1",
                      value: asset?.ship_customer_address?.address1,
                    },
                    {
                      label: "Address2",
                      value: asset?.ship_customer_address?.address2,
                    },
                    {
                      label: "City",
                      value: asset?.ship_customer_address?.city,
                    },
                    {
                      label: "Country",
                      value: asset?.ship_customer_address?.country,
                    },
                    {
                      label: "Postal Code",
                      value: asset?.ship_customer_address?.postal_code,
                    },
                    {
                      label: "State",
                      value: asset?.ship_customer_address?.state,
                    },
                    {
                      label: "Contact Email",
                      value: asset?.ship_customer_contact?.email,
                    },
                    {
                      label: "Contact Phone",
                      value: asset?.ship_customer_contact?.phone,
                    },
                    {
                      label: "Contact First Name",
                      value: asset?.ship_customer_contact?.first_name,
                    },
                    {
                      label: "Contact Last Name",
                      value: asset?.ship_customer_contact?.last_name,
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
                  <EmailHistoryTable assetId={asset.asset_id as string} />
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={5}>
                <div className="max-w-full overflow-x-auto">
                  <GenericTable
                    data={seats}
                    title={
                      <div className="!font-satoshi px-12 py-4 text-2xl font-semibold text-[#1f325c] flex items-center gap-2">
                        <FontAwesomeIcon icon={faCube} />
                        Seats
                      </div>
                    }
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
