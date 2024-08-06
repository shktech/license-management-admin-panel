import React, { useState } from "react";
import { Button, Divider, Drawer, FormControl } from "@mui/material";
import GeneralInput from "@components/Input/GeneralInput";
import { Permission, Role } from "@/types/types";
import { RoleColors } from "@data/ColorData";
import { modalCancelBtnStyle, modalOkBtnStyle } from "@data/MuiStyles";
import { useCreate, useUpdate } from "@refinedev/core";
import PermissionsTable from "./PermissionsTable";

interface RoleDrawerProps {
  onClose: () => void;
  role: Role;
  create: boolean;
}

const RoleDrawer: React.FC<RoleDrawerProps> = ({ onClose, role, create }) => {
  const checkboxGroupInfo = [
    { title: "Users", key: "user" },
    { title: "Role", key: "role" },
    { title: "Assets", key: "asset" },
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
    if (create) {
      createRole(
        {
          resource: "roles/",
          values: payload,
        },
        {
          onError: (error) => {
            console.log(error);
          },
          onSuccess: () => onClose(),
        }
      );
      return;
    } else {
      updateRole(
        {
          resource: "roles",
          id: `${(role?.role_id as string)}/`,
          values: payload,
        },
        {
          onError: (error) => {
            console.log(error);
          },
          onSuccess: () => onClose(),
        }
      );
    }
  };

  return (
    <Drawer anchor="right" open={true} onClose={onClose}>
      <div className="min-w-[600px] min-h-screen px-7 pb-4 font-med flex flex-col justify-between">
        <div>
          <div className="py-4 text-lg font-bold text-[#65758c] flex items-center">
            {create ? "Create Role" : "Edit Role"}
            {!create && (
              <span className={`px-4 mx-4 py-1 text-xs font-bold rounded-full text-white ${RoleColors[role?.name as string] || RoleColors.default}`}>
                {role?.name}
              </span>
            )}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <PermissionsTable
              permissions={permissions}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            variant="contained"
            onClick={onClose}
            sx={modalCancelBtnStyle}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={modalOkBtnStyle}
          >
            {create ? "Create" : "Save"}
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default RoleDrawer;
