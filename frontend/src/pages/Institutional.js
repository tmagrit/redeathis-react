import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import PublicMenuBar from '../components/PublicMenuBar';

import { slugger } from '../components/slugger';


const Institutional = () => {

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    // REDUX SELECTORS
    const pages = useSelector(state => state.pages.pages.filter(pa => pa.status === 1 ));
    const page = pages.find( p => slugger(p.slug) == slugger(params.pageSlug));

    // REACT STATES 
    const [currentPage, setCurrentPage] = useState(null);

    // GET MEMBERS AND RESEARCH STATES
    useEffect(() => {
       setCurrentPage(page); 
    }, [page])

    return (
        <React.Fragment>
            <PublicMenuBar />
            {currentPage && (
                <Container maxWidth="xl" sx={{ mt: 4, mb: 4, pt: 6, }} >
                    <Grid container spacing={3}>
                        {/* LEFT PANEL */}
                        <Grid item xs={12} >
                            <Grid item xs={12} sx={{ pt: 2, display: 'flex', flexDirection: 'column', }}>
                                <Typography variant="h5" component="h1" > {currentPage.title} </Typography> 
                                <Typography variant="body1" component="div" display="block" > <span dangerouslySetInnerHTML={{ __html: currentPage.body }} /> </Typography>
                            </Grid>
                        </Grid>  
                    </Grid>
                </Container>
            )}
        </React.Fragment>
    );
}

export default Institutional;
