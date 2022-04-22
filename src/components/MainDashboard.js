import * as React from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Copyright from './Copyright';
import Title from './Title';   

// PANELS
import TopLeftPanel from './TopLeftPanel';
import TopRightPanel from './TopRightPanel';
import MiddlePanel from './MiddlePanel';

const MainDashboard = () => {

    // REDUX SELECTORS
    const section = useSelector(state => state.session.section);
    const context = useSelector(state => state.session.context);

    function upperPanels(context) {
        if(context === '' || context === 'create' || context === 'creategroup' || context === 'createtag' || context === 'edit' )
            return true;
        else
            return false;
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>

                {/* RIGHT AND LEFT UPPER PANELS */}
                {upperPanels(context) ? (
                    <React.Fragment>
                        <Grid item xs={12} md={8}>
                            <Paper sx={{ minHeight: 240, }} >
                                <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                                    <Title position={'left'}/> 
                                </Grid>
                                <Divider />
                                <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                                    <TopLeftPanel />
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Paper sx={{ minHeight: 240, }} >
                                <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                                    <Title position={'right'}/> 
                                </Grid>
                                <Divider />
                                <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                                    <TopRightPanel />
                                </Grid>
                            </Paper>
                        </Grid>
                    </React.Fragment>
                ) : null }

                {/* MIDDLE PANEL */}
                <Grid item xs={12}>
                    <Paper sx={{ minHeight: 240, }} >
                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'row', }}>
                            <Title position={'middle'}/> 
                        </Grid>
                        <Divider />
                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                            <MiddlePanel />
                        </Grid>
                    </Paper>
                </Grid>
                
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    )
};

export default MainDashboard;