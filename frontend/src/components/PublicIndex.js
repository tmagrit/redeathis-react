import * as React from 'react';
import Grid from '@mui/material/Grid';
import MainArt from './MainArt';

const PublicIndex = () => {

    return ( 

        <Grid container spacing={3}>
            <Grid item xs={2} >    
            </Grid>  
            <Grid 
                    item xs={10} 
                    sx={{ 
                        //pt: 5, 
                        pl: 200, 
                        display: 'flex', 
                        flexDirection: 'column', 
                    }}
                >
                    <MainArt />
                </Grid>
        </Grid>

    );
};

export default PublicIndex;