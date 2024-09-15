"use client";

import { Transaction } from "@/types/types";
import GeneralInformation from "@components/common/View/GeneralInformation";
import CustomerInformation from "./CustomerInformation";
interface CustomersInformationProps {
  transaction?: Transaction;
}

const CustomersInformation: React.FC<CustomersInformationProps> = ({ transaction }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-bold px-12">Billing</div>
      <CustomerInformation transaction={transaction} type="bill_customer" />
      <div className="text-lg font-bold px-12 pt-4">Shipping</div>
      <CustomerInformation transaction={transaction} type="ship_customer" />
      <div className="text-lg font-bold px-12 pt-4">Reseller</div>
      <CustomerInformation transaction={transaction} type="reseller" />
    </div>
  );
};

export default CustomersInformation;
