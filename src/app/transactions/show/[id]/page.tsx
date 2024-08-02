"use client";

import { useShow } from "@refinedev/core";
import Link from "next/link";
import GeneralInformation from "@components/common/View/GeneralInformation";
import { Transaction } from "@/types/types";
import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { TxtActionColor, TxtStatusColor, TxtTypeColor } from "@data/ColorData";
import { Box, Button } from "@mui/material";
import { deleteRefineBtnStyle, editRefineBtnStyle, modalOkBtnStyle, refineBtnStyle, refreshRefineBtnStyle, tagStyle } from "@data/MuiStyles";
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import {
  Show,
  ListButton,
  EditButton,
  DeleteButton,
  RefreshButton,
} from "@refinedev/mui";

const TransactionShow = () => {
  const { queryResult } = useShow<Transaction>();
  const { data, isLoading } = queryResult;

  const transaction = data?.data;

  return (
    <Show
      goBack={<Link href={"/transactions"} className="inline-block mx-2 p-2 rounded-xl border duration-500 border-transparent hover:border-black"> <ArrowIcon /></Link>}
      isLoading={isLoading}
      breadcrumb={false}
      wrapperProps={{ className: "pt-6" }}
      title={
        <div className="!font-satoshi text-2xl font-semibold text-[#536175] flex items-center">
          Transaction {transaction?.transaction_number}
        </div>
      }
      headerButtons={({
        deleteButtonProps,
        editButtonProps,
        refreshButtonProps,
      }) => (
        <div className="flex gap-2 pr-10">
          <EditButton {...editButtonProps} sx={editRefineBtnStyle}/>
          <DeleteButton {...deleteButtonProps} sx={deleteRefineBtnStyle}/>
          <RefreshButton {...refreshButtonProps} sx={refreshRefineBtnStyle}/>
        </div>
      )}
    >
      <div className="flex">
        <GeneralInformation
          header="Transaction information"
          headerIcon={<FeedOutlinedIcon />}
          singleColumn
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
              value: (
                <Box component="span" sx={{ backgroundColor: TxtTypeColor[transaction?.transaction_type as string], ...tagStyle }} >
                  {transaction?.transaction_type}
                </Box>
              )
            },
            {
              label: "Transaction action",
              value: (
                <Box component="span" sx={{ backgroundColor: TxtActionColor[transaction?.transaction_action as string], ...tagStyle }} >
                  {transaction?.transaction_action}
                </Box>
              )
            },
            {
              label: "Transaction status",
              value: (
                <Box component="span" sx={{ backgroundColor: TxtStatusColor[transaction?.transaction_status as string], ...tagStyle }} >
                  {transaction?.transaction_status}
                </Box>
              )
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
        <GeneralInformation
          header="Asset status"
          headerIcon={<DatasetOutlinedIcon />}
          singleColumn
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
              value: <div className={`w-4 h-4 rounded-full ${transaction?.asset?.active ? 'bg-active' : 'bg-inactive'}`}></div>
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
      </div>
    </Show>
  );
};

export default TransactionShow;
