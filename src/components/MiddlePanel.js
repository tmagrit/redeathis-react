import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectFullProfiles } from '../features/membersSlice';
import { useTableTemplates } from './tableTemplates';

// REACT DATA TABLE COMPONENT
import DataTable from 'react-data-table-component';


const MiddlePanel = () => {

// TABLE TEMPLATES HOOK
const tableTemplates = useTableTemplates(); 

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
        {/* MEMBERS SECTION TABLE  */}
        {createProfileTable && section === "members" ? (
            <DataTable
                columns={tableTemplates.fullProfilesColumns}
                data={fullProfiles}
                selectableRows
                pagination
            />
        ) : null }
    </React.Fragment>
  );
};

export default MiddlePanel;