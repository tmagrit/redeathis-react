import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import PublicMenuBar from '../components/PublicMenuBar';
import Map from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { hexToRgb } from '../components/colorConverter';
import 'mapbox-gl/dist/mapbox-gl.css';

import ClickAwayListener from '@mui/material/ClickAwayListener';

const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE

const Home = () => {

    // REDUX SELECTORS
    const research = useSelector(state => state.research.research);
    const categories = useSelector(state => state.research.categories);


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
        return str.replace( /(<([^>]+)>)/ig, '').replace(/&nbsp;/g, '');
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

    // HANDLE MAP CHANGE
    const handleMapChange = ({ viewport }) => {
        setViewport(viewport);
    };

    // HANDLE CLOSE CLICKINFO
    const handleCloseClickInfo = (event) => {
        setClickInfo({ object: false });
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
            <PublicMenuBar />
            <DeckGL 
                initialViewState={viewport}
                onViewStateChange={handleMapChange}
                layers={layers} 
                controller={true} 
               //getCursor={({isDragging}) => isDragging ? 'grabbing' : 'pointer' }
            >
                
                <Map 
                    reuseMaps 
                    style={{ width: '100vw', height: '100vh' }} 
                    mapStyle={mapboxStyle} 
                    mapboxAccessToken={mapboxKey} 
                    styleDiffing={true} 
                />

                {clickInfo.object && (  
                    <ClickAwayListener onClickAway={handleCloseClickInfo}>
                        <Paper 
                            sx={{
                                position: 'absolute', 
                                zIndex: 100, 
                                padding: 2, 
                                margin: 2,
                                maxWidth: '40vw',
                                minHeight: '10vw',
                                //pointerEvents: 'none',
                                top: 70,
                                right: 0
                            }}
                            elevation={3}
                        >
                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                spacing={0}
                                sx={{ mb:1, }}
                            >
                                <IconButton aria-label="fechar" size="small" onClick={handleCloseClickInfo} >
                                    <CloseIcon />
                                </IconButton>
                                <IconButton aria-label="expandir" size="small" disabled>
                                    <FullscreenIcon />
                                </IconButton>
                                <IconButton aria-label="recolher" size="small" disabled>
                                    <FullscreenExitIcon />
                                </IconButton>
                                <IconButton aria-label="leia mais" size="small" component={Link}to={`/view/research/${clickInfo.object.id}`}>
                                    <ReadMoreIcon />
                                </IconButton>

                            </Stack>

                            <Typography variant="subtitle1" display="block">{ clickInfo.object.title.split(" ").splice(0,20).join(" ") }</Typography>
                            <Stack direction="row" sx={{ mt:1, mb:3, }}>
                                <Chip clickable label={categories.find(c => c.id === clickInfo.object.category_id).name} size="small" />
                            </Stack>
                            <Typography variant="caption" display="block" gutterBottom>{ removeTags(clickInfo.object.summary).split(" ").splice(0,144).join(" ") }</Typography>
                        </Paper>
                    </ClickAwayListener>
                )}
                
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
            </DeckGL>

            
        </React.Fragment>
        
    );

}

export default Home;





// import { logout } from '../features/sessionSlice';
// import { useParams } from "react-router-dom";
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
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

    // // REACT ROUTER
    // const location = useLocation();
    // const trackLocation = location.state?.from?.pathname || '/admin';

    // const dispatch = useDispatch()
    // const session = useSelector(state => state.session);
    // const profile = useSelector(state => state.session.profile);
        // const categories = useSelector(state => state.research.categories);





    // // HANDLE MENU
    // const handleMenu = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // // HANDLE LOGOUT
    // const handleLogout = (event) => {
    //     dispatch(logout());
    // };


            {/* <AppBar position="fixed" color="inherit">
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
            </AppBar> */}