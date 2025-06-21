import * as React from 'react';
import Grid from '@mui/material/Grid';

import Organization from '../pages/Organization';

const PublicInstitutional = () => {

    return ( 

        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Grid item xs={12} sx={{ pr:10, pb: 40, pt: 4, display: 'flex', flexDirection: 'column', }}>
                    <Organization />
                </Grid>
            </Grid>  
        </Grid>

    );
};

export default PublicInstitutional;