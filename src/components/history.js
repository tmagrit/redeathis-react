//import * as React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateProfileSection, updateProfileContext } from '../features/sessionSlice';
import { useLocation, useNavigate } from "react-router-dom";



export function useHistory() {

    const navigate = useNavigate();
    const location = useLocation();
  
    const pathArray = location.pathname.split('/');
  
    return {
      push: navigate,
      go: navigate,
      goBack: () => navigate(-1),
      goForward: () => navigate(1),
      pathArray,
      location,
    };
  };
