import React from 'react';
import { Button, Divider, Drawer, FormControl } from '@mui/material';
import { User } from '../../types/types';
import GeneralInput from '@components/Input/GeneralInput';
import { modalCancelBtnStyle, modalOkBtnStyle } from '@data/MuiStyles';
import { useCreate } from '@refinedev/core';
import useStore from '@hooks/globalStore';

interface UserDrawerProps {
  handleCloseModal: () => void;
  inactiveUser?: User;
}

const InviteUserDrawer: React.FC<UserDrawerProps> = ({  handleCloseModal, inactiveUser }) => {
  const { mutate } = useCreate();
  const [invitationEmail, setInvitationEmail] = React.useState<string>(inactiveUser?.email as string);

  const handleSave = () => {
    mutate({
        resource: "invite/",
        values: {
            email: invitationEmail,
        }
    }, {
        onSuccess: () => handleCloseModal(),
    })
  }

  return (
    <Drawer anchor="right" open={true} onClose={handleCloseModal}>
      <div className="min-w-[800px] min-h-screen px-7 pb-4 font-med flex flex-col justify-between">
        <div>
          <div className='py-4 text-lg font-bold text-[#65758c] flex items-center'>
            {"Invite User"}
          </div>
          <div className='flex flex-col gap-6'>
            <Divider sx={{ fontSize: '1rem', py: '0.5rem', fontWeight: 'bold', color: '#65758c' }}>General Information</Divider>
            <div className='flex gap-6'>
              <FormControl className="w-full">
                <GeneralInput
                  id="email"
                  name="email"
                  label="Email"
                  type="text"
                  defaultValue={inactiveUser?.email}
                  onChange={(e) => setInvitationEmail(e.target.value)}
                  disabled={!!inactiveUser}
                />
              </FormControl>
              <FormControl className="w-full">
                <GeneralInput
                  id="organization"
                  name="organization"
                  label="Organization"
                  type="text"
                  defaultValue={useStore.getState().user?.organization}
                  disabled={true}
                />
              </FormControl>
            </div>
            <Divider sx={{ fontSize: '1rem', py: '0.5rem', fontWeight: 'bold', color: '#65758c' }}></Divider>
          </div>
        </div>
        <div className='flex justify-end gap-4'>
          <Button variant="contained" onClick={handleCloseModal} sx={modalCancelBtnStyle}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} sx={modalOkBtnStyle}>
            {"Send invitation email"}
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default InviteUserDrawer;
