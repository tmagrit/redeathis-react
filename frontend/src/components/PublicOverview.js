import * as React from 'react';
import Grid from '@mui/material/Grid';

import Institutional from '../pages/Institutional';

const PublicOverview = () => {

    return ( 

        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Grid item xs={12} sx={{ pt: 5, pl: 20, display: 'flex', flexDirection: 'column', }}>
                    <Institutional />
                </Grid>
            </Grid>  
        </Grid>

    );
};

export default PublicOverview;