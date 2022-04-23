import * as React from 'react';
import { Routes, Route } from "react-router-dom";

import ListAll from './ListAll';

const MiddlePanel = () => {

    return (
        <Routes>
            <Route index element={<ListAll />} />
            <Route path="research/*" element={<ListAll />} >
 
            </Route>  
            <Route path="categories/*" element={<ListAll />} >
                {/* <Route path="all" element={<All />} /> 
                <Route path="create" element={<All />} />
                <Route path="edit" element={<All />} />   */}
            </Route>   
            <Route path="members/*" element={<ListAll />} >
                {/* <Route path="all" element={<All />} /> 
                <Route path="create" element={<All />} />
                <Route path="edit" element={<All />} />   */}
            </Route> 
            <Route path="pages/*" element={<ListAll />} >

            </Route>
        </Routes>
    );
};

export default MiddlePanel;














// import * as React from 'react';
// import { useSelector } from 'react-redux';
// import { selectFullProfiles } from '../features/membersSlice';
// import { useTableTemplates } from './tableTemplates';

// // REACT DATA TABLE COMPONENT
// import DataTable from 'react-data-table-component';


// const MiddlePanel = () => {

// // TABLE TEMPLATES HOOK
// const tableTemplates = useTableTemplates(); 

// // REDUX SELECTORS
//  const fullProfiles = useSelector(selectFullProfiles);
//  const getMembersStatus = useSelector(state => state.members.getMembersStatus);
//  const getRolesStatus = useSelector(state => state.members.getRolesStatus);
//  const getProfileRolesStatus = useSelector(state => state.members.getProfileRolesStatus);
//  const getOrganizationsStatus = useSelector(state => state.members.getOrganizationsStatus);
//  const section = useSelector(state => state.session.section);
//  const context = useSelector(state => state.session.context);

// const createProfileTable = Boolean( getMembersStatus === "succeeded" && 
//                                     getRolesStatus === "succeeded" && 
//                                     getProfileRolesStatus === "succeeded" && 
//                                     getOrganizationsStatus === "succeeded" )

//   return (
//     <React.Fragment>
//         {/* MEMBERS SECTION TABLE  */}
//         {createProfileTable && section === "members" ? (
//             <DataTable
//                 columns={tableTemplates.fullProfilesColumns}
//                 data={fullProfiles}
//                 selectableRows
//                 pagination
//             />
//         ) : null }
//     </React.Fragment>
//   );
// };

// export default MiddlePanel;