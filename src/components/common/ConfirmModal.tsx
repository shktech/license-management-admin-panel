import React from "react";
import { Box, Button, Modal } from "@mui/material";
import { deleteModalButtonStyle, modalStyle } from "@data/MuiStyles";

interface ConfirmModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
  handleOK: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  openModal,
  handleCloseModal,
  handleOK,
}) => {
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <div className="text-center text-lg text-black font-bold my-4 px-2">
          Do you really want to do this action?
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <Button
            variant="contained"
            onClick={handleCloseModal}
            fullWidth
            sx={{
              bgcolor: "white", // Background color
              color: "black", // Text color
              "&:hover": {
                bgcolor: "#edf0f2", // Background color on hover
                opacity: 0.9, // Adjust opacity on hover
                boxShadow: "none",
              },
              ...deleteModalButtonStyle,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleOK}
            fullWidth
            sx={{
              bgcolor: "#db1a34", // Background color
              color: "white", // Text color
              "&:hover": {
                bgcolor: "#db1a34", // Background color on hover
                opacity: 0.9, // Adjust opacity on hover
                boxShadow: "none",
              },
              ...deleteModalButtonStyle,
            }}
          >
            Ok
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
