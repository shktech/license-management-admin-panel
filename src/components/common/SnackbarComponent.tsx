import React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';

interface SnackbarComponentProps {
    open: boolean;
    onClose: (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => void;
}

const SnackbarComponent: React.FC<SnackbarComponentProps> = ({ open, onClose }) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={open}
            autoHideDuration={1000}
            onClose={onClose}
            message={
                <div className="flex gap-1 justify-center items-center">
                    <DoneAllRoundedIcon />
                    Copied
                </div>
            }
            sx={{
                '& .MuiSnackbarContent-root': {
                    minWidth: '100px',
                    padding: '0 6px',
                    borderRadius: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                },
            }}
        />
    );
};

export default SnackbarComponent;
