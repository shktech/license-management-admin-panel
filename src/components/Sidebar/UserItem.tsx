"use client";
import { useState } from 'react';
import { useGetIdentity, useLogout } from "@refinedev/core";
import ClickOutside from '../ClickOutside';
import Link from 'next/link';
import { User } from '@/types/types';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const UserItem = () => {
    const { data: identity } = useGetIdentity<User>();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { mutate: logout } = useLogout();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    p: 2,
                    gap: 2
                }}
            >
                <div className="h-12 w-12 rounded-full flex items-center justify-center text-[#1f325c] font-bold rounded-full bg-white ">
                    {`${identity?.first_name?.[0]} ${identity?.last_name?.[0]}`}
                </div>
                <div className='flex-1 normal-case text-left'>
                    <div className="text-sm font-medium text-white">
                        {`${identity?.first_name} ${identity?.last_name}`}
                    </div>
                    <div className="text-xs font-light text-white">
                        {`Organization: ${identity?.organization}`}
                    </div>
                </div>
                <div className='text-xs text-white'>
                    <KeyboardArrowRightIcon />
                </div>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: '#1f325c', // Change this to your desired background color
                        color: '#e3ebff',
                        marginLeft: 1,
                    },
                }}
                anchorOrigin={{
                    vertical: 'bottom', // or 'bottom'
                    horizontal: 'right', // or 'right'
                }}
                transformOrigin={{
                    vertical: 'bottom', // or 'bottom'
                    horizontal: 'left', // or 'right'
                }}
            >
                <MenuItem onClick={handleClose}>
                    <div className='flex gap-2 py-1 pr-2 text-sm items-center'>
                        <PersonIcon />My Profile
                    </div>
                </MenuItem>
                <MenuItem onClick={() => logout()}>
                    <div className='flex gap-2 py-1 pr-2 text-sm items-center'>
                        <LogoutIcon />Log Out
                    </div>
                </MenuItem>
            </Menu>
        </div>

    );
};

export default UserItem;
