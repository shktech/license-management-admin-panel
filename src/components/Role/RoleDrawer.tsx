import React, { useState } from "react";
import { Button, Checkbox, Divider, Drawer, FormControl } from "@mui/material";
import GeneralInput from "@components/Input/GeneralInput";
import { Permission, Role } from "@/types/types";
import { RoleColors } from "@data/ColorData";
import { modalCancelBtnStyle, modalOkBtnStyle } from "@data/MuiStyles";
import { useUpdate } from "@refinedev/core";

interface RoleDrawerProps {
  onClose: () => void;
  role: Role;
}

const checkboxGroupInfo = [
  { title: "Users", key: "user" },
  { title: "Assets", key: "asset" },
  { title: "Transactions", key: "transaction" },
  { title: "Products", key: "product" },
];

const MyCheckbox = ({ checked, onChange }: any) => {
  return (
    <div className="text-center flex-1">
      <Checkbox
        defaultChecked={checked}
        onChange={onChange}
        sx={{
          color: "#003133",
          "&.Mui-checked": {
            color: "#003133",
          },
          "& .MuiSvgIcon-root": {
            fontSize: 20, // Change this to adjust the size
          },
        }}
      />
    </div>
  );
};

const RoleDrawer: React.FC<RoleDrawerProps> = ({ onClose, role }) => {
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
  const [permissions, setPermissions] = useState<Permission[]>(
    initializePermissions()
  );
  const { mutate } = useUpdate();

  const handleCheckboxChange = (
    codename: string,
    field: keyof Permission,
    checked: boolean
  ) => {
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
    mutate(
      {
        resource: "roles",
        id: `${(role?.group_id as string)}/`,
        values: payload,
      },
      {
        onError: (error) => {
          console.log(error);
        },
        onSuccess: () => onClose(),
      }
    );
  };

  return (
    <Drawer anchor="right" open={true} onClose={onClose}>
      <div className="min-w-[600px] min-h-screen px-7 pb-4 font-med flex flex-col justify-between">
        <div>
          <div className="py-4 text-lg font-bold text-[#65758c] flex items-center">
            {role ? "Edit Role" : "Create Role"}
            <span
              className={`px-4 mx-4 py-1 text-xs font-bold rounded-full text-white ${RoleColors[role?.name as string] || RoleColors.default}`}
            >
              {role?.name}
            </span>
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
            <div className="flex flex-col gap-2">
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
              <div className="flex-1 flex text-base font-medium text-[#65758c] px-8">
                <div className="w-20"></div>
                <div className="flex-1 text-center">Create</div>
                <div className="flex-1 text-center">Read</div>
                <div className="flex-1 text-center">Update</div>
                <div className="flex-1 text-center">Delete</div>
              </div>
              {checkboxGroupInfo.map(({ title, key }) => {
                const permission = permissions.find((p) => p.codename === key);
                return (
                  <div className="flex-1 flex items-center px-8" key={key}>
                    <div className="w-20 text-[#65758c] font-medium">
                      {title}
                    </div>
                    <MyCheckbox
                      checked={permission?.create}
                      onChange={(e: any) =>
                        handleCheckboxChange(key, "create", e.target.checked)
                      }
                    />
                    <MyCheckbox
                      checked={permission?.read}
                      onChange={(e: any) =>
                        handleCheckboxChange(key, "read", e.target.checked)
                      }
                    />
                    <MyCheckbox
                      checked={permission?.update}
                      onChange={(e: any) =>
                        handleCheckboxChange(key, "update", e.target.checked)
                      }
                    />
                    <MyCheckbox
                      checked={permission?.delete}
                      onChange={(e: any) =>
                        handleCheckboxChange(key, "delete", e.target.checked)
                      }
                    />
                  </div>
                );
              })}
            </div>
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
            {role ? "Save" : "Create"}
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default RoleDrawer;
