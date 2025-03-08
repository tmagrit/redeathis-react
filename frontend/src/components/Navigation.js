import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/sessionSlice'; 
import { Link, useLocation } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

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
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// import Logo from './Logo';
import LogoRedeAthis from './LogoRedeAthis';
import PublicFooter from '../components/PublicFooter';
import { slugger } from './slugger';
import { AppBar, publicTheme } from '../styles/publicStyles';

const MenuBar = () => {

    // REACT ROUTER 
    const location = useLocation();

    // REDUX SELECTORS
    const dispatch = useDispatch();

    const session = useSelector(state => state.session);
    const pages = useSelector(state => state.pages.pages).filter(pa => pa.status === 1 );

    // MENU STATES
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [isHoveredOrTouchedIndex, setIsHoveredOrTouchedIndex] = useState(null);

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
                >
                    <Toolbar >

                        <LogoRedeAthis width={'150'} /> 

                        <Box sx={{ flexGrow: 1 }} />

                        {/* CIRCLE NAVIGATION ELEMENT */}
                        <Box 
                            sx={{ 
                                    // display: { xs: 'none', md: 'none', lg: 'flex' }, 
                                    display: 'flex',
                                    alignItems: 'center', 
                                    flexDirection: 'row',
                                    justifyContent: 'space-around' 
                                }}
                        >  
                            {pages.map((pa) => (
                                <Box key={slugger(pa.slug)} sx={{ maxWidth: 50, overflow: 'visible'}}>
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
                                                minWidth: 40,
                                                paddingTop: 3,
                                                paddingBottom: 1 
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
                                                    fill={isHoveredOrTouchedIndex === pa.id || location.pathname === `/institutional/${slugger(pa.slug)}` ? `${pa.color}` : 'transparent'}
                                                    stroke={isHoveredOrTouchedIndex === pa.id  || location.pathname === `/institutional/${slugger(pa.slug)}` === pa.id ? `${pa.color}` : '#CFC1AD'}
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
                                                    marginTop: 0.5,
                                                    padding: '3px',
                                                    visibility: isHoveredOrTouchedIndex === pa.id ? 'visible' : 'hidden',
                                                }}
                                            >
                                                <Typography 
                                                    component={Link} 
                                                    key={slugger(pa.slug)} 
                                                    to={`/institutional/${slugger(pa.slug)}`} 
                                                    sx={{ px: 1, textDecoration: 'none', textTransform: 'uppercase' }}
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

                        {/* <IconButton edge="end" size="large" onClick={handleMenu} >
                            <MenuIcon />
                        </IconButton>

                        <PublicNavMenu /> */}

                    </Toolbar>
                </AppBar>

                <PublicFooter open={open} show={show} setShow={(e) => handleFooterShow(e)} />

            </Box>
        </ThemeProvider>
    );
};

export default MenuBar;