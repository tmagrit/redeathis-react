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
import ResearchMain from './components/ResearchMain';
import ResearchCreate from './components/ResearchCreate';
import ResearchEdit from './components/ResearchEdit';
import ResearchIndex from './components/ResearchIndex';
import MembersIndex from './components/MembersIndex';
import MembersMain from './components/MembersMain';

// PAGES
import Home from './pages/Home';
import Admin from './pages/Admin';
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
        // dispatch(updateProfileSection(history?.pathArray[2] || ''));
        // dispatch(updateProfileContext(history?.pathArray[3] || ''));
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
                    {/* MAIN DASHBOARD */}
                    <Route index element={<MainDashboard />} />

                    {/* RESEARCH ROUTE */}
                    <Route path="research" element={<ResearchMain />} />
                    <Route path="research/all" element={<ResearchIndex />} />
                    <Route path="research/create" element={<ResearchCreate />} />
                    <Route path="research/edit/:researchId" element={<ResearchEdit />} />


                    <Route path="categories" element={<MainDashboard />} >
                        
                    </Route>

                    {/* MEMBERS ROUTE */}
                    <Route path="members" element={<MembersMain />} />
                    <Route path="members/all" element={<MembersIndex />} />


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