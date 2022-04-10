import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { supabase } from './services/supabaseClient'

import { getSession, logout, trackSession } from './features/session/sessionSlice'
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import './App.css';

import Dashboard from './components/Dashboard';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Invite from './components/Invite';

function App() {

  // REDUX SELECTORS
  const dispatch = useDispatch()
  const session = useSelector(state => state.session)
  const authListener = useSelector(state => state.session.authListener)
  
  // GET AND TRACK SESSION 
  useEffect(() => {
    dispatch(getSession())
    dispatch(trackSession())

    return () => { 
      dispatch(logout());
    }
  }, [])

  return (

    <Routes>
      <Route index element={<Signin />} />
      <Route path="signin" element={<Signin />} />
      <Route path="invite" element={<Invite />} />
      <Route path="signup" element={<Signup />} />
      <Route path="admin" element={<Dashboard />} />
    </Routes>

   
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a 
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div> 
  );
}

export default App;
