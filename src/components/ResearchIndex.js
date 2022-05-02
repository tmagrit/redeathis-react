import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectFullProfiles } from '../features/membersSlice';
import { useTableTemplates } from './tableTemplates';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Copyright from './Copyright';
import Title from './Title'; 

// REACT DATA TABLE COMPONENT
import DataTable from 'react-data-table-component';
import { customStyles } from '../styles/tableTemplatesStyles'

// MY HISTORY HOOK
import { useHistory } from './history';

const ResearchIndex = () => {

    // TABLE TEMPLATES HOOK
    const tableTemplates = useTableTemplates(); 

    // MY HISTORY HOOK
    const history = useHistory();
    const section = history?.pathArray[2] || ''
    const context = history?.pathArray[3] || ''

    // REDUX SELECTORS
    //MEMBERS
    const fullProfiles = useSelector(selectFullProfiles);
    const getMembersStatus = useSelector(state => state.members.getMembersStatus);
    const getRolesStatus = useSelector(state => state.members.getRolesStatus);
    const getProfileRolesStatus = useSelector(state => state.members.getProfileRolesStatus);
    const getOrganizationsStatus = useSelector(state => state.members.getOrganizationsStatus);
    // RESEARCH
    const fullResearch = useSelector(state => state.research.research);
    const getResearchStatus = useSelector(state => state.research.getStatusesStatus);
    const getCategoriesStatus = useSelector(state => state.research.getCategoriesStatus);
    const getStatusesStatus = useSelector(state => state.research.getStatusesStatus);
    

    const createProfileTable = Boolean( getMembersStatus === "succeeded" && 
                                    getRolesStatus === "succeeded" && 
                                    getProfileRolesStatus === "succeeded" && 
                                    getOrganizationsStatus === "succeeded" )

    const createResearchTable = Boolean( getResearchStatus === "succeeded" && 
                                    getCategoriesStatus === "succeeded" && 
                                    getStatusesStatus === "succeeded" )    

    const index = () => {
        return (
            <Grid item xs={12}>
                <Paper sx={{ minHeight: 240, }} >
                    <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'row', }}>
                        <Title position={'middle'}/> 
                    </Grid>
                    <Divider />
                    <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                        {/* MEMBERS SECTION TABLE  */}
                        {createResearchTable && fullResearch.length > 0 ? (
                            <DataTable
                                columns={tableTemplates.fullResearchColumns}
                                data={fullResearch}
                                customStyles={customStyles}
                                striped
                                responsive
                                selectableRows
                                pagination
                            />
                        ) : (
                            <Typography component="div" variant="body1" color="inherit" sx={{ fontStyle: 'italic', textAlign: 'center', pt: 4, }}>
                                Sem dados para exibir
                            </Typography>
                        ) }
                    </Grid>
                </Paper>
            </Grid>
        );
    };                                    

    if(context === 'all') {
        return (
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {index()}  
                </Grid>
                <Copyright sx={{ pt: 4 }} />
            </Container>
        );
    } else {
        return index();
    };
};

export default ResearchIndex;