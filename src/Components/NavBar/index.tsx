import React, { useState, useEffect } from 'react';
import { NavbarStyle, UserInfo } from './navbarStyle';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useNavigate, Link } from 'react-router-dom';
import useStateHandler from '../../Redux/useStateHandler';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [user, setUser] = useState<string>('');
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { userValid, signedUpLogOut, logOutHandler, authenticationHandler } = useStateHandler();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInformation") || " ");
    setUser(userInfo?.firstName)
    setIsUserAdmin(userInfo?.isAdmin);
  }, [])

  const userLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInformation");
    navigate('/');
    window.location.reload();
    signedUpLogOut();
    logOutHandler();
    console.log(userValid)
  }
  return (
    <NavbarStyle>
      <h1>Quiz Master</h1>
      {
        (!isUserAdmin) ?
          <Link to="/leaderBoard" style={{ textDecoration: "none", color: "inherit" }}>
            <h4>Leaderboard</h4>
          </Link>
          :
          <Link to="/addNewQuestion" style={{ textDecoration: "none", color: "inherit" }}>
            <h4>Add New Question</h4>
          </Link>
      }
      <UserInfo>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Typography sx={{ minWidth: 50 }}>{"Hello, " + user}</Typography>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2, cursor: 'pointer' }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                <img src={"https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat2&accessoriesType=Blank&hatColor=Blue01&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"} style={{ width: 32, height: 32 }} />
              </Avatar>
              {
                (anchorEl === null) ? <ArrowDropDownIcon sx={{ transition: '1s ease-in' }} /> : <ArrowDropUpIcon sx={{ transition: '1s ease-out' }} />
              }
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={userLogOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </UserInfo>
    </NavbarStyle>
  )
}

export default Navbar