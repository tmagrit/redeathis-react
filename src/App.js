import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSession, logout, trackSession, updateProfile, updateProfileSection, updateProfileContext } from './features/sessionSlice';
import { getMembers, getProfileRoles, getRoles, getOrganizations } from './features/membersSlice';
import { getResearch, getCategories, getStatuses } from './features/researchSlice';
import { Routes, Route } from "react-router-dom";
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Home from './components/Home';
import Admin from './components/Admin';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
// MY HISTORY HOOK
import { useHistory } from './components/history';

function App() {

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const session = useSelector(state => state.session);

    // MY HISTORY HOOK
    const history = useHistory();

    // GET AND TRACK SESSION 
    useEffect(() => {
        dispatch(getSession());
        dispatch(trackSession());
        dispatch(getResearch());
        dispatch(getCategories());
        dispatch(getStatuses());
    
        return () => { 
            if(session?.event === 'SIGNED_IN')
                dispatch(updateProfile(session.profile))
            //dispatch(logout()); //TODO - PROBLEM: REFRESHING PAGE LOGOUT THE USER
        }
    }, [])

    // GET MEMBERS STATE
    useEffect(() => {
        dispatch(getMembers());
        dispatch(getProfileRoles());
        dispatch(getRoles());
        dispatch(getOrganizations());
    }, [])

    // TRACK ROUTES 
    useEffect(() => {
        dispatch(updateProfileSection(history.pathArray[2] || ''));
        dispatch(updateProfileContext(history.pathArray[3] || '')); 
    }, [history.location]);

    if(session.sessionStatus === 'succeeded') {
        return (
            <Routes>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="signin" element={<Signin />} />
                <Route path="signup" element={<Signup />} />
                <Route 
                    path="admin/*" 
                    element={
                    <ProtectedRoute>
                        <Admin section={'main'} />
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



                //     <Route 
                //         path="research" 
                //         element={
                //         <ProtectedRoute>
                //             <Admin section={'research'} />
                //         </ProtectedRoute>
                //         } 
                //     />
                //     <Route 
                //         path="categories" 
                //         element={
                //         <ProtectedRoute>
                //             <Admin section={'categories'} />
                //         </ProtectedRoute>
                //         } 
                //     />
                //     <Route 
                //         path="members" 
                //         element={
                //         <ProtectedRoute>
                //             <Admin section={'members'} />
                //         </ProtectedRoute>
                //         } 
                //     />
                //     <Route 
                //         path="pages" 
                //         element={
                //         <ProtectedRoute>
                //             <Admin section={'pages'} />
                //         </ProtectedRoute>
                //         } 
                //     />
                // </Route> 