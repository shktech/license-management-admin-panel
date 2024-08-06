import React, { useEffect, useState } from 'react';
import { Button, Divider, Drawer, FormControl } from '@mui/material';
import { Role, User, Permission } from '../../types/types';
import GeneralInput from '@components/Input/GeneralInput';
import { modalCancelBtnStyle, modalOkBtnStyle } from '@data/MuiStyles';
import { RoleColors } from '@data/ColorData';
import { useUpdate } from '@refinedev/core';
import PermissionsTable from '@components/Role/PermissionsTable';

interface UserDrawerProps {
  openModal: boolean;
  handleCloseModal: () => void;
  selectedUser: User;
  userRoles: Role[];
}

const UserDrawer: React.FC<UserDrawerProps> = ({ openModal, handleCloseModal, selectedUser, userRoles }) => {
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const { mutate } = useUpdate();

  useEffect(() => {
    setSelectedRoles(selectedUser?.roles ?? []);
  }, [selectedUser]);

  useEffect(() => {
    updatePermissions();
  }, [selectedRoles]);

  const handleEachRole = (role: Role) => {
    const newRoles = selectedRoles.some(selectedRole => selectedRole.name === role.name)
      ? selectedRoles.filter(selectedRole => selectedRole.name !== role.name)
      : [...selectedRoles, role];
    setSelectedRoles(newRoles);
  };

  const updatePermissions = () => {
    const aggregatedPermissions: Permission[] = [];
    console.log(selectedRoles)

    selectedRoles.forEach(role => {
      role?.permissions?.forEach(rolePermission => {
        const existingPermission = aggregatedPermissions.find(
          perm => perm.codename === rolePermission.codename
        );

        if (existingPermission) {
          existingPermission.create = existingPermission.create || rolePermission.create;
          existingPermission.read = existingPermission.read || rolePermission.read;
          existingPermission.update = existingPermission.update || rolePermission.update;
          existingPermission.delete = existingPermission.delete || rolePermission.delete;
        } else {
          aggregatedPermissions.push({ ...rolePermission });
        }
      });
    });
    console.log(aggregatedPermissions);
    setPermissions(aggregatedPermissions);
  };

  const handleSave = () => {
    const payload = {
      role_ids: selectedRoles.map(role => role.role_id),
    };
    mutate({
      resource: "users",
      id: `${selectedUser.user_id}/roles/`,
      values: payload
    }, {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => handleCloseModal(),
    });
  };

  return (
    <Drawer anchor="right" open={openModal} onClose={handleCloseModal}>
      <div className="min-w-[800px] min-h-screen px-7 pb-4 font-med flex flex-col justify-between">
        <div>
          <div className='py-4 text-lg font-bold text-[#65758c] flex items-center'>
            {selectedUser ? "Edit User" : "Create User"}
          </div>
          <div className='flex flex-col gap-6'>
            <Divider sx={{ fontSize: '1rem', py: '0.5rem', fontWeight: 'bold', color: '#65758c' }}>General Information</Divider>
            <FormControl className="w-full">
              <GeneralInput
                id="user_id"
                name="user_id"
                label="User ID"
                type="text"
                defaultValue={selectedUser?.user_id}
                disabled={true}
              />
            </FormControl>
            <div className='flex gap-6'>
              <FormControl className="w-full">
                <GeneralInput
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  type="text"
                  defaultValue={selectedUser?.first_name}
                  disabled={true}
                />
              </FormControl>
              <FormControl className="w-full">
                <GeneralInput
                  id="last_name"
                  name="last_name"
                  label="Last Name"
                  type="text"
                  defaultValue={selectedUser?.last_name}
                  disabled={true}
                />
              </FormControl>
            </div>
            <div className='flex gap-6'>
              <FormControl className="w-full">
                <GeneralInput
                  id="email"
                  name="email"
                  label="Email"
                  type="text"
                  defaultValue={selectedUser?.email}
                  disabled={true}
                />
              </FormControl>
              <FormControl className="w-full">
                <GeneralInput
                  id="organization"
                  name="organization"
                  label="Organization"
                  type="text"
                  defaultValue={selectedUser?.organization}
                  disabled={true}
                />
              </FormControl>
            </div>
            <Divider sx={{ fontSize: '1rem', py: '0.5rem', fontWeight: 'bold', color: '#65758c' }}>User Role</Divider>
            <div className='flex items-center justify-center'>
              <div className="flex gap-2">
                {userRoles.map(role => {
                  const isSelected = selectedRoles.some(selectedRole => selectedRole.name === role.name);
                  const className = isSelected
                    ? `${RoleColors[role.name as string] || RoleColors.default} border border-transparent text-white`
                    : 'bg-white text-[#818f99] border border-[#818f99]';
                  return (
                    <div
                      key={role.name}
                      onClick={() => handleEachRole(role)}
                      className={`${className} text-sm rounded-full px-4 py-1 cursor-pointer`}
                    >
                      {role.name}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <Divider sx={{ fontSize: '1rem', py: '0.5rem', fontWeight: 'bold', color: '#65758c' }}></Divider> */}
            <PermissionsTable permissions={permissions} handleCheckboxChange={() => {}} readonly />
          </div>
        </div>
        <div className='flex justify-end gap-4'>
          <Button variant="contained" onClick={handleCloseModal} sx={modalCancelBtnStyle}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} sx={modalOkBtnStyle}>
            {selectedUser ? "Save" : "Create"}
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default UserDrawer;
