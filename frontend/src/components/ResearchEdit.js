import * as React from 'react';
import { useState, useRef, useEffect, } from 'react';
import { updateResearch, refreshResearchTags, updateContentEditImageGallerySize, selectResearchRelations } from '../features/researchSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from "react-router-dom";
import { DateTime } from 'luxon';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LinkIcon from '@mui/icons-material/Link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
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
import Map from 'react-map-gl';
import MapDialog from './MapDialog';
import MapViewport from './MapViewport';
import { ScatterplotLayer } from '@deck.gl/layers';
import DeckGLOverlay from '../components/DeckGLOverlay';
import { hexToRgb } from '../components/colorConverter';
import TextEditorResearch from './TextEditorResearch';

import { useHistory } from './history';
import { useElementSize } from './useElementSize'

// DIALOG TO RELATE SOURCE AND AUTHOR
import SourceDialog from './SourceDialog';
import AuthorDialog from './AuthorDialog';
import Source from './Source';
import Author from './Author';
import ImageGallery from './ImageGallery'; 
import UppyDashboard from './UppyDashboard';
import ImagekitFilesIndex from './ImagekitFilesIndex';

const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE

const ResearchEdit = () => {

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    // MY HISTORY HOOK
    const history = useHistory(); 

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const research = useSelector(state => state.research.research.find(r => r.id === parseInt(params.researchId, 10) ));
    const statuses = useSelector(state => state.research.statuses);
    const categories = useSelector(state => state.research.categories);
    const classes = useSelector(state => state.research.classes);
    const tags = useSelector(state => state.research.tags); 
    const allResearchRelations = useSelector(selectResearchRelations); 
    const localResearchSources = allResearchRelations.find(arr => arr.id === parseInt(params.researchId, 10)); 
    
    // FILTER TAGS RELATED
    const allResearchTags = useSelector(state => state.research.research_tags);
    const researchTagsIds = allResearchTags.filter(rt => rt.research_id === parseInt(params.researchId, 10) )
        .map(t => {if(t.tag_id) return t.tag_id} ); 
    const researchTags = tags.filter(rt => researchTagsIds.includes(rt.id)); 

    // EDIT RESEARCH STATES
    const dateTime = { ...research.date, start: DateTime.fromObject(research.date.start), end: DateTime.fromObject(research.date.end) }
    const researchWithDate = { ...research, date: dateTime }; 
    const [researchData, setResearchData] = useState(researchWithDate);

    
    const allLocalResearchSources = localResearchSources.relations ?? []; 
    const [checked, setChecked] = useState([...researchTags]); 

    const categoryColor = categories.find(c => c.id === researchData.category_id).color;

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

    // SOURCE AUTHORS FIELD ROW SIZE - CONTROLS FORM SIZE 
    const sourceAuthorsRows = () => {
        if(localResearchSources.authors.length > 0) {
            if(localResearchSources.authors.length < 4)
                return localResearchSources.authors.length + 2;       
            else 
                return localResearchSources.authors.length + 3;
        } else
            return 1;
    };

    // SOURCE RESEARCH FIELD ROW SIZE - CONTROLS FORM SIZE
    const sourceResearchRows = () => {
        if(localResearchSources.relations?.length > 0) {
            if(localResearchSources.relations?.length < 4)
                return localResearchSources.relations?.length + 2;       
            else 
                return localResearchSources.relations?.length + 3;
        } else
            return 1;
    }; 

    // MAP DIALOG STATES 
    const [mapDialogOpen, setMapDialogOpen] = useState(false);

    // SOURCE DIALOG STATES 
    const [sourceDialogOpen, setSourceDialogOpen] = useState(false);
    const [authorDialogOpen, setAuthorDialogOpen] = useState(false);

    // HANDLE TOGGLE DIALOGS
    // // SOURCES
    const handleSourceDialogOpen = () => {
        setSourceDialogOpen(true);
    };
    const handleSourceDialogClose = () => {
        setSourceDialogOpen(false);
    };
    // // AUTHORS
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

    // IMPORTANTE: Garanta que o body sempre tenha um valor válido
    useEffect(() => {
        if(researchData) {
        setResearchData({
            ...researchData,
            summary: researchData.summary || "" 
        });
        }
    }, [researchData]);

    // CHANGE PAGE STATES
    // const handleChangeSummaryData = (event) => {
    //     setResearchData({...researchData, [event.target.name]: event.target.value});
    // };


    // UPDATE RESEARCH
    const handleUpdateResearch = () => {
        const { category, ...updatedresearch } = researchData;
        const newDate = { ...updatedresearch.date, start: updatedresearch.date.start.c, end: updatedresearch.date.end.c }
        const updatedResearch = { ...updatedresearch, date: newDate };
        dispatch(updateResearch(updatedResearch));
        dispatch(refreshResearchTags({ 
            researchId: parseInt(params.researchId, 10),
            researchTagsData: checked,
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


    // REF TO IMAGE GRID
    const ref = useRef(null);
    const size = useElementSize(ref);

    // TRACK IMAGE GRID WIDTH
    useEffect(() => {
        const getMainSize = (size) => { 
            const { x, y, width, height, top, right, left, bottom, } = size;
            const mainsize = {
                x: x, 
                y: y, 
                width: width, 
                height: height, 
                top: top, 
                right: right, 
                left: left, 
                bottom: bottom
            };
            
            return mainsize;
        };
         
        dispatch(updateContentEditImageGallerySize(getMainSize(size)));
    }, [size]); 

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* LEFT PANEL */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ minHeight: 240, }} square >
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
                                onChange={(event) => handleChangeResearchData(event)}
                                fullWidth
                                label="Título"
                                name="title"
                                size="small"
                                multiline={true}
                                //minRows={1}
                                rows={2}
                                type="text"
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                                //error={emailError(email)}
                                //helperText={emailError(email) ? "Digite um endereço de e-mail válido" : null}
                            >
                            </TextField>

                            <TextField
                                value={''}
                                fullWidth
                                label="Autores Relacionados"
                                name="source-authors"
                                size="small"
                                multiline={true}
                                rows={sourceAuthorsRows()}
                                type="hidden"
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}

                                InputProps={{
                                    startAdornment: <Stack 
                                                        direction="column"
                                                        justifyContent="flex-start"
                                                        alignItems="flex-start"
                                                        spacing={0.5}
                                                    >
                                                        {localResearchSources.authors && localResearchSources.authors.map(lra => {
                                                            return  <Author 
                                                                        key={lra.author_id} 
                                                                        researchAuthor={lra}  
                                                                    />
                                                        })}
                                                    </Stack>,
                                    endAdornment: <InputAdornment position="end">
                                                        <IconButton
                                                                aria-label="relacionar autor"
                                                                onClick={handleAuthorDialogOpen}
                                                                edge="end"
                                                        >
                                                            <MultipleStopIcon />
                                                        </IconButton>
                                                    </InputAdornment>,
                                }}
                                //error={emailError(email)}
                                //helperText={emailError(email) ? "Digite um endereço de e-mail válido" : null}
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
                                    //minRows={5}
                                    rows={2}
                                    type="text"
                                    sx={{ my: 1,}}
                                    InputLabelProps={{ shrink: true }}
                                /> 
                            : null} 

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
                                //minRows={3}
                                rows={5}
                                type="text"
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                            />

                            {/* <TextField
                                value={researchData.summary}
                                onChange={(event) => handleChangeResearchData(event)}
                                fullWidth
                                label="Resumo"
                                name="summary"
                                size="small"
                                type="text"
                                multiline={true}
                                rows={23}
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                            /> */}

                            <TextEditorResearch
                                value={researchData.summary}
                                setValue={summary => setResearchData({...researchData, summary})}
                                readOnly={false}
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
                                fullWidth
                                label="Referências Relacionadas"
                                name="source-research"
                                size="small"
                                multiline={true}
                                rows={sourceResearchRows()}
                                type="hidden"
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}

                                InputProps={{
                                    startAdornment: <Stack 
                                                        direction="column"
                                                        justifyContent="flex-start"
                                                        alignItems="flex-start"
                                                        spacing={0.5}
                                                    >
                                                        {allLocalResearchSources && allLocalResearchSources.map(alrs => {
                                                            const source = {researchId: research.id, relatedResearch: alrs}; 
                                                            return  <Source 
                                                                        key={alrs.id} 
                                                                        source={source} 
                                                                        color={categories.find(c => c.id === alrs.category_id ).color} 
                                                                    />
                                                        })}
                                                    </Stack>,
                                    endAdornment: <InputAdornment position="end">
                                                        <IconButton
                                                                aria-label="relacionar referência"
                                                                onClick={handleSourceDialogOpen}
                                                                edge="end"
                                                        >
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
                    <Paper  square >

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
                                sx={{ mt: 1, mb: 2,}}
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
                                // color="success" 
                                size="small"
                                fullWidth 
                                sx={{ mb: 2, }} 
                                component={Link} 
                                to={`/admin/view/research/${params.researchId}`}  
                                onClick={(event) => {
                                    const confirmSave = window.confirm('Ao continuar, quaisquer dados não salvos serão perdidos. Deseja realmente continuar ou cancelar para salvar suas alterações?');
                                    if (!confirmSave) {
                                        event.preventDefault();
                                    }
                                }}
                            >
                                Visualizar
                            </Button>
                            <Button 
                                variant="contained"
                                color="success" 
                                size="small"
                                fullWidth 
                                sx={{ mb: 2, }} 
                                onClick={handleUpdateResearch}  
                            >
                                Atualizar
                            </Button>
                            
                        </Grid>
                        
                        <Divider /> 

                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                            <Title position={'tags'}/> 
                        </Grid>

                        <Divider />

                        {classes && classes.filter(c => c.category_id === researchData.category_id).map(sc => (
                            <Accordion disableGutters elevation={0} square >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={sc.name}
                                    id={sc.id}
                                >
                                    <Stack direction="row"  alignItems="center" spacing={1.5} sx={{ flexGrow: 1 }} >
                                        <Avatar sx={{ width: 15, height: 15,  bgcolor: `${categories.find(cat => cat.id === sc.category_id).color}`, }} > </Avatar>
                                            {/* <BookmarkIcon fontSize="inherit" /> */}
                                        
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

                     <Paper square >

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
                                    reuseMaps
                                > 
                                    <DeckGLOverlay layers={[scatterplotLayer]}  />
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

                        <Divider />

                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                            <Title position={'images'}/> 
                        </Grid>

                        <Divider />

                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                            <UppyDashboard />
                        </Grid>

                    </Paper>

                </Grid>

                <ImagekitFilesIndex />

                <Grid item xs={12} >
                {/* IMAGE GALLERY */}
                    <Paper >
                        <Grid item xs={12} sx={{ px: 2, py: 2, display: 'flex', flexDirection: 'column', }}>
                            <Stack 
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Title position={'contentGallery'}/>
                                <Box sx={{ flexgrow: 1, }}/>
                                <UppyDashboard />
                            </Stack> 
                             
                        </Grid>
                        <Divider />
                        <Grid ref={ref} id="image-gallery" item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 280, }}> 

                            <ImageGallery />
                        
                        </Grid >
                    </Paper>
                </Grid>
                
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    )
};

export default ResearchEdit;