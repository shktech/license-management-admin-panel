import React, { useMemo } from "react";
import { useNavigation, usePermissions, useTable } from "@refinedev/core";
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
interface RolePanelProps {}

const RolePanel: React.FC<RolePanelProps> = () => {
  const {
    tableQueryResult: { data, isLoading, refetch },
  } = useTable<Role>({
    hasPagination: false,
    resource: 'roles'
  });
  const { push } = useNavigation();
  const sortedData = data?.data.sort((a, b) => {
    const specialRoles = ["Admin", "SuperUser", "User"];
    if (
      specialRoles.includes(a.name as string) &&
      !specialRoles.includes(b.name as string)
    ) {
      return -1;
    }
    if (
      !specialRoles.includes(a.name as string) &&
      specialRoles.includes(b.name as string)
    ) {
      return 1;
    }
    return 0;
  });
  const { data: permissionsData } = usePermissions<Permission>({
    params: { codename: "role" },
  });

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [clickedRole, setClickedRole] = React.useState<any>();

  const handleClickItem = (role: Role) => {
    // setClickedRole(role);
    // setOpenDrawer(true);
    push(`/dashboard/organizations/roles/show?id=${role.role_id}`);
  };

  const handleCreate = () => {
    // setClickedRole(null);
    // setOpenDrawer(true);
    push(`/dashboard/organizations/roles/create`);
  };

  const handleClose = () => {
    refetch();
    setOpenDrawer(false);
  };

  const handleRowClick = (role: Role) => {
    setClickedRole(role);
    setOpenDrawer(true);
  };

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
    ],
    [permissionsData]
  );

  return (
    <div className="overflow-x-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <GenericTable
            title={<div className="!font-satoshi px-12 text-lg font-semibold text-[#1f325c] flex items-center gap-2">Role & Permission</div>}
            data={sortedData}
            columns={columns}
            handleCreate={handleCreate}
            // canCreate={permissionsData?.create}
            canCreate={true}
            // onRowClick={handleRowClick}
            onRowClick={handleClickItem}
            noSearchNeed
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
  );
};

export default RolePanel;
