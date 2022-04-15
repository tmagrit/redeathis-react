import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/sessionSlice';
import { Routes, Route, Link } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
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
import DefaultDialog from './DefaultDialog';
import Invite from './Invite';
import MainMenu from './MainMenu';
import ContextMenu from './ContextMenu';

// PAGES 
import MainDashboard from './MainDashboard';
import Section from '../pages/Section';

const drawerWidth = 260; // TODO CREATE STYLE FILE

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

const Admin = ({ section, context }) => {

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
        <AppBar position="absolute" color="inherit" open={open}>
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
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
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
            <MenuItem 
                component={Typography}
            >
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
            <Divider sx={{ my: 1 }} />
            <ContextMenu section={section} />
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

        {/* NESTED ROUTES */}
        <Routes>
          <Route index element={<MainDashboard />} />
          <Route path="research/*" element={<Section />} />
          <Route path="categories/*" element={<Section />} />
          <Route path="members/*" element={<Section />} />
          <Route path="pages/*" element={<Section />} />
        </Routes>
        {/* NESTED ROUTES */}

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

// import Research from '../pages/Research';
// import Categories from '../pages/Categories';
// import Members from '../pages/Members';
// import Pages from '../pages/Section';

        // {/* PAGES */}
        // {/* {section === 'main' ? <Main context={'main'} /> : null }
        // {section === 'research' ? <Research context={'main'} /> : null }
        // {section === 'categories' ? <Categories context={'main'} /> : null }
        // {section === 'members' ? <Members context={'main'} /> : null }
        // {section === 'pages' ? <Pages context={'main'} /> : null } */}

        // {/* PAGES */}