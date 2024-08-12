import React, { useEffect, useState } from 'react';
import { Box, Button, Drawer } from '@mui/material';
import { useCreate, useOne, GetOneResponse } from '@refinedev/core';
import { useForm } from "@refinedev/react-hook-form";
import { modalCancelBtnStyle, modalOkBtnStyle, tagStyle } from "@data/MuiStyles";
import { Product, Transaction } from '../../types/types';
import ProductForm from '@components/Forms/Products/ProductForm';
import { CustomTabPanel, StyledTab, StyledTabs } from '@components/Tab/CustomizedTab';
import GeneralInformation from '@components/common/View/GeneralInformation';
import { TxtActionColor, TxtStatusColor, TxtTypeColor } from '@data/ColorData';


interface TransactionDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  transaction_id: string | null
}

const TransactionDetailDrawer: React.FC<TransactionDetailDrawerProps> = ({ open, onClose, transaction_id }) => {
  const { data, isLoading, error } = useOne({
    resource: "transactions",
    id: transaction_id as string
  });
  
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const transaction = data?.data as Transaction
  const summaryfields = [
    { title: "Start Date", key: "start_date" },
    { title: "End Date", key: "end_date" },
    { title: "Seat Count", key: "asset.osc_seat_count" },
  ]
  const getNestedValue = (obj: any, key: string) => {
    return key.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="min-w-[700px] pb-4 flex flex-col min-h-screen">
        <div className="pt-4 px-4 text-lg font-bold text-[#65758c] flex items-center">
          Detail Information
        </div>
        <div className="flex gap-16 px-8 mt-6">
          {
            summaryfields.map(field => (
              <div className="flex flex-col gap-1">
                <div className="text-[#778599]">{field.title}</div>
                <div className="text-[#515f72] text-xl font-semibold">{getNestedValue(transaction, field.key)}</div>
              </div>
            ))
          }
        </div>
        <div className="">
          <div className="px-12 pt-4">
            <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <StyledTab label="Transaction Information" />
              <StyledTab label="Asset Status" />
            </StyledTabs>
          </div>
        </div>
        <CustomTabPanel value={value} index={0}>
          <GeneralInformation
            singleColumn
            items={[
              {
                label: "Transaction date",
                value: transaction?.transaction_date,
              },
              {
                label: "Transaction source",
                value: transaction?.transaction_source,
              },
              {
                label: "Transaction type",
                value: (
                  <Box component="span" sx={{ backgroundColor: TxtTypeColor[transaction?.transaction_type as string], ...tagStyle }} >
                    {transaction?.transaction_type}
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
                label: "Transaction status",
                value: (
                  <Box component="span" sx={{ backgroundColor: TxtStatusColor[transaction?.transaction_status as string], ...tagStyle }} >
                    {transaction?.transaction_status}
                  </Box>
                )
              },
              {
                label: "Transaction quantity (seats)",
                value: transaction?.quantity,
              },
              {
                label: "UOM (Duration / Each)",
                value: transaction?.osc_product?.duration,
              },
              {
                label: "Source ref number",
                value: transaction?.source_reference_number,
              },
              {
                label: "Source ref date",
                value: transaction?.source_reference_date,
              },
              {
                label: "Notificate date",
                value: transaction?.notification_date,
              },
              {
                label: "Error message",
                value: transaction?.error_message,
              },
              {
                label: "Asset number",
                value: transaction?.asset?.license_key,
              },
              {
                label: "Product part number",
                value: transaction?.osc_product?.osc_part_number,
              },
              {
                label: "Asset type",
                value: transaction?.osc_product?.product_type,
              },
              {
                label: "Vendor name",
                value: transaction?.osc_product?.vendor_name,
              },
              {
                label: "Vendor part number",
                value: transaction?.osc_product?.vendor_part_number,
              },
              {
                label: "Reference code",
                value: transaction?.reference_code,
              },
              {
                label: "Start date",
                value: transaction?.start_date,
              },
              {
                label: "End date",
                value: transaction?.end_date,
              },
            ]}
          ></GeneralInformation>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <GeneralInformation
            singleColumn
            items={[
              {
                label: "Asset ID",
                value: transaction?.asset?.id,
              },
              {
                label: "Asset number (License Key / Serial Number)",
                value: transaction?.asset?.license_key,
              },
              {
                label: "Active",
                value: <div className={`w-4 h-4 rounded-full ${transaction?.asset?.active ? 'bg-active' : 'bg-inactive'}`}></div>
              },
              {
                label: "Product part number",
                value: transaction?.osc_product?.osc_part_number,
              },
              {
                label: "Vendor part number",
                value: transaction?.osc_product?.vendor_part_number,
              },
              {
                label: "Seats",
                value: transaction?.asset?.osc_seat_count,
              },
              {
                label: "Duration",
                value: transaction?.osc_product?.duration,
              },
              {
                label: "Start date",
                value: transaction?.asset?.start_date,
              },
              {
                label: "End date",
                value: transaction?.asset?.end_date,
              },
            ]}
          >
          </GeneralInformation>
        </CustomTabPanel>
      </div>
    </Drawer>
  );
};

export default TransactionDetailDrawer;
