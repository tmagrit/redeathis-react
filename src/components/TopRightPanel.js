import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import PublishResearch from './PublishResearch';

const TopRightPanel = () => {

    return (
        <Routes>

            <Route path="research" element={<PublishResearch />} >
                <Route path="create" element={<PublishResearch />} />
                <Route path="edit" element={<PublishResearch />} />  
            </Route>    
        </Routes>
    );
};

export default TopRightPanel;