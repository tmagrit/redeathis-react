import * as React from 'react'; 
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredResearch } from '../features/researchSlice';
import { useParams } from "react-router-dom";
import { DateTime } from 'luxon';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Map from 'react-map-gl';
import { ScatterplotLayer } from '@deck.gl/layers';
import DeckGLOverlay from '../components/DeckGLOverlay';
import { hexToRgb } from '../components/colorConverter';
import PublicMenuBar from '../components/PublicMenuBar';
import PublicFooter from '../components/PublicFooter';
import { categoryTitle } from '../components/categoryTitle';
import ResearchTag from '../components/ResearchTag';

const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE

const ViewResearch = () => {

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    // REDUX SELECTORS
    const research = useSelector(state => state.research.research.find(r => r.id === parseInt(params.researchId, 10) ));
    const researchAuthors = useSelector(state => state.research.researchAuthors.filter(ra => ra.research_id === parseInt(params.researchId, 10) ));
    const dateTime = { ...research.date, start: DateTime.fromObject(research.date.start), end: DateTime.fromObject(research.date.end) }
    const researchWithDate = { ...research, date: dateTime }
    const categories = useSelector(state => state.research.categories);
    const { allResearchTags } = useSelector(selectFilteredResearch);
    const researchTags = allResearchTags.find(art => art.research_id === parseInt(params.researchId, 10) );

    // REACT STATES
    const [researchData, setResearchData] = useState(researchWithDate);
    const [viewport, setViewport] = useState({...researchData.geolocation, zoom: 4});

    const categoryColor = categories.find(c => c.id === researchData.category_id).color;

    // HANDLE MAP CHANGE
    const handleMapChange = (viewport) => {
        setViewport(viewport.viewState);
    };

    // DECK GL OVERLAY LAYER
    const scatterplotLayer = 
        new ScatterplotLayer({
            id: 'map-research-marker',
            data: [researchData.geolocation],
            pickable: false,
            stroked: false,
            filled: true,
            radiusScale: 5,
            radiusMinPixels: 5,
            radiusMaxPixels: 10,
            getPosition: d => [d.longitude,d.latitude],
            getRadius: d => 5,
            getFillColor: d => hexToRgb(categoryColor)
        }
    ); 

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'grey.A100', }}>

            <PublicMenuBar />
            
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4, pt: 6, }} >
                <Grid container spacing={2} >
                    {/* LEFT PANEL */}
                    <Grid item xs={12} md={8}>
                        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column',  }}>
                            
                            <Box sx={{ pb:1, }}>
                                {/* TÍTULO */}
                                <Box>
                                    <Typography  variant="h6" component="h2" gutterBottom={false} sx={{ display: 'inline', pr: 0.5, }}> 
                                        {researchData.title} 
                                    </Typography> 
                                    {/* DATA */}
                                    <Typography variant="h6" component="span" noWrap sx={{ color: 'text.secondary', display: 'inline', }}> 
                                        {researchData.date.interval ? 
                                            (`[${researchData.date.start.year}-${researchData.date.end.year}]`) 
                                            : 
                                            (`[${researchData.date.start.year}]`) 
                                        } 
                                    </Typography>
                                </Box>

                                {/* AUTORES */}
                                <Box>
                                    {researchAuthors.length > 0 && ( 
                                        researchAuthors.map(ra => {
                                            return  <Typography key={ra.author.id} variant="overline" component="h3" sx={{ color: 'text.secondary', display: 'inline', lineHeight: 1, }} > {`${ra.author.name} ${ra.author.surname}; `} </Typography>
                                        })
                                    )}
                                </Box> 
                            </Box> 

                            {/* CATEGORIA */}
                            <Stack 
                                direction="row" 
                                alignItems="center"
                                spacing={1} 

                            >
                                <Avatar sx={{ width: 12, height: 12, bgcolor: `${categoryColor}` }}> </Avatar>
                                <Typography variant="subtitle2" component="h4" >{categoryTitle(categories.find(c => c.id === researchData.category_id).name)}</Typography> 
                            </Stack>
                            
                        </Grid>

                        <Grid xs={12} item > 
                        
                          
                            
                            <Box sx={{ pt: 3, pb: 2, }}>
                                <Typography variant="body2" component="div" noWrap sx={{ fontWeight: 'bold', display: 'inline', }}>Resumo: </Typography> 
                                <Typography variant="body2" component="div" sx={{ display: 'inline', }}> 
                                    {researchData.summary} 
                                </Typography>
                            </Box>

                            <Stack 
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                spacing={2}
                            >
                                {researchTags && researchTags.researchClassesData.map(rcd => {
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
                                                {researchTags.researchTagsData.filter(t => t.class_id === rcd.id).map(rtd => {
                                                    return (
                                                        <ResearchTag id={rtd.id} key={rtd.id} />
                                                    )
                                                })}    
                                        </Stack>
                                    )
                                })}

                            </Stack>  

                        </Grid>
                    </Grid>

                    {/* RIGHT PANEL */}
                    <Grid item xs={12} md={4}>                     
                        
                        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', }}>
                            <div  
                                style={{ width: '100%', height: 360, position: 'relative' }} 
                            >
                                <Map
                                    initialViewState={viewport}
                                    onMove={e => handleMapChange(e.viewState)}     
                                    mapStyle={mapboxStyle}
                                    mapboxAccessToken={mapboxKey}
                                    reuseMaps
                                > 
                                    <DeckGLOverlay layers={[scatterplotLayer]}  />
                                </Map>
                            </div>
                        </Grid>


                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                                
                        </Grid>

                    </Grid>
                    
                </Grid>

            </Container>

            <PublicFooter />

        </Box>
    );

};

export default ViewResearch;