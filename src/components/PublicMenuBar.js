import * as React from 'react';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/sessionSlice';
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import InfoIcon from '@mui/icons-material/Info';
import EventNoteIcon from '@mui/icons-material/EventNote';

import { slugger } from './slugger';
import { useHistory } from './history';


const PublicMenuBar = () => {

    // REDUX SELECTORS
    const dispatch = useDispatch()
    const session = useSelector(state => state.session);
    const categories = useSelector(state => state.research.categories);
    const profile = useSelector(state => state.session.profile);
    const pages = useSelector(state => state.pages.pages).filter(pa => pa.status === 1 );

    // MY HISTORY HOOK
    const history = useHistory(); //console.log('history',history);

    // // REACT STATES
    const [drawer, setDrawer] = useState({
        pageMenu: false,
        sponsors: false,
        //filters: false,
    }); 

    const categoryLegend = [[1, 6], [2, 7], [3, 5], [4, 8]].map(couple => {
        return [categories.find(cat => cat.id === couple[0]), categories.find(cat => cat.id === couple[1])]
    }); //console.log('categoryLegend', categoryLegend);

    // HANDLE MENU
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setDrawer({ ...drawer, [anchor]: open });
      };

    const selectedDrawer = (anchor) => {
        switch (anchor) {
            case 'pageMenu':
                return(
                    <Box
                        sx={{ display: 'flex', flexDirection: 'column', width: 240, }}
                        role="presentation"
                        onClick={toggleDrawer(anchor, false)}
                        onKeyDown={toggleDrawer(anchor, false)}
                    >
                        <List sx={{ flexGrow: 1 }} >
                            {pages.map((pa) => (
                                <ListItem key={slugger(pa.slug)} disablePadding>
                                    <ListItemButton component={Link} to={`/institutional/${slugger(pa.slug)}`} >
                                        <ListItemIcon>
                                            <AutoStoriesIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={pa.slug} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <Box />
                            
                        <List >
                            {session?.session?.user?.aud === "authenticated" ? (
                                <Fragment>
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/admin" >
                                            <ListItemIcon >
                                                <SettingsIcon />
                                            </ListItemIcon>
                                        <ListItemText primary="Administrar" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/" onClick={handleLogout} >
                                            <ListItemIcon >
                                                <LogoutIcon />
                                            </ListItemIcon>
                                        <ListItemText primary="Sair" />
                                        </ListItemButton>
                                    </ListItem>
                                </Fragment>    
                            ) : (
                                <ListItem disablePadding>
                                    <ListItemButton component={Link} to="/signin" >
                                        <ListItemIcon >
                                            <LoginIcon />
                                        </ListItemIcon>
                                    <ListItemText primary="Entrar" />
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </List>
                    </Box>
                );

            case 'sponsors':
                return(
                    <Box
                        sx={{ display: 'flex', flexDirection: 'row',  justifyContent: 'space-evenly', alignItems: 'center', width: 'auto', }}
                        role="presentation"
                        onClick={toggleDrawer(anchor, false)}
                        onKeyDown={toggleDrawer(anchor, false)}
                    >
                        <Box component="div" sx={{ padding: 5, }}>
                            <Typography variant="h5" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', }} >
                                Realização 
                            </Typography> 
                        </Box>
                        <Box component="div" sx={{ padding: 5, }}>
                            <Typography variant="h5" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', }} >
                                Apoio 
                            </Typography> 
                        </Box>
                        <Box component="div" sx={{ padding: 5, }}>
                            <Typography variant="h5" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', }} >
                                Fomento 
                            </Typography> 
                        </Box>
                    </Box>
                );

            // case 'filters':
            //     return(
            //         <Box
            //             sx={{ display: 'flex', width: 'auto', height: 350, }}
            //             role="presentation"
            //             onClick={toggleDrawer(anchor, false)}
            //             onKeyDown={toggleDrawer(anchor, false)}
            //         >
            //             <Stack spacing={0}>
            //                 {categoryLegend.map(couple => {
            //                     return (
            //                         <Box>
            //                             <Stack 
            //                                 direction="row" 
            //                                 alignItems="center"
            //                                 spacing={1} 
            //                                 sx={{ my:2, }}
            //                                 key={couple[0].id}
            //                             >
            //                                 <Avatar sx={{ width: 10, height: 10, bgcolor: `${couple[0].color}` }}> </Avatar>
            //                                 <Typography variant="caption" component="p" >{`${couple[0].name} e ${couple[1].name}`}</Typography> 
            //                             </Stack>
            //                         </Box>
            //                     )
            //                 })}
            //             </Stack>
            //         </Box>
            //     )

        }

    };




    // const handleMenu = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // HANDLE LOGOUT
    const handleLogout = (event) => {
        dispatch(logout());
    };

    return ( 
        <Fragment>
            <Stack 
                sx={{
                    position: 'absolute', 
                    zIndex: 80, 
                    margin: 1.1,
                    top: 1.1,
                    left: 1.1
                }}
                direction="row" 
            >
                <Drawer
                    anchor="right"
                    open={drawer.pageMenu}
                    onClose={toggleDrawer('pageMenu', false)}
                >
                    {selectedDrawer('pageMenu')}
                </Drawer>

                <Drawer
                    anchor="bottom"
                    open={drawer.sponsors}
                    onClose={toggleDrawer('sponsors', false)}
                >
                    {selectedDrawer('sponsors')}
                </Drawer>

                <Paper elevation={ history.pathArray[1] === '' ? 3 : 0 } >
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            height: '100%',
                            justifyContent: "left",
                            alignItems: "left"
                        }}
                    >
                        <IconButton 
                            onClick={toggleDrawer('pageMenu', true)}
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
                <Box component="div"  sx={{ 
                        paddingLeft: '8px', 
                        height: '40px', 
                        color: history.pathArray[1] === '' ? '#fff' : null 
                    }} 
                >
                    <Typography variant="caption" display="block" sx={{ position: 'relative', top: 0 }}>
                        Acervo de referências em construção
                    </Typography>
                    <Typography variant="h5" component={Link} to="/" sx={{ position: 'relative', top: -8, textDecoration: 'none', color: 'inherit', }} onClick={toggleDrawer('sponsors', true)}>
                        Rede Residência ATHIS
                    </Typography> 
                </Box> 
            
            </Stack>

            <Paper 
                elevation={3} 
                sx={{
                    position: 'absolute', 
                    zIndex: 80, 
                    margin: 1.1,
                    top: 150,
                    left: 1.1
                }}
            >
                <IconButton onClick={() => {}} >
                    <FilterAltIcon />
                </IconButton>
                <Divider />
                <IconButton >
                    <EventNoteIcon />
                </IconButton>
                <Divider />
                <IconButton onClick={toggleDrawer('sponsors', true)} >
                    <InfoIcon />
                </IconButton>

            </Paper>  

            <Paper 
                elevation={3} 
                sx={{
                    position: 'absolute', 
                    zIndex: 80, 
                    margin: 1.1,
                    padding: 2,
                    bottom: 20,
                    right: 1.1
                }}
            >
                
                {categoryLegend.map(couple => {
                    return (
                        <Stack 
                            direction="row" 
                            alignItems="center"
                            spacing={1} 
                            sx={{ pb: 0.5, '&:last-child': { pb: 0 }, }}
                            key={couple[0].id}
                        >
                            <Avatar sx={{ width: 10, height: 10, bgcolor: `${couple[0].color}` }}> </Avatar>
                            <Typography variant="caption" component="p" >{`${couple[0].name} e ${couple[1].name}`}</Typography> 
                        </Stack>
                    )
                })}
            </Paper> 
        </Fragment>
    );
};

export default PublicMenuBar;

// import MenuItem from '@mui/material/MenuItem';
// import Collapse from '@mui/material/Collapse';
// import Fab from '@mui/material/Fab';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import VillaIcon from '@mui/icons-material/Villa';
// import MenuOpenIcon from '@mui/icons-material/MenuOpen';


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

//                         <Button color="inherit" component={Link} to={`/institutional/${slugger(pa.slug)}`} > {`${pa.slug}`} </Button>
//                         )
//                 })}

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