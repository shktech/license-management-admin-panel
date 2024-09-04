"use client";

import { useMemo } from "react";
import {
  MaterialReactTable,
  MRT_SortingState,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Asset, Transaction } from "@/types/types";
import { useRouter } from "next/navigation";
import { useTable } from "@refinedev/core";
import GenericTable from "@components/Table/GenericTable";
import { convertSortingStateToCrudSort } from "@utils/utilFunctions";

interface PartnerLicensesTableProps {
  partner_id?: string;
}

const PartnerLicensesTable: React.FC<PartnerLicensesTableProps> = ({
  partner_id,
}) => {
  const {
    tableQueryResult: { data: assets, isLoading: codeIsLoading, refetch },
    setCurrent,
    setFilters,
    setSorters,
  } = useTable<Asset>({
    syncWithLocation: false,
    resource: "assets",
    // initialFilter: [
    //     { field: "partner", operator: "eq", value: partner_id },
    // ],
  });
  

  const router = useRouter();

  const handleSearch = (value: string) => setFilters([{ field: 'searchKey', operator: 'contains', value: value }])

  const handleSorting = (sorting: MRT_SortingState) => setSorters(convertSortingStateToCrudSort(sorting));

  const handlePage = (value: number) => setCurrent(value);

  const columns = useMemo<MRT_ColumnDef<Asset>[]>(
    () => [
      {
        accessorKey: "license_key",
        header: "License Number (LicKey/Srl#)",
      },
      // {
      //   accessorKey: "organization.organization_name",
      //   header: "Organization",
      // },
      {
        accessorKey: "osc_product.product_part_number",
        header: "Product Part Number",
      },
      {
        accessorKey: "osc_product.product_type",
        header: "License Type",
      },
      {
        accessorKey: "osc_product.vendor_name",
        header: "Vender Name",
      },
      {
        accessorKey: "osc_product.product_name",
        header: "Vendor Part",
      },
      {
        accessorKey: "seat_number",
        header: "Number of Seats",
        Cell: ({ row }) => row.original?.seats?.length,
      },
    ],
    []
  );

  const handleRowClick = (row: Asset) => {
    router.push(`/dashboard/assets/show?id=${row.asset_id}`);
  };

  return (
    <GenericTable
      title={
        <div className="!font-satoshi px-12 py-4 text-2xl font-semibold text-[#1f325c] flex items-center gap-2">
          Licenses
        </div>
      }
      data={assets?.data}
      totalCount={assets?.total}
      columns={columns}
      onRowClick={handleRowClick}
      handlePage={handlePage}
      handleSorting={handleSorting}
      handleSearch={handleSearch}
    />
  );
};

export default PartnerLicensesTable;
