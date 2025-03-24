import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredResearch } from '../features/researchSlice';
import { useParams } from "react-router-dom";
import { DateTime } from 'luxon';
import { Link, useLocation } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Map from 'react-map-gl';
import { ScatterplotLayer } from '@deck.gl/layers';
import DeckGLOverlay from '../components/DeckGLOverlay';
import { hexToRgb } from '../components/colorConverter';
import LogoRedeAthis from './LogoRedeAthis';
import PublicFooter from '../components/PublicFooter';
import { categoryTitle } from '../components/categoryTitle';
import ResearchTag from '../components/ResearchTag';
import { slugger } from './slugger';
import { AppBar, publicTheme } from '../styles/publicStyles';

const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE

const ResearchNavigation = () => {

    // REACT ROUTER 
    const location = useLocation();
    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    const pages = useSelector(state => state.pages.pages).filter(pa => pa.status === 1 ); //TODO CONVERT TO DYNAMIC PAGES
    const staticPages = [
        {
            id: 0,
            title: 'Início',
            slug: '',
            color: '#CFC1AD',
        },
        {
            id: 1,
            title: 'Rede ATHIS',
            slug: 'redeathis',
            color: '#F5A449',
        },
        {
            id: 2,
            title: 'Apresentação',
            slug: 'apresentacao',
            color: '#EB6145',
          },
          {
            id: 3,
            title: 'Quem Somos',
            slug: 'quemsomos',
            color: '#981F62',
          },
          {
            id: 4,
            title: 'Colabore',
            slug: 'colabore',
            color: '#33377A',
          },          
      ];



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


    // MENU STATES
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    // MAIN MENU HOVER CONTROL
    const [isHoveredOrTouchedIndex, setIsHoveredOrTouchedIndex] = useState(null);
    // PAGE INDEX
    const [activePageIndex, setActivePageIndex] = useState(0);

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

    // // FAB PAGE NAV
    // const handleFabForward = (index) => {
    //     setActivePageIndex((index + 1) % staticPages.length);
    //   };

    // const handleFabRewind = (index) => {
    //     setActivePageIndex((index - 1 + staticPages.length) % staticPages.length);
    // };  

    const handleMenuPageIndex= (index) => {
        setActivePageIndex(index);
    }; 

    const handleFooterShow = (e) => {
        setShow(e);
    };

    return ( 
        <ThemeProvider theme={publicTheme} > 
            <Box sx={{ display: 'flex', }}>
            <CssBaseline />
                <AppBar 
                    position="fixed" 
                    color="inherit" 
                    elevation={0}  
                >
                    <Toolbar >

                        <LogoRedeAthis width={'150'} onLogoRedeAthisClick={() => setActivePageIndex(0)}/> 

                        <Box sx={{ flexGrow: 1 }} />

                        {/* CIRCLE NAVIGATION ELEMENT */}
                        <Box 
                            sx={{ 
                                    display: 'flex',
                                    alignItems: 'center', 
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    paddingRight: { xs: 5, md: 2, lg: 0, }
                                }}
                        >  
                            {staticPages.slice(1).map((pa) => (
                                <Box 
                                    key={slugger(pa.slug)} 
                                    sx={{ 
                                        maxWidth: { xs: 30, md: 50 }, 
                                        overflow: 'visible'
                                    }}
                                >
                                    <Link 
                                        to={`/${slugger(pa.slug)}`} 
                                        style={{ textDecoration: 'none' }}   
                                    >
                                        <Box 
                                            sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                flexDirection: 'column',
                                                textAlign: 'center',
                                                minWidth: 40,
                                                paddingTop: 5,
                                                paddingBottom: 1 
                                            }}
                                            onMouseEnter={() => setIsHoveredOrTouchedIndex(pa.id)}
                                            onMouseLeave={() => setIsHoveredOrTouchedIndex(null)}
                                            onTouchStart={() => setIsHoveredOrTouchedIndex(pa.id)}
                                            onTouchEnd={() => setIsHoveredOrTouchedIndex(null)} 
                                            onClick={() => handleMenuPageIndex(pa.id)}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 18 18">
                                                <circle
                                                    cx="9"
                                                    cy="9"
                                                    r="7"
                                                    fill={isHoveredOrTouchedIndex === pa.id || location.pathname === `/institutional/${slugger(pa.slug)}` ? `${pa.color}` : 'transparent'}
                                                    stroke={isHoveredOrTouchedIndex === pa.id  || location.pathname === `/institutional/${slugger(pa.slug)}` === pa.id ? `${pa.color}` : '#CFC1AD'}
                                                    strokeWidth="2"
                                                />
                                            </svg>

                                            <Box 
                                                sx={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    flexDirection: 'column',
                                                    textAlign: 'center',
                                                    backgroundColor: `${pa.color}`,
                                                    marginTop: 0.5,
                                                    padding: '3px',
                                                    visibility: isHoveredOrTouchedIndex === pa.id ? 'visible' : 'hidden',
                                                }}
                                            >
                                                <Typography 
                                                    component={Link} 
                                                    key={slugger(pa.slug)} 
                                                    to={`/${slugger(pa.slug)}`} 
                                                    onClick={() => handleMenuPageIndex(pa.id)}
                                                    sx={{ 
                                                        px: 1, 
                                                        textDecoration: 'none', 
                                                        textTransform: 'uppercase',
                                                    }}
                                                    color='#eee9e0'
                                                    variant="mainNavigationItem"
                                                    noWrap
                                                >
                                                    {pa.title}
                                                </Typography>
                                            </Box>
                                        </Box>

                                    </Link>
                                </Box>

                            ))}
                        </Box>

                    </Toolbar>
                </AppBar>

                <Typography 
                    variant="mainNavigationItem"
                    color={staticPages[activePageIndex].color}
                    sx={{ 
                        position: "absolute",
                        zIndex: 100, 
                        bottom: '31vh', 
                        left: '30px',
                        transform: 'rotate(180deg)',
                        writingMode: 'vertical-lr', 
                        textTransform: 'uppercase',
                        display: activePageIndex === 0 ? 'none' : 'block',
                    }}
                >
                    {staticPages[activePageIndex].title}
                </Typography>

                <Container 
                    maxWidth={false} 
                    sx={{ 
                        backgroundImage: {
                            xs: 'none',
                            md: 'url(/images/background/background-left.png)',
                            lg: 'url(/images/background/background-left.png), url(/images/background/background-right.png)',
                        },
                        height: 'calc(100vh - 112px)',
                        backgroundSize: 'auto, auto',
                        backgroundRepeat: 'repeat-y, repeat-y',
                        backgroundPosition: 'left top, right top',
                        mt: '112px',
                    }} 
                >



                    <Container 
                        sx={{ 
                            px: {
                                xs: 0,
                                sm: 0,
                                md: 4,
                                lg: 5,
                                xl: 10,
                            }
                        }} 
                        maxWidth={true} 
                    >
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























































                </Container>

                <PublicFooter open={open} show={show} setShow={(e) => handleFooterShow(e)} />

            </Box>
        </ThemeProvider>
    );
};

export default ResearchNavigation;