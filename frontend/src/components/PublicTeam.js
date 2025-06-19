import * as React from 'react';
import Grid from '@mui/material/Grid';

import Institutional from '../pages/Institutional';

const PublicTeam = () => {

    return ( 

        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Grid item xs={12} sx={{ pr:10, pb: 40, display: 'flex', flexDirection: 'column', }}>
                    <Institutional />
                </Grid>
            </Grid>  
        </Grid>

    );
};

export default PublicTeam;