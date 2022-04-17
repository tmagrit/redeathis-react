import * as React from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from './Copyright';

// PANELS
import MiddlePanel from './MiddlePanel';

const All = () => {

    // REDUX SELECTORS
    const section = useSelector(state => state.session.section)
    const context = useSelector(state => state.session.context)

    return (

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* LIST INDEX */}
                <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <MiddlePanel />
                </Paper>
                </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    )
};

export default All;
