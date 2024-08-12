"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation, useTable, HttpError } from "@refinedev/core";
import { Product } from "@/types/types";
import GenericTable from "@components/Table/GenericTable";
import { MRT_ColumnDef } from "material-react-table";
import ProductIcon from "@/assets/icons/products.svg?icon";
import Loader from "@components/common/Loader";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ProductDetailDrawer from "@components/Products/ProductDetailDrawer";
import { ProductActiveColor } from "@data/ColorData";
import { tagStyle } from "@data/MuiStyles";

const Page = () => {
  const {
    tableQueryResult: { data, isLoading, refetch },
    setCurrent,
    setFilters,
  } = useTable<Product, HttpError>();

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [clickedProduct, setClickedProduct] = React.useState<Product | null>(null);
  
  const handleCreate = () => setOpenDrawer(true);

  const handleEditClick = (row: Product) => {
    setClickedProduct(row);
    setOpenDrawer(true);
  };

  const handlePage = (value: number) => setCurrent(value);

  const handleSearch = (value: string) => setFilters([{ field: 'searchKey', operator: 'contains', value: value }])

  const handleClose = () => {
    refetch();
    setClickedProduct(null);
    setOpenDrawer(false);
  }

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
        accessorKey: "active",
        header: "Active",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <Box component="span" sx={{ backgroundColor: ProductActiveColor(renderedCellValue as boolean), ...tagStyle }} >
            {renderedCellValue ? "Active" : "Closed"}
          </Box>
        ),
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
              <EditOutlinedIcon onClick={() => handleEditClick(row.original)} fontSize="small" className="text-[#818f99] hover:text-black cursor-pointer" />
              <DeleteIcon onClick={() => console.log("Delete")} fontSize="small" className="text-[#818f99] hover:text-black cursor-pointer" />
            </div>
          </div>
        ),
      },
    ],
    []
  );

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
            canCreate={true}
            totalCount={data?.total}
            handlePage={handlePage}
            handleSearch={handleSearch}
            handleCreate={handleCreate} />
      }

      <ProductDetailDrawer
        open={openDrawer}
        onClose={() => handleClose()}
        product={clickedProduct}
      />
    </div>
  );
};

export default Page;
