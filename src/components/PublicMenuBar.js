import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/sessionSlice';



import { Link } from "react-router-dom";

import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
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
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import VillaIcon from '@mui/icons-material/Villa';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import { slugger } from './slugger';
import { useHistory } from './history';


const PublicMenuBar = () => {

    // REDUX SELECTORS
    const dispatch = useDispatch()
    const session = useSelector(state => state.session);
    const profile = useSelector(state => state.session.profile);
    const pages = useSelector(state => state.pages.pages).filter(pa => pa.status === 1 );

    // MY HISTORY HOOK
    const history = useHistory();

    // // REACT STATES
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
        <Stack 
            sx={{
                position: 'absolute', 
                zIndex: 80, 
                margin: 1.1,
                //borderRadius: '34px',
                //height: '52px',
                //width: '52px',
                top: 1.1,
                left: 1.1
            }}
            direction="row" >
            <Paper elevation={3} >
                <Box 
                    sx={{ 
                        display: 'flex', 
                        height: '100%',
                        justifyContent: "left",
                        alignItems: "left"
                    }}
                >
                    <IconButton 
                        onClick={() => {}}
                    >
                        <MenuIcon sx={{ 
                            display: 'flex', 
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center"
                            }} 
                            size='large'
                        />
                    </IconButton>
                </Box>
            </Paper>
            <Box component="div"  sx={{ paddingLeft: '8px', height: '40px', color: '#fff' }} >
                {/* <div>TESTE</div> */}
                 <Typography variant="caption" display="block" sx={{ position: 'relative', top: 0 }}>
                    Acervo de referências em construção
                </Typography>
                <Typography variant="h5" component={Link} to="/" sx={{ position: 'relative', top: -8, textDecoration: 'none', color: 'inherit', }} >
                    Rede Residência ATHIS
                </Typography> 
            </Box> 
        </Stack>
    );
};

export default PublicMenuBar;




////////////////////////////////////////////

// {/* <Paper 
// sx={{
//     position: 'absolute', 
//     zIndex: 80, 
//     margin: 1.1,
//     borderRadius: '34px',
//     height: '52px',
//     width: '326px',
//     top: 1.1,
//     left: 1.1
// }}
// elevation={3}
// >
// <Box 
//     sx={{ 
//         display: 'flex', 
//         fontSize: '45px',
//         height: '100%',
//         justifyContent: "left",
//         alignItems: "left"
//     }}
// >
//     <Stack direction="row" >
//         <IconButton 
//             onClick={() => {}}
//             sx={{ width: '52px', }} 
//             disableRipple 
//         >
//             <MenuIcon sx={{ 
//                 display: 'flex', 
//                 fontSize: '35px',
//                 justifyContent: "center",
//                 alignItems: "center",
//                 alignContent: "center"
//                 }} size='large'
//             />
//         </IconButton>


//         <Box component="div" 
//             sx={{ flexGrow: '1', paddingRight: '8px', }}
//         >
//             <Typography variant="caption" display="block" sx={{ position: 'relative', top: 4 }}>
//                 Acervo de referências em construção
//             </Typography>
//             <Typography variant="h5" component={Link} to="/" sx={{ position: 'relative', top: -26, textDecoration: 'none', color: 'inherit', }} >
//                 Rede Residência ATHIS
//             </Typography>
//         </Box>  
//     </Stack>
// </Box>
// </Paper> */}




////////////////////////////////////////////

// import * as React from 'react';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../features/sessionSlice';
// import { Link } from "react-router-dom";
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import MenuItem from '@mui/material/MenuItem';
// import Box from '@mui/material/Box';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Menu from '@mui/material/Menu';
// import { Divider } from '@mui/material';
// import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import LoginIcon from '@mui/icons-material/Login';
// import VillaIcon from '@mui/icons-material/Villa';

// import { slugger } from './slugger';


// const PublicMenuBar = () => {

