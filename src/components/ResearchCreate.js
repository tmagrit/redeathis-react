import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createResearch } from '../features/researchSlice';
import { DateTime } from 'luxon';

import { useNavigate } from 'react-router-dom';

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

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LabelIcon from '@mui/icons-material/Label';
import BookmarkIcon from '@mui/icons-material/Bookmark';

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

const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE

const ResearchCreate = () => {

    // REDIRECT
    const navigate = useNavigate();

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const statuses = useSelector(state => state.research.statuses);
    const categories = useSelector(state => state.research.categories);
    const classes = useSelector(state => state.research.classes);
    const tags = useSelector(state => state.research.tags); 

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
    const [categoryColor, setCategoryColor] = useState(categories.find(c => c.id === 1).color);
    const [checked, setChecked] = useState([]); 

    // TEXT EDITOR STATES
    const [readOnly, setReadOnly] = useState(false);

    // MAP DIALOG STATES 
    const [mapDialogOpen, setMapDialogOpen] = useState(false);
    

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
        const dataWithTags = {
            researchData: newResearchData,
            researchTagsData: checked,
        };
        dispatch(createResearch({ 
            obj: dataWithTags,
            navigate: navigate,
        }));
    };

    // HANDLE SELECTED CATEGORIES
    const handleToggle = (obj) => () => {
        const currentIndex = checked.indexOf(obj);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
            newChecked.push(obj);
        } else {
            newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
    };    

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
                                rows={2}
                                //maxRows={2}
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

                            {/* <FormBox 
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
                            /> */}

                            <TextField
                                value={researchData.excerpt}
                                onChange={(event) => handleChangeResearchData(event)}
                                fullWidth
                                label="Excerto"
                                name="excerpt"
                                size="small"
                                multiline={true}
                                rows={4}
                                //maxRows={5}
                                type="text"
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                            />

                            {/* <FormBox 
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
                            /> */}



<TextField
    value={researchData.summary}
    onChange={(event) => handleChangeResearchData(event)}
    fullWidth
    label="Resumo"
    name="summary"
    size="small"
    type="text"
    multiline={true}
    rows={12}
    sx={{ my: 1,}}
    InputLabelProps={{ shrink: true }}
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
                                rows={4}
                                //maxRows={10}
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
                    <Paper sx={{ minHeight: 240, mb:3, }} >
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

                    {classes && classes.filter(c => c.category_id === researchData.category_id).map(sc => (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={sc.name}
                                id={sc.id}
                            >
                                <Stack direction="row"  alignItems="center" spacing={1.5} sx={{ flexGrow: 1 }} >
                                    <Avatar sx={{ width: 27, height: 27,  bgcolor: `${categories.find(cat => cat.id === sc.category_id).color}`, }} >
                                        <BookmarkIcon fontSize="inherit" />
                                    </Avatar>
                                    <Typography  component="div" variant="body1" color="inherit" gutterBottom sx={{ fontWeight: 600, }}> 
                                        {sc.name} 
                                    </Typography>
                                </Stack>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails>

                                <List dense >
                                    {tags && tags.filter(t => t.class_id === sc.id).map(ct => (
                                        <ListItem 
                                            key={ct.id}
                                            secondaryAction={
                                                <Checkbox
                                                  edge="end"
                                                  onChange={handleToggle(ct)}
                                                  checked={checked.indexOf(ct) !== -1}
                                                  inputProps={{ 'aria-labelledby': ct.id }}
                                                />
                                              }
                                              disablePadding
                                            >
                                            <ListItemButton role={undefined} dense> 
                                                <ListItemIcon>
                                                    <Avatar sx={{ width: 27, height: 27, bgcolor: `${categories.find(cat => cat.id === sc.category_id).color}`, }} >
                                                        <LabelIcon fontSize="inherit" />
                                                    </Avatar>
                                                </ListItemIcon>
                                                <ListItemText primary={ct.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}    
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    ))}

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