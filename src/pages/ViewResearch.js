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
import Chip from '@mui/material/Chip';

import Map, { Marker } from 'react-map-gl';

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
    const dateTime = { ...research.date, start: DateTime.fromObject(research.date.start), end: DateTime.fromObject(research.date.end) }
    const researchWithDate = { ...research, date: dateTime }
    const categories = useSelector(state => state.research.categories);
    const classes = useSelector(state => state.research.classes);
    const tags = useSelector(state => state.research.tags);
    const researchTags = useSelector(state => state.research.research_tags).filter(rt => rt.research_id === parseInt(params.researchId, 10) ); //console.log('researchTags',researchTags);
    const researchTagsIds = researchTags.map(t => {if(t.tag_id) return t.tag_id} ); //console.log('researchTagsIds',researchTagsIds);
    const researchTagsData = tags.filter(rtd => researchTagsIds.includes(rtd.id)); //console.log('researchTagsData',researchTagsData);
    const researchClassesIds = researchTagsData.map(rtd => {if(rtd.class_id) return rtd.class_id} ); //console.log('researchClassesIds',researchClassesIds);
    const researchClassesData = classes.filter(cl => researchClassesIds.includes(cl.id)); //console.log('researchClassesData',researchClassesData);

    // REACT STATES
    const [researchData, setResearchData] = useState(researchWithDate);
    const [geolocation, setGeolocation] = useState({...researchData.geolocation, zoom: 4});

    const categoryColor = categories.find(c => c.id === researchData.category_id).color;

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
                                <Avatar sx={{ width: 14, height: 14, bgcolor: `${categoryColor}` }}> </Avatar>
                                <Typography variant="subtitle1" component="h3" >{categoryTitle(categories.find(c => c.id === researchData.category_id).name)}</Typography> 
                                {/* <Typography variant="subtitle1" >{categories.find(c => c.id === researchData.category_id).name}</Typography> */}
                            </Stack>
                            
                        </Grid>

                        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', }}>
                            {/* <Typography variant="body1" component="body1" nowrap sx={{ display: 'inline', }}>
                                <span>Resumo: </span> 
                                <span dangerouslySetInnerHTML={{ __html: researchData.summary }} /> 
                            </Typography> */}
                            
                            {/* {researchTags && researchTags.map(rt => {
                                const tagData = tags.find(t => t.id === rt.tag_id);
                                const classData = classes.find(cl => cl.id === tagData.class_id);
                                return (
                                    <Box sx={{ mb: 1, }}>
                                        <Typography variant="body1" component="h4" nowrap sx={{ fontWeight: 'bold', display: 'inline', }}>
                                            {`${classData.name}: `} 
                                        </Typography> 
                                        <Typography variant="body1" component="span" nowrap sx={{ display: 'inline', }}> 
                                            {tagData.name}
                                        </Typography>
                                    </Box>
                                )
                            })} */}

                            {researchTags && researchClassesData.map(rcd => {
                                return (
                                    <Box sx={{ mb: 1, }}>
                                        <Typography variant="body1" component="h4" nowrap sx={{ fontWeight: 'bold', display: 'inline', mr: 1.5, }}>
                                            {`${rcd.name}:`} 
                                        </Typography> 
                                        {researchTagsData.filter(t => t.class_id === rcd.id).map(rtd => {
                                            return (
                                                <Chip label={rtd.name} variant="outlined" size="small" onClick={() => console.log('clicked')} sx={{ mr: 1, }} />
                                                // <Typography variant="body1" component="span" nowrap sx={{ display: 'inline', }}> 
                                                //     {`${rtd.name}; `} 
                                                // </Typography>
                                            )
                                        })}
                                    </Box>
                                )
                            })}
                            
                            <Box sx={{ mt: 1.5, }}>
                                <Typography variant="body1" component="h4" nowrap sx={{ fontWeight: 'bold', display: 'inline', }}>Resumo: </Typography> 
                                <Typography variant="body1" component="span" nowrap sx={{ display: 'inline', }}> 
                                    {researchData.summary} 
                                </Typography>
                            </Box>
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
                                        <Marker longitude={researchData.geolocation.longitude} latitude={researchData.geolocation.latitude} anchor="bottom" color={categoryColor} />
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