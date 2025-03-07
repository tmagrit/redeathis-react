import * as React from 'react';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/sessionSlice'; 
import { Link } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// import Logo from './Logo';
import LogoRedeAthis from './LogoRedeAthis';
import Controls from './Controls';
import Legend from './Legend';
import FilterSelect from './FilterSelect';
import PublicFooter from '../components/PublicFooter';
import { slugger } from './slugger';
import { AppBar, DrawerHeader, Main, publicTheme, drawerWidth } from '../styles/publicStyles';

const MenuBar = () => {

    // REDUX SELECTORS
    const dispatch = useDispatch();

    const session = useSelector(state => state.session);
    const pages = useSelector(state => state.pages.pages).filter(pa => pa.status === 1 );

    // MENU STATES
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [isHoveredOrTouchedIndex, setIsHoveredOrTouchedIndex] = useState(null);

    const handleDrawerOpen = () => {
      setOpen(!open);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const handleFooterShow = (e) => {
        setShow(e);
    };


    // HANDLE MENU
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // HANDLE LOGOUT
    const handleLogout = () => {
        dispatch(logout());
    };

    console.log(isHoveredOrTouchedIndex);

    const PublicNavMenu = () => {
        return (
            <Menu 
                id="publicNavMenu-menuBar"
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
                <MenuList sx={{ width: 320, maxWidth: '100%', }} >
                    <Box sx={{ display: { xs: 'block', md: 'block', lg: 'none' }}} >
                        {pages.map((pa) => (
                            <MenuItem
                                key={slugger(pa.slug)} 
                                component={Link} 
                                to={`/institutional/${slugger(pa.slug)}`}
                                color="inherit"
                            >
                                <ListItemText inset >{pa.slug}</ListItemText>
                            </MenuItem>
                         ))}
                        <Divider />
                    </Box>
                    {session?.session?.user?.aud === "authenticated" ? ( 
                        <div>
                            <MenuItem component={Link} to="/admin" >
                                <ListItemIcon>
                                    <SettingsIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Administrar</ListItemText>
                            </MenuItem>
                            <MenuItem component={Link} to="/" onClick={handleLogout} >
                                <ListItemIcon>
                                    <LogoutIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Sair</ListItemText>
                            </MenuItem> 
                        </div>
                    ) : (
                        <div>
                            <MenuItem component={Link} to="/signin" >
                                <ListItemIcon>
                                    <LoginIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Entrar</ListItemText>
                            </MenuItem>
                        </div>
                    )}
                   
                </MenuList>
            </Menu>
        );
    };

    return ( 
        <ThemeProvider theme={publicTheme} > 
            <Box sx={{ display: 'flex', }}>
            <CssBaseline />
                <AppBar 
                    open={open}
                    position="fixed" 
                    color="inherit" 
                    elevation={0}  
                    sx={{ 
                        background: 'rgba(244, 240, 235, 0.65)',
                        borderBottom: 1,
                        borderColor: 'divider',
                        // "&:hover": {
                        //     background: 'rgba(244, 240, 235, 0.65)',
                        //     borderBottom: 1,
                        //     borderColor: 'divider',
                        // }, 
                    }}
                >
                    <Toolbar variant="dense" >

                        <LogoRedeAthis width={'150'} /> 

                        <Box sx={{ flexGrow: 1 }} />

                        {/* CIRCLE NAVIGATION ELEMENT */}
                        <Box 
                            sx={{ 
                                    display: { xs: 'none', md: 'none', lg: 'flex' }, 
                                    alignItems: 'center', 
                                    flexDirection: 'row',
                                    justifyContent: 'space-around' 
                                }}
                        >  
                            {pages.map((pa) => (
                                <Box key={slugger(pa.slug)} >
                                    <Link 
                                        to={`/institutional/${slugger(pa.slug)}`} 
                                        style={{ textDecoration: 'none' }}   
                                    >
                                        <Box 
                                            sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                flexDirection: 'column',
                                                textAlign: 'center',
                                                minWidth: 60 
                                            }}
                                            onMouseEnter={() => setIsHoveredOrTouchedIndex(pa.id)}
                                            onMouseLeave={() => setIsHoveredOrTouchedIndex(null)}
                                            onTouchStart={() => setIsHoveredOrTouchedIndex(pa.id)}
                                            onTouchEnd={() => setIsHoveredOrTouchedIndex(null)} 
                                        >
                                            <svg width="18" height="18" viewBox="0 0 18 18">
                                                <circle
                                                    cx="9"
                                                    cy="9"
                                                    r="7"
                                                    fill={`${pa.color}`}
                                                    stroke={`${pa.color}`}
                                                    //stroke="#000000"
                                                    strokeWidth="2"
                                                />
                                            </svg>

                                            <Box 
                                                sx={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    flexDirection: 'column',
                                                    textAlign: 'center',
                                                    backgroundColor: `${pa.color}`,
                                                    padding: '3px',
                                                    position: 'absolute', // Permite sobreposição
                                                    top: '80%', // Posiciona abaixo do círculo
                                                    left: '90%', // Centraliza horizontalmente
                                                    transform: 'translateX(-50%)', // Ajusta o posicionamento
                                                    zIndex: `${pa.page_order}`, // Garante que fique acima de outros elementos 
                                                    visibility: isHoveredOrTouchedIndex === pa.id ? 'visible' : 'hidden',
                                                }}
                                            >
                                                <Typography 
                                                    component={Link} 
                                                    key={slugger(pa.slug)} 
                                                    to={`/institutional/${slugger(pa.slug)}`} 
                                                    sx={{ minWidth: 100, textDecoration: 'none', textTransform: 'uppercase' }}
                                                    color='#eee9e0'
                                                    variant="mainNavigationItem"
                                                    noWrap
                                                >
                                                    {pa.slug}
                                                </Typography>
                                            </Box>
                                        </Box>

                                    </Link>
                                </Box>

                            ))}
                        </Box>

                        {/* TODO: ADD LOGIC TO HANDLE BUTTONS SHOW DEPEND ON FILTER OPEN */}
                        {/* <Box sx={{ display: { xs: 'none', md: 'none', lg: 'block' }}}> 
                            {pages.map((pa) => (
                                <Button 
                                    key={slugger(pa.slug)} 
                                    component={Link} 
                                    to={`/institutional/${slugger(pa.slug)}`}
                                    color="inherit"
                                >
                                    {pa.slug}
                                </Button>
                            ))}
                        </Box> */}

                        {/* <IconButton edge="end" size="large" onClick={handleMenu} >
                            <MenuIcon />
                        </IconButton> */}

                        <PublicNavMenu />

                    </Toolbar>
                </AppBar>

                <Main open={open}  >
                    {/* <DrawerHeader /> */}

                    <Controls open={open} show={show} setOpen={handleDrawerOpen} />
                    <Legend open={open} show={show} />
                </Main>

                <Drawer
                    PaperProps={{ 
                        style: {
                            background: 'rgba(244, 240, 235, 0.75)',
                        }
                    }}
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                        },
                    }}
                    variant="persistent"
                    anchor="right"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {publicTheme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <FilterSelect />
                </Drawer>

                <PublicFooter open={open} show={show} setShow={(e) => handleFooterShow(e)} />

            </Box>
        </ThemeProvider>
    );
};

export default MenuBar;