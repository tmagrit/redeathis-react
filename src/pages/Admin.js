import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/sessionSlice';
import { Link, Outlet } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DefaultDialog from '../components/DefaultDialog';
import Invite from '../components/Invite';
import MainMenu from '../components/MainMenu';
//import ContextMenu from '../components/ContextMenu';
// STYLES
import { AppBar, Drawer, mdTheme } from '../styles/adminStyles';

const Admin = () => {

    // REDUX SELECTORS
    const dispatch = useDispatch()
    const profile = useSelector(state => state.session.profile)

    // MENU STATES
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(true);
    
    // DIALOG STATES 
    const [dialogOpen, setDialogOpen] = useState(false);
    
    // HANDLE TOGGLE MENU 
    const toggleDrawer = () => {
      setOpen(!open);
    };
    
    // HANDLE MENU
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // HANDLE TOGGLE DIALOG
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = (value) => {
        setDialogOpen(false);
    };

    // HANDLE LOGOUT
    const handleLogout = (event) => {
        dispatch(logout());
    };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar 
          position="absolute" 
          color="inherit" 
          open={open}  
          elevation={0} 
          sx={{ borderBottom: 1, borderColor: mdTheme.palette.divider, }}
        >
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
                component="div"
                variant="h6"
                color="inherit"
                nowrap
                sx={{ flexGrow: 1 }}
            >
                <Link 
                    to="/admin" 
                    //color="inherit" 
                    variant="inherit" 
                    style={{ color: "inherit", textDecoration: "none" }} 
                >
                    Rede Residência ATHIS
                </Link>
            </Typography>
            <IconButton color="inherit" onClick={handleMenu}>
              <Badge badgeContent={4} color="secondary">
                <VerifiedUserIcon />
              </Badge>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
            <MenuItem >
                <ListItemIcon>
                    <AssignmentIndIcon fontSize="small" />
                </ListItemIcon>
                <Box sx={{ my: 1, mr: 0.5 }}>Acessando como</Box><Box sx={{ fontWeight: 'bold', my: 1 }}>{`${profile?.name}`}</Box>
            </MenuItem> 
            <Divider />
            <MenuItem 
                component={Link}
                to="/" // TODO ACCOUNT COMPONENT
                onClick={handleClose}  
            >
                <ListItemIcon>
                    <ArrowBackIcon fontSize="small" />
                </ListItemIcon>
                Voltar para Rede ATHIS
            </MenuItem>    
            <MenuItem 
                component={Link}
                to="/" // TODO ACCOUNT COMPONENT
                onClick={handleClose}  
            >
                <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                Minha Conta
            </MenuItem>
            <Divider />
            <MenuItem 
                onClick={() => { handleDialogOpen(); handleClose();}}  
            >
                <ListItemIcon>
                    <PersonAddIcon fontSize="small" />
                </ListItemIcon>
                Convidar Colaborador
            </MenuItem>
            <Divider />
            <MenuItem 
                component={Link}
                to="/" // TODO ACCOUNT COMPONENT
                onClick={() => { handleLogout(); handleClose();}}  
            >
                <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Sair
            </MenuItem>

            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainMenu />
            {/* <Divider sx={{ my: 1 }} />
            <ContextMenu /> */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
        <Toolbar />

        <Outlet />
        
        </Box>
      </Box>
        {/* INVITE DIALOG */}
        <DefaultDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          title={'Convidar Colaborador'}
          children={<Invite/>}
        />
  );
    </ThemeProvider>
  );
}

export default Admin;