import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateViewport } from '../features/sessionSlice';
import { Link, useLocation } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
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
    const dispatch = useDispatch();
    const research = useSelector(state => state.research.research);
    const sessionViewport = useSelector(state => state.session.viewport);
    const categories = useSelector(state => state.research.categories);

    // REACT STATES
    const [viewport, setViewport] = useState(sessionViewport);
    const [clickInfo, setClickInfo] = useState({ object: false }); 
    const [hoverInfo, setHoverInfo] = useState({ object: false }); 
    const [anchorEl, setAnchorEl] = useState(null); 

    // REDUX SELECTORS
    const researchAuthors = useSelector(state => state.research.researchAuthors.filter(ra => ra.research_id === clickInfo.object.id ));

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
    const handleMapChange = (viewport) => {
        dispatch(updateViewport(viewport.viewState));
        setViewport(viewport.viewState);
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
                                padding: 2.4, 
                                margin: 2.4,
                                maxWidth: '40vw',
                                minWidth: '30vw',
                                minHeight: '10vw',
                                //pointerEvents: 'none',
                                top: 70,
                                right: 0
                            }}
                            elevation={3}
                        >
                            <Box sx={{ my:0, py: 0, }}>    
                                <Typography variant="subtitle1" component="span" >{ clickInfo.object.title }</Typography>
                                <Typography variant="subtittle1" component="span" sx={{ color: 'text.secondary',}}> 
                                    {clickInfo.object.date.start && 
                                        (clickInfo.object.date.interval ? 
                                            (` [${clickInfo.object.date.start.year}-${clickInfo.object.date.end.year}]`) 
                                            : 
                                            (` [${clickInfo.object.date.start.year}]`) 
                                        )
                                    } 
                                </Typography>
                            </Box>
                            <Box sx={{ my:0, py: 0, }}>
                                {researchAuthors.length > 0 && ( 
                                    researchAuthors.map(ra => {
                                        return  <Typography variant="caption" component="span" sx={{ color: 'text.secondary', my:0, py: 0, }} > {`${ra.author.name} ${ra.author.surname}; `} </Typography>
                                    })
                                )}
                            </Box>
                            <Stack 
                                direction="row" 
                                alignItems="center"
                                spacing={0.7}
                                sx={{ mt:1, mb:1, }}
                            >
                                <Avatar sx={{ width: 10, height: 10, bgcolor: `${clickInfo.object.category.color}` }}> </Avatar>
                                <Typography variant="caption" > {categories.find(c => c.id === clickInfo.object.category_id).name} </Typography>
                            </Stack>
                            <Typography variant="caption" component="span" > {clickInfo.object.excerpt} </Typography> 
                            <Typography variant="caption" sx={{ textDecoration: 'none', }} component={Link} to={`/view/research/${clickInfo.object.id}`} >
                                 Saiba mais... {/* <KeyboardDoubleArrowRightIcon sx={{ fontSize: 'inherit', }}/>  */}
                            </Typography>     
                            {/* <Stack
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
                                <IconButton aria-label="leia mais" size="small" component={Link} to={`/view/research/${clickInfo.object.id}`}>
                                    <ReadMoreIcon />
                                </IconButton>

                            </Stack>  */}
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

// import IconButton from '@mui/material/IconButton';
// import ReadMoreIcon from '@mui/icons-material/ReadMore';
// import LinkIcon from '@mui/icons-material/Link';
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
// import CloseIcon from '@mui/icons-material/Close';
// import FullscreenIcon from '@mui/icons-material/Fullscreen';
// import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';