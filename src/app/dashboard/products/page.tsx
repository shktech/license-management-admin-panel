"use client";
import React, { useMemo } from "react";
import { useTable, useDelete, useNavigation } from "@refinedev/core";
import { Product } from "@/types/types";
import GenericTable from "@components/Table/GenericTable";
import { MRT_ColumnDef, MRT_SortingState } from "material-react-table";
import Loader from "@components/common/Loader";
import { Box } from "@mui/material";
import ProductDetailDrawer from "@components/Products/ProductDetailDrawer";
import { ProductActiveColor } from "@data/ColorData";
import { tagStyle } from "@data/MuiStyles";
import DeleteModal from "@components/Products/DeleteModal";
import { convertSortingStateToCrudSort } from "@utils/utilFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes } from "@fortawesome/free-solid-svg-icons";

const Page = () => {
  const {
    tableQueryResult: { data, isLoading, refetch },
    setCurrent,
    setFilters,
    setSorters,
  } = useTable<Product>({
    pagination: {
      pageSize: 15,
    },
  });

  const { push } = useNavigation();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  const [clickedProduct, setClickedProduct] = React.useState<Product | null>(
    null
  );

  const handleCreate = () => {
    push(`/dashboard/products/create`);
  };

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleEditClick = (row: Product) => {
    push(`/dashboard/products/edit?id=${row.product_id}`);
  };

  const handleRowClick = (row: Product) => {
    push(`/dashboard/products/show?id=${row.product_id}`);
  };

  const handlePage = (value: number) => setCurrent(value);

  const handleSorting = (sorting: MRT_SortingState) =>
    setSorters(convertSortingStateToCrudSort(sorting));

  const handleSearch = (value: string) =>
    setFilters([{ field: "searchKey", operator: "contains", value: value }]);

  const handleClose = () => {
    refetch();
    setClickedProduct(null);
    setOpenDrawer(false);
  };

  const { mutate: deleteProduct } = useDelete();

  const handleDeleteBtn = (product: Product) => {
    handleOpenDeleteModal();
    setClickedProduct(product);
  };

  const handleDelete = () => {
    deleteProduct(
      { resource: "products", id: `${clickedProduct?.product_id}` },
      {
        onError: (error) => {
          console.log(error);
        },
        onSuccess: () => {
          console.log("Success");
        },
      }
    );
    handleCloseDeleteModal();
  };

  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "product_part_number",
        header: "Product Part Number",
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
        accessorKey: "license_source",
        header: "License source",
        size: 200,
      },
      {
        accessorKey: "active",
        header: "Active",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <Box
            component="span"
            sx={{
              backgroundColor: ProductActiveColor(renderedCellValue as boolean),
              ...tagStyle,
            }}
          >
            {renderedCellValue ? "Active" : "Closed"}
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <div className="pt-6 pb-2.5 xl:pb-1 overflow-x-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <GenericTable
          title={
            <div className="!font-satoshi px-12 py-4 text-2xl font-semibold text-[#1f325c] flex items-center gap-2">
              <FontAwesomeIcon icon={faCubes} />
              Products
            </div>
          }
          data={data?.data}
          columns={columns}
          canCreate={true}
          totalCount={data?.total}
          handlePage={handlePage}
          onRowClick={handleRowClick}
          handleSorting={handleSorting}
          handleSearch={handleSearch}
          handleCreate={handleCreate}
        />
      )}

      <ProductDetailDrawer
        open={openDrawer}
        onClose={() => handleClose()}
        product={clickedProduct}
      />
      <DeleteModal
        openModal={openDeleteModal}
        handleDelete={handleDelete}
        handleCloseModal={handleCloseDeleteModal}
        selectedProduct={clickedProduct}
      />
    </div>
  );
};

export default Page;
