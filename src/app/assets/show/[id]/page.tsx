"use client";

import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import Link from "next/link";
import GeneralInformation from "@components/common/View/GeneralInformation";
import { Asset, Seat } from "@/types/types";
import GeneralInformationIcon from "@/assets/icons/generalinfo.svg?icon";
import TransactionIcon from "@/assets/icons/transaction.svg?icon";
import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import Grid from "@mui/material/Unstable_Grid2";
import GenericTable from "@components/Table/GenericTable";
import { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import LicenseIcon from "@/assets/icons/license.svg?icon";
import AssetIcon from "@/assets/icons/asset.svg?icon"

const Page = () => {
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

  return (
    <Show
      goBack={
        <Link
          href={"/assets"}
          className="inline-block mx-2 p-2 rounded-xl border duration-500 border-transparent hover:border-black"
        >
          <ArrowIcon />
        </Link>
      }
      isLoading={isLoading}
      breadcrumb={false}
      wrapperProps={{ className: "pt-6" }}
      title={
        <div className="!font-satoshi text-xl font-semibold text-black flex items-center">
          Asset {asset?.license_key}
        </div>
      }
      children={
        <div>
          <Grid container spacing={1}>
            <Grid xs={7}>
              <Grid container direction={"column"} spacing={1}>
                <Grid>
                  <GeneralInformation
                    header="General information"
                    headerIcon={<GeneralInformationIcon />}
                    singleColumn={true}
                    className="bg-gray px-2 py-2"
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
                </Grid>
                <Grid>
                  <GeneralInformation
                    header="Last transaction detail"
                    headerIcon={<TransactionIcon />}
                    singleColumn={true}
                    className="bg-gray px-2 py-2"
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
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={5}>
              <GeneralInformation
                header="Asset status"
                headerIcon={<AssetIcon />}
                singleColumn={true}
                className="bg-gray px-2 py-2"
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
            </Grid>
          </Grid>
          <div className="flex flex-col gap-10 mt-6">
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
          </div>
        </div>
      }
    ></Show>
  );
};

export default Page;
