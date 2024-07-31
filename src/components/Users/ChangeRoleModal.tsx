import React, { useEffect } from 'react';
import { Box, Button, Drawer, Modal } from '@mui/material';
import { userRoles } from '@data/UserRoleData';
import { User } from '../../types/types';


interface ChangeRoleModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
  selectedUser: User | undefined;
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  px: 2,
  py: 2,
  '&:focus': {
    outline: 'none', // Ensure focus outline is removed
  },
};


const buttonStyle = {
  px: 2.5, // Horizontal padding
  py: 0.5,  // Vertical padding
  borderRadius: '8px', // Rounded corners
  boxShadow: 'none',
  textTransform: 'none',
  fontWeight: '500',
  fontSize: '0.75rem',
};


const ChangeRoleModal: React.FC<ChangeRoleModalProps> = ({ openModal, handleCloseModal, selectedUser }) => {

  const [selectedRoles, setSelectedRoles] = React.useState<string[]>();
  const [roleChanged, setRoleChanged] = React.useState<boolean>(false);
  const handleEachRole = (role: string) => {
    let newRoles = selectedRoles?.includes(role) ? selectedRoles.filter(sr => sr != role) : [...(selectedRoles ?? []), role]
    setSelectedRoles(newRoles);
    setRoleChanged(true);
  }
  const handleClose = () => {
    setRoleChanged(false);
    handleCloseModal();
  }
  useEffect(() => {
    setSelectedRoles(selectedUser?.role);
  }, [selectedUser])

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <div className="flex justify-center items-center">
          <div className="flex gap-2 py-2">
            <img src={selectedUser?.avatar} alt="" width={60} height={60} />
            <div className="flex flex-col justify-center font-medium">
              <div className="text-md text-black">{selectedUser?.name}</div>
              <div className="text-base text-[#818f99]">{selectedUser?.email}</div>
            </div>
          </div>
        </div>
        <div className='text-center text-lg text-black font-bold my-2 px-2'>Please change the this user's role</div>
        <div className='flex items-center justify-center mt-4'>
          <div className="flex gap-2">
            {
              userRoles.map(ur => {
                const cName = selectedRoles?.includes(ur.title) ? `${ur.className} border border-transparent` : 'bg-white text-[#818f99] border border-[#818f99]'
                return (
                  <div key={ur.title} onClick={() => handleEachRole(ur.title)} className={`${cName} text-sm rounded-full px-4 py-1 cursor-pointer `}>{ur.title}</div>
                )
              })
            }
          </div>
        </div>
        <div className="flex justify-end mt-8 gap-2">
          <Button
            fullWidth
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
            fullWidth
            variant="contained"
            onClick={handleClose}
            disabled={!roleChanged}
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
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ChangeRoleModal;
