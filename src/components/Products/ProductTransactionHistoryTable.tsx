"use client";

import { Asset, Transaction } from "@/types/types";
import GenericTable from "@components/Table/GenericTable";
import { TxtActionColor, TxtStatusColor, TxtTypeColor } from "@data/ColorData";
import { tagStyle } from "@data/MuiStyles";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box } from "@mui/material";
import { MRT_SortingState, type MRT_ColumnDef } from "material-react-table";
import { useMemo, useState } from "react";
import { convertSortingStateToCrudSort, getFormattedDate } from "@utils/utilFunctions";
import { useNavigation, useTable } from "@refinedev/core";
import Loader from "@components/common/Loader";

interface ProductTransactionHistoryTableProps {
  product: string;
}

const ProductTransactionHistoryTable: React.FC<
  ProductTransactionHistoryTableProps
> = ({ product: product_id }) => {
  const {
    tableQueryResult: { data: transactionData, isLoading, refetch },
    setCurrent,
    setFilters,
    setSorters,
  } = useTable<Transaction>({
    resource: `transactions?product=${product_id}`,
  });
  const { push } = useNavigation();

  const handleSearch = (value: string) =>
    setFilters([{ field: "searchKey", operator: "contains", value: value }]);

  const handleSorting = (sorting: MRT_SortingState) =>
    setSorters(convertSortingStateToCrudSort(sorting));

  const handlePage = (value: number) => setCurrent(value);


  const handleShowClick = (row: Transaction) => {
    push(`/dashboard/transactions/show?id=${row.transaction_id}`);
  };

  const columns = useMemo<MRT_ColumnDef<Transaction>[]>(() => {
    return [
      {
        accessorKey: "transaction_number",
        header: "Txn Number",
        size: 50,
        Cell: ({ renderedCellValue }) => (
          <div className="text-right w-full pr-7">{renderedCellValue}</div>
        ),
      },
      {
        accessorKey: "transaction_date",
        header: "Txn Date",
        size: 50,
        Cell: ({ renderedCellValue }) =>
          getFormattedDate(renderedCellValue as string),
      },
      {
        accessorKey: "transaction_source",
        header: "Txn Source",
        size: 50,
      },
      {
        accessorKey: "source_reference_number",
        header: "Source Ref #",
        size: 50,
      },
      {
        accessorKey: "asset.osc_product.product_type",
        header: "Product Type",
        size: 50,
      },
      {
        accessorKey: "asset.osc_product.product_part_number",
        header: "Product Part Number",
        size: 50,
      },
      {
        accessorKey: "quantity",
        header: "Seat Count",
        size: 50,
        Cell: ({ renderedCellValue }) => (
          <div className="text-right w-full pr-7">{renderedCellValue}</div>
        ),
      },
      {
        accessorKey: "transaction_action",
        header: "Txn Action",
        size: 50,
      },
      {
        accessorKey: "transaction_status",
        header: "Txn Status",
        size: 50,
        Cell: ({ renderedCellValue }) => (
          <Box
            component="span"
            sx={(theme) => ({
              backgroundColor: TxtStatusColor[renderedCellValue as string],
              ...tagStyle,
            })}
          >
            {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorKey: "bill_customer.name",
        header: "Bill Customer",
        size: 50,
      },
      {
        accessorKey: "ship_customer.name",
        header: "Ship Customer",
        size: 50,
      },
      {
        accessorKey: "reseller.name",
        header: "Reseller",
        size: 50,
      },
    ];
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <GenericTable
          data={transactionData?.data}
          title={
            <div className="!font-satoshi px-12 py-4 text-2xl font-semibold text-[#1f325c] flex items-center gap-2">
              Transaction History
            </div>
          }
          handlePage={handlePage}
          handleSorting={handleSorting}
          handleSearch={handleSearch}
          columns={columns}
          onRowClick={handleShowClick}
        />
      )}
    </>
  );
};

export default ProductTransactionHistoryTable;
