import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/sessionSlice';
import { Link, useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import { Divider } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';

const Home = () => {

    // REDUX SELECTORS
    const dispatch = useDispatch()
    const session = useSelector(state => state.session)
    const profile = useSelector(state => state.session.profile)

    // REACT ROUTER 
    const location = useLocation();
    const trackLocation = location.state?.from?.pathname || '/admin';

    // REACT STATES
    const [anchorEl, setAnchorEl] = useState(null);

    // HANDLE MENU
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // HANDLE LOGOUT
    const handleLogout = (event) => {
        dispatch(logout());
    };

    return (
        <React.Fragment>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Rede Residência ATHIS
                    </Typography>
                    <Button color="inherit" component={Link} to="/" >História</Button>
                    <Button color="inherit" component={Link} to="/" >Proposta</Button>
                    <Button color="inherit" component={Link} to="/" >Quem Somos</Button>
                    <Button color="inherit" component={Link} to="/" >Colabore</Button>
                    <IconButton
                        onClick={handleMenu}
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        sx={{ ml: 1, }}
                    >
                        <AdminPanelSettingsIcon />
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
                       {session?.session?.user?.aud === "authenticated" ? (
                           <div>
                                <MenuItem 
                                    component={Typography}
                                >
                                    <ListItemIcon>
                                        <AssignmentIndIcon fontSize="small" />
                                    </ListItemIcon>
                                    <Box sx={{ my: 1, mr: 1 }}>Acessando como</Box><Box sx={{ fontWeight: 'bold', my: 1 }}>{`${profile?.name}`}</Box>
                                </MenuItem> 
                                <Divider />
                            </div>
                        ) : null }
                        
                        <MenuItem 
                            component={Link}
                            to="/admin"
                            onClick={handleClose}  
                        >
                            <ListItemIcon>
                                <LoginIcon fontSize="small" />
                            </ListItemIcon>
                            Acessar Painel Administrativo
                        </MenuItem>
                        {session?.session?.user?.aud === "authenticated" ? (
                            <div>
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
                                    component={Link}
                                    to="/" // TODO ACCOUNT COMPONENT
                                    onClick={() => { handleLogout(); handleClose();}}  
                                >
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    Sair
                                </MenuItem>
                            </div>
                        ) : null }
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* TODO HOME COMPONENT */}

        </React.Fragment>
        
    )

}

export default Home