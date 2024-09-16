"use client";
import React, { useMemo } from "react";
import { useNavigation, usePermissions, useTable } from "@refinedev/core";
import { Permission, Transaction } from "@/types/types";
import Loader from "@components/common/Loader";
import GenericTable from "@components/Table/GenericTable";
import { MRT_ColumnDef, MRT_SortingState } from "material-react-table";
import { Box } from "@mui/material";
import { TxtActionColor, TxtStatusColor, TxtTypeColor } from "@data/ColorData";
import { tagStyle } from "@data/MuiStyles";
import {
  convertSortingStateToCrudSort,
  getFormattedDate,
} from "@utils/utilFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightLeft,
  faTentArrowLeftRight,
} from "@fortawesome/free-solid-svg-icons";
const Page = () => {
  const {
    tableQueryResult: { data, isLoading },
    setCurrent,
    setFilters,
    setSorters,
  } = useTable<Transaction>({
    initialSorter: [
      {
        field: "transaction_date",
        order: "desc",
      },
    ],
    pagination: {
      pageSize: 15,
    },
  });

  const { push } = useNavigation();

  const handleSearch = (value: string) =>
    setFilters([{ field: "searchKey", operator: "contains", value: value }]);

  const handleSorting = (sorting: MRT_SortingState) =>
    setSorters(convertSortingStateToCrudSort(sorting));

  const handlePage = (value: number) => setCurrent(value);

  const handleCreate = () =>
    push("/dashboard/transactions/create?transaction_action=New");

  const handleRowClick = (row: Transaction) =>
    push(`/dashboard/transactions/show?id=${row.transaction_id}`);

  const { data: permissionsData } = usePermissions<Permission>({
    params: { codename: "transaction" },
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
        Cell: ({ renderedCellValue }) =>
          getFormattedDate(renderedCellValue as string),
      },
      {
        accessorKey: "transaction_source",
        header: "Txn Source",
        size: 50,
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
      {
        accessorKey: "source_reference_number",
        header: "Source Ref Number",
        size: 50,
      },
      {
        accessorKey: "source_reference_id",
        header: "Source Ref ID",
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
        accessorKey: "asset.license_type",
        header: "Product Type",
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
              <FontAwesomeIcon icon={faRightLeft} />
              Transactions History
            </div>
          }
          data={data?.data}
          columns={columns}
          onRowClick={handleRowClick}
          handleCreate={handleCreate}
          // canCreate={permissionsData?.create}
          totalCount={data?.total}
          handlePage={handlePage}
          handleSorting={handleSorting}
          handleSearch={handleSearch}
          canDelete={false}
          canEdit={permissionsData?.update}
          // initialSorter={initialSorter}
        />
      )}
    </div>
  );
};

export default Page;
