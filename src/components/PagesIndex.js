import * as React from 'react';
import { useSelector } from 'react-redux';
//import { selectFullProfiles } from '../features/membersSlice';
import { useTableTemplates } from './tableTemplates';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Copyright from './Copyright';
import Title from './Title'; 

import FilteredDataTable from './FilteredDataTable';

// MY HISTORY HOOK
import { useHistory } from './history';

const PagesIndex = () => {

    // TABLE TEMPLATES HOOK
    const tableTemplates = useTableTemplates(); 

    // MY HISTORY HOOK
    const history = useHistory();
    const context = history?.pathArray[3] || ''

    // REDUX SELECTORS
    // PAGES
    const fullPages = useSelector(state => state.pages.pages);
    const getPagesStatus = useSelector(state => state.pages.getPagesStatus);

    const createPagesTable = Boolean( getPagesStatus === "succeeded" )  

    const index = () => {
        return (
            <Grid item xs={12}>
                {createPagesTable && fullPages.length > 0 ? (
                    <FilteredDataTable 
                        data={fullPages} 
                        columns={tableTemplates.pagesColumns}
                        title={<Title position={'middle'}/>}
                    />
                ) : (
                    <Typography component="div" variant="body1" color="inherit" sx={{ fontStyle: 'italic', textAlign: 'center', pt: 4, }}>
                        Sem dados para exibir
                    </Typography>
                )}
            </Grid>
        );
    };                                    

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {index()}  
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    );

    // if(context === 'all') {
    //     return (
    //         <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
    //             <Grid container spacing={3}>
    //                 {index()}  
    //             </Grid>
    //             <Copyright sx={{ pt: 4 }} />
    //         </Container>
    //     );
    // } else {
    //     return index();
    // };
};

export default PagesIndex;