"use client";
import React, { useMemo } from "react";
import { useLink, useList, useTable } from "@refinedev/core";
import { Role, User } from "@/types/types";
import UserTable from "@components/Table/UserTable";
import { MRT_ColumnDef } from "material-react-table";
import Loader from "@components/common/Loader";
import SettingIcon from "@/assets/icons/setting.svg?icon";
import RemoveIcon from "@/assets/icons/remove.svg?icon";
import { userRoles } from "@data/UserRoleData";
import DeleteUserModal from "@components/Users/DeleteUserModal";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import UserDrawer from "@components/Users/UserDrawer";

const Page = () => {
  const [openUserDrawer, setOpenUserDrawer] = React.useState(false);
  const handleOpenUserDrawer = () => setOpenUserDrawer(true);
  const handleCloseUserDrawer = () => setOpenUserDrawer(false);

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const [selectedUser, setSelectedUser] = React.useState<any>();

  const {
    tableQueryResult: { data, isLoading },
  } = useTable<User>();

  const { data: roleData, isLoading: roleIsLoading, isError } = useList({
    resource: "roles",
  });

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
        Cell: ({ cell, row }) => {
          const rowData = row.original;
          return (
            <div className="">{rowData.first_name} {rowData.last_name}</div>
          )
        },
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
        accessorKey: "groups",
        header: "User Role",
        size: 150,
        Cell: ({ cell }) => {
          const roles = cell.getValue<Role[]>();
          return (
            <div className="flex gap-2">
              {
                roles.map(role => {
                  const ur = userRoles.find(ur => ur.name == role.name);
                  return (
                    <div key={role.name} className={`${ur?.className} text-xs rounded-full px-2 py-1`}>{role.name}</div>
                  )
                })
              }
            </div>
          )
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        size: 200,
        enableSorting: false,
        Cell: ({ cell, row }) => {
          return (
            <div className="flex gap-4">
              <div onClick={() => handleModifyUser(row.original)} className="flex gap-1 text-xs items-center cursor-pointer text-[#818f99] hover:text-black duration-500">
                <EditOutlinedIcon fontSize="small"/>
              </div>
              <div onClick={() => handleDeleteUser(row.original)} className="flex gap-1 text-xs items-center cursor-pointer text-[#818f99] hover:text-black duration-500">
                <DeleteIcon fontSize="small"/>
              </div>
            </div>
          )
        },
      },
    ],
    []
  );


  const handleModifyUser = (row: User) => {
    handleOpenUserDrawer();
    setSelectedUser(row);
  };

  const handleCreateUser = () => {
    handleOpenUserDrawer();
    setSelectedUser(null);
  };

  const handleDeleteUser = (row: User) => {
    handleOpenDeleteModal();
    setSelectedUser(row);
  };
  
  return (
    <div className="flex flex-col gap-10">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="rounded-xl drop-shadow-md bg-white px-5 pt-6 pb-2.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <UserTable
              title={
                <div className="flex items-center justify-center gap-2"> User Management </div>
              }
              data={data?.data}
              columns={columns}
              handleCreateUser={handleCreateUser}
            />
          </div>
        </div>
      )}
      <UserDrawer
        openModal={openUserDrawer}
        handleCloseModal={handleCloseUserDrawer}
        selectedUser={selectedUser}
      />
      <DeleteUserModal
        openModal={openDeleteModal}
        handleCloseModal={handleCloseDeleteModal}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default Page;
