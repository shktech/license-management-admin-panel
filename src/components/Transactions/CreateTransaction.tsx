"use client";

import React, { useEffect } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { Create, SaveButton } from "@refinedev/mui";
import { Customer, InputTransaction, Product } from "@/types/types";
// import TransactionForm from "@components/Forms/Transactions/TransactionForm";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { useBack, useList, useOne } from "@refinedev/core";
import { getDurationFromString, getInputCustomer } from "@utils/utilFunctions";
import TransactionForm from "@components/Forms/Transactions/TransactionForm";
import { Button } from "@mui/material";

interface ShowTransactionProps {
    initialInfo: any
}

const CreateTransaction: React.FC<ShowTransactionProps> = ({ initialInfo }) => {
    const {
        saveButtonProps,
        refineCore: { formLoading, queryResult },
        control,
        trigger,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<InputTransaction>();

    useEffect(() => {
        const nowDateString = (new Date()).toISOString().split('T')[0];
        const resetTransaction: InputTransaction = {
            source_reference_date: nowDateString,
            start_date: nowDateString,
            end_date: nowDateString,
            ...initialInfo
        };
        console.log(resetTransaction);
        reset({ ...resetTransaction });
    }, []);

    const { data: productData, isLoading: productLoading } = useList<Product>({
        resource: "products",
        hasPagination: false
    });

    const { data: billCustomerData, isLoading: billLoading } = useOne<Customer>({
        resource: "customers/bill-customers",
        id: initialInfo.bill_customer
    });

    const { data: shipCustomerData, isLoading: shipLoading } = useOne<Customer>({
        resource: "customers/ship-customers",
        id: initialInfo.ship_customer
    });

    const { data: resellerData, isLoading: resellerLoading } = useOne<Customer>({
        resource: "customers/resellers",
        id: initialInfo.reseller
    });

    useEffect(() => {
        if (!billLoading) {
            const realData = billCustomerData?.data as Customer;
            handleReset(realData, 'bill_');
        }
    }, [billLoading])

    useEffect(() => {
        if (!shipLoading) {
            const realData = shipCustomerData?.data as Customer;
            handleReset(realData, 'ship_');
        }
    }, [shipLoading])

    useEffect(() => {
        if (!resellerLoading) {
            const realData = resellerData?.data as Customer;
            handleReset(realData, 'reseller_');
        }
    }, [resellerLoading])

    const handleReset = (value: Customer, prefix: string) => {
        Object.keys(getInputCustomer(value, prefix)).forEach(key => {
            setValue(key, getInputCustomer(value, prefix)[key])
        })
        // reset(getInputCustomer(value, prefix));
        console.log(getInputCustomer(value, prefix))
    }

    const start_date = watch('start_date');
    const osc_part_number = watch('osc_part_number');

    useEffect(() => {
        let duration;
        if (productData?.data) {
            duration = productData.data.find(p => p.product_part_number == osc_part_number)?.duration;
        }
        if (start_date) {
            const originalDate = new Date(start_date);
            originalDate.setFullYear(originalDate.getFullYear() + getDurationFromString(duration as string));
            const end_date = originalDate.toISOString().split('T')[0];
            setValue('end_date', end_date);
        }
    }, [start_date, osc_part_number])

    return (
        <Create
            goBack={<button onClick={useBack()} className="inline-block mx-2 p-2 rounded-xl border duration-500 border-transparent hover:border-black"> <ArrowIcon /></button>}
            breadcrumb={false}
            headerButtons={<></>}
            title={
                <div className="!font-satoshi text-2xl font-semibold text-[#536175] flex items-center">
                    Create Transaction
                </div>
            }
            saveButtonProps={{ ...saveButtonProps, hidden: false }}
            footerButtons={({ saveButtonProps }) => (
                <SaveButton {...saveButtonProps} sx={sendEmailBtnStyle} />
            )}
        >
            {formLoading || productLoading ? (
                <Loader />
            ) : (
                <div className="bg-white px-8 rounded-xl">
                    <TransactionForm {...{ control, errors, trigger }} transaction_action={initialInfo.transaction_action} setValue={setValue} watch={watch} />
                </div>
            )}
        </Create>
    );
};

export default CreateTransaction;