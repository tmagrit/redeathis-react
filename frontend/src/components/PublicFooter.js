import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const PublicFooter = () => {

    return (
        <Box
            sx={{ bgcolor: 'text.secondary', color: 'primary.contrastText', mt: 'auto', }}
        >
             <Container maxWidth="xl"  >
                <Grid container spacing={5} sx={{ py: 7, }} >
                <Grid item xs={6} md={3}>
                    <Typography variant="overline"  sx={{ textDecoration: 'none', color: 'inherit', }} >
                        Proposição/ Coordenação 
                    </Typography> 
                </Grid>
                <Grid item xs={6} md={3}>
                    <Typography variant="overline"  sx={{ textDecoration: 'none', color: 'inherit', }} >
                        Parceiros 
                    </Typography> 
                </Grid>
                <Grid item xs={6} md={3}>
                    <Typography variant="overline"  sx={{ textDecoration: 'none', color: 'inherit', }} >
                        Fomento
                    </Typography> 
                    </Grid>
                <Grid item xs={6} md={3}>
                    <Typography variant="overline"  sx={{ textDecoration: 'none', color: 'inherit', }} >
                        Apoio
                    </Typography> 
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );

};

export default PublicFooter;

