"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { useNavigation, useTable } from "@refinedev/core";
import { Transaction } from "@/types/types";
import Loader from "@components/common/Loader";
import GenericTable from "@components/Table/GenericTable";
import { MRT_ColumnDef } from "material-react-table";

const Page = () => {
  const {
    tableQueryResult: { data, isLoading },
  } = useTable<Transaction>();

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
    <div className="flex flex-col gap-10">
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between">
          <div className="text-xl font-semibold text-black flex items-center">
            Transactions
          </div>
          <Link
            href={"/transactions/create"}
            className="bg-primary px-10 py-2 text-white rounded-lg my-2 hover:bg-opacity-90"
          >
            + New Transaction
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
