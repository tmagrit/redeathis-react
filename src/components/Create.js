import * as React from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from './Copyright';

// PANELS
import TopLeftPanel from './TopLeftPanel';
import TopRightPanel from './TopRightPanel';
import MiddlePanel from './MiddlePanel';

const Create = () => {

    // REDUX SELECTORS
    const section = useSelector(state => state.session.section)
    const context = useSelector(state => state.session.context)

    return (

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* RESUMO */}
                <Grid item xs={12} md={8}>
                <Paper
                    sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    }}
                >
                    <TopLeftPanel />
                </Paper>
                </Grid>
                {/* MINHAS COLABORAÇÕES */}
                <Grid item xs={12} md={4}>
                <Paper
                    sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    }}
                >
                    <TopRightPanel />
                </Paper>
                </Grid>
                {/* ATIVIDADES RECENTES */}
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

export default Create;
