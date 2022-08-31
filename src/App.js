import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSession, logout, trackSession, updateProfile, updateProfileSection, updateProfileContext } from './features/sessionSlice';
import { getMembers, getProfileRoles, getRoles, getOrganizations } from './features/membersSlice';
import { getResearch, getCategories, getStatuses, getAuthors, getResearchAuthors, getSources, getTags } from './features/researchSlice';
import { getPages } from './features/pagesSlice';
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
import CategoriesMain from './components/CategoriesMain';
import MembersIndex from './components/MembersIndex';
import MembersMain from './components/MembersMain';
import AuthorIndex from './components/AuthorIndex';
import PagesIndex from './components/PagesIndex';
import PagesMain from './components/PagesMain';
import PagesCreate from './components/PagesCreate';
import PagesEdit from './components/PagesEdit';

// PAGES
import Home from './pages/Home';
import ViewResearch from './pages/ViewResearch';
import Admin from './pages/Admin';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Institutional from './pages/Institutional';

// MY HISTORY HOOK
import { useHistory } from './components/history';


function App() {

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const session = useSelector(state => state.session);
    const pages = useSelector(state => state.pages.pages);

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
        dispatch(getPages());
        dispatch(getMembers());
        dispatch(getProfileRoles());
        dispatch(getRoles());
        dispatch(getOrganizations());
        dispatch(getResearch());
        dispatch(getCategories());
        dispatch(getStatuses());
        dispatch(getAuthors());
        dispatch(getResearchAuthors());
        dispatch(getSources());
        dispatch(getTags());
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
                <Route path="view/research/:researchId" element={<ViewResearch />} />
                <Route path="signin" element={<Signin />} />
                <Route path="signup" element={<Signup />} />

                {/* INSTITUTIONAL ROUTES */}
                <Route path="institutional/:pageSlug" element={<Institutional />} />

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
                    <Route path="research/authors" element={<AuthorIndex />} />


                    <Route path="categories" element={<CategoriesMain />} />
                        

                    {/* MEMBERS ROUTE */}
                    <Route path="members" element={<MembersMain />} />
                    <Route path="members/all" element={<MembersIndex />} />

                    {/* PAGES ROUTE */}
                    <Route path="pages" element={<PagesMain />} />
                    <Route path="pages/all" element={<PagesIndex />} />    
                    <Route path="pages/create" element={<PagesCreate />} />
                    <Route path="pages/edit/:pageId" element={<PagesEdit />} />
                        
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