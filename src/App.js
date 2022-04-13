import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSession, logout, trackSession, getProfile } from './features/session/sessionSlice';
import {
    Routes,
    Route
} from "react-router-dom";
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Home from './components/Home';
import HomeAdmin from './components/Admin';
import Dashboard from './components/Dashboard';
import Signin from './components/Signin';
import Signup from './components/Signup';

function App() {

    // REDUX SELECTORS
    const dispatch = useDispatch()
    const session = useSelector(state => state.session)

    // GET AND TRACK SESSION 
    useEffect(() => {
        dispatch(getSession())
        dispatch(trackSession())
    
        return () => { 
            dispatch(logout());
        }
    }, [])

    // UPDATE PROFILE ON SESSION CHANGES
    useEffect(() => {
        if(session?.user)
            dispatch(getProfile(session?.user))
    }, [session])
    

    if(session.sessionStatus === 'succeeded')  
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
                        <Dashboard />
                    </ProtectedRoute>
                    } 
                />
            </Routes>

        );
    else 
        return (
            <Backdrop
                open={true}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>   
        );          
}

export default App;
