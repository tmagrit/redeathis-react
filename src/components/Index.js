import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectFullProfiles } from '../features/membersSlice';
import { useTableTemplates } from './tableTemplates';
import Typography from '@mui/material/Typography';

// REACT DATA TABLE COMPONENT
import DataTable from 'react-data-table-component';
import { customStyles } from '../styles/tableTemplatesStyles'

const Index = () => {

    // TABLE TEMPLATES HOOK
    const tableTemplates = useTableTemplates(); 
    //const customStyles = customStyles();

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
    
    const section = useSelector(state => state.session.section);
    const context = useSelector(state => state.session.context);

    const createProfileTable = Boolean( getMembersStatus === "succeeded" && 
                                    getRolesStatus === "succeeded" && 
                                    getProfileRolesStatus === "succeeded" && 
                                    getOrganizationsStatus === "succeeded" )

    const createResearchTable = Boolean( getResearchStatus === "succeeded" && 
                                    getCategoriesStatus === "succeeded" && 
                                    getStatusesStatus === "succeeded" )    

    if(section === 'research') {
        return (
            <React.Fragment>
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
                    <Typography component="body1" color="inherit" sx={{ fontStyle: 'italic', textAlign: 'center', pt: 4, }}>
                        Sem dados para exibir
                    </Typography>
                ) }
            </React.Fragment>
        ); 
    }
    if(section === 'categories') {
        return 'Categorias';        
    }
    if(section === 'members') {
        return (
            <React.Fragment>
                {/* MEMBERS SECTION TABLE  */}
                {createProfileTable && fullProfiles.length > 0 ? (
                    <DataTable
                        columns={tableTemplates.fullProfilesColumns}
                        data={fullProfiles}
                        striped
                        responsive
                        selectableRows
                        pagination
                    />
                ) : (
                    <Typography component="body1" color="inherit" sx={{ fontStyle: 'italic', textAlign: 'center', pt: 4, }}>
                        Sem dados para exibir
                    </Typography>
                ) }
            </React.Fragment>
        );        
    }
    if(section === 'pages') {
        return 'Páginas';        
    }

};

export default Index;
