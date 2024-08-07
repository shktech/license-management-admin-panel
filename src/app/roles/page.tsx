"use client";
import React, { useMemo } from "react";
import { usePermissions, useTable } from "@refinedev/core";
import { Permission, Role } from "@/types/types";
import { MRT_ColumnDef } from "material-react-table";
import Loader from "@components/common/Loader";
import CommonTable from "@components/Table/CommonTable";
import { RoleColors } from "@data/ColorData";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RoleDrawer from "@components/Role/RoleDrawer";
import Unauthorized from "@components/Error/Unauthorized";
import GenericTable from "@components/Table/GenericTable";

const Page = () => {
  const {
    tableQueryResult: { data, isLoading, refetch },
  } = useTable<Role>();

  const sortedData = data?.data.sort((a, b) => {
    const specialRoles = ["Admin", "SuperUser", "User"];
    if (specialRoles.includes(a.name as string) && !specialRoles.includes(b.name as string)) {
      return -1;
    }
    if (!specialRoles.includes(a.name as string) && specialRoles.includes(b.name as string)) {
      return 1;
    }
    return 0;
  });

  const { data: permissionsData } = usePermissions<Permission>({ params: { codename: "role" } });

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [clickedRole, setClickedRole] = React.useState<any>();

  const handleClickItem = (role: Role) => {
    setClickedRole(role);
    setOpenDrawer(true);
  };

  const handleCreate = () => {
    setClickedRole(null);
    setOpenDrawer(true);
  };

  const handleClose = () => {
    refetch();
    setOpenDrawer(false);
  }

  const handleRowClick = (role: Role) => {
    setClickedRole(role);
    setOpenDrawer(true);
  }

  const columns = useMemo<MRT_ColumnDef<Role>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 100,
        Cell: ({ renderedCellValue, row }) => (
          <span
            className={`${RoleColors[row.original.name as string] || RoleColors["default"]} text-white px-4 py-1 text-xs font-bold rounded-full`}
          >
            {renderedCellValue}
          </span>
        ),
      },

      {
        accessorKey: "description",
        header: "Description",
        size: 250,
      },
      {
        accessorKey: "action",
        header: "Action",
        size: 100,
        enableSorting: false,
        Cell: ({ row }) => {
          const roleName = row.original.name;
          const isSpecialRole = ["Admin", "SuperUser", "User"].includes(roleName as string);
          return (
            <div className="flex gap-4">
              {!isSpecialRole && permissionsData?.update && (
                <EditOutlinedIcon
                  onClick={() => handleClickItem(row.original)}
                  fontSize="small"
                  className="text-[#818f99] hover:text-black cursor-pointer"
                />
              )}
              {!isSpecialRole && permissionsData?.delete && (
                <DeleteIcon
                  fontSize="small"
                  className="text-[#818f99] hover:text-black cursor-pointer"
                />
              )}
            </div>
          );
        },
      },
    ],
    [permissionsData]
  );

  return (
    permissionsData?.read ? (
      <div className="pt-6 pb-2.5 xl:pb-1 overflow-x-auto">
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <GenericTable
              title="Role & Permission"
              data={sortedData}
              columns={columns}
              handleCreate={handleCreate}
              canCreate={permissionsData?.create}
              onRowClick={handleRowClick}
              maxWidth={"1000px"}
            />
            {openDrawer && (
              <RoleDrawer
                onClose={handleClose}
                role={clickedRole}
                create={!clickedRole}
              />
            )}
          </div>
        )}
      </div>
    ) : (
      <Unauthorized />
    )
  );
};

export default Page;
