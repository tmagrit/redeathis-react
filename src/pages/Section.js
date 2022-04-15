import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom";

// PANELS
import MainDashboard from '../components/MainDashboard';
import All from '../components/All';
import Edit from '../components/Edit';
import Create from '../components/Create';

const Section = () => {

    return (
        <Routes>
            <Route index element={<MainDashboard />} />
            <Route path="all" element={<All />} />
            <Route path="create" element={<Create />} />
            <Route path="edit\:id" element={<Edit />} />
        </Routes>
    );

};

export default Section;
