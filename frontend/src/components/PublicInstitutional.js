import * as React from 'react';
import Grid from '@mui/material/Grid';

import Organization from '../pages/Organization';

const PublicInstitutional = () => {

    return ( 

        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Grid 
                    item xs={12} 
                    sx={{ 
                        pr: { xs: 10, lg: 0 },
                        pl: { xs: 10, lg: 0 },
                        mr: { xs: 0, lg: '450px' },
                        ml: { xs: 0, lg: '160px' },
                        pb: 40, 
                        pt: 4, 
                        display: 'flex', 
                        flexDirection: 'column', 
                    }}
                >
                    <Organization />
                </Grid>
            </Grid>  
        </Grid>

    );
};

export default PublicInstitutional;