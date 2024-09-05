"use client";

import { Permission, Product } from "@/types/types";
import ShowTransaction from "@components/Transactions/Show/ShowTransaction";
import Loader from "@components/common/Loader";
import { TxtActionColor, TxtStatusColor, TxtTypeColor } from "@data/ColorData";
import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import {
  editRefineBtnStyle,
  refreshRefineBtnStyle,
  tagStyle,
} from "@data/MuiStyles";
import { Box } from "@mui/material";
import { useBack, useNavigation, usePermissions, useShow } from "@refinedev/core";
import { EditButton, RefreshButton, Show } from "@refinedev/mui";
import { useParsed } from "@refinedev/core";
import { CustomTabPanel, StyledTab, StyledTabs } from "@components/Tab/CustomizedTab";
import { useState } from "react";
import GeneralInformation from "@components/common/View/GeneralInformation";
import { getNestedValue } from "@utils/utilFunctions";

const Item = () => {
  const { params } = useParsed();
  const { queryResult } = useShow<Product>({
    resource: "products",
    id: params?.id,
  });
  const { data, isLoading } = queryResult;
  const { data: permissionsData } = usePermissions<Permission>({
    params: { codename: "product" },
  });

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { push } = useNavigation();

  const product = data?.data;

  const getButtonProps = (editButtonProps: any, refreshButtonProps: any) => {
    return (
      <div className="flex gap-2 px-12">
        <EditButton {...editButtonProps} onClick={() => push(`/dashboard/products/edit?id=${params?.id}`)} sx={editRefineBtnStyle} />
        <RefreshButton {...refreshButtonProps} sx={refreshRefineBtnStyle} />
      </div>
    );
  };

  const summaryfields = [
    { title: "Product Type", key: "product_type", size: 3 },
    { title: "Vendor Name", key: "vendor_name", size: 3 },
    { title: "Vender Part Number", key: "vendor_part_number", size: 3 },
    { title: "Duration", key: "duration", size: 3 },
  ]

  return (
    <div className="no-padding-card">
      <Show
        goBack={null}
        isLoading={isLoading}
        breadcrumb={false}
        wrapperProps={{
          className: "rounded-none bg-[#f2f6fa] shadow-none pt-10 pb-2.5",
        }}
        title={
          <div className="!font-satoshi px-12">
            <div className="flex gap-4 items-center">
              <div className="text-2xl font-semibold text-[#1f325c] flex items-end gap-2">
                Product
                <div className="text-lg font-normal">{product?.product_name}</div>
              </div>
            </div>
          </div>
        }
        headerButtons={({ editButtonProps, refreshButtonProps }) =>
          getButtonProps(editButtonProps, refreshButtonProps)
        }
      >
        {isLoading ? <Loader /> :
          <>
            <div className="">
              <div className="flex items-end gap-x-8 gap-y-6 px-12 mt-8">
                {
                  summaryfields.map(field => (
                    <div key={field.key} className="flex flex-col gap-1 col-span-4">
                      <div className="text-[#778599]">{field.title}</div>
                      <div className="text-[#515f72] text-xl font-semibold">{getNestedValue(product, field.key)}</div>
                    </div>
                  ))
                }
              </div>
              <div className="px-12 pt-4">
                <StyledTabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <StyledTab label="Main Information" />
                  <StyledTab label="Attribute" />
                </StyledTabs>
              </div>
              <CustomTabPanel value={value} index={0}>
                <GeneralInformation
                  singleColumn={true}
                  items={[
                    {
                      label: "Product Name",
                      value: product?.product_name,
                    },
                    {
                      label: "Product Description",
                      value: product?.product_description,
                    },
                    {
                      label: "Product Part Number",
                      value: product?.product_part_number,
                    },
                    {
                      label: "Product Type",
                      value: product?.product_type,
                    },
                    {
                      label: "Vender Name",
                      value: product?.vendor_name,
                    },
                    {
                      label: "Vender Part Number",
                      value: product?.vendor_part_number,
                    },
                    {
                      label: "Duration",
                      value: product?.duration,
                    },
                    {
                      label: "Active",
                      value: <div className={`rounded-full h-4 w-4 ${product?.active ? 'bg-[#11ba82]' : 'bg-[#929ea8]'}`}></div>
                    },
                    // {
                    //   label: "Eval Set Name",
                    //   value: product?.eval_set_name,
                    // },
                    // {
                    //   label: "License Source Set",
                    //   value: product?.license_source_set,
                    // },
                    // {
                    //   label: "New Set Name",
                    //   value: product?.new_set_name,
                    // },
                    // {
                    //   label: "Renewal Set Name",
                    //   value: product?.renewal_set_name,
                    // },
                    // {
                    //   label: "Source Name",
                    //   value: product?.source_name,
                    // },
                  ]}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <GeneralInformation
                  singleColumn={true}
                  items={[
                    {
                      label: "Attribute1",
                      value: product?.attribute1,
                    },
                    {
                      label: "Attribute2",
                      value: product?.attribute2,
                    },
                    {
                      label: "Attribute3",
                      value: product?.attribute3,
                    },
                    {
                      label: "Attribute4",
                      value: product?.attribute4,
                    },
                    {
                      label: "Attribute5",
                      value: product?.attribute5,
                    },
                  ]}
                />
              </CustomTabPanel>
            </div>
          </>
        }
      </Show>
    </div>
  );
};

export default Item;
