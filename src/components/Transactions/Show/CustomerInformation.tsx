'use client'

import { Customer, Transaction } from '@/types/types';
import GeneralInformation from '@components/common/View/GeneralInformation';

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
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.address1
                },
                {
                    label: "Address2",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.address2
                },
                {
                    label: "City",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.city
                },
                {
                    label: "State",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.state
                },
                {
                    label: "Postal Code",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.postal_code
                },
                {
                    label: "Country",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.country
                },
                {
                    label: "First Name",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.first_name
                },
                {
                    label: "Last Name",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.last_name
                },
                {
                    label: "Contact Phone",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.phone
                },
                {
                    label: "Contact Email",
                    value: (transaction?.[type as keyof Transaction] as Partial<Customer>)?.email
                },

            ]}
        >
        </GeneralInformation>
    )
};

export default CustomerInformation;
