import {useContext} from "react"
import { Navigate } from "react-router-dom";
import {AppContent} from "../../context/AppContext";


export const PrivateRoute = ({ children }) => {
    const { isLoggedin, loadingUser } = useContext(AppContent);
    if (loadingUser) return null; 
    return isLoggedin ? children : <Navigate to="/login" />;
  };
  
  export const PublicRoute = ({ children }) => {
    const { isLoggedin, loadingUser } = useContext(AppContent);
    if (loadingUser) return null;
    return !isLoggedin ? children : <Navigate to="/" />;
  };

  export const AdminRoute = ({ children }) => {
    const { userRole, loadingUser } = useContext(AppContent);
    if (loadingUser) return null;
  
    return userRole === "admin" ? children : <Navigate to="/profile" />;
  };

