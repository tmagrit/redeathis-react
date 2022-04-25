import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Copyright from './Copyright';
import Title from './Title';   
import Index from './Index';

const ManageAll = () => {

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
                            <Index />
                        </Grid>
                    </Paper>
                </Grid>
                
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    )
};

export default ManageAll;




                // {/* LEFT PANEL */}
                // <Grid item xs={12} md={8}>
                //     <Paper sx={{ minHeight: 240, }} >
                //         <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                //             <Title position={'left'}/> 
                //         </Grid>
                //         <Divider />
                //         <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                //             {/* <TopLeftPanel /> */}
                //             MAIN LEFT CONTENT
                //         </Grid>
                //     </Paper>
                // </Grid>

                // {/* RIGHT PANEL */}
                // <Grid item xs={12} md={4}>
                //     <Paper sx={{ minHeight: 240, }} >
                //         <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                //             <Title position={'right'}/> 
                //         </Grid>
                //         <Divider />
                //         <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                //             {/* <TopRightPanel /> */}
                //             MAIN RIGHT CONTENT
                //         </Grid>
                //     </Paper>
                // </Grid>