import * as React from 'react';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/sessionSlice'; 
import { categoryLegendGrade } from '../features/researchSlice'; 
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
//import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import InfoIcon from '@mui/icons-material/Info';
import EventNoteIcon from '@mui/icons-material/EventNote';

import { slugger } from './slugger';
import { useHistory } from './history';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import PublicFooter from './PublicFooter';
import Logo from './Logo';

const PublicMenuBar = () => {

    // REDUX SELECTORS
    const dispatch = useDispatch();

    const session = useSelector(state => state.session);
    const categorieLegendGrade = useSelector(categoryLegendGrade);
    const pages = useSelector(state => state.pages.pages).filter(pa => pa.status === 1 );

    // MY HISTORY HOOK
    const history = useHistory(); 

    // REACT STATES
    const [drawer, setDrawer] = useState({
        pageMenu: false,
        sponsors: false,
        //filters: false,
    }); 
    const [researchSearchDialog, setResearchSearchDialog] = useState(false);

    // HANDLE DIALOG
    const handleResearchSearchDialog = () => {
        setResearchSearchDialog(!researchSearchDialog);
    }; 

    // HANDLE LOGO CONTEXT
    const isHome = () => {
        if(history.location.pathname === '/')
            return true;
        else
            return false;
    }; console.log('history.location.pathname',history.location.pathname === '/');

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
                    <PublicFooter />
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
            //                                 <Typography  >{`${couple[0].name} e ${couple[1].name}`}</Typography> 
            //                             </Stack>
            //                         </Box>
            //                     )
            //                 })}
            //             </Stack>
            //         </Box>
            //     )

            case 'research':
                return(
                    null // TODO RETORNAR DIALOG
                );

        }

    };

    // HANDLE LOGOUT
    const handleLogout = (event) => {
        dispatch(logout());
    };

    return ( 
        <Fragment>
            {isHome() ? (
                    <Box component={Link} to="/" >
                        <Logo color={ history.location.pathname === '/' ? '#FFF' : '#00000099' }   />
                    </Box>
                ) : (
                    <AppBar position="fixed" color="inherit" elevation={0}  sx={{ height: '56px', zIndex: 40, borderBottom: 1, borderColor: 'divider', }}>
                        <Toolbar >
                            <Box component={Link} to="/" sx={{ textDecoration: 'none', }} >
                                <Logo color={ history.location.pathname === '/' ? '#FFF' : '#00000099' } />
                            </Box>

                            <Box sx={{ flexGrow: 1 }} />

                            <IconButton color="text.secondary" size="large" onClick={handleResearchSearchDialog} >
                                <ManageSearchIcon />
                            </IconButton>

                            {/* <IconButton color="text.secondary" size="large" >
                                <PersonSearchIcon />
                            </IconButton> */}

                            <IconButton edge="end" color="text.secondary" size="large" onClick={toggleDrawer('pageMenu', true)} >
                                <MenuIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                )
            }

            {isHome() ? (
                <Paper 
                    elevation={0} 
                    square
                    sx={{
                        position: 'absolute', 
                        zIndex: 80, 
                        ml: 3,
                        top: '100px', 
                    }}
                >
                    <IconButton onClick={toggleDrawer('pageMenu', true)} >
                        <MenuIcon />
                    </IconButton>
                    <Divider />
                    <IconButton onClick={handleResearchSearchDialog} >
                        <ManageSearchIcon />
                    </IconButton>
                    {/*<Divider />
                     <IconButton >
                        <PersonSearchIcon />
                    </IconButton> */}
                    <Divider />
                    <IconButton >
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
                ) : null
            }  

            {/* LEGENDA */}
            {categorieLegendGrade.length > 0 && isHome() && (
                <Paper 
                    elevation={1} 
                    square
                    sx={{
                        position: 'absolute', 
                        zIndex: 80, 
                        margin: 1.1,
                        padding: 2,
                        bottom: 35,
                        right: 1.1
                    }}
                > 
                    {categorieLegendGrade.map(couple => {
                        return (
                            <Stack 
                                direction="row" 
                                alignItems="center"
                                spacing={1} 
                                sx={{ pb: 0.5, '&:last-child': { pb: 0 }, }}
                                key={couple[0].id}
                            >
                                <Avatar sx={{ width: 10, height: 10, bgcolor: `${couple[0].color}` }}> </Avatar>
                                <Typography variant="caption" component="div" >{`${couple[0].name} e ${couple[1].name}`}</Typography> 
                            </Stack>
                        )
                    })}
                </Paper>
            )}

            {/* PUBLIC PAGES NAV */}
            <Drawer
                anchor="right"
                open={drawer.pageMenu}
                onClose={toggleDrawer('pageMenu', false)}
            >
                {selectedDrawer('pageMenu')}
            </Drawer>

            {/* FOOTER */}
            <Drawer
                anchor="bottom"
                open={drawer.sponsors}
                onClose={toggleDrawer('sponsors', false)}
            >
                {selectedDrawer('sponsors')}
            </Drawer>


            {/* RESEARCH SEARCH DIALOG */}
            <Dialog 
                fullWidth	
                PaperProps={{ square: true, }}
                onClose={handleResearchSearchDialog} 
                open={researchSearchDialog} 
                >
                <DialogTitle> 
                    <SearchBar />
                </DialogTitle>    
                
                <Divider />

                <DialogContent>
                    <SearchResults />
                    {/* <DialogContentText id="alert-dialog-description">
                        
                    </DialogContentText> */}
                </DialogContent>

            </Dialog>
            
        </Fragment>
    );
};

export default PublicMenuBar;