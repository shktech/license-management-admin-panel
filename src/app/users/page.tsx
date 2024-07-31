"use client";
import React, { useMemo } from "react";
import { useTable } from "@refinedev/core";
import { User } from "@/types/types";
import UserTable from "@components/Table/UserTable";
import { MRT_ColumnDef } from "material-react-table";
import Loader from "@components/common/Loader";
import SettingIcon from "@/assets/icons/setting.svg?icon";
import RemoveIcon from "@/assets/icons/remove.svg?icon";
import { userRoles } from "@data/UserRoleData";
import ChangeRoleModal from "@components/Users/ChangeRoleModal";
import DeleteUserModal from "@components/Users/DeleteUserModal";

const Page = () => {
  const [openRoleModal, setOpenRoleModal] = React.useState(false);
  const handleOpenRoleModal = () => setOpenRoleModal(true);
  const handleCloseRoleModal = () => setOpenRoleModal(false);

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const [selectedUser, setSelectedUser] = React.useState<User>();

  const {
    tableQueryResult: { data, isLoading },
  } = useTable<User>();


  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "user",
        header: "Name",
        size: 250,
        Cell: ({ cell, row }) => {
          const rowData = row.original;
          return (
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <img src={rowData.avatar} alt="" width={40} height={30} />
                <div className="flex flex-col justify-center">
                  <div className="text-sm">{rowData.name}</div>
                  <div className="text-xs text-[#818f99]">{rowData.email}</div>
                </div>
              </div>
              <div className="text-[#faa666] text-xs pr-8">{rowData.isLogIn == true ? '' : 'Not Logged in'}</div>
            </div>
          )
        },
      },
      {
        accessorKey: "role",
        header: "User Role",
        size: 150,
        Cell: ({ cell }) => {
          const roles = cell.getValue<string[]>();
          return (
            <div className="flex gap-2">
              {
                roles.map(role => {
                  const ur = userRoles.find(ur => ur.title == role);
                  return (
                    <div key={role} className={`${ur?.className} text-xs rounded-full px-2 py-1`}>{role}</div>
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
            <div className="flex gap-8">
              <div onClick={() => handleModifyRole(row.original)} className="flex gap-1 text-xs items-center cursor-pointer text-[#818f99] hover:text-black duration-500">
                <SettingIcon />
                Modifiy Roles
              </div>
              <div onClick={() => handleDeleteUser(row.original)} className="flex gap-1 text-xs items-center cursor-pointer text-[#818f99] hover:text-black duration-500">
                <RemoveIcon />
                Remove User
              </div>
            </div>
          )
        },
      },
    ],
    []
  );


  const handleModifyRole = (row: User) => {
    handleOpenRoleModal();
    setSelectedUser(row);
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
        <div className="rounded-xl drop-shadow-md bg-[#f7f9fa] px-5 pt-6 pb-2.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <UserTable
              title={
                <div className="flex items-center justify-center gap-2"> User Management </div>
              }
              data={data?.data}
              columns={columns}
            />
          </div>
        </div>
      )}
      <ChangeRoleModal
        openModal={openRoleModal}
        handleCloseModal={handleCloseRoleModal}
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
