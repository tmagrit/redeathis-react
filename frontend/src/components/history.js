import { useLocation, useNavigate } from "react-router-dom";



export function useHistory() {

    const navigate = useNavigate();
    const location = useLocation();
  
    const pathArray = location.pathname.split('/').filter(Boolean);
  
    return {
      push: navigate,
      go: navigate,
      refresh: () => navigate(0),
      goBack: () => navigate(-1),
      goForward: () => navigate(1),
      pathArray,
      location,
    };
  };
