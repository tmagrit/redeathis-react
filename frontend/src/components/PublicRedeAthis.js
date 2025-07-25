import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateViewport } from '../features/sessionSlice';
import { selectFilteredResearch } from '../features/researchSlice';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import LinkIcon from '@mui/icons-material/Link';
import Map from 'react-map-gl';
import { ScatterplotLayer } from '@deck.gl/layers';
import GeocoderControl from '../components/GeocoderControl';
import DeckGLOverlay from '../components/DeckGLOverlay';
import { hexToRgb } from '../components/colorConverter';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { categoryTitle } from '../components/categoryTitle';
import ResearchTag from '../components/ResearchTag';

import Controls from './Controls';
import Legend from './Legend';
import TimeSlider from './TimeSlider';
import FilterSelect from './FilterSelect';


// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import { drawerWidth } from '../styles/publicStyles';
// import { DrawerHeader, publicTheme, drawerWidth } from '../styles/publicStyles';


const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE

const PublicRedeAthis = () => {

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const { filteredResearch } = useSelector(selectFilteredResearch);
    const sessionViewport = useSelector(state => state.session.viewport);
    const categories = useSelector(state => state.research.categories);

    // REACT STATES
    const [viewport, setViewport] = useState(sessionViewport); 
    const [clickInfo, setClickInfo] = useState({ object: false }); 
    const [hoverInfo, setHoverInfo] = useState({ object: false });
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);

    const handleDrawerOpen = () => {
      setOpen(!open);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    
    // REDUX SELECTORS   
    const researchAuthors = useSelector(state => state.research.researchAuthors.filter(ra => ra.research_id === clickInfo.object.id ));   
    
    // DECK GL OVERLAY LAYER 
    const scatterplotLayer = 
        new ScatterplotLayer({
            id: 'map-home-markers',
            data: filteredResearch,
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

        <Grid 
            container 
            spacing={3}
        >
            <Grid 
                item xs={12} 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                }}
            >
                <div  
                    style={{ 
                        width: '100%', 
                        height: 'calc(100vh - 112px - 150px)', 
                        position: 'relative',
                        paddingLeft: 100,
                        paddingRight: 30,
                    }} 
                >

                    {!clickInfo.object && ( 
                        <div>
                            {/* LEGENDA */}
                            <Legend open={open} show={show} />

                            {/* SELETOR DE JANELA CRONOLÓGICA */}
                            <TimeSlider />
                        </div>  
                    )}


                    {/* CONTROLES */}
                    <Controls open={open} show={show} setOpen={handleDrawerOpen} />

                    {/* FILTROS */}
                    <Drawer
                        PaperProps={{ 
                            elevation: 0,
                            style: {
                                background: 'rgba(244, 240, 235, 0.85)',
                            }
                        }}
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                height: 'calc(100vh - 112px - 150px)',
                                marginRight: 6.5,
                                marginTop: '112px',
                            },
                        }}
                        variant="persistent"
                        anchor="right"
                        open={open}
                    >
                        <FilterSelect />
                    </Drawer>

                    {/* MAPA */}
                    <Map 
                        initialViewState={viewport}
                        onMove={e => handleMapChange(e.viewState)}
                        mapStyle={mapboxStyle} 
                        mapboxAccessToken={mapboxKey} 
                        renderWorldCopies={false}
                        reuseMaps
                    >
                        <DeckGLOverlay layers={[scatterplotLayer]}  />
                        <GeocoderControl 
                            collapsed={true} 
                            position='top-left' 
                            placeholder="Buscar endereço"
                                
                        />
                    </Map>

                    {clickInfo.object && (   
                        <ClickAwayListener onClickAway={handleCloseClickInfo}>
                            <Paper 
                                square
                                sx={{
                                    position: 'absolute', 
                                    zIndex: 200, 
                                    padding: 2, 
                                    margin: 1.2,
                                    maxWidth: '35vw',
                                    minWidth: '20vw',
                                    minHeight: '10vw',
                                    //pointerEvents: 'none',
                                    top: 0,
                                    left: 100
                                }}
                                elevation={2}
                            >
                                {/* TITLE */} 
                                <Box sx={{ my:0, py: 0, }}>    
                                    <Typography variant="searchResultsTitle" component="span" sx={{ color: clickInfo.object.category.color, }} >{ clickInfo.object.title }</Typography>
                                    <Typography variant="searchResultsTitle" component="span" sx={{ color: clickInfo.object.category.color, }}> 
                                    {/* <Typography variant="clickInfoTitle" component="span" sx={{ color: clickInfo.object.category.color, }} >{ clickInfo.object.title }</Typography> */}
                                    {/* <Typography variant="clickInfoTitle" component="span" sx={{ color: clickInfo.object.category.color, }}>  */}
                                        {clickInfo.object.date.start && 
                                            (clickInfo.object.date.interval ? 
                                                (` - ${clickInfo.object.date.start.year}-${clickInfo.object.date.end.year}`) 
                                                : 
                                                (` - ${clickInfo.object.date.start.year}`) 
                                            )
                                        } 
                                    </Typography>
                                </Box>

                                {/* AUTHORS */}
                                <Box sx={{ my:0, py: 0, }}>
                                    {researchAuthors.length > 0 && ( 
                                        researchAuthors.map(ra => {
                                            return  <Typography variant="caption" component="span" sx={{ color: 'text.secondary', my:0, py: 0, textTransform: 'uppercase', }} > {`${ra.author.name} ${ra.author.surname}; `} </Typography>
                                        })
                                    )}
                                </Box>

                                {/* CATEGORY */}
                                <Stack 
                                    direction="row" 
                                    alignItems="center"
                                    spacing={0.7}
                                    sx={{ mt:0.5, mb:1, }}
                                >
                                    <Avatar sx={{ width: 10, height: 10, bgcolor: `${categories.find(c => c.id === clickInfo.object.category_id ).color}` }}> </Avatar>
                                    <Typography variant="footerBody" component="div" sx={{ fontSize: 15, lineHeight: 1.5, }}> {categoryTitle(categories.find(c => c.id === clickInfo.object.category_id).name)} </Typography>
                                </Stack>
                                
                                {/* EXCERPT */}
                                <Typography variant="footerBody" component="span" sx={{ fontSize: 15, lineHeight: 1.5, }} > {clickInfo.object.excerpt} </Typography> 
                                <Typography 
                                    variant="footerBody" 
                                    sx={{ display: 'inline-flex', alignItems: 'center',  textDecoration: 'none', color: 'inherit', fontSize: 15, lineHeight: 1.5, }} 
                                    component={Link} to={`/view/research/${clickInfo.object.id}`} 
                                >
                                        <span>Saiba mais</span> <LinkIcon sx={{ pl: 0.5, color: 'inherit', }} /> 
                                </Typography>   

                                <Divider sx={{ pt: 1, }} />

                                {/* TAGS */}
                                <Stack 
                                    sx={{ pt: 1, }}
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    spacing={2}
                                >
                                    {
                                        (clickInfo.object.researchTags.researchClassesData.length > 0) && 
                                        (clickInfo.object.researchTags.researchTagsData.length > 0) && 
                                        clickInfo.object.researchTags.researchClassesData.map(rcd => {
                                            return (
                                                <Stack
                                                    direction="column"
                                                    justifyContent="flex-start"
                                                    alignItems="flex-start"
                                                    spacing={0.5}
                                                    key={rcd.id}
                                                >
                                                        <Typography variant="caption" component="h4" gutterBottom={false} >
                                                            {rcd.name} 
                                                        </Typography> 
                                                        {clickInfo.object.researchTags.researchTagsData.filter(t => t.class_id === rcd.id).map(rtd => {
                                                            return (
                                                                <ResearchTag id={rtd.id} key={rtd.id} />
                                                            )
                                                        })}    
                                                </Stack>
                                            )
                                        })
                                    }
                                </Stack>
                            </Paper>
                        </ClickAwayListener>
                    )}

                    {hoverInfo.object && (  
                        <Paper 
                            variant="outlined"
                            sx={{
                                position: 'absolute',
                                left: hoverInfo.x, 
                                top: hoverInfo.y, 
                                zIndex: 110, 
                                padding: 1.5, 
                                margin: 1,
                                maxWidth: '40vw',
                                pointerEvents: 'none',
                                borderRadius: '12px',
                                border: 1,
                                borderColor: 'divider',
                            }}
                            //elevation={2} (not effective on outline variant)
                        >
                            <Typography variant="caption" display="block" sx={{ fontWeight: 'bold', }}>{hoverInfo.object.title}</Typography>
                        </Paper>
                    )}
                </div>

            </Grid> 
        </Grid>

    );
};

export default PublicRedeAthis;