import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { DateTime } from 'luxon';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import PublicMenuBar from '../components/PublicMenuBar';

import { categoryTitle } from '../components/categoryTitle';

const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE

const ViewResearch = () => {

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    // REDUX SELECTORS
    const research = useSelector(state => state.research.research.find(r => r.id === parseInt(params.researchId, 10) ));
    const researchAuthors = useSelector(state => state.research.researchAuthors.filter(ra => ra.research_id === parseInt(params.researchId, 10) ));

    // // REACT STATES
    const dateTime = { ...research.date, start: DateTime.fromObject(research.date.start), end: DateTime.fromObject(research.date.end) }
    const researchWithDate = { ...research, date: dateTime }
    const [researchData, setResearchData] = useState(researchWithDate);
    const categories = useSelector(state => state.research.categories);
    const [geolocation, setGeolocation] = useState({...researchData.geolocation, zoom: 4});

    return (
        <React.Fragment>
            <PublicMenuBar />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4, pt: 6, }} >

                <Grid container spacing={3}>
                    {/* LEFT PANEL */}
                    <Grid item xs={12} md={8}>

                        <Grid item xs={12} sx={{ pt: 2, display: 'flex', flexDirection: 'column', }}>
                            <Box>
                                <Typography variant="h5" component="h1" nowrap sx={{ display: 'inline', }}> {researchData.title} </Typography> 
                                <Typography variant="h5" component="h1" nowrap sx={{ color: 'text.secondary', display: 'inline', }}> 
                                    {researchData.date.interval ? 
                                        (` [${researchData.date.start.year}-${researchData.date.end.year}]`) 
                                        : 
                                        (` [${researchData.date.start.year}]`) 
                                    } 
                                </Typography>
                            </Box>
                            <Box>
                                {researchAuthors.length > 0 && ( 
                                    researchAuthors.map(ra => {
                                        return  <Typography variant="subtitle1" component="h2" nowrap sx={{ color: 'text.secondary', display: 'inline', }} > {`${ra.author.name} ${ra.author.surname}; `} </Typography>
                                    })
                                )}
                            </Box>
                            <Stack 
                                direction="row" 
                                alignItems="center"
                                spacing={1} 
                                sx={{ my:2, }}
                            >
                                <Avatar sx={{ width: 14, height: 14, bgcolor: `${researchData.category.color}` }}> </Avatar>
                                <Typography variant="subtitle1" component="h3" >{categoryTitle(categories.find(c => c.id === researchData.category_id).name)}</Typography> 
                                {/* <Typography variant="subtitle1" >{categories.find(c => c.id === researchData.category_id).name}</Typography> */}
                            </Stack>
                            
                        </Grid>

                        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', }}>
                            <Typography variant="h6" component="h4" > Resumo </Typography>
                            <Typography variant="body1" component="div" display="block" > <span dangerouslySetInnerHTML={{ __html: researchData.summary }} />; </Typography>
                        </Grid>

                    </Grid>

                    {/* RIGHT PANEL */}
                    <Grid item xs={12} md={4}>

                            <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                                <div  style={{ width: '100%', height: 360, position: 'relative' }} >
                                    <Map
                                        {...geolocation}
                                        interactive={false}
                                        mapStyle={mapboxStyle}
                                        mapboxAccessToken={mapboxKey}
                                    > 
                                        <Marker longitude={researchData.geolocation.longitude} latitude={researchData.geolocation.latitude} anchor="bottom" color={researchData.category.color} />
                                    </Map>
                                </div>
                            </Grid>

                            <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                                
                            </Grid>

                    </Grid>

                    
                </Grid>

                
            </Container>
        </React.Fragment>
    );

};

export default ViewResearch;