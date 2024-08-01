"use client";
import React, { useMemo } from "react";
import { useNavigation, useTable } from "@refinedev/core";
import { Role } from "@/types/types";
import GenericTable from "@components/Table/GenericTable";
import { MRT_ColumnDef } from "material-react-table";
import ProductIcon from "@/assets/icons/products.svg?icon";
import Loader from "@components/common/Loader";
import DetailDrawer from "@components/common/View/GeneralPanel";
import SettingIcon from "@/assets/icons/setting.svg?icon";
import RemoveIcon from "@/assets/icons/remove.svg?icon";
import { Box, Button } from "@mui/material";
import RoleDrawer from "@components/common/View/RoleDrawer";
import RoleTable from "@components/Table/RoleTable";

const Page = () => {
  const {
    tableQueryResult: { data, isLoading },
  } = useTable<Role>();

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [clickedRole, setClickedRole] = React.useState<any>();

  const roles: Role[] = data?.data as Role[];

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
        Cell: ({ cell, row }) => {
          return (
            <span
              className="px-4 py-1 text-xs font-bold rounded-full"
              style={{ backgroundColor: row.original.bgColor, color: row.original.textColor }}
            >
              {cell.getValue<string>()}
            </span>
          )
        },
      },

      {
        accessorKey: "description",
        header: "Description",
        size: 250,
      },
      {
        accessorKey: "action",
        header: "Action",
        size: 200,
        enableSorting: false,
        Cell: ({ cell, row }) => {
          return (
            <div className="flex gap-8">
              <div onClick={() => handleClickItem(row.original)} className="flex gap-1 text-xs items-center cursor-pointer text-[#818f99] hover:text-black duration-500">
                <SettingIcon />
                Modifiy Roles
              </div>
              <div className="flex gap-1 text-xs items-center cursor-pointer text-[#818f99] hover:text-black duration-500">
                <RemoveIcon />
                Remove
              </div>
            </div>
          )
        },
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
            <RoleTable
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
