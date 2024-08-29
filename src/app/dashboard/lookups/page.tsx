"use client";
import CommonTable from "@components/Table/CommonTable";
import { Lookup } from "../../../types/types";
import { MRT_ColumnDef } from "material-react-table";
import React, { useMemo, useState } from "react";
import { CustomTabPanel, StyledTab, StyledTabs } from "@components/Tab/CustomizedTab";
import LookupDetailDrawer from "@components/Lookup/LookupDetailDrawer";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigation, useTable } from "@refinedev/core";
import Loader from "@components/common/Loader";
import GenericTable from "@components/Table/GenericTable";

const HomePage: React.FC = () => {
  const {
    tableQueryResult: { data, isLoading, refetch },
  } = useTable<Lookup>({
    hasPagination: false,
  });

  const { push } = useNavigation();

  const handleCreate = () => {
    // setOpenDrawer(true);
    push("/dashboard/lookups/create");
  }

  const handleEditClick = (row: Lookup) => {
    push(`/dashboard/lookups/show?id=${row.lookup_id}`);
  };

  const columns = useMemo<MRT_ColumnDef<Lookup>[]>(
    () => [
      {
        accessorKey: "lookup_name",
        header: "Name",
        size: 200,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 400,
      },
      {
        accessorKey: "active",
        header: "Active",
        size: 50,
        Cell: ({ renderedCellValue }) => <div className={`rounded-full h-4 w-4 ${renderedCellValue ? 'bg-[#11ba82]' : 'bg-[#929ea8]'}`}></div>
      },
      {
        accessorKey: "actions",
        header: "Action",
        size: 50,
        enableSorting: false,
        pin: 'right',
        Cell: ({ row }) => (
          <div className="w-full h-full">
            <div className="flex gap-4">
              <EditOutlinedIcon onClick={() => handleEditClick(row.original)} fontSize="small" className="text-[#818f99] hover:text-black cursor-pointer" />
            </div>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <div className="pt-6 pb-2.5 xl:pb-1 overflow-x-auto">
      {
        isLoading ?
          <Loader /> :
          <GenericTable
            title={
              <div className="!font-satoshi text-2xl font-semibold text-[#515f72] flex items-center gap-2">
                References
              </div>
            }
            data={data?.data}
            columns={columns}
            canCreate={true}
            totalCount={data?.total}
            handleCreate={handleCreate}
          />
      }
    </div>
  );
};

export default HomePage;
