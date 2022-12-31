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
import DialogContentText from '@mui/material/DialogContentText';
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
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import InfoIcon from '@mui/icons-material/Info';
import EventNoteIcon from '@mui/icons-material/EventNote';


import { slugger } from './slugger';
import { useHistory } from './history';
import SearchBar from './SearchBar';
import PublicFooter from './PublicFooter';
import Logo from './Logo';

const PublicMenuBar = () => {

    // REDUX SELECTORS
    const dispatch = useDispatch()
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
    const [dialog, setDialog] = useState(false); 

    // HANDLE DIALOG
    const handleDialog = () => {
        setDialog(!dialog);
    }; 

    // HANDLE LOGO CONTEXT
    const isHome = () => {
        if(history.location.pathname === '/')
            return true;
        else
            return false;
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
            //                                 <Typography variant="caption" component="p" >{`${couple[0].name} e ${couple[1].name}`}</Typography> 
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
                    <AppBar position="fixed" color="inherit" elevation={1} sx={{ height: '56px', zIndex: 40, }}>
                        <Toolbar 
                            // sx={{
                            //     width: "100vw",
                            //     maxWidth: "xl",
                            //     mx: "auto"
                            //     }}  
                            >
                            <Box component={Link} to="/" sx={{ textDecoration: 'none', }} >
                                <Logo color={ history.location.pathname === '/' ? '#FFF' : '#00000099' } />
                            </Box>

                            <Box sx={{ flexGrow: 1 }} />

                            <IconButton color="text.secondary" size="large" onClick={handleDialog} >
                                <ManageSearchIcon />
                            </IconButton>
                            <IconButton color="text.secondary" size="large" onClick={handleDialog} >
                                <PersonSearchIcon />
                            </IconButton>
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
                    <IconButton onClick={handleDialog} >
                        <ManageSearchIcon />
                    </IconButton>
                    <Divider />
                    <IconButton onClick={handleDialog} >
                        <PersonSearchIcon />
                    </IconButton>
                    <Divider />
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
                ) : null
            }  

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
                                <Typography variant="caption" component="p" >{`${couple[0].name} e ${couple[1].name}`}</Typography> 
                            </Stack>
                        )
                    })}
                </Paper>
            )}

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

            {/* MANAGE SEARCH DIALOG */}
            <Dialog 
                onClose={handleDialog} 
                open={dialog} 
                >
                <DialogTitle> 
                    <SearchBar />
                </DialogTitle>    
                
                <Divider />

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Resultados de busca em itens de acervo.
                    </DialogContentText>
                </DialogContent>
    
            </Dialog>




            
        </Fragment>
    );
};

export default PublicMenuBar;


    // const handleMenu = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };


            {/* <Box sx={{ position: 'absolute', bottom: 200, left: 111, zIndex: 70, width: '450px' }}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    size="small"
                    step={1}
                    value={[1970,2010]}
                    //onChange={handleChange}
                    valueLabelDisplay="on"
                    //getAriaValueText={valuetext}
                    marks={[{
                        value: 1970,
                        label: '1970',
                    },
                    {
                        value: 2010,
                        label: '2010',
                    }]}
                />
            </Box>     */}



            {/* <Stack 
                sx={{
                    position: 'absolute', 
                    zIndex: 80, 
                    // margin: 1.1,
                    // top: 1.1,
                    // left: 1.1
                    margin: 1.1,
                    top: 111,
                    left: 1.1
                }}
                direction="row" 
            >

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

                
            
            </Stack> */}