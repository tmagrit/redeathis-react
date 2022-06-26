import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createResearch } from '../features/researchSlice';
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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';

import Copyright from './Copyright';
import Title from './Title';   
import Index from './ResearchIndex'; 
import DateSetter from './DateSetter'; 
import FormBox from './FormBox';

import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
//import DeckGL from '@deck.gl/react';
//import { ScatterplotLayer } from '@deck.gl/layers';
//import { hexToRgb } from './colorConverter';

import MapViewport from './MapViewport';
import MapDialog from './MapDialog';

import { Typography } from '@mui/material';

const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE

const ResearchCreate = () => {

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const categories = useSelector(state => state.research.categories);
    const statuses = useSelector(state => state.research.statuses);

    // START NEW RESEARCH OBJECT
    const startDate = DateTime.now();
    const research = {
        title: '',
        summary: '',
        date: {
            interval: false,
            start: startDate,
            end: startDate
        },
        geolocation: {
            latitude: -12.977749,
            longitude: -38.501630,
            zoom: 15
        },
        link: '',
        notes: '',
        category_id: 1,
        status: 2
    }

    // EDIT RESEARCH STATES
    const [researchData, setResearchData] = useState({ ...research });
    const [categoryColor, setCategoryColor] = useState('#3d85c6');

    console.log(researchData.geolocation);

    // TEXT EDITOR STATES
    const [readOnly, setReadOnly] = useState(false);

    // MAP DIALOG STATES 
    const [mapDialogOpen, setMapDialogOpen] = useState(false);
    

    // // DECK GL LAYER
    // const layers = [
    //     new ScatterplotLayer({
    //         id: 'markers',
    //         data: [{ coordinates: [researchData.geolocation.longitude,researchData.geolocation.latitude] }],
    //         pickable: false,
    //         //opacity: 0.8,
    //         stroked: false,
    //         filled: true,
    //         radiusScale: 5,
    //         radiusMinPixels: 5,
    //         radiusMaxPixels: 10,
    //         getPosition: d => d.coordinates,
    //         getRadius: d => 5,
    //         getFillColor: d => hexToRgb(categoryColor)
    //     })
    // ];

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

    // CREATE RESEARCH
    const handleCreateResearch = () => {
        const newDate = { ...researchData.date, start: researchData.date.start.c, end: researchData.date.end.c }
        const newResearchData = { ...researchData, date: newDate }
        dispatch(createResearch(newResearchData));
    }

    // TRACK CATEGORY CHANGES 
    useEffect(() => {
        setCategoryColor(categories.find(c => c.id === researchData.category_id).color || '#3d85c6');
    }, [researchData.category_id, categories])

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* LEFT PANEL */}
                <Grid item xs={12} md={8}>
                    <Paper >
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

                            <FormBox 
                                id='sources-box' 
                                label='Pesquisas Relacionadas' 
                                padding={{ pl: '14px', pr: '14px', py: '14px', }}
                                children={
                                    <Grid container >
                                        <Grid item xs={12} >
                                            <Typography sx={{ color: 'text.disabled', fontStyle: 'italic', }}>Teste</Typography>
                                            <Box sx={{ display: 'flex', flexDirection: 'rox', alignItems: 'center', justifyContent: 'right', mt: 1, }} >
                                                
    
                                                <Fab 
                                                    color="success"
                                                    disabled
                                                    variant="extended" 
                                                    size="small" 
                                                    onClick={undefined}
                                                    
                                                    //sx={{ position: 'absolute', bottom: 16, right: 16, }}
                                                >
                                                    <MultipleStopIcon sx={{ mr: 1 }} />
                                                    Relacionar Pesquisa
                                                </Fab>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                } 
                            />

                            <FormBox 
                                id='authors-box' 
                                label='Autores' 
                                padding={{ pl: '14px', pr: '14px', py: '14px', }}
                                children={
                                    <Grid container >
                                        <Grid item xs={12} >
                                            <Box sx={{ display: 'flex', flexDirection: 'rox', alignItems: 'center', justifyContent: 'right', mt: 1, }} >
    
                                            <Fab 
                                                color="success"
                                                disabled
                                                variant="extended" 
                                                size="small" 
                                                onClick={undefined}
                                                
                                                //sx={{ position: 'absolute', bottom: 16, right: 16, }}
                                            >
                                                <MultipleStopIcon sx={{ mr: 1 }} />
                                                Relacionar Autor
                                            </Fab>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                } 
                            />

                            <FormBox 
                                id='text-editor-box' 
                                label='Resumo'
                                padding={{ p: 0, }} 
                                children={
                                    <TextEditor 
                                        value={researchData.summary}
                                        setValue={summary => setResearchData({...researchData, summary})}
                                        readOnly={readOnly}
                                    />
                                } 
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
                                onClick={handleCreateResearch}  
                            >
                                Criar
                            </Button>
                            
                        </Grid>
                    </Paper>
                    <Paper sx={{ minHeight: 240, }} >
                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                            <Title position={'rightmiddle'}/> 
                        </Grid>
                        <Divider />
                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                            <div  style={{ width: '100%', height: 360, position: 'relative' }} onClick={handleMapDialogOpen}  >
                                {/* <DeckGL  initialViewState={researchData.geolocation} layers={layers} >
                                    <Map reuseMaps initialViewState={researchData.geolocation} mapStyle={mapboxStyle} styleDiffing={true} />
                                </DeckGL> */}

                                <Map
                                    {...researchData.geolocation}
                                    interactive={false}
                                    mapStyle={mapboxStyle}
                                    mapboxAccessToken={mapboxKey}
                                > 
                                    <Marker longitude={researchData.geolocation.longitude} latitude={researchData.geolocation.latitude} anchor="bottom" color={categoryColor} />
                                </Map> 
                            </div>
                            <MapDialog
                                open={mapDialogOpen}
                                onClose={handleMapDialogClose}
                                children={
                                    <MapViewport 
                                        viewport={researchData.geolocation}
                                        setViewport={(geolocation) => setResearchData({ ...researchData, geolocation:geolocation })}
                                        style={{ width: '100vw', height: '100vh' }}  
                                        color={categoryColor} 
                                    />
                                }
                            />
                        </Grid>
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
                            <Index />
                        </Grid>
                    </Paper>
                </Grid>
                
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    )
};

export default ResearchCreate;