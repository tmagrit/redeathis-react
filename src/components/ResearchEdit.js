import * as React from 'react';
import { useState, useEffect } from 'react';
import { updateResearch } from '../features/researchSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { DateTime } from 'luxon';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LinkIcon from '@mui/icons-material/Link';
import TextEditor from './TextEditor';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import Copyright from './Copyright';
import Title from './Title';   
import ResearchIndex from './ResearchIndex';  
import DateSetter from './DateSetter'; 

import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapDialog from './MapDialog';
import MapViewport from './MapViewport';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { hexToRgb } from './colorConverter';

const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const mapboxStyle = "mapbox://styles/mapbox/dark-v10"

const ResearchEdit = () => {

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const research = useSelector(state => state.research.research.find(r => r.id === parseInt(params.researchId, 10) ));
    const categories = useSelector(state => state.research.categories);
    const statuses = useSelector(state => state.research.statuses);

    // EDIT RESEARCH STATES
    const dateTime = { ...research.date, start: DateTime.fromObject(research.date.start), end: DateTime.fromObject(research.date.end) }
    const dateTimeResearch = { ...research, date: dateTime }
    const [researchData, setResearchData] = useState(dateTimeResearch);
    const [categoryColor, setCategoryColor] = useState(researchData.category.color);

    // TEXT EDITOR STATES
    const [readOnly, setReadOnly] = useState(false);

    // MAP DIALOG STATES 
    const [mapDialogOpen, setMapDialogOpen] = useState(false);

        // DECK GL LAYER
        const layers = [
            new ScatterplotLayer({
                id: 'markers',
                data: [{ coordinates: [researchData.geolocation.longitude,researchData.geolocation.latitude] }],
                pickable: false,
                //opacity: 0.8,
                stroked: false,
                filled: true,
                radiusScale: 5,
                radiusMinPixels: 5,
                radiusMaxPixels: 10,
                getPosition: d => d.coordinates,
                getRadius: d => 5,
                getFillColor: d => hexToRgb(categoryColor)
            })
        ];

    // HANDLE TOGGLE DIALOG
    const handleMapDialogOpen = () => {
        setMapDialogOpen(true);
    };
    const handleMapDialogClose = (value) => {
        setMapDialogOpen(false);
    };

    // CHANGE RESEARCH STATES
    const handleChangeResearchData = (event) => {
        setResearchData({...researchData, [event.target.name]: event.target.value});
    };

    // UPDATE RESEARCH
    const handleUpdateResearch = () => {
        const { category, ...updatedresearch } = researchData;
        const newDate = { ...updatedresearch.date, start: updatedresearch.date.start.c, end: updatedresearch.date.end.c }
        const updatedResearch = { ...updatedresearch, date: newDate }
        dispatch(updateResearch(updatedResearch))
    };

    // TRACK CATEGORY CHANGES 
    useEffect(() => {
        setCategoryColor(categories.find(c => c.id === researchData.category_id).color);
    }, [researchData.category_id])

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* LEFT PANEL */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ minHeight: 240, }} >
                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                            <Title position={'left'}/> 
                        </Grid>
                        <Divider />
                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                            <TextField
                                value={researchData.title}
                                //error={emailError(email)}
                                onChange={(event) => handleChangeResearchData(event)}
                                fullWidth
                                label="Título"
                                name="title"
                                size="small"
                                multiline={true}
                                minRows={1}
                                maxRows={2}
                                type="text"
                                //helperText={emailError(email) ? "Digite um endereço de e-mail válido" : null}
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                            />

                            <TextField
                                name="category_id"
                                select
                                label="Categoria"
                                size="small"
                                value={researchData.category_id}
                                onChange={(event) => handleChangeResearchData(event)}
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                            >
                                {categories.map((c) => (
                                <MenuItem key={c.id} value={c.id} >
                                    {c.name}
                                </MenuItem>
                                ))}
                            </TextField>

                            <TextEditor 
                                value={researchData.summary}
                                setValue={summary => setResearchData({...researchData, summary})}
                                readOnly={readOnly}
                            />

                            <TextField
                                value={researchData.link}
                                onChange={(event) => handleChangeResearchData(event)}
                                fullWidth
                                label="Link"
                                name="link"
                                size="small"
                                type="url"
                                sx={{ my: 1,}}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><LinkIcon /></InputAdornment>,
                                }}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                value={researchData.notes}
                                onChange={(event) => handleChangeResearchData(event)}
                                fullWidth
                                label="Notas"
                                name="notes"
                                size="small"
                                multiline={true}
                                minRows={5}
                                maxRows={10}
                                type="text"
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Paper>
                </Grid>

                {/* RIGHT PANEL */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ mb: 3, }} >
                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                            <Title position={'right'}/> 
                        </Grid>
                        <Divider />
                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                            <TextField
                                name="status"
                                select
                                label="Status"
                                size="small"
                                value={researchData.status}
                                onChange={(event) => handleChangeResearchData(event)}
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                            >
                                {statuses.map((c) => (
                                    <MenuItem key={c.id} value={c.id}>
                                        {c.status}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button 
                                variant="contained" 
                                fullWidth 
                                sx={{ my: 2,}} 
                                onClick={handleUpdateResearch}  
                            >
                                Atualizar
                            </Button>
                            
                        </Grid>
                    </Paper>
                    <Paper sx={{ minHeight: 240, }} >
                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                            <Title position={'rightmiddle'}/> 
                        </Grid>
                        <Divider />
                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                            {/* <Map 
                                reuseMaps
                                mapboxAccessToken={mapboxKey}
                                { ...researchData.geolocation }
                                onClick={handleMapDialogOpen} 
                                mapStyle="mapbox://styles/mapbox/dark-v10"
                                style={{ width: '100%', height: 360 }}   
                            >
                                <Marker 
                                    longitude={researchData.geolocation.longitude} 
                                    latitude={researchData.geolocation.latitude} 
                                    anchor="bottom"
                                    color={categoryColor}
                                >
                                </Marker>
                            </Map> 
                            <MapDialog
                                open={mapDialogOpen}
                                onClose={handleMapDialogClose}
                                children={
                                    <MapViewport 
                                        viewport={researchData.geolocation}
                                        setViewport={(geolocation) => setResearchData({ ...researchData, geolocation:geolocation.viewState })}
                                        style={{ width: '100vw', height: '100vh' }}   
                                    >
                                        <Marker 
                                            longitude={researchData.geolocation.longitude} 
                                            latitude={researchData.geolocation.latitude} 
                                            anchor="bottom"
                                            color={categoryColor}
                                        >
                                        </Marker>
                                    </MapViewport>
                                }
                            /> */}



                            <div  style={{ width: '100%', height: 360, position: 'relative' }} onClick={handleMapDialogOpen}  >
                                <DeckGL  initialViewState={researchData.geolocation} layers={layers} >
                                    <Map reuseMaps initialViewState={researchData.geolocation} mapStyle={mapboxStyle} preventStyleDiffing={true} />
                                </DeckGL>
                            </div>
                            <MapDialog
                                open={mapDialogOpen}
                                onClose={handleMapDialogClose}
                                children={
                                    <MapViewport 
                                        viewport={researchData.geolocation}
                                        setViewport={(geolocation) => setResearchData({ ...researchData, geolocation:geolocation.viewState })}
                                        style={{ width: '100vw', height: '100vh' }}  
                                        color={categoryColor} 
                                    />
                                }
                            />
                            <Divider />
                            <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                                <Title position={'rightbelow'}/> 
                            </Grid>
                            <Divider />
                            <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                                <DateSetter 
                                    setDate={(value) => setResearchData({ ...researchData, date:value })}
                                    date={{ ...researchData.date }}
                                />
                            </Grid>






                        </Grid>
                    </Paper>
                </Grid>

                {/* INDEX */}
                <Grid item xs={12}>
                    <Paper sx={{ minHeight: 240, }} >
                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'row', }}>
                            <Title position={'middle'}/> 
                        </Grid>
                        <Divider />
                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                            <ResearchIndex />
                        </Grid>
                    </Paper>
                </Grid>
                
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    )
};

export default ResearchEdit;
