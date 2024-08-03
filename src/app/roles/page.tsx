"use client";
import React, { useMemo } from "react";
import { useTable } from "@refinedev/core";
import { Role } from "@/types/types";
import { MRT_ColumnDef } from "material-react-table";
import Loader from "@components/common/Loader";
import CommonTable from "@components/Table/CommonTable";
import { RoleColors } from "@data/ColorData";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RoleDrawer from "@components/Role/RoleDrawer";

const Page = () => {
  const {
    tableQueryResult: { data, isLoading },
  } = useTable<Role>();

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [clickedRole, setClickedRole] = React.useState<any>();

  const handleClickItem = (role: Role) => {
    setClickedRole(role);
    setOpenDrawer(true);
  };

  const handleCreate = () => {
    setClickedRole(null);
    setOpenDrawer(true);
  }

  const columns = useMemo<MRT_ColumnDef<Role>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 100,
        Cell: ({ renderedCellValue, row }) => (
          <span className={`${RoleColors[Number(row.original.id) % 4 - 1]} text-white px-4 py-1 text-xs font-bold rounded-full`}>
            {renderedCellValue}
          </span>
        ),
      },

      {
        accessorKey: "description",
        header: "Description",
        size: 400,
      },
      {
        accessorKey: "action",
        header: "Action",
        size: 100,
        enableSorting: false,
        Cell: ({ row }) => (
          <div className="flex gap-4">
            <EditOutlinedIcon onClick={() => handleClickItem(row.original)} fontSize="small" className="text-[#818f99] hover:text-black cursor-pointer" />
            <DeleteIcon fontSize="small" className="text-[#818f99] hover:text-black cursor-pointer" />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-10">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="rounded-xl drop-shadow-md bg-white px-5 pt-6 pb-2.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <CommonTable
              title="Role & Permission"
              data={data?.data}
              columns={columns}
              handleCreate={handleCreate}
            />
          </div>
          <RoleDrawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            role={clickedRole}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
