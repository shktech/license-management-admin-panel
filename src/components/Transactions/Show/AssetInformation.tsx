'use client'

import { Transaction } from '@/types/types';
import GeneralInformation from '@components/common/View/GeneralInformation';
interface AssetInformationProps {
    transaction?: Transaction;
}

const AssetInformation: React.FC<AssetInformationProps> = ({ transaction }) => {

    return (
        <GeneralInformation
            singleColumn
            items={[
                {
                    label: "License ID",
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
                    value: transaction?.asset?.organization?.organization_name
                },
                {
                    label: "Bill Customer",
                    value: transaction?.bill_customer?.account
                },
                {
                    label: "Ship Customer",
                    value: transaction?.ship_customer?.account
                },
                {
                    label: "Reseller",
                    value: transaction?.reseller?.account
                },
                {
                    label: "Active Seats",
                    value: transaction?.asset?.active_seats?.toString()
                },
                {
                    label: "Expired Seats",
                    value: transaction?.asset?.expired_seats?.toString()
                },
                {
                    label: "License Server Seat Count",
                    value: transaction?.asset?.license_server_seat_count?.toString()
                },
                {
                    label: "OSC Seat Count",
                    value: transaction?.asset?.osc_seat_count?.toString()
                },
                {
                    label: "Renewal Seats",
                    value: transaction?.asset?.renewal_seats?.toString()
                },
                {
                    label: "Revoked Seats",
                    value: transaction?.asset?.revoked_seats?.toString()
                },
                {
                    label: "Suspended Seats",
                    value: transaction?.asset?.suspended_seats?.toString()
                },
                {
                    label: "Terminated Seats",
                    value: transaction?.asset?.terminated_seats?.toString()
                },
            ]}
        >
        </GeneralInformation>
    )
};

export default AssetInformation;
