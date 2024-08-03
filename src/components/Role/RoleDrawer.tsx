import React, { useState } from 'react';
import { Button, Checkbox, Divider, Drawer, FormControl } from '@mui/material';
import GeneralInput from '@components/Input/GeneralInput';
import { Role } from '../../types/types';
import { RoleColors } from '@data/ColorData';
import { modalCancelBtnStyle, modalOkBtnStyle } from '@data/MuiStyles';

interface RoleDrawerProps {
  open: boolean;
  onClose: () => void;
  role: Role;
}


const permissions = [1, 2, 3, 4]; //Read, Create, Update, Delete

const checkboxGroupInfo = [
  {
    title: "Users",
    key: "users",
  },
  {
    title: "Assets",
    key: "assets",
  },
  {
    title: "Transactions",
    key: "transactions",
  },
  {
    title: "Products",
    key: "products",
  },
]

const MyCheckbox = ({ checked }: any) => {
  return (
    <div className='text-center flex-1'>
      <Checkbox
        defaultChecked={checked}
        sx={{
          color: '#003133',
          '&.Mui-checked': {
            color: '#003133',
          },
          '& .MuiSvgIcon-root': {
            fontSize: 20, // Change this to adjust the size
          },
        }}
      />
    </div>
  )
}

const RoleDrawer: React.FC<RoleDrawerProps> = ({ open, onClose, role }) => {
  console.log(role);
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="min-w-[600px] min-h-screen px-7 pb-4 font-med flex flex-col justify-between">
        <div>
          <div className='py-4 text-lg font-bold text-[#65758c] flex items-center'>
            { role ? 'Edit Role': 'Create Role'}
            <span className={`px-4 mx-4 py-1 text-xs font-bold rounded-full text-white ${RoleColors[Number(role?.id) - 1]}`}>
              {role?.name}
            </span>
          </div>
          <div className='flex flex-col gap-4'>
            <Divider sx={{ fontSize: '1rem', py: '1rem', fontWeight: 'bold', color: '#65758c' }}>General Information</Divider>
            <FormControl className="w-full">
              <GeneralInput
                id="name"
                name="name"
                label="Role Name"
                type="text"
                defaultValue={role?.name}
                disabled={false}
              />
            </FormControl>
            <FormControl className="w-full">
              <GeneralInput
                id="desc"
                name="desc"
                label="Role Description"
                type="text"
                defaultValue={role?.description}
                disabled={false}
              />
            </FormControl>
            <div className='flex flex-col gap-2'>
              <Divider sx={{ fontSize: '1rem', py: '1rem', fontWeight: 'bold', color: '#65758c' }}>Roles Permission</Divider>
              <div className='flex-1 flex text-base font-medium text-[#65758c] px-8'>
                <div className='w-20'></div>
                <div className='flex-1 text-center'>Read</div>
                <div className='flex-1 text-center'>Create</div>
                <div className='flex-1 text-center'>Update</div>
                <div className='flex-1 text-center'>Delete</div>
              </div>
              {
                checkboxGroupInfo.map(ci => (
                  <div className='flex-1 flex items-center px-8'>
                    <div className='w-20 text-[#65758c] font-medium'>{ci.title}</div>
                    {
                      permissions.map(perm => {
                        return <MyCheckbox checked={role?.permission[ci.key].includes(perm)} />
                      })
                    }
                  </div>
                ))
              }
            </div>
            <Divider sx={{ fontSize: '1rem', py: '1rem', fontWeight: 'bold', color: '#65758c' }}></Divider>
          </div>
        </div>
        <div className='flex justify-end gap-4'>
          <Button variant="contained" onClick={onClose} sx={modalCancelBtnStyle}>Cancel</Button>
          <Button variant="contained" onClick={onClose} sx={modalOkBtnStyle}>{ role ? 'Save': 'Create'}</Button>
        </div>
      </div>

    </Drawer>
  );
};

export default RoleDrawer;
