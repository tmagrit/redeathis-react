import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSession, logout, trackSession, getProfile } from './features/session/sessionSlice';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
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
import Invite from './components/Invite';

function App() {

  // REDUX SELECTORS
  const dispatch = useDispatch()
  const session = useSelector(state => state.session)

  // // TRACK ROUTES
  // const navigate = useNavigate();
  // const location = useLocation();  
  // const origin = location.state?.from?.pathname; //  || '/admin';
  // console.log('origin', origin);
  // useEffect(() => {
  //   dispatch(trackRoute(origin));

  //   return () => { 
  //     dispatch(trackRoute('/'));
  //   }
  // }, [])

    useEffect(() => {
    }, [session.sessionStatus])

    // GET AND TRACK SESSION 
    useEffect(() => {
      dispatch(getSession())
      dispatch(trackSession())
  
      return () => { 
        dispatch(logout());
      }
    }, [])

    // // GET PROFILE DATA 
    // useEffect(() => {
    //     if (session.sessionStatus === 'succeeded') {
    //         dispatch(getProfile())
    //       }
    //   }, [session.sessionStatus])


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
                {/* <Route 
                    path="signup" 
                    element={
                    <ProtectedRoute>
                        <Signup />
                    </ProtectedRoute>
                    } 
                /> */}
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
