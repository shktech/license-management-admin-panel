"use client";
import React, { useMemo } from "react";
import { useNavigation, useTable } from "@refinedev/core";
import { Product } from "@/types/types";
import GenericTable from "@components/Table/GenericTable";
import { MRT_ColumnDef } from "material-react-table";
import ProductIcon from "@/assets/icons/products.svg?icon";
import Loader from "@components/common/Loader";
import DetailDrawer from "@components/common/View/GeneralPanel";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const Page = () => {
  const {
    tableQueryResult: { data, isLoading },
  } = useTable<Product>();

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [clickedProduct, setClickedProduct] = React.useState<Product>();

  const products: Product[] = data?.data as Product[];

  const router = useRouter();
  const handleCreate = () => router.push('/products/create')

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
        size: 200,
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
        size: 180,
      },
      {
        accessorKey: "vendor_part_number",
        header: "Vendor part number",
        size: 220,
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
        size: 100,
        Cell: ({ cell }) => {
          return (
            <Box
              component="span"
              sx={(theme) => ({
                backgroundColor: cell.getValue<boolean>() == true ? '#11ba82' : '#fa5252',
                borderRadius: '0.25rem',
                color: 'white',
                maxWidth: '9ch',
                fontSize: '0.75rem',
                p: '0.375rem',
              })}
            >
              {cell.getValue<boolean>() ? "Active" : "Closed"}
            </Box>
          )
        },
      },
      {
        accessorKey: "actions",
        header: "Action",
        size: 100,
        enableSorting: false,
        pin: 'right',
        Cell: ({ row }) => (
          <div className="w-full h-full">
            <div className="flex gap-4">
              <EditOutlinedIcon onClick={() => console.log("Edit")} fontSize="small" className="text-[#818f99] hover:text-black cursor-pointer" />
              <DeleteIcon onClick={() => console.log("Delete")} fontSize="small" className="text-[#818f99] hover:text-black cursor-pointer" />
            </div>
          </div>
        ),
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
    <div className="pt-6 pb-2.5 xl:pb-1 overflow-x-auto">
      {
        isLoading ?
          <Loader /> :
          <GenericTable
            title={
              <div className="!font-satoshi text-2xl font-semibold text-[#515f72] flex items-center gap-2">
                Products
              </div>
            }
            data={data?.data}
            columns={columns}
            onRowClick={handleRowClick}
            handleCreate={handleCreate} />
      }

      <DetailDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        groups={getPanelInput()}
      />
    </div>
  );
};

export default Page;
