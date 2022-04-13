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
import Admin from './components/Admin';
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
                        <Admin />
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
