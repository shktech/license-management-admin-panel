"use client";
import React, { useMemo } from "react";
import { useNavigation, usePermissions, useTable } from "@refinedev/core";
import { Asset, Permission } from "@/types/types";
import GenericTable from "@components/Table/GenericTable";
import { MRT_ColumnDef, MRT_SortingState } from "material-react-table";
import Loader from "@components/common/Loader";
import { convertSortingStateToCrudSort } from "@utils/utilFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlassWater } from "@fortawesome/free-solid-svg-icons";

const Page = () => {
  const {
    tableQueryResult: { data, isLoading },
    setCurrent,
    setFilters,
    setSorters,
  } = useTable<Asset>({
    initialSorter: [
      {
        field: "created_at",
        order: "desc",
      },
    ],
  });
  const { push } = useNavigation();

  const handleSearch = (value: string) =>
    setFilters([{ field: "searchKey", operator: "contains", value: value }]);

  const handleSorting = (sorting: MRT_SortingState) =>
    setSorters(convertSortingStateToCrudSort(sorting));

  const handlePage = (value: number) => setCurrent(value);

  const { data: permissionsData } = usePermissions<Permission>({
    params: { codename: "asset" },
  });

  const columns = useMemo<MRT_ColumnDef<Asset>[]>(
    () => [
      {
        accessorKey: "license_key",
        header: "License Number (LicKey/Srl#)",
      },
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
    push(`/dashboard/assets/show?id=${row.asset_id}`);
  };

  return (
    <div className="pt-6 pb-2.5 xl:pb-1 overflow-x-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <GenericTable
          title={
            <div className="!font-satoshi px-12 py-4 text-2xl font-semibold text-[#1f325c] flex items-center gap-2">
              <FontAwesomeIcon icon={faGlassWater} />
              Licenses
            </div>
          }
          data={data?.data}
          columns={columns}
          noCreateNeed
          onRowClick={handleRowClick}
          totalCount={data?.total}
          handlePage={handlePage}
          handleSorting={handleSorting}
          handleSearch={handleSearch}
          canCreate={permissionsData?.create}
          canEdit={permissionsData?.update}
        />
      )}
    </div>
  );
};

export default Page;
