"use client";

import { useShow } from "@refinedev/core";
import Link from "next/link";
import GeneralInformation from "@components/common/View/GeneralInformation";
import { Customer, Permission, Transaction } from "@/types/types";
import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { TxtActionColor, TxtStatusColor, TxtTypeColor } from "@data/ColorData";
import { alpha, Box, Button, Menu, MenuItem, MenuProps, styled } from "@mui/material";
import { deleteRefineBtnStyle, editRefineBtnStyle, refreshRefineBtnStyle, tagStyle } from "@data/MuiStyles";
import {
  Show,
  EditButton,
  DeleteButton,
  RefreshButton,
} from "@refinedev/mui";
import { usePermissions } from "@refinedev/core";
import { useState } from "react";
import { CustomTabPanel, StyledTab, StyledTabs } from "@components/Tab/CustomizedTab";
import { getFormattedDate, getTitleCase } from "@utils/utilFunctions";
import BasicInformation from "@components/Transactions/Show/BasicInformation";
import AssetInformation from "@components/Transactions/Show/AssetInformation";
import CustomerInformation from "@components/Transactions/Show/CustomerInformation";
import ShowTransaction from "@components/Transactions/Show/ShowTransaction";
import Loader from "@components/common/Loader";

const TransactionShow = () => {

  const { queryResult } = useShow<Transaction>();
  const { data, isLoading } = queryResult;
  const { data: permissionsData } = usePermissions<Permission>({ params: { codename: "transaction" } });

  const transaction = data?.data;

  return (
    <div className="no-padding-card">
      <Show
        goBack={null}
        isLoading={isLoading}
        breadcrumb={false}
        wrapperProps={{ className: "rounded-none bg-[#f2f6fa] shadow-none pt-8 pb-2.5" }}
        title={
          <div className="!font-satoshi px-12">
            <div className="flex gap-4 items-center">
              <div className="text-2xl font-semibold text-[#515f72]">Transaction {transaction?.transaction_number}</div>
              <Box component="span" sx={{ backgroundColor: TxtTypeColor[transaction?.asset?.license_type as string], ...tagStyle }} >
                {transaction?.asset?.license_type}
              </Box>
              <Box component="span" sx={{ backgroundColor: TxtActionColor[transaction?.transaction_action as string], ...tagStyle }} >
                {transaction?.transaction_action}
              </Box>
              <Box component="span" sx={{ backgroundColor: TxtStatusColor[transaction?.transaction_status as string], ...tagStyle }} >
                {transaction?.transaction_status}
              </Box>
            </div>
          </div>
        }
        headerButtons={({
          editButtonProps,
          refreshButtonProps,
        }) => (
          <div className="flex gap-2 px-12">
            {permissionsData?.update && <EditButton {...editButtonProps} sx={editRefineBtnStyle} />}
            <RefreshButton {...refreshButtonProps} sx={refreshRefineBtnStyle} />
            <div>
            </div>
          </div>
        )}
      >
        { isLoading ? <Loader /> : <ShowTransaction transaction={transaction} /> }
      </Show>
    </div >
  );
};

export default TransactionShow;
