import * as React from 'react'; 
// import { useState } from 'react';
import { ThemeProvider } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { selectFilteredResearch } from '../features/researchSlice';
// import { useParams } from "react-router-dom";
// import { DateTime } from 'luxon';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
// import Map from 'react-map-gl';
// import { ScatterplotLayer } from '@deck.gl/layers';
// import DeckGLOverlay from '../components/DeckGLOverlay';
// import { hexToRgb } from '../components/colorConverter';
import ResearchNavigation from '../components/ResearchNavigation';
// import PublicMenuBar from '../components/PublicMenuBar';
// import PublicFooter from '../components/PublicFooter';
// import { categoryTitle } from '../components/categoryTitle';
// import ResearchTag from '../components/ResearchTag';

import { publicTheme } from '../styles/publicStyles';

// const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
// const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE

const ViewResearch = () => {

    return (
        <ThemeProvider theme={publicTheme} > 

            <ResearchNavigation />

        </ThemeProvider>   

    );

};

export default ViewResearch;