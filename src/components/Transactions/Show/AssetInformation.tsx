'use client'

import { Transaction } from '@/types/types';
import GeneralInformation from '@components/common/View/GeneralInformation';
import { TxtActionColor, TxtStatusColor } from '@data/ColorData';
import { tagStyle } from '@data/MuiStyles';
import { Box } from '@mui/material';
import { getFormattedDate } from '@utils/utilFunctions';

interface AssetInformationProps {
    transaction?: Transaction;
}

const AssetInformation: React.FC<AssetInformationProps> = ({ transaction }) => {

    return (
        <GeneralInformation
            singleColumn
            items={[
                {
                    label: "Asset ID",
                    value: transaction?.asset?.asset_id
                },
                {
                    label: "License Key",
                    value: transaction?.asset?.license_key
                },
                {
                    label: "License Type",
                    value: transaction?.asset?.license_type
                },
                {
                    label: "Start Date",
                    value: transaction?.asset?.start_date
                },
                {
                    label: "End Date",
                    value: transaction?.asset?.end_date
                },
                {
                    label: "Active",
                    value: <div className={`rounded-full h-4 w-4 ${transaction?.asset?.active ? 'bg-[#11ba82]' : 'bg-[#929ea8]'}`}></div>
                },
                {
                    label: "Organization",
                    value: transaction?.asset?.organization
                },
                {
                    label: "Bill Customer",
                    value: transaction?.asset?.bill_customer
                },
                {
                    label: "Ship Customer",
                    value: transaction?.asset?.ship_customer
                },
                {
                    label: "Reseller",
                    value: transaction?.asset?.reseller
                },
                {
                    label: "Active Seats",
                    value: transaction?.asset?.active_seats
                },
                {
                    label: "Expired Seats",
                    value: transaction?.asset?.expired_seats
                },
                {
                    label: "License Server Seat Count",
                    value: transaction?.asset?.license_server_seat_count
                },
                {
                    label: "OSC Seat Count",
                    value: transaction?.asset?.osc_seat_count
                },
                {
                    label: "Renewal Seats",
                    value: transaction?.asset?.renewal_seats
                },
                {
                    label: "Revoked Seats",
                    value: transaction?.asset?.revoked_seats
                },
                {
                    label: "Suspended Seats",
                    value: transaction?.asset?.suspended_seats
                },
                {
                    label: "Terminated Seats",
                    value: transaction?.asset?.terminated_seats
                },
            ]}
        >
        </GeneralInformation>
    )
};

export default AssetInformation;
