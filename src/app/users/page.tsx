"use client";
import React, { useMemo } from "react";
import { useTable } from "@refinedev/core";
import { Role, User } from "@/types/types";
import { MRT_ColumnDef } from "material-react-table";
import Loader from "@components/common/Loader";
import DeleteUserModal from "@components/Users/DeleteUserModal";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import UserDrawer from "@components/Users/UserDrawer";
import { RoleColors } from "@data/ColorData";
import CommonTable from "@components/Table/CommonTable";

const Page = () => {
  const {
    tableQueryResult: { data, isLoading },
  } = useTable<User>();

  const [selectedUser, setSelectedUser] = React.useState<any>();

  const [openUserDrawer, setOpenUserDrawer] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  const handleOpenUserDrawer = () => setOpenUserDrawer(true);
  const handleCloseUserDrawer = () => setOpenUserDrawer(false);

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

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

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "first_name",
        header: "Name",
        size: 150,
        Cell: ({ row }) => <div className="">{row.original.first_name} {row.original.last_name}</div>,
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
        accessorKey: "active",
        header: "Active",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded-full ${renderedCellValue ? 'bg-active' : 'bg-inactive'}`}></div>
          </div>
        ),
      },
      {
        accessorKey: "groups",
        header: "User Role",
        size: 150,
        Cell: ({ renderedCellValue }) => {
          return (
            <div className="flex gap-2">
              {(renderedCellValue as Role[]).map(role =>
                <div key={role.name} className={`${RoleColors[Number(role.id) % 4 - 1]} text-white  text-xs rounded-full px-2 py-1`}>{role.name}</div>
              )}
            </div>
          )
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        size: 100,
        enableSorting: false,
        Cell: ({ row }) => (
          <div className="flex gap-4">
            <EditOutlinedIcon onClick={() => handleModifyUser(row.original)} fontSize="small" className="text-[#818f99] hover:text-black cursor-pointer" />
            <DeleteIcon onClick={() => handleDeleteUser(row.original)} fontSize="small" className="text-[#818f99] hover:text-black cursor-pointer" />
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
              title={<div className="flex items-center justify-center gap-2"> User Management </div>}
              data={data?.data}
              columns={columns}
              handleCreate={handleCreateUser}
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
