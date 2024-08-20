"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { InputTransaction, Product, Transaction } from "@/types/types";
import TransactionForm from "@components/Forms/Transactions/TransactionForm";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { useBack, useList, useParsed } from "@refinedev/core";
import { Edit, SaveButton } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { getDurationFromString } from "@utils/utilFunctions";
import { useEffect, useState } from "react";

const TransactionEdit = () => {
  const { params } = useParsed();
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    reset,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Transaction>({
    refineCoreProps: {
      action: "edit",
      resource: "transactions",
      id: params?.id,
    },
  });

  const { data: productData, refetch, isLoading: productLoading } = useList<Product>({
    resource: "products",
    hasPagination: false
  });

  const transaction: Transaction = queryResult?.data?.data as Transaction;

  useEffect(() => {
    if (!formLoading && transaction) {
      const resetTransaction: InputTransaction = {
        transaction_source: transaction.transaction_source,
        transaction_action: transaction.transaction_action,
        license_type: transaction.asset?.license_type,
        source_reference_number: transaction.source_reference_number,
        source_reference_date: transaction.source_reference_date,
        source_reference_id: transaction.source_reference_id,
        bill_customer_account: transaction.bill_customer?.account,
        bill_address1: transaction.bill_customer?.contact?.address?.address1,
        bill_address2: transaction.bill_customer?.contact?.address?.address2,
        bill_city: transaction.bill_customer?.contact?.address?.city,
        bill_state: transaction.bill_customer?.contact?.address?.state,
        bill_postal_code: transaction.bill_customer?.contact?.address?.postal_code,
        bill_country: transaction.bill_customer?.contact?.address?.country,
        bill_contact_first_name: transaction.bill_customer?.contact?.first_name,
        bill_contact_last_name: transaction.bill_customer?.contact?.last_name,
        bill_contact_phone: transaction.bill_customer?.contact?.phone,
        bill_contact_email: transaction.bill_customer?.contact?.email,
        ship_customer_account: transaction.ship_customer?.account,
        ship_address1: transaction.ship_customer?.contact?.address?.address1,
        ship_address2: transaction.ship_customer?.contact?.address?.address2,
        ship_city: transaction.ship_customer?.contact?.address?.city,
        ship_state: transaction.ship_customer?.contact?.address?.state,
        ship_postal_code: transaction.ship_customer?.contact?.address?.postal_code,
        ship_country: transaction.ship_customer?.contact?.address?.country,
        ship_contact_first_name: transaction.ship_customer?.contact?.first_name,
        ship_contact_last_name: transaction.ship_customer?.contact?.last_name,
        ship_contact_phone: transaction.ship_customer?.contact?.phone,
        ship_contact_email: transaction.ship_customer?.contact?.email,
        reseller_account: transaction.reseller?.account,
        reseller_address1: transaction.reseller?.contact?.address?.address1,
        reseller_address2: transaction.reseller?.contact?.address?.address2,
        reseller_city: transaction.reseller?.contact?.address?.city,
        reseller_state: transaction.reseller?.contact?.address?.state,
        reseller_postal_code: transaction.reseller?.contact?.address?.postal_code,
        reseller_country: transaction.reseller?.contact?.address?.country,
        reseller_contact_first_name: transaction.reseller?.contact?.first_name,
        reseller_contact_last_name: transaction.reseller?.contact?.last_name,
        reseller_contact_phone: transaction.reseller?.contact?.phone,
        reseller_contact_email: transaction.reseller?.contact?.email,
        osc_part_number: transaction.asset?.osc_product?.product_part_number,
        quantity: transaction.quantity,
        start_date: transaction.start_date,
        end_date: transaction.end_date,
        waybill_number: transaction.waybill_number,
        return_waybill_number: transaction.return_waybill_number,
      };
      reset({ ...resetTransaction });
    }
  }, [formLoading, transaction]);


  const start_date = watch('start_date');
  const osc_part_number = watch('osc_part_number');
  useEffect(() => {
    let duration = transaction?.asset?.osc_product?.duration;
    if (productData?.data) {
      duration = productData.data.find(p => p.product_part_number == osc_part_number)?.duration;
    }
    if (start_date) {
      const originalDate = new Date(start_date);
      originalDate.setMonth(originalDate.getMonth() + getDurationFromString(duration as string));
      const end_date = originalDate.toISOString().split('T')[0];
      setValue('end_date', end_date);
    }
  }, [start_date, osc_part_number])

  return (
    <Edit
      goBack={
        <button
          onClick={useBack()}
          className="inline-block mx-2 p-2 rounded-xl border duration-500 border-transparent hover:border-black"
        >
          {" "}
          <ArrowIcon />
        </button>
      }
      canDelete={false}
      title={
        <div className="!font-satoshi text-2xl font-semibold text-[#536175] flex items-center">
          Edit Transaction {transaction?.transaction_number}
        </div>
      }
      breadcrumb={false}
      headerButtons={<></>}
      wrapperProps={{
        className: "rounded-none bg-[#f2f6fa] shadow-none pt-6 pb-2.5",
      }}
      saveButtonProps={{ ...saveButtonProps, hidden: false }}
      footerButtons={({ saveButtonProps }) => (
        <SaveButton {...saveButtonProps} sx={sendEmailBtnStyle} />
      )}
    >
      {formLoading || productLoading ? (
        <Loader />
      ) : (
        <div className="px-8">
          <TransactionForm {...{ control, errors, trigger }} transaction={transaction} />
        </div>
      )}
    </Edit>
  );
};

export default TransactionEdit;
