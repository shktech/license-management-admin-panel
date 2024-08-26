"use client";
import { useTable } from "@refinedev/core";
import { Transaction } from "../../types/types";
import React, { useMemo } from "react";
import Loader from "@components/common/Loader";
import GenericTable from "@components/Table/GenericTable";
import { MRT_ColumnDef } from "material-react-table";
import { getFormattedDate } from "@utils/utilFunctions";
import { Box } from "@mui/material";
import { TxtActionColor, TxtStatusColor, TxtTypeColor } from "@data/ColorData";
import { tagStyle } from "@data/MuiStyles";
import CommonTable from "@components/Table/CommonTable";

const HomePage: React.FC = () => {
  const {
    tableQueryResult: { data, isLoading },
  } = useTable<Transaction>({
    resource: 'transactions',
    initialSorter: [
      {
        field: "transaction_date",  // The field you want to sort by
        order: "desc",    // The sorting order: "asc" or "desc"
      },
    ],
  });

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
        Cell: ({ renderedCellValue }) => getFormattedDate(renderedCellValue as string),
      },
      {
        accessorKey: "transaction_status",
        header: "Txn Status",
        size: 50,
        Cell: ({ renderedCellValue }) => (
          <Box component="span" sx={(theme) => ({ backgroundColor: TxtStatusColor[renderedCellValue as string], ...tagStyle })} >
            {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorKey: "asset.license_type",
        header: "Txn Type",
        size: 50,
        Cell: ({ renderedCellValue }) => (
          <Box component="span" sx={{ backgroundColor: TxtTypeColor[renderedCellValue as string], ...tagStyle }} >
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
          <Box component="span" sx={{ backgroundColor: TxtActionColor[renderedCellValue as string], ...tagStyle }} >
            {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorKey: "asset.license_key",
        header: "Asset",
        size: 200,
      },
      {
        accessorKey: "organization",
        header: "Organization",
        size: 50,
      },
      {
        accessorKey: "source_reference_number",
        header: "Source Ref Number",
        size: 50,
      },
      {
        accessorKey: "source_reference_date",
        header: "Source Ref Date",
        size: 50,
        Cell: ({ renderedCellValue }) => getFormattedDate(renderedCellValue as string),
      },
    ],
    []
  );

  return (
    <div className="pt-6 pb-2.5 xl:pb-1 overflow-x-auto">
      {/* <div className="!font-satoshi px-12 py-4 text-2xl font-semibold text-[#515f72] flex items-center gap-2">
        Dashboard
      </div> */}
      {
        isLoading ?
          <Loader /> :
          <CommonTable
            title={
              <div className="!font-satoshi text-2xl font-semibold text-[#515f72] flex items-center gap-2">
                Recent Transactions
              </div>
            }
            data={data?.data}
            columns={columns}
          />
      }
    </div>
  );
};

export default HomePage;
