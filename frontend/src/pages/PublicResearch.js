import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredResearch } from '../features/researchSlice';
import { useParams } from "react-router-dom";
import { DateTime } from 'luxon';
import { ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Map from 'react-map-gl';
import { ScatterplotLayer } from '@deck.gl/layers';
import DeckGLOverlay from '../components/DeckGLOverlay';
import { hexToRgb } from '../components/colorConverter';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { categoryTitle } from '../components/categoryTitle';
import ResearchTag from '../components/ResearchTag';
import ResearchImagesDialog from '../components/ResearchImagesDialog';
import { publicTheme } from '../styles/publicStyles';
import { imageDescription, sortImages } from '../utils';

const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE
// IMAGEKIT
const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;

const PublicResearch = () => {

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();
    // REF TO TRACK IMAGEGRID WIDTH
    const gridRef = useRef(null);

    // REDUX SELECTORS
    // RESEARCH SELECTORS
    const research = useSelector(state => state.research.research.find(r => r.id === parseInt(params.researchId, 10) ));
    const researchAuthors = useSelector(state => state.research.researchAuthors.filter(ra => ra.research_id === parseInt(params.researchId, 10) ));
    const dateTime = { ...research.date, start: DateTime.fromObject(research.date.start), end: DateTime.fromObject(research.date.end) }
    const researchWithDate = { ...research, date: dateTime }
    const categories = useSelector(state => state.research.categories);
    const { allResearchTags } = useSelector(selectFilteredResearch);
    const researchTags = allResearchTags.find(art => art.research_id === parseInt(params.researchId, 10) );
    // IMAGE SELECTORS
    const images = useSelector(state => state.images.images); 
    const contentImages = images ? images.filter(i => parseInt(i.folder, 10) === parseInt(params.researchId, 10) && i.fileType === 'image').sort(sortImages) : []; 
    const imgCount = contentImages ? contentImages.length : 0;

    // REACT STATES
    const [researchData, setResearchData] = useState(researchWithDate); 
    const [viewport, setViewport] = useState({...researchData.geolocation, zoom: 4});
    const [width, setWidth] = useState(0);

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

    // DIALOG STATES 
    const [dialogOpen, setDialogOpen] = useState(false);
    // const [image, setImage] = useState(null);
    const [imageIndex, setImageIndex] = useState(0); console.log('imageIndex',imageIndex);

    // HANDLE TOGGLE DIALOG
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    // HANDLE CLICKED IMAGE
    const handleImageIndex = (image) => {
        setImageIndex(image);
    };    

    useEffect(() => {
        const updateWidth = () => {
        if (gridRef.current) {
            setWidth(gridRef.current.clientWidth);
        }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return ( 
        <ThemeProvider theme={publicTheme} > 
            <Container maxWidth={true} >
                <Grid container spacing={10}>
                    {/* LEFT PANEL */}
                    <Grid item xs={12} md={8}  >
                        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column',  }}>
                            
                            <Box sx={{ pt:3, }}>

                                {/* CATEGORIA */}
                                <Stack 
                                    direction="row" 
                                    alignItems="center"
                                    spacing={1} 

                                >
                                    <Avatar sx={{ width: 12, height: 12, bgcolor: `${categoryColor}` }}> </Avatar>
                                    <Typography variant="subtitle2" component="h4" >{categoryTitle(categories.find(c => c.id === researchData.category_id).name)}</Typography> 
                                </Stack>

                                {/* TÍTULO */}
                                <Box>
                                    <Typography  
                                        variant="viewResearchTitle" 
                                        component="h2" 
                                        gutterBottom={false} 
                                        sx={{  
                                            color: researchData.category.color, 
                                            display: 'inline', 
                                            pr: 0.5, 
                                        }}
                                    > 
                                        {researchData.title} 
                                    </Typography> 
                                    {/* DATA */}
                                    <Typography 
                                        variant="viewResearchTitle" 
                                        component="span" 
                                        noWrap 
                                        sx={{ 
                                            color: researchData.category.color, 
                                            display: 'inline', 
                                        }}
                                    > 
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
                    <Grid item xs={12} md={4} 
                        sx={{ mt: { sm: 0, md: 6.5, } }} 
                    >                     
                        
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


                        <Grid key="gridRef" ref={gridRef}  item xs={12} sx={{  display: 'flex', flexDirection: 'column', }}>
                            {imgCount ? (
                                
                                    <ImageList 
                                        sx={{ width: '100%', overflow: 'hidden', }} 
                                        cols={1} 
                                        gap={2}
                                    >
                                        {contentImages.map((ci, index) => (
                                            <React.Fragment>
                                                <ImageListItem 
                                                    onClick={() =>  { handleImageIndex(index); handleDialogOpen(); }} 
                                                    onMouseEnter={() => handleImageIndex(index)} 
                                                    key={ci.fileId}
                                                    style={{ cursor: 'pointer' }}
                                                        
                                                >
                                                    <img 
                                                        src={`${urlEndpoint}/tr:w-${width}${ci.filePath}?w=${width}&fit=crop&auto=format`}           
                                                        srcSet={`${urlEndpoint}/tr:w-${width}${ci.filePath}?w=${width}&fit=crop&auto=format&dpr=2 2x`}
                                                        alt={ci.description}
                                                        loading="lazy"
                                                    />
                                                </ImageListItem>
                                                <Typography 
                                                    variant="body2" 
                                                    component="div" 
                                                    // gutterBottom 
                                                    sx={{ mt: 0, }}
                                                >
                                                    {imageDescription(ci).title}
                                                </Typography>
                                                <Typography 
                                                    variant="caption" 
                                                    component="div" 
                                                    gutterBottom 
                                                    sx={{ mb: 1, }}
                                                >
                                                    <Box component="span" sx={{ fontWeight: 'bold' }}>
                                                        {'Fonte: '}
                                                    </Box> 
                                                    {imageDescription(ci).subtitle}
                                                </Typography>                                         
                                            </React.Fragment>
                                        ))}
 
                                        {contentImages && imgCount &&(
                                            <ResearchImagesDialog
                                                fullWidth={true}
                                                maxWidth={'lg'}
                                                open={dialogOpen}
                                                onClose={handleDialogClose}
                                                imgCount={imgCount}
                                                contentImages={contentImages} 
                                                stepIndex={imageIndex}
                                            />
                                        )}
                                        

                                    </ImageList> 

                                ) : (null) }
                                
                        </Grid>

                    </Grid>
                    
                </Grid>

            </Container>

        </ThemeProvider>
    );
};

export default PublicResearch;