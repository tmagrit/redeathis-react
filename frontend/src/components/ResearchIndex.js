import * as React from 'react';
import { useSelector } from 'react-redux';
// import { selectFullProfiles } from '../features/membersSlice';
import { useTableTemplates } from './tableTemplates';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Copyright from './Copyright';
import Title from './Title'; 
import FilteredDataTable from './FilteredDataTable';

// MY HISTORY HOOK
import { useHistory } from './history';

const ResearchIndex = () => {

    // TABLE TEMPLATES HOOK
    const tableTemplates = useTableTemplates(); 

    // MY HISTORY HOOK
    const history = useHistory();
    //const section = history?.pathArray[2] || ''
    const context = history?.pathArray[3] || ''

    // REDUX SELECTORS
    const fullResearch = useSelector(state => state.research.research);
    const getResearchStatus = useSelector(state => state.research.getStatusesStatus);
    const getCategoriesStatus = useSelector(state => state.research.getCategoriesStatus);
    const getStatusesStatus = useSelector(state => state.research.getStatusesStatus);

    const createResearchTable = Boolean( getResearchStatus === "succeeded" && 
                                    getCategoriesStatus === "succeeded" && 
                                    getStatusesStatus === "succeeded" )                                     

    const index = () => {
        return (
            <Grid item xs={12}>
                {createResearchTable && fullResearch.length > 0 ? (
                    <FilteredDataTable 
                        data={fullResearch} 
                        columns={tableTemplates.fullResearchColumns} 
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

export default ResearchIndex;