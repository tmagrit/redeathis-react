import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Container from '@mui/material/Container';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoRedeAthis from './LogoRedeAthis';
import PublicFooter from '../components/PublicFooter';
import { slugger } from './slugger';
import { AppBar, publicTheme } from '../styles/publicStyles';

const Navigation = () => {

    // REACT ROUTER 
    const location = useLocation();

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

    // MENU STATES
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    // MAIN MENU HOVER CONTROL
    const [isHoveredOrTouchedIndex, setIsHoveredOrTouchedIndex] = useState(null);
    // PAGE INDEX
    const [activePageIndex, setActivePageIndex] = useState(0);

    // FAB PAGE NAV
    const handleFabForward = (index) => {
        setActivePageIndex((index + 1) % staticPages.length);
      };

    const handleFabRewind = (index) => {
        setActivePageIndex((index - 1 + staticPages.length) % staticPages.length);
    };  

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

                        {/* MAIN NAVIGATION ELEMENT */}
                        <Box 
                            sx={{ 
                                    display: 'flex',
                                    alignItems: 'center', 
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    paddingRight: 1
                                }}
                        >  
                            {staticPages.slice(1).map((pa) => (
                                <Box 
                                    key={slugger(pa.slug)} 
                                    //sx={{ 
                                        //maxWidth: { xs: 30, md: 50 }, 
                                        //overflow: 'visible'
                                    //}}
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
                                                //minWidth: 40,
                                                //paddingTop: 5,
                                                //paddingBottom: 1 
                                            }}
                                            onMouseEnter={() => setIsHoveredOrTouchedIndex(pa.id)}
                                            onMouseLeave={() => setIsHoveredOrTouchedIndex(null)}
                                            onTouchStart={() => setIsHoveredOrTouchedIndex(pa.id)}
                                            onTouchEnd={() => setIsHoveredOrTouchedIndex(null)} 
                                            onClick={() => handleMenuPageIndex(pa.id)}
                                        >
                                            {/* <svg width="18" height="18" viewBox="0 0 18 18">
                                                <circle
                                                    cx="9"
                                                    cy="9"
                                                    r="7"
                                                    fill={isHoveredOrTouchedIndex === pa.id || location.pathname === `/institutional/${slugger(pa.slug)}` ? `${pa.color}` : 'transparent'}
                                                    stroke={isHoveredOrTouchedIndex === pa.id  || location.pathname === `/institutional/${slugger(pa.slug)}` === pa.id ? `${pa.color}` : '#CFC1AD'}
                                                    strokeWidth="2"
                                                />
                                            </svg> */}
                                            <Box 
                                                sx={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    flexDirection: 'column',
                                                    textAlign: 'center',
                                                    backgroundColor: isHoveredOrTouchedIndex === pa.id || location.pathname === `/institutional/${slugger(pa.slug)}` ? `${pa.color}` : 'transparent',
                                                    //backgroundColor: `${pa.color}`,
                                                    //marginTop: 0.5,
                                                    padding: '3px',
                                                    borderRight: pa.id === staticPages.length - 1 ? 
                                                        'none' : 
                                                        isHoveredOrTouchedIndex === pa.id ? '1px solid #eee9e0' : '1px solid #CFC1AD',
                                                    
                                                    //visibility: isHoveredOrTouchedIndex === pa.id ? 'visible' : 'hidden',
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
                                                    //color='#eee9e0'
                                                    color={isHoveredOrTouchedIndex === pa.id  || location.pathname === `/institutional/${slugger(pa.slug)}` === pa.id ? '#eee9e0' : publicTheme.palette.text.secondary}
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

                <Fab 
                    variant="extended" 
                    component={Link}
                    to={`/${staticPages[(activePageIndex - 1 + staticPages.length) % staticPages.length].slug}`}
                    sx={{ 
                        position: "absolute",
                        boxShadow: "none",
                        backgroundColor: `${staticPages[activePageIndex].color}`,
                        transition: 'opacity 0.5s',
                        opacity: 1,
                        '&:hover': {
                            backgroundColor: `${staticPages[activePageIndex].color}`, 
                            opacity: 0.8, 
                        },
                        color: publicTheme.palette.background.default,
                        zIndex: 100, 
                        top: '70vh', 
                        left: '0%', 
                        borderRadius: "0%"
                    }}
                    key={activePageIndex - 1} 
                    onClick={() => handleFabRewind(activePageIndex)}                    
                >
                    <ChevronLeftIcon />
                </Fab>

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

                <Fab 
                    variant="extended" 
                    component={Link}
                    to={`/${staticPages[(activePageIndex + 1) % staticPages.length].slug}`}
                    sx={{ 
                        position: "absolute",
                        boxShadow: "none",
                        backgroundColor: `${staticPages[(activePageIndex + 1) % staticPages.length].color}`,
                        transition: 'opacity 0.5s',
                        opacity: 0.8,
                        '&:hover': {
                            backgroundColor: `${staticPages[(activePageIndex + 1) % staticPages.length].color}`,
                            opacity: 1, 
                        },
                        color: publicTheme.palette.background.default,
                        zIndex: 100, 
                        top: '70vh', 
                        right: '0%',  
                        pl: 10,
                        borderRadius: "0%" 
                    }}
                    key={activePageIndex + 1} 
                    onClick={() => handleFabForward(activePageIndex)}
                >
                    <ChevronRightIcon />
                </Fab>

                <Container 
                    maxWidth={false} 
                    sx={{ 
                        backgroundImage: 'url(/images/background/background-left.png), url(/images/background/background-right.png)',
                        height: 'calc(100vh - 112px)',
                        backgroundSize: 'auto, auto',
                        backgroundRepeat: 'repeat-y, repeat-y',
                        backgroundPosition: 'left top, right top',
                        mt: '112px',
                    }} 
                >

                    <Outlet />

                </Container>

                <PublicFooter open={open} show={show} setShow={(e) => handleFooterShow(e)} />

            </Box>
        </ThemeProvider>
    );
};

export default Navigation;