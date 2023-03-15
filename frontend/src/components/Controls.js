import * as React from 'react';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/sessionSlice'; 
import { Link } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
//import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import EventNoteIcon from '@mui/icons-material/EventNote';

import { slugger } from './slugger';
import { useHistory } from './history';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { publicTheme, Paper } from '../styles/publicStyles';

const PublicMenuBar = (props) => {

    const { open, setOpen } = props;

    // REDUX SELECTORS
    const dispatch = useDispatch();

    const session = useSelector(state => state.session);
    const pages = useSelector(state => state.pages.pages).filter(pa => pa.status === 1 );

    // MY HISTORY HOOK
    const history = useHistory(); 

    // REACT STATES
    const [drawer, setDrawer] = useState({
        //pageMenu: false,
        sponsors: false,
        filters: false,
    }); 
    const [researchSearchDialog, setResearchSearchDialog] = useState(false);

    // HANDLE DIALOG
    const handleResearchSearchDialog = () => {
        setResearchSearchDialog(!researchSearchDialog);
    }; 

    // HANDLE MENU
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setDrawer({ ...drawer, [anchor]: open });
      };

    const selectedDrawer = (anchor) => {
        switch (anchor) {
            case 'filters':
                return(
                    <Box
                        sx={{ display: 'flex', flexDirection: 'column', width: 440, }}
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
        <ThemeProvider theme={publicTheme} > 
            <Paper 
                open={open}
                elevation={1} 
                square
            >
                <IconButton onClick={handleResearchSearchDialog} >
                    <ManageSearchIcon />
                </IconButton>
                <Divider />
                <IconButton  onClick={setOpen} >
                    <FilterAltIcon />
                </IconButton>
                <Divider />
                <IconButton >
                    <TravelExploreIcon />
                </IconButton>
            </Paper>

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
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    );
};

export default PublicMenuBar;