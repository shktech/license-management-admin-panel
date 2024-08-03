import React, { useEffect } from 'react';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import SearchIcon from "@/assets/icons/search.svg?icon";

const SearchInput = () => {
  return (
    <FormControl className=''>
      <TextField
        placeholder='Search'
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          width: '300px',
          backgroundColor: '#e6eaed', // Change to your desired color
          borderRadius: 8, // Optional: Add border-radius for rounded corners,
          '& .MuiInputBase-input': {
            fontSize: '0.875rem', // Adjust font size here
            padding: '10px 2px'
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none', // Remove the border
            },
            '&:hover fieldset': {
              border: 'none', // Remove the border on hover
            },
            '&.Mui-focused fieldset': {
              border: 'none', // Remove the border when focused
            },
          },
        }}
      />
    </FormControl>
  );
};

export default SearchInput;
