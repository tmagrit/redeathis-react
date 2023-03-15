import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateViewport } from '../features/sessionSlice';
import { selectFilteredResearch, selectResearchTags } from '../features/researchSlice';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import LinkIcon from '@mui/icons-material/Link';
import Map from 'react-map-gl';
import { ScatterplotLayer } from '@deck.gl/layers';

//import PublicMenuBar from '../components/PublicMenuBar';
import MenuBar from '../components/MenuBar';
import Controls from '../components/Controls';
import Legend from '../components/Legend';



import Navigation from '../components/Navigation';



import GeocoderControl from '../components/GeocoderControl';
import DeckGLOverlay from '../components/DeckGLOverlay';
import { hexToRgb } from '../components/colorConverter';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { categoryTitle } from '../components/categoryTitle';
import ResearchTag from '../components/ResearchTag';

const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE

const Home = () => {

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const filteredResearch = useSelector(selectFilteredResearch);   
    const sessionViewport = useSelector(state => state.session.viewport);
    const categories = useSelector(state => state.research.categories);
    const allResearchTags = useSelector(selectResearchTags);

    // REACT STATES
    const [viewport, setViewport] = useState(sessionViewport);
    const [clickInfo, setClickInfo] = useState({ object: false }); 
    const [hoverInfo, setHoverInfo] = useState({ object: false });

    // REDUX SELECTORS   
    const researchAuthors = useSelector(state => state.research.researchAuthors.filter(ra => ra.research_id === clickInfo.object.id ));   
    
    const scatterFilteredResearch = filteredResearch.map(fr => {
        const researchTags = allResearchTags.find(art => art.research_id === fr.id ); 

        return ({ 
            ...fr,
            researchTags: researchTags
        });
    }); 
    

    // DECK GL OVERLAY LAYER 
    const scatterplotLayer = 
        new ScatterplotLayer({
            id: 'map-home-markers',
            data: scatterFilteredResearch,
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
        <React.Fragment >

            {/* <PublicMenuBar /> 
            <MenuBar />
            <Controls />
            <Legend /> */}

            <Navigation />
            
            <Map 
                initialViewState={viewport}
                onMove={e => handleMapChange(e.viewState)}
                style={{ width: '100vw', height: '100vh' }} 
                mapStyle={mapboxStyle} 
                mapboxAccessToken={mapboxKey} 
                reuseMaps
            >
                {/* <NavigationControl position='bottom-right' />  */}
                <DeckGLOverlay layers={[scatterplotLayer]}  />
                <GeocoderControl collapsed={true} position='bottom-left' />
            </Map>
            

            {clickInfo.object && (  
                <ClickAwayListener onClickAway={handleCloseClickInfo}>
                    <Paper 
                        square
                        sx={{
                            position: 'absolute', 
                            zIndex: 80, 
                            padding: 2, 
                            margin: 1.2,
                            maxWidth: '55vw',
                            minWidth: '30vw',
                            minHeight: '10vw',
                            //pointerEvents: 'none',
                            top: '80px',
                            right: 0
                        }}
                        elevation={2}
                    >
                        {/* TITLE */}
                        <Box sx={{ my:0, py: 0, }}>    
                            <Typography variant="h6" component="span" >{ clickInfo.object.title }</Typography>
                            <Typography variant="h6" component="span" sx={{ color: 'text.secondary',}}> 
                                {clickInfo.object.date.start && 
                                    (clickInfo.object.date.interval ? 
                                        (` [${clickInfo.object.date.start.year}-${clickInfo.object.date.end.year}]`) 
                                        : 
                                        (` [${clickInfo.object.date.start.year}]`) 
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
                            sx={{ mt:1, mb:2, }}
                        >
                            <Avatar sx={{ width: 10, height: 10, bgcolor: `${categories.find(c => c.id === clickInfo.object.category_id ).color}` }}> </Avatar>
                            <Typography variant="subtitle1" component="div" sx={{ fontSize: 15, lineHeight: 1.5, }}> {categoryTitle(categories.find(c => c.id === clickInfo.object.category_id).name)} </Typography>
                        </Stack>
                        
                        {/* EXCERPT */}
                        <Typography variant="subtitle1" component="span" sx={{ fontSize: 15, lineHeight: 1.5, }} > {clickInfo.object.excerpt} </Typography> 
                        <Typography 
                            variant="subtitle1" 
                            sx={{ display: 'inline-flex', alignItems: 'center',  textDecoration: 'none', color: 'inherit', fontSize: 15, lineHeight: 1.5, }} 
                            component={Link} to={`/view/research/${clickInfo.object.id}`} 
                        >
                                <span>Saiba mais</span> <LinkIcon sx={{ pl: 0.5, color: 'inherit', }} /> 
                        </Typography>   

                        <Divider sx={{ pt: 1.5, }} />


                        {/* TAGS */}
                        <Stack 
                            sx={{ pt: 1.5, }}
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
                    square
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
                    elevation={2}
                >
                    <Typography variant="caption" display="block">{hoverInfo.object.title}</Typography>
                </Paper>
            )}
        </React.Fragment>   
    );

}

export default Home;