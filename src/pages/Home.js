import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateViewport } from '../features/sessionSlice';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Map, { NavigationControl } from 'react-map-gl';
import { ScatterplotLayer } from '@deck.gl/layers';

import PublicMenuBar from '../components/PublicMenuBar';
import GeocoderControl from '../components/GeocoderControl';
import DeckGLOverlay from '../components/DeckGLOverlay';
import { hexToRgb } from '../components/colorConverter';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { categoryTitle } from '../components/categoryTitle';

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

    // REDUX SELECTORS
    const researchAuthors = useSelector(state => state.research.researchAuthors.filter(ra => ra.research_id === clickInfo.object.id ));

    // SET SCATTERPLOT COORDINATES
    const researchScatterplot = research.map(r => {
        const researchdata = { ...r, coordinates: [r.geolocation.longitude,r.geolocation.latitude] }
        return researchdata
    });

    // DECK GL OVERLAY LAYER
    const scatterplotLayer = 
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
            getFillColor: d => hexToRgb(categories.find(c => c.id === d.category_id).color),
            onClick: info => setClickInfo(info),
            onHover: info => setHoverInfo(info)
        }
    );

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
            <Map 
                initialViewState={viewport}
                onMove={e => handleMapChange(e.viewState)}
                style={{ width: '100vw', height: '100vh' }} 
                mapStyle={mapboxStyle} 
                mapboxAccessToken={mapboxKey} 
            >
                <NavigationControl position='bottom-right' /> 
                <DeckGLOverlay layers={[scatterplotLayer]}  />
                <GeocoderControl collapsed={true} position='top-right' />
            </Map>
            

            {clickInfo.object && (  
                <ClickAwayListener onClickAway={handleCloseClickInfo}>
                    <Paper 
                        sx={{
                            position: 'absolute', 
                            zIndex: 80, 
                            padding: 2, 
                            margin: 1.2,
                            maxWidth: '40vw',
                            minWidth: '30vw',
                            minHeight: '10vw',
                            //pointerEvents: 'none',
                            top: 48,
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
                            <Avatar sx={{ width: 10, height: 10, bgcolor: `${categories.find(c => c.id === clickInfo.object.category_id ).color}` }}> </Avatar>
                            <Typography variant="caption" component="div"> {categoryTitle(categories.find(c => c.id === clickInfo.object.category_id).name)} </Typography>
                        </Stack>
                        <Typography variant="caption" component="span" > {clickInfo.object.excerpt} </Typography> 
                        <Typography variant="caption" sx={{ textDecoration: 'none', }} component={Link} to={`/view/research/${clickInfo.object.id}`} >
                                Saiba mais... 
                        </Typography>     
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
        </React.Fragment>   
    );

}

export default Home;