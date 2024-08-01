"use client";
import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { Link as MUILink, Typography } from '@mui/material';
import { useNavigation, useTable } from "@refinedev/core";
import { Transaction } from "@/types/types";
import Loader from "@components/common/Loader";
import GenericTable from "@components/Table/GenericTable";
import { MRT_ColumnDef } from "material-react-table";
import TransactionWithColorIcon from "@/assets/icons/transactionWithColor.svg?icon";
import { Box, Breadcrumbs, Button } from "@mui/material";

const Page = () => {
  const {
    tableQueryResult: { data, isLoading },
  } = useTable<Transaction>();

  useEffect(() => {
    console.log(data?.data);
  }, [isLoading])
  const { show } = useNavigation();

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
      },
      {
        accessorKey: "transaction_type",
        header: "Txn Type",
        size: 120,
        Cell: ({ cell }) => {
          return (
            <Box
              component="span"
              sx={(theme) => ({
                backgroundColor: cell.getValue<string>() == 'Sales' ? '#11ba82' : '#fa5252',
                borderRadius: '0.25rem',
                color: 'white',
                maxWidth: '9ch',
                fontSize: '0.75rem',
                p: '0.375rem',
              })}
            >
              {cell.getValue<string>()}
            </Box>
          )
        },
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
        Cell: ({ cell }) => {
          return (
            <Box
              component="span"
              sx={(theme) => ({
                backgroundColor: cell.getValue<string>() == 'New' ? '#4580ff' : '#11ba82',
                borderRadius: '0.25rem',
                color: 'white',
                maxWidth: '9ch',
                fontSize: '0.75rem',
                p: '0.375rem',
              })}
            >
              {cell.getValue<string>()}
            </Box>
          )
        },
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

  const handleRowClick = (row: Transaction) => {
    show("transactions", row.id);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl drop-shadow-md bg-white px-5 pt-6 pb-2.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between">
          <div className="text-xl font-semibold text-black flex gap-2 items-center">
            <TransactionWithColorIcon />
            Transactions
          </div>
          <Link
            href={"/transactions/create"}
            passHref
            className=""
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: '#4580ff', // Background color
                px: 4, // Horizontal padding
                py: 1,  // Vertical padding
                color: 'white', // Text color
                borderRadius: '8px', // Rounded corners
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#4580ff', // Background color on hover
                  opacity: 0.9, // Adjust opacity on hover
                },
              }}
            >
              Add New
            </Button>
          </Link>

        </div>
        <div className="max-w-full overflow-x-auto">
          {isLoading ? (
            <Loader />
          ) : (
            <GenericTable data={data?.data} columns={columns} onRowClick={handleRowClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
