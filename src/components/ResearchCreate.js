import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createResearch } from '../features/researchSlice';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LinkIcon from '@mui/icons-material/Link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import IconButton from '@mui/material/IconButton'; 
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Copyright from './Copyright';
import Title from './Title';   
import DateSetter from './DateSetter'; 
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
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
        };

    // EDIT RESEARCH STATES
    const [researchData, setResearchData] = useState({ ...research }); //console.log('researchData', researchData);
    const [checked, setChecked] = useState([]); 

    // MAP DIALOG STATES 
    const [mapDialogOpen, setMapDialogOpen] = useState(false);

    const categoryColor = categories.find(c => c.id === researchData.category_id).color;  
    
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

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* LEFT PANEL */}
                <Grid item xs={12} md={8}>
                    <Paper square sx={{ mb: 3, }}>
                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                            <Title position={'left'}/> 
                        </Grid>
                        <Divider />
                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
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
                                value={''}
                                disabled
                                fullWidth
                                label="Autores Relacionados"
                                name="source-authors"
                                size="small"
                                type="text"
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                                        <IconButton edge="end" disabled>
                                                            <MultipleStopIcon />
                                                        </IconButton>
                                                    </InputAdornment>,
                                }}
                            >
                            </TextField>

                            {researchData.category_id === 3 ? 
                                <TextField
                                    value={researchData.notes}
                                    onChange={(event) => handleChangeResearchData(event)}
                                    fullWidth
                                    label="Editora"
                                    name="notes"
                                    size="small"
                                    multiline={true}
                                    rows={2}
                                    //maxRows={10}
                                    type="text"
                                    sx={{ my: 1,}}
                                    InputLabelProps={{ shrink: true }}
                                /> 
                            : null}

                            <TextField
                                value={researchData.excerpt}
                                onChange={(event) => handleChangeResearchData(event)}
                                fullWidth
                                label="Excerto"
                                name="excerpt"
                                size="small"
                                multiline={true}
                                rows={2}
                                //maxRows={5}
                                type="text"
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                            />

                            <TextField
                                value={researchData.summary}
                                onChange={(event) => handleChangeResearchData(event)}
                                fullWidth
                                label="Resumo"
                                name="summary"
                                size="small"
                                type="text"
                                multiline={true}
                                rows={6}
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
                                value={''}
                                disabled
                                fullWidth
                                label="Referências Relacionadas"
                                name="source-research"
                                size="small"
                                type="text"
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                                        <IconButton edge="end" disabled>
                                                            <MultipleStopIcon />
                                                        </IconButton>
                                                    </InputAdornment>,
                                }}
                            >
                            </TextField>
                        </Grid>
                    </Paper>
                </Grid>

                {/* RIGHT PANEL */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ mb: 3, }} square >

                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                            <Title position={'status'}/> 
                        </Grid>

                        <Divider />

                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
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
                                sx={{ py: 1, mb: 2, }} 
                                onClick={handleCreateResearch}  
                            >
                                Criar
                            </Button>
                        </Grid>

                        <Divider />                        

                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                            <Title position={'tags'}/> 
                        </Grid>

                        <Divider />

                        {classes && classes.filter(c => c.category_id === researchData.category_id).map(sc => (
                            <Accordion disableGutters elevation={1} square >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={sc.name}
                                    id={sc.id}
                                >
                                    <Stack direction="row"  alignItems="center" spacing={1.5} sx={{ flexGrow: 1 }} >
                                        <Avatar sx={{ width: 15, height: 15,  bgcolor: `${categories.find(cat => cat.id === sc.category_id).color}`, }} > </Avatar>
                                        <Typography  component="div" variant="body2" color="inherit" gutterBottom sx={{ fontWeight: 400, }}> 
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
                                                    <ListItemText primary={ct.name} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}    
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        ))}

                    </Paper>

                    <Paper sx={{ mb: 3, }} square >

                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                            <Title position={'geolocation'}/> 
                        </Grid>

                        <Divider />

                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                            <div  style={{ width: '100%', height: 360, position: 'relative' }} onClick={handleMapDialogOpen}  >
                                <Map
                                    {...researchData.geolocation}
                                    interactive={false}
                                    mapStyle={mapboxStyle}
                                    mapboxAccessToken={mapboxKey}
                                > 
                                    <Marker 
                                        longitude={researchData.geolocation.longitude} 
                                        latitude={researchData.geolocation.latitude} 
                                        anchor="bottom" 
                                        color="#FFF"
                                    />
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
                            <Title position={'year'}/> 
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
                
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    )
};

export default ResearchCreate;