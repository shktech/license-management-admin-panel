"use client";

import { Permission, Transaction } from "@/types/types";
import ShowTransaction from "@components/Transactions/Show/ShowTransaction";
import Loader from "@components/common/Loader";
import { TxtActionColor, TxtStatusColor, TxtTypeColor } from "@data/ColorData";
import {
  editRefineBtnStyle,
  refreshRefineBtnStyle,
  tagStyle,
} from "@data/MuiStyles";
import { Box } from "@mui/material";
import { useNavigation, usePermissions, useShow } from "@refinedev/core";
import { EditButton, RefreshButton, Show } from "@refinedev/mui";
import { useParsed } from "@refinedev/core";

const TransactionShow = () => {
  const { params } = useParsed();
  const { queryResult } = useShow<Transaction>({
    resource: "transactions",
    id: params?.id,
  });
  const { data, isLoading } = queryResult;
  const { data: permissionsData } = usePermissions<Permission>({
    params: { codename: "transaction" },
  });

  const { push } = useNavigation();

  const transaction = data?.data;

  const getButtonProps = (editButtonProps: any, refreshButtonProps: any) => {
    return (
      <div className="flex gap-2 px-12">
        {transaction?.transaction_status != "Completed" &&permissionsData?.update && (
          <EditButton {...editButtonProps} onClick={() => push(`/dashboard/transactions/edit?id=${params?.id}`)} sx={editRefineBtnStyle} />
        )}
        <RefreshButton {...refreshButtonProps} sx={refreshRefineBtnStyle} />
      </div>
    );
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
            <div className="flex gap-4 items-end">
              <div className="text-2xl font-semibold text-[#515f72]">
                Transaction {transaction?.transaction_number}
              </div>
              <Box
                component="span"
                sx={{
                  backgroundColor:
                    TxtTypeColor[transaction?.asset?.license_type as string],
                  ...tagStyle,
                }}
              >
                {transaction?.asset?.license_type}
              </Box>
              <Box
                component="span"
                sx={{
                  backgroundColor:
                    TxtActionColor[transaction?.transaction_action as string],
                  ...tagStyle,
                }}
              >
                {transaction?.transaction_action}
              </Box>
              <Box
                component="span"
                sx={{
                  backgroundColor:
                    TxtStatusColor[transaction?.transaction_status as string],
                  ...tagStyle,
                }}
              >
                {transaction?.transaction_status}
              </Box>
            </div>
          </div>
        }
        headerButtons={({ editButtonProps, refreshButtonProps }) =>
          getButtonProps(editButtonProps, refreshButtonProps)
        }
      >
        {isLoading ? <Loader /> : <ShowTransaction transaction={transaction} />}
      </Show>
    </div>
  );
};

export default TransactionShow;
