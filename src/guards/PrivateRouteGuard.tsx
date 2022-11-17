import { Navigate } from "react-router-dom";


export const PrivateRouteGuard = ({children}: any) => {
    const access_token = window.localStorage.getItem('jwt_access_token');
    if (!access_token) {
        return <Navigate to="/login" />
    }
    
    return children;
}