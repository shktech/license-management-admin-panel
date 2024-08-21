import React from 'react';
import { styled, TextField, InputAdornment, IconButton, OutlinedInputProps, TextFieldProps, alpha } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const RedditTextField = styled(({ onCopy, ...props }: any) => (
    <TextField
        fullWidth
        InputProps={{
            disableUnderline: true,
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                        onClick={() => {
                            if (props.value) {
                                navigator.clipboard.writeText(props.value.toString());
                                onCopy();
                            }
                        }}
                    >
                        <ContentCopyIcon />
                    </IconButton>
                </InputAdornment>
            ),
        } as Partial<OutlinedInputProps>}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
        border: '1px solid',
        borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

export default RedditTextField;
