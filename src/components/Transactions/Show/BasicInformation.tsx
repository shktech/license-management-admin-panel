'use client'

import { Transaction } from '@/types/types';
import GeneralInformation from '@components/common/View/GeneralInformation';
import { TxtActionColor, TxtStatusColor } from '@data/ColorData';
import { tagStyle } from '@data/MuiStyles';
import { Box } from '@mui/material';
import { getFormattedDate } from '@utils/utilFunctions';

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
                    label: "Transaction ID",
                    value: transaction?.transaction_id,
                },
                {
                    label: "Transaction date",
                    value: getFormattedDate(transaction?.transaction_date),
                },
                {
                    label: "Transaction source",
                    value: transaction?.transaction_source,
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
                    label: "Transaction action",
                    value: (
                        <Box component="span" sx={{ backgroundColor: TxtActionColor[transaction?.transaction_action as string], ...tagStyle }} >
                            {transaction?.transaction_action}
                        </Box>
                    )
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
                    label: "Notification Date",
                    value: transaction?.notification_date,
                },
                {
                    label: "Quantity",
                    value: transaction?.quantity,
                },
                {
                    label: "Start Date",
                    value: getFormattedDate(transaction?.start_date),
                },
                {
                    label: "End Date",
                    value: getFormattedDate(transaction?.end_date as string),
                },
                {
                    label: "Comments",
                    value: transaction?.comments,
                },
                {
                    label: "Error Message",
                    value: transaction?.error_message,
                },
                {
                    label: "Organization",
                    value: transaction?.organization,
                },
            ]}
        ></GeneralInformation>
    )
};

export default BasicInformation;