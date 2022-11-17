import { Navigate } from "react-router-dom";


export const PrivateRouteGuard = ({children}: any) => {
    const user = window.localStorage.getItem('user');
    if (!user) {
        return <Navigate to="/login" />
    }
    
    return children;
}