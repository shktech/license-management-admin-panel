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
import { DefaultPageSize } from "@data/UtilData";

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
      pageSize: DefaultPageSize
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
        header: "Txn Number", // Changed to string
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div className="text-right w-full pr-7">{renderedCellValue}</div>
        ),
      },
      {
        accessorKey: "transaction_date",
        header: "Txn Date",
        size: 100,
        Cell: ({ renderedCellValue }) =>
          getFormattedDate(renderedCellValue as string),
      },
      {
        accessorKey: "transaction_source",
        header: "Txn Source",
        size: 100,
      },
      {
        accessorKey: "source_reference_number",
        header: "Source Ref #",
        size: 100,
      },
      {
        accessorKey: "bill_customer.name",
        header: "Bill Customer",
        size: 100,
      },
      {
        accessorKey: "ship_customer.name",
        header: "Ship Customer",
        size: 100,
      },
      {
        accessorKey: "asset.license_type",
        header: "Product Type",
        size: 100,
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
        accessorKey: "asset.osc_product.product_part_number",
        header: "Product Part Number",
        size: 100,
      },
      {
        accessorKey: "asset.osc_seat_count",
        header: "Seats Count",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <div className="text-right w-full pr-7">
            {renderedCellValue || 0}
          </div>
        ),
      },
      {
        accessorKey: "transaction_action",
        header: "Txn Action",
        size: 100,
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
      {
        accessorKey: "transaction_status",
        header: "Txn Status",
        size: 100,
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
