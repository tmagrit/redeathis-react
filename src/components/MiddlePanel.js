import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectFullProfiles } from '../features/membersSlice';
import Title from './Title';
import { profilesColumns } from './tableTemplates';

// REACT DATA TABLE COMPONENT
import DataTable from 'react-data-table-component';


const MiddlePanel = () => {

  function titleGenerator(section, context) {
        
    // MAIN DASHBOARD TITLES 
    if(section === 'research' && context === '')
        return 'Pesquisa';
    
    if(section === 'categories' && context === '')
        return 'Categorias';

    if(section === 'members' && context === '')
        return 'Colaboradores';
    
    if(section === 'pages' && context === '')
        return 'Páginas';
};

 // REDUX SELECTORS
 const fullProfiles = useSelector(selectFullProfiles);
 const getMembersStatus = useSelector(state => state.members.getMembersStatus);
 const getRolesStatus = useSelector(state => state.members.getRolesStatus);
 const getProfileRolesStatus = useSelector(state => state.members.getProfileRolesStatus);
 const getOrganizationsStatus = useSelector(state => state.members.getOrganizationsStatus);
 const section = useSelector(state => state.session.section);
 const context = useSelector(state => state.session.context);

const createProfileTable = Boolean( getMembersStatus === "succeeded" && 
                                    getRolesStatus === "succeeded" && 
                                    getProfileRolesStatus === "succeeded" && 
                                    getOrganizationsStatus === "succeeded" )

  return (
    <React.Fragment>
      <Title>{titleGenerator(section, context)}</Title>
        {createProfileTable ? (
            <DataTable
                columns={profilesColumns}
                data={fullProfiles}
                selectableRows
                pagination
            />
        ) : null }
    </React.Fragment>
  );
};

export default MiddlePanel;