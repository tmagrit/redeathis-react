import * as React from 'react';
import { useState, useEffect } from 'react';
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
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import { Divider } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';

import Map from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { hexToRgb } from '../components/colorConverter';
import 'mapbox-gl/dist/mapbox-gl.css';

const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE

const Home = () => {

    // REDUX SELECTORS
    const dispatch = useDispatch()
    const session = useSelector(state => state.session);
    const profile = useSelector(state => state.session.profile);
    const research = useSelector(state => state.research.research);
    const categories = useSelector(state => state.research.categories);

    // REACT ROUTER 
    const location = useLocation();
    const trackLocation = location.state?.from?.pathname || '/admin';

    // REACT STATES
    const [viewport, setViewport] = useState({
        latitude: -12.977749,
        longitude: -38.501630,
        zoom: 3
    });
    const [clickInfo, setClickInfo] = useState({ object: false }); 
    const [hoverInfo, setHoverInfo] = useState({ object: false }); 
    const [anchorEl, setAnchorEl] = useState(null); 

    // REMOVE HTML TAGS FROM SUMMARY
    function removeTags(str) {
        if ((str===null) || (str===''))
        return false;
        else
        str = str.toString();
        return str.replace( /(<([^>]+)>)/ig, '');
    };

    // SET SCATTERPLOT COORDINATES
    const researchScatterplot = research.map(r => {
        const researchdata = { ...r, coordinates: [r.geolocation.longitude,r.geolocation.latitude] }
        return researchdata
    });

    // DECK GL LAYER
    const layers = [
        new ScatterplotLayer({
            id: 'map-home-markers',
            data: researchScatterplot,
            pickable: true,
            stroked: false,
            filled: true,
            radiusScale: 5,
            radiusMinPixels: 5,
            radiusMaxPixels: 10,
            getPosition: d => d.coordinates,
            getRadius: d => 5,
            getFillColor: d => hexToRgb(d.category.color),
            onClick: info => setClickInfo(info),
            onHover: info => setHoverInfo(info)
        })
    ];

    // // HANDLE MAP CHANGE
    // const handleMapChange = ({ viewport }) => {
    //     setViewport(viewport);
    // };

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

    useEffect(() => {
        const listener = e => {
          if (e.key === "Escape") {
            setClickInfo({ object: false });
          }
        };
        window.addEventListener("keydown", listener);
    
        return () => {
          window.removeEventListener("keydown", listener);
        };
      }, []);

    return (
        <React.Fragment>
            <AppBar position="fixed" color="inherit">
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
                                <MenuItem >
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

            <DeckGL 
                initialViewState={viewport}
                layers={layers} 
                controller={true} 
                getCursor={({isDragging}) => isDragging ? 'grabbing' : 'pointer' }
            >
                <Map 
                    reuseMaps 
                    style={{ width: '100vw', height: '100vh' }} 
                    mapStyle={mapboxStyle} 
                    mapboxAccessToken={mapboxKey} 
                    styleDiffing={true} 
                />
                {hoverInfo.object && (  
                    <Paper 
                        sx={{
                            position: 'absolute',
                            left: hoverInfo.x, 
                            top: hoverInfo.y, 
                            zIndex: 110, 
                            padding: 1, 
                            margin: 1,
                            maxWidth: '40vw',
                            pointerEvents: 'none',
                        }}
                        elevation={4}
                    >
                      <Typography variant="caption" display="block">{hoverInfo.object.title}</Typography>
                    </Paper>
                )}
                {clickInfo.object && (  
                    <Paper 
                        sx={{
                            position: 'absolute', 
                            zIndex: 100, 
                            padding: 2, 
                            margin: 2,
                            maxWidth: '40vw',
                            minHeight: '10vw',
                            pointerEvents: 'none',
                            top: 70,
                            right: 0
                            //left: hoverInfo.x,
                            //top: hoverInfo.y
                            // ...(coordsRatio.x < 0.5 && {
                            //     left: hoverInfo.x, 
                            // }),
                            // ...(coordsRatio.x >= 0.5 && {
                            //     right: hoverInfo.x, 
                            // }),
                            // ...(coordsRatio.y < 0.5 && {
                            //     top: hoverInfo.y, 
                            // }),
                            // ...(coordsRatio.y >= 0.5 && {
                            //     bottom: hoverInfo.y,  
                            // })
                        }}
                        elevation={3}
                    >
                      <Typography variant="subtitle1" display="block" gutterBottom>{ clickInfo.object.title.split(" ").splice(0,20).join(" ") }</Typography>
                      <Typography variant="caption" display="block" gutterBottom>{ removeTags(clickInfo.object.summary).split(" ").splice(0,144).join(" ") }</Typography>
                    </Paper>
                )}
                
            </DeckGL>
        </React.Fragment>
        
    )

}

export default Home






