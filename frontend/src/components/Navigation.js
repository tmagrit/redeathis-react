import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import LogoRedeAthis from './LogoRedeAthis';
import PublicFooter from '../components/PublicFooter';
import { slugger } from './slugger';
import { AppBar, publicTheme } from '../styles/publicStyles';

const MenuBar = () => {

    // REACT ROUTER 
    const location = useLocation();

    const pages = useSelector(state => state.pages.pages).filter(pa => pa.status === 1 );

    // MENU STATES
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [isHoveredOrTouchedIndex, setIsHoveredOrTouchedIndex] = useState(null);

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

                        <LogoRedeAthis width={'150'} /> 

                        <Box sx={{ flexGrow: 1 }} />

                        {/* CIRCLE NAVIGATION ELEMENT */}
                        <Box 
                            sx={{ 
                                    // display: { xs: 'none', md: 'none', lg: 'flex' }, 
                                    display: 'flex',
                                    alignItems: 'center', 
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    paddingRight: 1
                                }}
                        >  
                            {pages.map((pa) => (
                                <Box 
                                    key={slugger(pa.slug)} 
                                    sx={{ 
                                        maxWidth: { xs: 30, md: 50 }, 
                                        overflow: 'visible'
                                    }}
                                >
                                    <Link 
                                        to={`/institutional/${slugger(pa.slug)}`} 
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
                                                    to={`/institutional/${slugger(pa.slug)}`} 
                                                    sx={{ px: 1, textDecoration: 'none', textTransform: 'uppercase' }}
                                                    color='#eee9e0'
                                                    variant="mainNavigationItem"
                                                    noWrap
                                                >
                                                    {pa.slug}
                                                </Typography>
                                            </Box>
                                        </Box>

                                    </Link>
                                </Box>

                            ))}
                        </Box>

                    </Toolbar>
                </AppBar>

                <PublicFooter open={open} show={show} setShow={(e) => handleFooterShow(e)} />

            </Box>
        </ThemeProvider>
    );
};

export default MenuBar;