import React, { useState } from "react";
import { Button, Divider, FormControl } from "@mui/material";
import GeneralInput from "@components/Input/GeneralInput";
import { Permission, Role } from "@/types/types";
import { modalOkBtnStyle } from "@data/MuiStyles";
import { useCreate, useUpdate } from "@refinedev/core";
import PermissionsTable from "./PermissionsTable";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from "next/link";

interface RoleDetailPanelProps {
  role?: Role;
  isShow?: boolean;
}

const RoleDetailPanel: React.FC<RoleDetailPanelProps> = ({ role, isShow }) => {
  const checkboxGroupInfo = [
    { title: "Users", key: "user" },
    { title: "Role", key: "role" },
    { title: "Licenses", key: "asset" },
    { title: "Transactions", key: "transaction" },
    { title: "Products", key: "product" },
  ];

  const initializePermissions = () => {
    return checkboxGroupInfo.map(({ key }) => {
      const permission = role?.permissions?.find((p) => p.codename === key);
      return {
        id: permission?.id,
        codename: key,
        create: permission?.create || false,
        read: permission?.read || false,
        update: permission?.update || false,
        delete: permission?.delete || false,
      };
    });
  };

  const [name, setName] = useState(role?.name || "");
  const [description, setDescription] = useState(role?.description || "");
  const [permissions, setPermissions] = useState<Permission[]>(initializePermissions());
  const { mutate: updateRole } = useUpdate();
  const { mutate: createRole } = useCreate();

  const handleCheckboxChange = (codename: string, field: keyof Permission, checked: boolean) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((permission) =>
        permission.codename === codename
          ? { ...permission, [field]: checked }
          : permission
      )
    );
  };

  const handleSubmit = () => {
    const payload = { name, description, permissions };
    if (role) {
      updateRole(
        {
          resource: "roles",
          id: `${(role?.role_id as string)}/`,
          values: payload,
        },
        {
          onError: (error) => console.log(error),
          onSuccess: () => console.log("success"),
        }
      );
      return;
    } else {
      createRole(
        {
          resource: "roles",
          values: payload,
        },
        {
          onError: (error) => console.log(error),
          onSuccess: () => console.log("success"),
        }
      );
    }
  };

  return (
    <div className="bg-white px-8 py-8 font-med flex flex-col">
      <div className="text-xl font-semibold text-black flex items-center gap-4">
        <Link href={role && !isShow ? "/dashboard/organizations/roles/show?id=" + role?.role_id : "/dashboard/organizations"} className="pb-1 hover:text-slate-700">
          <ArrowBackIosNewIcon fontSize="small" />
        </Link>
        <div className="flex flex-1 items-center justify-between">
          <div>{role ? isShow ? "" : "Edit" : "Create"} Role</div>
          {isShow && (
            <Link href={`/dashboard/organizations/roles/edit?id=${role?.role_id}`} className="bg-[#003133] text-white px-8 py-2 rounded-md text-sm font-medium">
              Edit
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Divider
          sx={{
            fontSize: "1rem",
            py: "1rem",
            fontWeight: "bold",
            color: "#65758c",
          }}
        >
          General Information
        </Divider>
        <FormControl className="w-full">
          <GeneralInput
            id="name"
            name="name"
            label="Role Name"
            type="text"
            disabled={isShow}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl className="w-full">
          <GeneralInput
            id="desc"
            name="desc"
            label="Role Description"
            type="text"
            disabled={isShow}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <Divider
          sx={{
            fontSize: "1rem",
            py: "1rem",
            fontWeight: "bold",
            color: "#65758c",
          }}
        >
          Roles Permission
        </Divider>
        <PermissionsTable
          permissions={permissions}
          readonly={isShow}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
      <div className="flex justify-end pt-4">
        {!isShow && (
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={modalOkBtnStyle}
          >
            {role ? "Save" : "Create"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default RoleDetailPanel;
