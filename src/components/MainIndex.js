import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Copyright from './Copyright';
import Title from './Title';   
import ResearchIndex from './ResearchIndex';
import MembersIndex from './MembersIndex';

const MainIndex = () => {

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>

                {/* INDEX */}
                <Grid item xs={12}>
                    <Paper sx={{ minHeight: 240, }} >
                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'row', }}>
                            <Title position={'middle'}/> 
                        </Grid>
                        <Divider />
                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                            {/* <Routes>
                                <Route path="admin/research/all" element={<ResearchIndex />} />
                                <Route path="admin/members/all" element={<MembersIndex />} />
                            </Routes> */}
                        </Grid>
                    </Paper>
                </Grid>
                
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    );
};

export default MainIndex;