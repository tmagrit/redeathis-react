import * as React from 'react';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/sessionSlice'; 
import { Link } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { slugger } from './slugger';
import { publicTheme } from '../styles/publicStyles';

const MenuBar = () => {

    // REDUX SELECTORS
    const dispatch = useDispatch();

    const session = useSelector(state => state.session);
    const pages = useSelector(state => state.pages.pages).filter(pa => pa.status === 1 );

    // MENU STATES
    const [anchorEl, setAnchorEl] = useState(null);

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
                <MenuList sx={{ width: 320, maxWidth: '100%' }} >
                    <Box sx={{ display: { xs: 'block', md: 'none' }}} >
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
                        <Fragment>
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
                        </Fragment>
                    ) : (
                        <Fragment>
                            <MenuItem component={Link} to="/signin" >
                                <ListItemIcon>
                                    <LoginIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Entrar</ListItemText>
                            </MenuItem>
                        </Fragment>
                    )}
                   
                </MenuList>
            </Menu>
        );
    };

    return ( 
        <ThemeProvider theme={publicTheme} > 
            <AppBar 
                position="fixed" 
                color="inherit" 
                elevation={0}  
                sx={{ 
                    background: 'rgba(244, 240, 235, 0.26)',
                    "&:hover": {
                        background: 'rgba(244, 240, 235, 0.54)',
                        borderBottom: 1,
                        borderColor: 'divider',
                    }, 
                }}
            >
                <Toolbar >
                    <Box 
                        component={Link} 
                        to="/" 
                        sx={{ 
                            textDecoration: 'none', 
                            color: 'text.primary', 
                        }} 
                    >
                        <Typography component="h2" variant="logoSubtitle" sx={{ ml: 0.5, mt: 1, }} >
                            ACERVO DE REFERÊNCIAS EM CONSTRUÇÃO
                        </Typography>
                        <Stack direction="row" spacing={0.5} >
                            <Typography component="h1" variant="logoThin" sx={{ my: 0, position: 'relative', top: '-0.5rem', textDecoration: 'none', }} >
                                REDE
                            </Typography>
                            <Typography component="h1" variant="logoThick" sx={{ my: 0, position: 'relative', top: '-0.5rem', textDecoration: 'none', }} >
                                ATHIS
                            </Typography>
                        </Stack>
                    </Box> 

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: { xs: 'none', md: 'block' }}}> 
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
                    </Box>

                    <IconButton edge="end" size="large" onClick={handleMenu} >
                        <MenuIcon />
                    </IconButton>
                    <PublicNavMenu />
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default MenuBar;