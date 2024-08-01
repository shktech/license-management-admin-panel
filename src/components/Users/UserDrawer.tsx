import React, { useEffect } from 'react';
import { Box, Button, Divider, Drawer, FormControl, Modal } from '@mui/material';
import { userRoles } from '@data/UserRoleData';
import { Role, User } from '../../types/types';
import GeneralInput from '@components/Input/GeneralInput';


interface UserDrawerProps {
  openModal: boolean;
  handleCloseModal: () => void;
  selectedUser: any;
}

const buttonStyle = {
  px: 4, // Horizontal padding
  py: 0.5,  // Vertical padding
  borderRadius: '4px', // Rounded corners
  boxShadow: 'none',
  textTransform: 'none',
  fontWeight: '500',
  fontSize: '1rem',
};

const UserDrawer: React.FC<UserDrawerProps> = ({ openModal, handleCloseModal, selectedUser }) => {
  const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);
  const [userChanged, setUserChanged] = React.useState<boolean>(false);

  useEffect(() => {
    setSelectedRoles(selectedUser?.groups.map((g: Role) => g.name));
  }, [selectedUser])

  const handleEachRole = (roleName: string) => {
    let newRoles = selectedRoles?.includes(roleName) ? selectedRoles.filter(sr => sr != roleName) : [...(selectedRoles ?? []), roleName]
    setSelectedRoles(newRoles);
    setUserChanged(true);
  }
  const handleClose = () => {
    setUserChanged(false);
    setSelectedRoles([]);
    handleCloseModal();
  }

  return (
    <Drawer anchor="right" open={openModal} onClose={handleClose}>
      <div className="min-w-[800px] min-h-screen px-7 pb-4 font-med flex flex-col justify-between">
        <div>
          <div className='py-4 text-lg font-bold text-[#65758c] flex items-center'>
            {selectedUser ? "Edit user" : "Create User"}
          </div>
          <div className='flex flex-col gap-6'>
            <Divider sx={{ fontSize: '1rem', py: '0.5rem', fontWeight: 'bold', color: '#65758c' }}>General Information</Divider>
            <FormControl className="w-full">
              <GeneralInput
                id="user_id"
                name="user_id"
                label="user_id"
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
                  label="First name"
                  type="text"
                  defaultValue={selectedUser?.first_name}
                  disabled={false}
                />
              </FormControl>
              <FormControl className="w-full">
                <GeneralInput
                  id="last_name"
                  name="last_name"
                  label="Last name"
                  type="text"
                  defaultValue={selectedUser?.last_name}
                  disabled={false}
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
                  disabled={false}
                />
              </FormControl>
              <FormControl className="w-full">
                <GeneralInput
                  id="organization"
                  name="organization"
                  label="Organization"
                  type="text"
                  defaultValue={selectedUser?.organization}
                  disabled={false}
                />
              </FormControl>
            </div>
            <Divider sx={{ fontSize: '1rem', py: '0.5rem', fontWeight: 'bold', color: '#65758c' }}>User Role</Divider>
            <div className='flex items-center justify-center'>
              <div className="flex gap-2">
                {
                  userRoles.map(ur => {
                    const cName = selectedRoles?.find(sr => sr == ur.name) ? `${ur.className} border border-transparent` : 'bg-white text-[#818f99] border border-[#818f99]'
                    return (
                      <div key={ur.name} onClick={() => handleEachRole(ur.name)} className={`${cName} text-sm rounded-full px-4 py-1 cursor-pointer `}>{ur.name}</div>
                    )
                  })
                }
              </div>
            </div>
            <Divider sx={{ fontSize: '1rem', py: '0.5rem', fontWeight: 'bold', color: '#65758c' }}></Divider>
          </div>
        </div>
        <div className='flex justify-end gap-4'>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              bgcolor: 'white', // Background color
              color: 'black', // Text color
              '&:hover': {
                bgcolor: '#edf0f2', // Background color on hover
                opacity: 0.9, // Adjust opacity on hover
                boxShadow: 'none',
              },
              ...buttonStyle
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            // disabled={!userChanged}
            sx={{
              bgcolor: '#003133', // Background color
              color: 'white', // Text color
              '&:hover': {
                bgcolor: '#003133', // Background color on hover
                opacity: 0.9, // Adjust opacity on hover
                boxShadow: 'none',
              },
              ...buttonStyle
            }}
          >
            {selectedUser ? "Save" : "Create"}
          </Button>
        </div>
      </div>
    </Drawer >
  );
};

export default UserDrawer;
