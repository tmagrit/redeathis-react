import * as React from 'react';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/sessionSlice'; 
import { categoryLegendGrade } from '../features/researchSlice'; 
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
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
    //const categories = useSelector(state => state.research.categories); 
    const categorieLegendGrade = useSelector(categoryLegendGrade);
    //const profile = useSelector(state => state.session.profile);
    const pages = useSelector(state => state.pages.pages).filter(pa => pa.status === 1 );

    // MY HISTORY HOOK
    const history = useHistory(); //console.log('history',history);

    // // REACT STATES
    const [drawer, setDrawer] = useState({
        pageMenu: false,
        sponsors: false,
        //filters: false,
    }); 

    // const categoryLegend = [[1, 6], [2, 7], [3, 5], [4, 8]].map(couple => {
    //     if(categories) 
    //         return [categories.find(cat => cat.id === couple[0]), categories.find(cat => cat.id === couple[1])]
    //     else
    //         return null;
    // }); 
    
    console.log('categorieLegendGrade', categorieLegendGrade);


    // const categoryLegend = () => {
    //     const grade = [[1, 6], [2, 7], [3, 5], [4, 8]];

    //     if(categoriesStatus === "succeeded") {
    //         const legendGrade = grade.map(couple => {
    //             return [categories.find(cat => cat.id === couple[0]), categories.find(cat => cat.id === couple[1])]
    //         });

    //         return legendGrade;
    //     } else 
    //         return null;
    // }; 


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

            {categorieLegendGrade.length > 0 && (
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
        </Fragment>
    );
};

export default PublicMenuBar;