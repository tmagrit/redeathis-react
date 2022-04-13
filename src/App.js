import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSession, logout, trackSession } from './features/sessionSlice';
import { getMembers } from './features/membersSlice';
import { Routes, Route } from "react-router-dom";
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Home from './components/Home';
import Admin from './components/Admin';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

function App() {

    // REDUX SELECTORS
    const dispatch = useDispatch()
    const session = useSelector(state => state.session)

    // GET AND TRACK SESSION 
    useEffect(() => {
        dispatch(getSession())
        dispatch(trackSession())
    
        return () => { 
            dispatch(logout()); //TODO - PROBLEM: REFRESHING PAGE LOGOUT THE USER
        }
    }, [])

    // GET AND TRACK SESSION 
    useEffect(() => {
        dispatch(getMembers())
    }, [])
    

    if(session.sessionStatus === 'succeeded') {
        return (
            <Routes>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="signin" element={<Signin />} />
                <Route path="signup" element={<Signup />} />
                <Route 
                    path="admin" 
                    element={
                    <ProtectedRoute>
                        <Admin role={'admin'} />
                    </ProtectedRoute>
                    } 
                />
                <Route 
                    path="admin/members" 
                    element={
                    <ProtectedRoute>
                        <Admin role={'members'} />
                    </ProtectedRoute>
                    } 
                />
            </Routes>

        );

    } else { 
        return (
            <Backdrop
                open={true}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>   
        ); 
    };
};

export default App;