{/* <DeckGL 
                initialViewState={viewport}
                //viewState={viewport} 
                layers={layers} 
                //onViewStateChange={e => setViewport(e.viewState)}
                //onViewStateChange={handleMapChange} 
                controller={true} 
                getCursor={({isDragging}) => isDragging ? 'grabbing' : 'pointer' }
                //getTooltip={({object}) => object && `${object.title.split(" ").splice(0,6).join(" ")}\n${object.category.name}`}

            >
                {hoverInfo.object && (  
                    <Paper 
                        sx={{
                            position: 'absolute',
                            left: hoverInfo.x, 
                            top: hoverInfo.y, 
                            zIndex: 110, 
                            padding: 1, 
                            margin: 1,
                            maxWidth: '40vw',
                            pointerEvents: 'none',
                        }}
                        elevation={4}
                    >
                      <Typography variant="caption" display="block">{hoverInfo.object.title}</Typography>
                    </Paper>
                )}
                {clickInfo.object && (  
                    <Paper 
                        sx={{
                            position: 'absolute', 
                            zIndex: 100, 
                            padding: 2, 
                            margin: 2,
                            maxWidth: '40vw',
                            minHeight: '10vw',
                            pointerEvents: 'none',
                            top: 70,
                            right: 0
                            //left: hoverInfo.x,
                            //top: hoverInfo.y
                            // ...(coordsRatio.x < 0.5 && {
                            //     left: hoverInfo.x, 
                            // }),
                            // ...(coordsRatio.x >= 0.5 && {
                            //     right: hoverInfo.x, 
                            // }),
                            // ...(coordsRatio.y < 0.5 && {
                            //     top: hoverInfo.y, 
                            // }),
                            // ...(coordsRatio.y >= 0.5 && {
                            //     bottom: hoverInfo.y,  
                            // })
                        }}
                        elevation={3}
                    >
                      <Typography variant="subtitle1" display="block" gutterBottom>{ clickInfo.object.title.split(" ").splice(0,20).join(" ") }</Typography>
                      <Typography variant="caption" display="block" gutterBottom>{ removeTags(clickInfo.object.summary).split(" ").splice(0,144).join(" ") }</Typography>
                    </Paper>
                )}
                <Map 
                    reuseMaps 
                    style={{ width: '100vw', height: '100vh' }} 
                    mapStyle={mapboxStyle} 
                    mapboxAccessToken={mapboxKey} 
                    styleDiffing={true} 
                />
            </DeckGL> */}







//"mapbox://styles/mapbox/dark-v9"

    // const [globalCoords, setGlobalCoords] = useState({x: 0, y: 0}); //console.log('globalCoords', globalCoords);
    // const [coordsRatio, setCoordsRatio] = useState({x: 0, y: 0}); //console.log('coordsRatio', coordsRatio);

    // // TRACK MOUSE POINTER POSITION
    // useEffect(() => {
    //     // GLOBAL MOUSE COORDINATES
    //     const handleWindowMouseMove = event => {
    //       setGlobalCoords({
    //         x: event.screenX,
    //         y: event.screenY,
    //       });
    //     };
    //     window.addEventListener('mousemove', handleWindowMouseMove);
    
    //     return () => {
    //       window.removeEventListener('mousemove', handleWindowMouseMove);
    //     };
    // }, []);

    // // TRACK MOUSE COORDINATES RELATIVE TO ELEMENT
    // const handleMouseMove = event => {
    //     setCoordsRatio({
    //       x: (event.clientX - event.target.offsetLeft)/event.target.offsetWidth,
    //       y: (event.clientY - event.target.offsetTop)/event.target.offsetHeight,
    //     });
    // };


    // // POPOVER HANDLING
    // const [anchorPopoverEl, setAnchorPopoverEl] = useState(null);
    // const handlePopoverClick = (event) => {
    //     setAnchorPopoverEl(event.currentTarget);
    // };
    // const handlePopoverClose = () => {
    //     setAnchorPopoverEl(null);
    // };
    // const open = Boolean(anchorPopoverEl);
    // const id = open ? 'simple-popover' : undefined;


                    // <Popover 
                    //     id={hoverInfo.object.id}
                    //     open={open}
                    //     anchorEl={anchorPopoverEl}
                    //     onClose={handlePopoverClose}
                    //     anchorOrigin={{
                    //         vertical: 'center',
                    //         horizontal: 'center',
                    //     }}
                    //     transformOrigin={{
                    //         vertical: 'top',
                    //         horizontal: 'left',
                    //     }}
                    // >
                    //     <Typography variant="subtitle1" display="block" gutterBottom>{ hoverInfo.object.title.split(" ").splice(0,20).join(" ") }</Typography>
                    //     <Typography variant="caption" display="block" gutterBottom>{ removeTags(hoverInfo.object.summary).split(" ").splice(0,144).join(" ") }</Typography>
                    // </Popover>