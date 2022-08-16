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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab'; 
import MultipleStopIcon from '@mui/icons-material/MultipleStop';

import Copyright from './Copyright';
import Title from './Title';   
import ResearchIndex from './ResearchIndex';  
import DateSetter from './DateSetter'; 
import FormBox from './FormBox';

import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import DeckGL from '@deck.gl/react';
// import { ScatterplotLayer } from '@deck.gl/layers';
// import { hexToRgb } from './colorConverter';

import MapDialog from './MapDialog';
import MapViewport from './MapViewport';

// DIALOG TO RELATE SOURCE AND AUTHOR
import SourceDialog from './SourceDialog';
import AuthorDialog from './AuthorDialog';
import Source from './Source';
import Author from './Author';

const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE

const ResearchEdit = () => {

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const research = useSelector(state => state.research.research.find(r => r.id === parseInt(params.researchId, 10) ));
    const sources = useSelector(state => state.research.sources);
    const addSourceStatus = useSelector(state => state.research.addSourceStatus);
    const categories = useSelector(state => state.research.categories);
    const statuses = useSelector(state => state.research.statuses);

    const allResearchAuthors = useSelector(state => state.research.researchAuthors.filter(ra => ra.research_id === parseInt(params.researchId, 10) ));
    const addResearchAuthorStatus = useSelector(state => state.research.addResearchAuthorStatus);

    // EDIT RESEARCH STATES
    const dateTime = { ...research.date, start: DateTime.fromObject(research.date.start), end: DateTime.fromObject(research.date.end) }
    const researchWithDate = { ...research, date: dateTime }
    const [researchData, setResearchData] = useState(researchWithDate);
    const [categoryColor, setCategoryColor] = useState(researchData.category.color);
    const [researchSources, setResearchSources] = useState([]);
    const [researchAuthors, setResearchAuthors] = useState([]);

    // TEXT EDITOR STATES
    const [readOnly, setReadOnly] = useState(false);

    // MAP DIALOG STATES 
    const [mapDialogOpen, setMapDialogOpen] = useState(false);
    // SOURCE DIALOG STATES 
    const [sourceDialogOpen, setSourceDialogOpen] = useState(false);
    const [authorDialogOpen, setAuthorDialogOpen] = useState(false);

    // HANDLE TOGGLE DIALOGS
    // SOURCES
    const handleSourceDialogOpen = () => {
        setSourceDialogOpen(true);
    };
    const handleSourceDialogClose = () => {
        setSourceDialogOpen(false);
    };
    // AUTHORS
    const handleAuthorDialogOpen = () => {
        setAuthorDialogOpen(true);
    };
    const handleAuthorDialogClose = () => {
        setAuthorDialogOpen(false);
    };

    // HANDLE TOGGLE MAP DIALOG
    const handleMapDialogOpen = () => {
        setMapDialogOpen(true);
    };
    const handleMapDialogClose = () => {
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
    }, [researchData.category_id, categories]);


    // TRACK SOURCE CHANGES 
    useEffect(() => {
        const updatedResearchSources = sources.filter(s => s.target_id === parseInt(params.researchId, 10) );
        setResearchSources([...updatedResearchSources]);
    }, [sources, addSourceStatus, params.researchId]);

    const handleUpdateResearchSources = (sources) => {
        const updatedResearchSources = sources.filter(s => s.target_id === parseInt(params.researchId, 10) );
        setResearchSources(updatedResearchSources);
    };

     // TRACK RESEARCH AUTHORS CHANGES 
     useEffect(() => {
        const updatedResearchAuthors = allResearchAuthors.filter(s => s.research_id === parseInt(params.researchId, 10) );
        setResearchAuthors([...updatedResearchAuthors]);
    }, [allResearchAuthors, addResearchAuthorStatus, params.researchId]);

    const handleUpdateResearchAuthors = (allresearchauthors) => {
        const updatedResearchAuthors = allresearchauthors.filter(s => s.research_id === parseInt(params.researchId, 10) );
        setResearchAuthors(updatedResearchAuthors);
    };

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
                                onChange={(event) => handleChangeResearchData(event)}
                                fullWidth
                                label="Título"
                                name="title"
                                size="small"
                                multiline={true}
                                minRows={1}
                                maxRows={2}
                                type="text"
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                                //error={emailError(email)}
                                //helperText={emailError(email) ? "Digite um endereço de e-mail válido" : null}
                            >
                            </TextField>

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
                                            {researchSources.map(rs => {
                                                return  <Source 
                                                            key={rs.id} 
                                                            source={rs} 
                                                            sourceAction={() => handleUpdateResearchSources(sources)} 
                                                            color={categories.find(c => c.id === rs.research_source.category_id ).color} 
                                                        />
                                            })}
                                        </Grid>    
                                        <Grid item xs={12} >
                                            <Box sx={{ display: 'flex', flexDirection: 'rox', alignItems: 'center', justifyContent: 'right', mt: 1, }} >
    
                                            <Fab 
                                                variant="extended" 
                                                size="medium" 
                                                onClick={handleSourceDialogOpen}
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
                                            {researchAuthors.map(ra => {
                                                return  <Author 
                                                            key={ra.id} 
                                                            researchAuthor={ra} 
                                                            authorAction={() => handleUpdateResearchAuthors(allResearchAuthors)}  
                                                        />
                                            })}
                                        </Grid>    
                                        <Grid item xs={12} >
                                            <Box sx={{ display: 'flex', flexDirection: 'rox', alignItems: 'center', justifyContent: 'right', mt: 1, }} >
    
                                            <Fab 
                                                variant="extended" 
                                                size="medium" 
                                                onClick={handleAuthorDialogOpen}
                                            >
                                                <MultipleStopIcon sx={{ mr: 1 }} />
                                                Relacionar Autor
                                            </Fab>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                } 
                            />

                            {/* CREATE SOURCE DIALOG */}
                            <SourceDialog
                                open={sourceDialogOpen}
                                onClose={handleSourceDialogClose}
                                mode={'research'}
                            />

                            {/* CREATE AUTHOR DIALOG */}
                            <AuthorDialog
                                open={authorDialogOpen}
                                onClose={handleAuthorDialogClose}
                                mode={'research'}
                            />

                            <TextField
                                value={researchData.excerpt}
                                onChange={(event) => handleChangeResearchData(event)}
                                fullWidth
                                label="Excerto"
                                name="excerpt"
                                size="small"
                                multiline={true}
                                minRows={3}
                                maxRows={5}
                                type="text"
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
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

                            <div  style={{ width: '100%', height: 360, position: 'relative' }} onClick={handleMapDialogOpen}  >
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
