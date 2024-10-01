"use client";
import { MRT_ColumnDef } from "material-react-table";
import React, { useMemo } from "react";
import { useNavigation, useTable } from "@refinedev/core";
import Loader from "@components/common/Loader";
import GenericTable from "@components/Table/GenericTable";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import StateComponent from "@components/common/StateComponent";
import { Lookup } from "@/types/types";

const HomePage: React.FC = () => {
  const {
    tableQueryResult: { data, isLoading, refetch },
  } = useTable<Lookup>({
    hasPagination: false,
  });

  const { push } = useNavigation();

  const handleCreate = () => {
    push("/dashboard/lookups/create");
  };

  const handleEditClick = (row: Lookup) => {
    push(`/dashboard/lookups/show?id=${row.lookup_code}`);
  };

  const columns = useMemo<MRT_ColumnDef<Lookup>[]>(
    () => [
      {
        accessorKey: "lookup_name",
        header: "Name",
        size: 200,
      },
      {
        accessorKey: "lookup_code",
        header: "Code",
        size: 200,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 400,
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 50,
      },
      {
        accessorKey: "parent_lookup.lookup_name",
        header: "Master Lookup",
        size: 50,
      },
      {
        accessorKey: "active",
        header: "Active",
        size: 50,
        Cell: ({ renderedCellValue }) => (
          <StateComponent active={renderedCellValue as boolean} withLabel />
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
              <DnsRoundedIcon />
              Lookups
            </div>
          }
          data={data?.data}
          columns={columns}
          canCreate={true}
          onRowClick={handleEditClick}
          // totalCount={data?.total}
          handleCreate={handleCreate}
          noSearchNeed={true}
          noSortNeed={true}
        />
      )}
    </div>
  );
};

export default HomePage;
