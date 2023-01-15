import * as React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

  const ProtectedRoute = ({ children }) => {

    // REDUX SELECTORS
    const session = useSelector(state => state.session)

    // REMEMBER LOCATION REACT ROUTER DOM
    const location = useLocation();
  
    if (session?.session?.user?.aud === "authenticated") {
      return children;
    }
  
    return <Navigate to="/signin" replace state={{ from: location }} />;
  };

  export default ProtectedRoute;