//     // REDUX SELECTORS
//     const dispatch = useDispatch()
//     const session = useSelector(state => state.session);
//     const profile = useSelector(state => state.session.profile);
//     const pages = useSelector(state => state.pages.pages).filter(pa => pa.status === 1 );

//     // // REACT STATES
//     const [anchorEl, setAnchorEl] = useState(null); 


//     // HANDLE MENU
//     const handleMenu = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     // HANDLE LOGOUT
//     const handleLogout = (event) => {
//         dispatch(logout());
//     };

//     return (
//         <AppBar position="fixed" color="inherit">
//             <Toolbar>
//                 <Box component="div" sx={{ flexGrow: 1 }}>
//                 <Typography variant="caption" display="block" sx={{ position: 'relative', top: 4 }}>
//                     Acervo de referências em construção
//                 </Typography>
//                 <Typography variant="h5" component={Link} to="/" sx={{ position: 'relative', top: -4, textDecoration: 'none', color: 'inherit', }} >
//                     Rede Residência ATHIS
//                 </Typography>
//                 </Box>
//                 {pages.map(pa => {
//                     return (
//                         // <Button color="inherit" component={Link} to="institutional" > {`${pa.slug}`} </Button>
//                         <Button color="inherit" component={Link} to={`/institutional/${slugger(pa.slug)}`} > {`${pa.slug}`} </Button>
//                         )
//                 })}
//                 {/* <Button color="inherit" component={Link} to="/" >História</Button>
//                 <Button color="inherit" component={Link} to="/" >Proposta</Button>
//                 <Button color="inherit" component={Link} to="/" >Quem Somos</Button>
//                 <Button color="inherit" component={Link} to="/" >Colabore</Button> */}
//                 <IconButton
//                     onClick={handleMenu}
//                     size="large"
//                     edge="end"
//                     color="inherit"
//                     aria-label="menu"
//                     sx={{ ml: 1, }}
//                 >
//                     <AdminPanelSettingsIcon />
//                 </IconButton>
//                 <Menu
//                     id="menu-appbar"
//                     anchorEl={anchorEl}
//                     anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'right',
//                     }}
//                     keepMounted
//                     transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right',
//                     }}
//                     open={Boolean(anchorEl)}
//                     onClose={handleClose}
//                 >
//                     {session?.session?.user?.aud === "authenticated" ? (
//                         <div>
//                             <MenuItem >
//                                 <ListItemIcon>
//                                     <AssignmentIndIcon fontSize="small" />
//                                 </ListItemIcon>
//                                 <Box sx={{ my: 1, mr: 1 }}>Acessando como</Box><Box sx={{ fontWeight: 'bold', my: 1 }}>{`${profile?.name}`}</Box>
//                             </MenuItem> 
//                             <Divider />
//                         </div>
//                     ) : null }
                    
//                     <MenuItem 
//                         component={Link}
//                         to="/admin"
//                         onClick={handleClose}  
//                     >
//                         <ListItemIcon>
//                             <LoginIcon fontSize="small" />
//                         </ListItemIcon>
//                         Acessar Painel Administrativo
//                     </MenuItem>
//                     {session?.session?.user?.aud === "authenticated" ? (
//                         <div>
//                             <MenuItem 
//                                 component={Link}
//                                 to="/" // TODO ACCOUNT COMPONENT
//                                 onClick={handleClose}  
//                             >
//                                 <ListItemIcon>
//                                     <AccountCircleIcon fontSize="small" />
//                                 </ListItemIcon>
//                                 Minha Conta
//                             </MenuItem>
//                             <Divider />
//                             <MenuItem 
//                                 component={Link}
//                                 to="/" // TODO ACCOUNT COMPONENT
//                                 onClick={() => { handleLogout(); handleClose();}}  
//                             >
//                                 <ListItemIcon>
//                                     <LogoutIcon fontSize="small" />
//                                 </ListItemIcon>
//                                 Sair
//                             </MenuItem>
//                         </div>
//                     ) : null }
//                 </Menu>
//             </Toolbar>
//         </AppBar>
//     )

// }

// export default PublicMenuBar;