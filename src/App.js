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
// COMPONENTS
import MainDashboard from './components/MainDashboard';
import MainResearch from './components/MainResearch';
import CreateResearch from './components/CreateResearch';
import EditResearch from './components/EditResearch';
// PAGES
import Home from './components/Home';
import Admin from './pages/Admin';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
// MY HISTORY HOOK
import { useHistory } from './components/history';
import ManageAll from './components/ManageAll';

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
    
        return () => { 
            if(session?.event === 'SIGNED_IN')
                dispatch(updateProfile(session.profile))
            //dispatch(logout()); //TODO - PROBLEM: REFRESHING PAGE LOGOUT THE USER
        }
    }, [])

    // GET MEMBERS AND RESEARCH STATES
    useEffect(() => {
        dispatch(getMembers());
        dispatch(getProfileRoles());
        dispatch(getRoles());
        dispatch(getOrganizations());
        dispatch(getResearch());
        dispatch(getCategories());
        dispatch(getStatuses());
    }, [])

    // TRACK ROUTES 
    useEffect(() => {
        dispatch(updateProfileSection(history?.pathArray[2] || ''));
        dispatch(updateProfileContext(history?.pathArray[3] || ''));
    }, [history.location]);

    if(session.sessionStatus === 'succeeded') {
        return (
            <Routes>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="signin" element={<Signin />} />
                <Route path="signup" element={<Signup />} />
                {/* PRIVATE ROUTE */}
                <Route 
                    path="admin/*" 
                    element={
                        <ProtectedRoute>
                            <Admin />
                        </ProtectedRoute>
                    } 
                >
                    <Route index element={<MainDashboard />} />
                    <Route path="research" element={<MainResearch />} />
                    <Route path="research/all" element={<ManageAll />} />
                    <Route path="research/create" element={<CreateResearch />} />
                    <Route path="research/edit/:researchId" element={<EditResearch />} />


                    <Route path="categories" element={<MainDashboard />} >
                        
                    </Route>
                    <Route path="members" element={<MainDashboard />} >
                        
                    </Route>
                    <Route path="pages" element={<MainDashboard />} >
                        
                    </Route>
                </Route>    
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