"use client";
import React, { useMemo } from "react";
import { HttpError, useList, usePermissions, useTable } from "@refinedev/core";
import { Permission, Role, User } from "@/types/types";
import { MRT_ColumnDef } from "material-react-table";
import Loader from "@components/common/Loader";
import DeleteUserModal from "@components/Users/DeleteUserModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import UserDrawer from "@components/Users/UserDrawer";
import { RoleColors } from "@data/ColorData";
import CommonTable from "@components/Table/CommonTable";
import InviteUserDrawer from "@components/Users/InviteUserDrawer";
import Unauthorized from "@components/Error/Unauthorized";

const Page = () => {
  const {
    tableQueryResult: { data, isLoading, refetch },
  } = useTable<User>();

  const {
    data: rolesData,
    isLoading: isRolesLoading,
    isError: isRolesError,
  } = useList<Role, HttpError>({
    resource: "roles",
  });

  const { data: permissionsData } = usePermissions<Permission>({ params: { codename: "user" } });

  const userRoles = rolesData?.data || [];

  const [selectedUser, setSelectedUser] = React.useState<any>();

  const [openUserDrawer, setOpenUserDrawer] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openCreateUserDrawer, setOpenCreateUserDrawer] = React.useState(false);

  const handleOpenUserDrawer = () => setOpenUserDrawer(true);
  const handleOpenCreateUserDrawer = () => setOpenCreateUserDrawer(true);
  const handleCloseCreateUserDrawer = () => setOpenCreateUserDrawer(false);
  const handleCloseUserDrawer = () => {
    refetch();
    setOpenUserDrawer(false);
  };

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleModifyUser = (row: User) => {
    setSelectedUser(row);
    row.is_active ? handleOpenUserDrawer() : handleOpenCreateUserDrawer();
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    handleOpenCreateUserDrawer();
  };

  const handleDeleteUser = (row: User) => {
    handleOpenDeleteModal();
    setSelectedUser(row);
  };

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "first_name",
        header: "Name",
        size: 150,
        Cell: ({ row }) => (
          <div className="">
            {row.original.first_name} {row.original.last_name}
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 180,
      },
      {
        accessorKey: "organization",
        header: "Organization",
        size: 150,
      },
      {
        accessorKey: "is_active",
        header: "Active",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <div className="flex items-center">
            <div
              className={`w-4 h-4 rounded-full ${renderedCellValue ? "bg-active" : "bg-inactive"}`}
            ></div>
          </div>
        ),
      },
      {
        accessorKey: "roles",
        header: "User Role",
        size: 150,
        Cell: ({ renderedCellValue }) => {
          return (
            <div className="flex gap-2">
              {(renderedCellValue as Role[])?.map((role) => (
                <div
                  key={role.name}
                  className={`${RoleColors[role.name as string] || RoleColors["default"]} text-white  text-xs rounded-full px-2 py-1`}
                >
                  {role.name}
                </div>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        size: 100,
        enableSorting: false,
        Cell: ({ row }) => (
          <div className="flex gap-4">
            {permissionsData?.update && <EditOutlinedIcon
              onClick={() => handleModifyUser(row.original)}
              fontSize="small"
              className="text-[#818f99] hover:text-black cursor-pointer"
            />}
            {permissionsData?.delete && <DeleteIcon
              onClick={() => handleDeleteUser(row.original)}
              fontSize="small"
              className="text-[#818f99] hover:text-black cursor-pointer"
            />}
          </div>
        ),
      },
    ],
    []
  );

  return (
    permissionsData?.read ? (
      <div className="pt-6 pb-2.5 xl:pb-1 overflow-x-auto">
        {isLoading || isRolesLoading ? (
          <Loader />
        ) : (

          <CommonTable
            title={
              <div className="!font-satoshi text-2xl font-semibold text-[#515f72] flex items-center gap-2">
                {" "}
                User Management{" "}
              </div>
            }
            data={data?.data}
            columns={columns}
            handleCreate={handleCreateUser}
            addText={"Invite user"}
            canCreate={permissionsData?.create}
          />
        )}
        {
          openCreateUserDrawer && (
            <InviteUserDrawer inactiveUser={selectedUser} handleCloseModal={handleCloseCreateUserDrawer} />
          )
        }
        {openUserDrawer && (
          <UserDrawer
            openModal={openUserDrawer}
            handleCloseModal={handleCloseUserDrawer}
            selectedUser={selectedUser}
            userRoles={userRoles}
          />
        )}
        {openDeleteModal && (
          <DeleteUserModal
            openModal={openDeleteModal}
            handleCloseModal={handleCloseDeleteModal}
            selectedUser={selectedUser}
          />
        )}
      </div>
    ) : (
      <Unauthorized />
    )
  );
};

export default Page;
