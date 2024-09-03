import React, { useMemo } from "react";
import { useNavigation, useTable } from "@refinedev/core";
import { User, Role } from "@/types/types";
import { MRT_ColumnDef } from "material-react-table";
import Loader from "@components/common/Loader";
import { RoleColors } from "@data/ColorData";
import GenericTable from "@components/Table/GenericTable";
import MemeberInvitePanel from "./MemeberInvitePanel";

const MemeberPanel: React.FC = () => {
  const { push } = useNavigation();
  const {
    tableQueryResult: { data, isLoading },
  } = useTable<User>({
    hasPagination: false,
    resource: "users",
  });

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "first_name",
        header: "Name",
        size: 150,
        Cell: ({ row }) => (
          <div>
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
        Cell: ({ renderedCellValue }) => (
          <div className="flex gap-2">
            {(renderedCellValue as Role[])?.map((role) => (
              <div
                key={role.name}
                className={`${RoleColors[role.name as string] || RoleColors["default"]} text-white text-xs rounded-full px-2 py-1`}
              >
                {role.name}
              </div>
            ))}
          </div>
        ),
      },
    ],
    []
  );

  const handleRowClick = (row: User) => {
    push(`/dashboard/organizations/users/show?id=${row.user_id}`);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="overflow-x-auto">
      <GenericTable
        title={
          <div className="!font-satoshi px-8 text-lg font-semibold text-[#1f325c] flex items-center gap-2">
            Memebers
          </div>
        }
        data={data?.data}
        columns={columns}
        onRowClick={handleRowClick}
        noSearchNeed
      />
      <MemeberInvitePanel />
    </div>
  );
};

export default MemeberPanel;
