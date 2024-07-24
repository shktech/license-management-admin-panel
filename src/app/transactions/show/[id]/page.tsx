"use client";

import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import Link from "next/link";
import GeneralInformation from "@components/common/View/GeneralInformation";
import { Transaction } from "@/types/types";
import GeneralInformationIcon from "@/assets/icons/generalinfo.svg?icon";
import AssetIcon from "@/assets/icons/asset.svg?icon";
import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import Grid from "@mui/material/Unstable_Grid2";

const TransactionShow = () => {
  const { queryResult } = useShow<Transaction>();
  const { data, isLoading } = queryResult;

  const transaction = data?.data;

  return (
    <Show
      goBack={
        <Link
          href={"/transactions"}
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
          Transaction {transaction?.transaction_number}
        </div>
      }
      children={
        <Grid container spacing={1}>
          <Grid>
            <GeneralInformation
              header="Transaction information"
              headerIcon={<GeneralInformationIcon />}
              className="bg-gray px-8 py-4"
              items={[
                {
                  label: "Transaction date",
                  value: transaction?.transaction_date,
                },
                {
                  label: "Transaction source",
                  value: transaction?.transaction_source,
                },
                {
                  label: "Transaction type",
                  value: transaction?.transaction_type,
                },
                {
                  label: "Transaction action",
                  value: transaction?.transaction_action,
                },
                {
                  label: "Transaction status",
                  value: transaction?.transaction_status,
                },
                {
                  label: "Transaction quantity (seats)",
                  value: transaction?.quantity,
                },
                {
                  label: "UOM (Duration / Each)",
                  value: transaction?.osc_product?.duration,
                },
                {
                  label: "Source ref number",
                  value: transaction?.source_reference_number,
                },
                {
                  label: "Source ref date",
                  value: transaction?.source_reference_date,
                },
                {
                  label: "Notificate date",
                  value: transaction?.notification_date,
                },
                {
                  label: "Error message",
                  value: transaction?.error_message,
                },
                {
                  label: "Asset number",
                  value: transaction?.asset?.license_key,
                },
                {
                  label: "Product part number",
                  value: transaction?.osc_product?.osc_part_number,
                },
                {
                  label: "Asset type",
                  value: transaction?.osc_product?.product_type,
                },
                {
                  label: "Vendor name",
                  value: transaction?.osc_product?.vendor_name,
                },
                {
                  label: "Vendor part number",
                  value: transaction?.osc_product?.vendor_part_number,
                },
                {
                  label: "Reference code",
                  value: transaction?.reference_code,
                },
                {
                  label: "Start date",
                  value: transaction?.start_date,
                },
                {
                  label: "End date",
                  value: transaction?.end_date,
                },
              ]}
            />
          </Grid>
          <Grid>
            <GeneralInformation
              header="Asset status"
              headerIcon={<AssetIcon />}
              className="bg-gray px-8 py-4"
              items={[
                {
                  label: "Asset ID",
                  value: transaction?.asset?.id,
                },
                {
                  label: "Asset number (License Key / Serial Number)",
                  value: transaction?.asset?.license_key,
                },
                {
                  label: "Active",
                  value: transaction?.asset?.active,
                },
                {
                  label: "Product part number",
                  value: transaction?.osc_product?.osc_part_number,
                },
                {
                  label: "Vendor part number",
                  value: transaction?.osc_product?.vendor_part_number,
                },
                {
                  label: "Seats",
                  value: transaction?.asset?.osc_seat_count,
                },
                {
                  label: "Duration",
                  value: transaction?.osc_product?.duration,
                },
                {
                  label: "Start date",
                  value: transaction?.asset?.start_date,
                },
                {
                  label: "End date",
                  value: transaction?.asset?.end_date,
                },
              ]}
            />
          </Grid>
        </Grid>
      }
    ></Show>
  );
};

export default TransactionShow;
