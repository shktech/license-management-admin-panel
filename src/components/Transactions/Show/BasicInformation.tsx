"use client";

import { Transaction } from "@/types/types";
import GeneralInformation from "@components/common/View/GeneralInformation";
import { TxtActionColor, TxtStatusColor } from "@data/ColorData";
import { tagStyle } from "@data/MuiStyles";
import { Box } from "@mui/material";
import { getFormattedDate } from "@utils/utilFunctions";

interface BasicInformationProps {
  transaction?: Transaction;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ transaction }) => {
  return (
    <GeneralInformation
      singleColumn
      items={[
        {
          label: "Transaction Number",
          value: transaction?.transaction_number,
        },
        {
          label: "Transaction date",
          value: getFormattedDate(transaction?.transaction_date),
        },
        {
          label: "Transaction action",
          value: (
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
          ),
        },
        {
          label: "Transaction status",
          value: (
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
          ),
        },
        {
          label: "Comments",
          value: transaction?.comments,
        },
        {
          label: "Notification Date",
          value: transaction?.notification_date,
        },
        {
          label: "Transaction source",
          value: transaction?.transaction_source,
        },
        {
          label: "Source ref number",
          value: transaction?.source_reference_number,
        },
        {
          label: "Source ref date",
          value: getFormattedDate(transaction?.source_reference_date),
        },
        {
          label: "Source ref ID",
          value: transaction?.source_reference_id,
        },
        {
          label: "Source Integration Status",
          value: transaction?.source_integration_status,
        },
        {
          label: "Source Integration Error",
          value: transaction?.source_integration_error,
        },
        {
          label: "Error Message",
          value: transaction?.error_message,
        },
      ]}
    ></GeneralInformation>
  );
};

export default BasicInformation;
