'use client'

import { Customer, Transaction } from '@/types/types';
import GeneralInformation from '@components/common/View/GeneralInformation';
import { TxtActionColor, TxtStatusColor } from '@data/ColorData';
import { tagStyle } from '@data/MuiStyles';
import { Box } from '@mui/material';
import { getFormattedDate } from '@utils/utilFunctions';

interface CustomerInformationProps {
    transaction?: Transaction;
    type: string;
}

const CustomerInformation: React.FC<CustomerInformationProps> = ({ transaction, type }) => {
    return (
        <GeneralInformation
            singleColumn
            items={[
                {
                    label: "Account",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.account
                },
                {
                    label: "Address1",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.contact?.address?.address1
                },
                {
                    label: "Address2",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.contact?.address?.address2
                },
                {
                    label: "City",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.contact?.address?.city
                },
                {
                    label: "State",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.contact?.address?.state
                },
                {
                    label: "Postal Code",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.contact?.address?.postal_code
                },
                {
                    label: "Country",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.contact?.address?.country
                },
                {
                    label: "First Name",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.contact?.first_name
                },
                {
                    label: "Last Name",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.contact?.last_name
                },
                {
                    label: "Contact Phone",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.contact?.phone
                },
                {
                    label: "Contact Email",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.contact?.email
                },

            ]}
        >
        </GeneralInformation>
    )
};

export default CustomerInformation;
