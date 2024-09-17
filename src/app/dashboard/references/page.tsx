"use client";
import React, { useMemo } from "react";
import { useNavigation, useTable, useDelete } from "@refinedev/core";
import { Reference } from "@/types/types";
import GenericTable from "@components/Table/GenericTable";
import { MRT_ColumnDef, MRT_SortingState } from "material-react-table";
import Loader from "@components/common/Loader";
import StateComponent from "@components/common/StateComponent";
import FindInPageRoundedIcon from "@mui/icons-material/FindInPageRounded";

const Page = () => {
  const {
    tableQueryResult: { data, isLoading, refetch },
  } = useTable<Reference>({
    hasPagination: false,
  });

  const { push } = useNavigation();

  const handleCreate = () => {
    // setOpenDrawer(true);
    push("/dashboard/references/create");
  };

  const handleRowClick = (row: Reference) => {
    push(`/dashboard/references/show?id=${row.reference_id}`);
  };
  const columns = useMemo<MRT_ColumnDef<Reference>[]>(
    () => [
      {
        accessorKey: "reference_name",
        header: "Program Name",
        size: 200,
      },
      {
        accessorKey: "reference_type",
        header: "Program Type",
        size: 200,
      },
      // {
      //   accessorKey: "reference_description",
      //   header: "Description",
      //   size: 250,
      // },
      {
        accessorKey: "active",
        header: "Active",
        Cell: ({ renderedCellValue }) => (
          <div className="flex items-center justify-center">
            <StateComponent active={renderedCellValue as boolean} />
          </div>
        ),
        size: 100,
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
              <FindInPageRoundedIcon />
              References
            </div>
          }
          data={data?.data}
          columns={columns}
          canCreate={true}
          totalCount={data?.total}
          onRowClick={handleRowClick}
          handleCreate={handleCreate}
          noSearchNeed={true}
          noSortNeed={true}
        />
      )}
    </div>
  );
};

export default Page;
