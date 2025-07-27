import * as React from 'react';
import Grid from '@mui/material/Grid';

import PublicResearch from '../pages/PublicResearch';

const ViewResearch = () => {

    return ( 

        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Grid 
                    item 
                    xs={12} 
                    sx={{ 
                        pr:0, 
                        // pl: '160px', 
                        ml: { xs: 0, lg: '160px' },
                        pb: 40, 
                        display: 'flex', 
                        flexDirection: 'column', 
                    }}
                >
                    <PublicResearch />
                </Grid>
            </Grid>  
        </Grid>

    );
};

export default ViewResearch;



























// import * as React from 'react'; 
// // import { useState } from 'react';
// import { ThemeProvider } from '@mui/material';
// // import { useSelector } from 'react-redux';
// // import { selectFilteredResearch } from '../features/researchSlice';
// // import { useParams } from "react-router-dom";
// // import { DateTime } from 'luxon';
// // import Container from '@mui/material/Container';
// // import Grid from '@mui/material/Grid';
// // import Box from '@mui/material/Box';
// // import Typography from '@mui/material/Typography';
// // import Stack from '@mui/material/Stack';
// // import Avatar from '@mui/material/Avatar';
// // import Map from 'react-map-gl';
// // import { ScatterplotLayer } from '@deck.gl/layers';
// // import DeckGLOverlay from '../components/DeckGLOverlay';
// // import { hexToRgb } from '../components/colorConverter';
// import ResearchNavigation from './ResearchNavigation';
// import Navigation from './Navigation';
// // import PublicMenuBar from '../components/PublicMenuBar';
// // import PublicFooter from '../components/PublicFooter';
// // import { categoryTitle } from '../components/categoryTitle';
// // import ResearchTag from '../components/ResearchTag';

// import { publicTheme } from '../styles/publicStyles';

// // const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
// // const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE

// const ViewResearch = () => {

//     return (
//         <ThemeProvider theme={publicTheme} > 

//             {/* <ResearchNavigation /> */}
//             <Navigation />

//         </ThemeProvider>   

//     );

// };

// export default ViewResearch;