"use client";
import React, { useMemo } from "react";
import { useNavigation, useTable } from "@refinedev/core";
import { Product } from "@/types/types";
import GenericTable from "@components/Table/GenericTable";
import { MRT_ColumnDef } from "material-react-table";
import ProductIcon from "@/assets/icons/products.svg?icon";
import Loader from "@components/common/Loader";
import DetailDrawer from "@components/common/View/GeneralPanel";

const Page = () => {
  const {
    tableQueryResult: { data, isLoading },
  } = useTable<Product>();

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [clickedProduct, setClickedProduct] = React.useState<Product>();

  const products: Product[] = data?.data as Product[];

  const handleClickItem = (id: string) => {
    const product = products.find((pd) => pd.id === id);
    if (product) {
      setClickedProduct(product);
      setOpenDrawer(true);
    }
  };

  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "osc_part_number",
        header: "OSC Part number",
        size: 150,
      },
      {
        accessorKey: "product_type",
        header: "Part type",
        size: 150,
      },
      {
        accessorKey: "duration",
        header: "UOM",
        size: 150,
      },
      {
        accessorKey: "vendor_name",
        header: "Vender name",
        size: 120,
      },
      {
        accessorKey: "vendor_part_number",
        header: "Vendor part number",
        size: 200,
      },
      {
        accessorKey: "license_source_set",
        header: "License source",
        size: 200,
      },
      {
        accessorKey: "Email template source",
        header: "Email template source",
        size: 200,
      },
      {
        accessorKey: "active",
        header: "Active",
        size: 200,
      },
    ],
    []
  );

  const handleRowClick = (row: Product) => {
    // show("products", row.id);
    handleClickItem(row.id);
  };

  const getPanelInput = () => {
    return [
      {
        title: "Product Details",
        fields: [
          { label: "OSC Part Number", value: clickedProduct?.osc_part_number },
          { label: "Part Type", value: clickedProduct?.product_type },
          { label: "UOM(Duration)", value: clickedProduct?.duration },
          {
            label: "Product Description",
            value: clickedProduct?.product_description,
          },
          {
            label: "Vendor Part Number",
            value: clickedProduct?.vendor_part_number,
          },
          { label: "License Source", value: clickedProduct?.license_source_set },
          { label: "Active", value: clickedProduct?.active },
        ],
      },
      {
        title: "Product Attributes",
        fields: [
          { label: "Product Attribute1", value: clickedProduct?.attribute1 },
          { label: "Product Attribute2", value: clickedProduct?.attribute2 },
          { label: "Product Attribute3", value: clickedProduct?.attribute3 },
          { label: "Product Attribute4", value: clickedProduct?.attribute4 },
          { label: "Product Attribute5", value: clickedProduct?.attribute5 },
        ],
      },
    ];
  };

  return (
    <div className="flex flex-col gap-10">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex justify-between">
            <div className="text-xl font-semibold text-black flex items-center gap-2">
              <ProductIcon />
              Products
            </div>
          </div>
          <div className="max-w-full overflow-x-auto">
            <GenericTable
              data={data?.data}
              columns={columns}
              onRowClick={handleRowClick}
            />
          </div>
          <DetailDrawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            groups={getPanelInput()}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
