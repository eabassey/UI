import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";


export const PublicRouteGuard = ({children, path}: any) => {
    const location = useLocation();
    const access_token = window.localStorage.getItem('jwt_access_token');
    const navigate = useNavigate();
    
    useEffect(() => {
        const pathname = location.pathname;
        if (access_token && pathname === path) {
            navigate(-1);
        }
    });

    
    return children;
}