"use client";

import { useMemo } from "react";
import { MRT_SortingState, type MRT_ColumnDef } from "material-react-table";
import { Transaction } from "@/types/types";
import { useRouter } from "next/navigation";
import { useTable } from "@refinedev/core";
import GenericTable from "@components/Table/GenericTable";
import {
  convertSortingStateToCrudSort,
  getFormattedDate,
} from "@utils/utilFunctions";
import { Box } from "@mui/material";
import { TxtActionColor, TxtStatusColor, TxtTypeColor } from "@data/ColorData";
import { tagStyle } from "@data/MuiStyles";

interface PartnerTransactionTableProps {
  partner_id?: string;
}

const PartnerTransactionTable: React.FC<PartnerTransactionTableProps> = ({
  partner_id,
}) => {
  const {
    tableQueryResult: { data: transactions, isLoading: codeIsLoading, refetch },
    setCurrent,
    setFilters,
    setSorters,
  } = useTable<Transaction>({
    syncWithLocation: false,
    resource: "transactions",
    initialFilter: [{ field: "partner", operator: "eq", value: partner_id }],
    pagination: {
      pageSize: 15,
    },
  });

  const router = useRouter();

  const handleSearch = (value: string) =>
    setFilters([{ field: "searchKey", operator: "contains", value: value }]);

  const handleSorting = (sorting: MRT_SortingState) =>
    setSorters(convertSortingStateToCrudSort(sorting));

  const handlePage = (value: number) => setCurrent(value);

  const columns = useMemo<MRT_ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: "transaction_number",
        header: "Txn Number",
        size: 50,
      },
      {
        accessorKey: "transaction_date",
        header: "Txn Date",
        size: 50,
        Cell: ({ renderedCellValue }) =>
          getFormattedDate(renderedCellValue as string),
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
        accessorKey: "asset.license_type",
        header: "Txn Type",
        size: 50,
        Cell: ({ renderedCellValue }) => (
          <Box
            component="span"
            sx={{
              backgroundColor: TxtTypeColor[renderedCellValue as string],
              ...tagStyle,
            }}
          >
            {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorKey: "transaction_source",
        header: "Txn Source",
        size: 50,
      },
      {
        accessorKey: "transaction_action",
        header: "Txn Action",
        size: 50,
        Cell: ({ renderedCellValue }) => (
          <Box
            component="span"
            sx={{
              backgroundColor: TxtActionColor[renderedCellValue as string],
              ...tagStyle,
            }}
          >
            {renderedCellValue}
          </Box>
        ),
      },
      // {
      //   accessorKey: "asset.license_key",
      //   header: "License",
      //   size: 200,
      // },
      {
        accessorKey: "source_reference_number",
        header: "Source Ref Number",
        size: 50,
      },
      {
        accessorKey: "source_reference_date",
        header: "Source Ref Date",
        size: 50,
        Cell: ({ renderedCellValue }) =>
          getFormattedDate(renderedCellValue as string),
      },
      {
        accessorKey: "bill_customer.name",
        header: "Bill Customer",
        size: 50,
      },
      {
        accessorKey: "ship_customer.name",
        header: "Bill Customer",
        size: 50,
      },
      // {
      //   accessorKey: "reseller.name",
      //   header: "Bill Customer",
      //   size: 50,
      // }
      {
        accessorKey: "asset.osc_product.product_part_number",
        header: "Product Part Number",
        size: 50,
      },
      {
        accessorKey: "seat_number",
        header: "Number of Seats",
        size: 50,
        Cell: ({ row }) => row.original.asset?.seats?.length,
      },
    ],
    []
  );

  const handleRowClick = (row: Transaction) => {
    router.push(`/dashboard/transactions/show?id=${row.transaction_id}`);
  };

  return (
    <GenericTable
      title={
        <div className="!font-satoshi px-12 py-4 text-2xl font-semibold text-[#1f325c] flex items-center gap-2">
          Transactions
        </div>
      }
      data={transactions?.data}
      totalCount={transactions?.total}
      columns={columns}
      onRowClick={handleRowClick}
      handlePage={handlePage}
      handleSorting={handleSorting}
      handleSearch={handleSearch}
    />
  );
};

export default PartnerTransactionTable;
