import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { DateTime } from 'luxon';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

import PublicMenuBar from '../components/PublicMenuBar';

const ViewResearch = () => {

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    // REDUX SELECTORS
    const research = useSelector(state => state.research.research.find(r => r.id === parseInt(params.researchId, 10) ));
    const researchAuthors = useSelector(state => state.research.researchAuthors.filter(ra => ra.research_id === parseInt(params.researchId, 10) ));

    // // REACT STATES
    const dateTime = { ...research.date, start: DateTime.fromObject(research.date.start), end: DateTime.fromObject(research.date.end) }
    const researchWithDate = { ...research, date: dateTime }
    const [researchData, setResearchData] = useState(researchWithDate);
    const categories = useSelector(state => state.research.categories);
    const [categoryColor, setCategoryColor] = useState(researchData.category.color);

    return (
        <React.Fragment>
            <PublicMenuBar />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4, pt: 6, }} >

            <Grid container spacing={3}>
                {/* LEFT PANEL */}
                <Grid item xs={12} md={8}>

                    <Grid item xs={12} sx={{ pt: 2, display: 'flex', flexDirection: 'column', }}>
                        <Typography variant="h5" display="block" > {researchData.title} </Typography> 
                        {researchAuthors.length > 0 && ( 
                            researchAuthors.map(ra => {
                                return  <Typography variant="button" display="block" sx={{ color: 'text.secondary' }} > {`${ra.author.name} ${ra.author.surname}; `} </Typography>
                            })
                        )}
                        <Stack direction="row" sx={{ my:1, }}>
                            <Chip clickable label={categories.find(c => c.id === researchData.category_id).name} size="small" />
                        </Stack>
                        
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', }}>
                        <Typography variant="caption" display="block" > <span dangerouslySetInnerHTML={{ __html: researchData.summary }} />; </Typography>
                    </Grid>

                </Grid>

                {/* RIGHT PANEL */}
                <Grid item xs={12} md={4}>

                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                            
                        </Grid>
                        <Divider />
                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                            
                        </Grid>

                </Grid>


                
            </Grid>





                
                
                
            </Container>
        </React.Fragment>
    );

};

export default ViewResearch;