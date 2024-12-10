"use client";

import { Transaction } from "@/types/types";
import GeneralInformation from "@components/common/View/GeneralInformation";
import { getFormattedDate } from "@utils/utilFunctions";
interface AssetInformationProps {
  transaction?: Transaction;
}

const AssetInformation: React.FC<AssetInformationProps> = ({ transaction }) => {
  return (
    <GeneralInformation
      singleColumn
      items={[
        {
          label: "Product Type",
          value: transaction?.asset?.license_type || transaction?.license_type,
        },
        {
          label: "Product Part Number",
          value:
            transaction?.product?.product_part_number ||
            transaction?.product_part_number ||
            transaction?.asset?.osc_product?.product_part_number,
        },
        {
          label: "Product Duration",
          value:
            transaction?.product?.duration ||
            transaction?.asset?.osc_product?.duration,
        },
        {
          label: "Vendor Name",
          value:
            transaction?.asset?.osc_product?.vendor_name ||
            transaction?.product?.vendor_name,
        },
        {
          label: "Vendor Part Name",
          value:
            transaction?.asset?.osc_product?.vendor_part_number ||
            transaction?.product?.vendor_part_number,
        },
        {
          label: "License Key",
          value: transaction?.asset?.license_key,
        },
        {
          label: "Seat Count",
          value: transaction?.asset?.osc_seat_count?.toString(),
        },
        {
          label: "Start Date",
          value:
            (transaction?.asset?.start_date &&
              getFormattedDate(transaction?.asset?.start_date)) ||
            (transaction?.start_date &&
              getFormattedDate(transaction?.start_date)),
        },
        {
          label: "End Date",
          value:
            (transaction?.asset?.end_date &&
              getFormattedDate(transaction?.asset?.end_date)) ||
            (transaction?.end_date && getFormattedDate(transaction?.end_date)),
        },
        {
          label: "License Integration Status",
          value: transaction?.license_integration_status,
        },
      ]}
    ></GeneralInformation>
  );
};

export default AssetInformation;
