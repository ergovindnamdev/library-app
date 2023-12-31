import { useContext, useState } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import LatterAvatar from '../../../utils/latter-avatar';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { LoginContext } from '../../../routes/sections';


// ----------------------------------------------------------------------

const MENU_OPTIONS = [
   {
    label: 'Profile',
    icon: 'eva:person-fill',
    path: '/profile'
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate()
  
  const {LoginUserDetail} = useContext(LoginContext);
  

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    localStorage.removeItem("loginToken");
    toast.success('Logout Successfully');
        setTimeout(() => {
          navigate("/");
        }, 5000)
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <LatterAvatar name={LoginUserDetail?.name} /> 

      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {LoginUserDetail?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {LoginUserDetail?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            <Link href={option.path} >
              {option.label}
            </Link>
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleClose}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
