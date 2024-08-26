"use client";
import { useTable } from "@refinedev/core";
import { Transaction } from "../../types/types";
import React, { useMemo } from "react";
import Loader from "@components/common/Loader";
import GenericTable from "@components/Table/GenericTable";
import { MRT_ColumnDef, MRT_TableContainer, MRT_ToolbarAlertBanner, useMaterialReactTable } from "material-react-table";
import { getFormattedDate } from "@utils/utilFunctions";
import { Box } from "@mui/material";
import { TxtActionColor, TxtStatusColor, TxtTypeColor } from "@data/ColorData";
import { tagStyle } from "@data/MuiStyles";
// import CommonTable from "@components/Table/CommonTable";
import ChartOne from "@components/Charts/ChartOne";
import ChartTwo from "@components/Charts/ChartTwo";
import dynamic from "next/dynamic";
const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
  ssr: false,
});

const HomePage: React.FC = () => {
  // const {
  //   tableQueryResult: { data, isLoading },
  // } = useTable<Transaction>({
  //   resource: 'transactions',
  //   initialSorter: [
  //     {
  //       field: "transaction_date",  // The field you want to sort by
  //       order: "desc",    // The sorting order: "asc" or "desc"
  //     },
  //   ],
  //   syncWithLocation: false
  // });

  // const columns = useMemo<MRT_ColumnDef<Transaction>[]>(
  //   () => [
  //     {
  //       accessorKey: "transaction_number",
  //       header: "Txn Number",
  //       size: 50,
  //     },
  //     {
  //       accessorKey: "transaction_date",
  //       header: "Txn Date",
  //       size: 50,
  //       Cell: ({ renderedCellValue }) => getFormattedDate(renderedCellValue as string),
  //     },
  //     {
  //       accessorKey: "transaction_status",
  //       header: "Txn Status",
  //       size: 50,
  //       Cell: ({ renderedCellValue }) => (
  //         <Box component="span" sx={(theme) => ({ backgroundColor: TxtStatusColor[renderedCellValue as string], ...tagStyle })} >
  //           {renderedCellValue}
  //         </Box>
  //       ),
  //     },
  //     {
  //       accessorKey: "asset.license_type",
  //       header: "Txn Type",
  //       size: 50,
  //       Cell: ({ renderedCellValue }) => (
  //         <Box component="span" sx={{ backgroundColor: TxtTypeColor[renderedCellValue as string], ...tagStyle }} >
  //           {renderedCellValue}
  //         </Box>
  //       ),
  //     },
  //     {
  //       accessorKey: "transaction_source",
  //       header: "Txn Source",
  //       size: 50,
  //     },
  //     {
  //       accessorKey: "transaction_action",
  //       header: "Txn Action",
  //       size: 50,
  //       Cell: ({ renderedCellValue }) => (
  //         <Box component="span" sx={{ backgroundColor: TxtActionColor[renderedCellValue as string], ...tagStyle }} >
  //           {renderedCellValue}
  //         </Box>
  //       ),
  //     },
  //     {
  //       accessorKey: "asset.license_key",
  //       header: "License",
  //       size: 200,
  //     },
  //     {
  //       accessorKey: "organization",
  //       header: "Organization",
  //       size: 50,
  //     },
  //     {
  //       accessorKey: "source_reference_number",
  //       header: "Source Ref Number",
  //       size: 50,
  //     },
  //     {
  //       accessorKey: "source_reference_date",
  //       header: "Source Ref Date",
  //       size: 50,
  //       Cell: ({ renderedCellValue }) => getFormattedDate(renderedCellValue as string),
  //     },
  //   ],
  //   []
  // );

  // const table = useMaterialReactTable({
  //   columns: columns,
  //   data: data?.data.slice(0, 5) || [],
  //   enableColumnActions: false,
  //   enableColumnPinning: true,
  //   muiTableBodyCellProps: ({ cell }) => ({
  //     sx: {
  //       padding: cell.column.getIndex() === 0 ? '1rem 1rem 1rem 3rem' : '',
  //     }
  //   }),
  //   muiTableHeadCellProps: ({ column }) => ({
  //     sx: {
  //       padding: column.getIndex() === 0 ? '1rem 1rem 1rem 3rem' : '',
  //       verticalAlign: 'middle'
  //     }
  //   }),
  //   muiPaginationProps: {
  //     color: 'primary',
  //     shape: 'rounded',
  //     showRowsPerPage: false,
  //     variant: 'outlined',
  //   },
  //   paginationDisplayMode: 'pages',
  // });

  return (
    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 px-8 py-8">
      <ChartOne />
      <ChartTwo />
      <ChartThree />
      <div className="col-span-7 p-8 overflow-x-auto bg-white">
        {/* {
          isLoading ?
            <Loader /> :
            <div className='scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'>
              <div className='flex justify-between pb-4 gap-2'>
                <div className="text-xl text-xl font-semibold text-black">Recent Transaction</div>
              </div>
              <MRT_TableContainer table={table} />
              <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
            </div>
        } */}
      </div>
    </div>

  );
};

export default HomePage;
