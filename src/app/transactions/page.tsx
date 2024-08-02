"use client";
import React, { useEffect, useMemo } from "react";
import { useNavigation, useTable } from "@refinedev/core";
import { Transaction } from "@/types/types";
import Loader from "@components/common/Loader";
import GenericTable from "@components/Table/GenericTable";
import { MRT_ColumnDef } from "material-react-table";
import TransactionWithColorIcon from "@/assets/icons/transactionWithColor.svg?icon";
import { Box, Button } from "@mui/material";
import { TxtActionColor, TxtStatusColor, TxtTypeColor } from "@data/ColorData";
import { useRouter } from "next/navigation";
import { tagStyle } from "@data/MuiStyles";

const Page = () => {

  const {
    tableQueryResult: { data, isLoading },
  } = useTable<Transaction>();

  const { show } = useNavigation();

  const router = useRouter();

  const handleCreate = () => router.push('/transactions/create')

  const handleRowClick = (row: Transaction) => show("transactions", row.id)

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
        size: 120,
      },
      {
        accessorKey: "transaction_status",
        header: "Txn Status",
        size: 200,
        Cell: ({ renderedCellValue }) => (
          <Box component="span" sx={(theme) => ({ backgroundColor: TxtStatusColor[renderedCellValue as string], ...tagStyle })} >
            {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorKey: "transaction_type",
        header: "Txn Type",
        size: 120,
        Cell: ({ renderedCellValue }) => (
          <Box component="span" sx={{ backgroundColor: TxtTypeColor[renderedCellValue as string], ...tagStyle }} >
            {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorKey: "transaction_source",
        header: "Txn Source",
        size: 120,
      },
      {
        accessorKey: "transaction_action",
        header: "Txn Action",
        size: 120,
        Cell: ({ renderedCellValue }) => (
          <Box component="span" sx={{ backgroundColor: TxtActionColor[renderedCellValue as string], ...tagStyle }} >
            {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorKey: "asset.license_key",
        header: "Asset",
        size: 120,
      },
      {
        accessorKey: "organization",
        header: "Organization",
        size: 120,
      },
      {
        accessorKey: "source_reference_number",
        header: "Source Ref Number",
        size: 120,
      },
      {
        accessorKey: "source_reference_date",
        header: "Source Ref Date",
        size: 120,
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl drop-shadow-md bg-white px-5 pt-6 pb-2.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between">
        </div>
        <div className="max-w-full overflow-x-auto">
          {isLoading ? (
            <Loader />
          ) : (
            <GenericTable
              title={
                <div className="text-xl font-semibold text-black flex gap-2 items-center">
                  <TransactionWithColorIcon />
                  Transactions
                </div>
              }
              data={data?.data}
              columns={columns}
              onRowClick={handleRowClick}
              handleCreate={handleCreate} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
