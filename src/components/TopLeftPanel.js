import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import CreateResearch from './CreateResearch';

const TopLeftPanel = () => {

    return (
        <Routes>
            <Route path="research" element={<CreateResearch />} >
                <Route path="create" element={<CreateResearch />} />
                <Route path="edit" element={<CreateResearch />} />  
            </Route>    
        </Routes>
    );
};

export default TopLeftPanel;
