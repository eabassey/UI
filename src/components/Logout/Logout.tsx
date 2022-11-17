
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../hooks/useStore';
import './Logout.css';


export const Logout = () => {
    const navigate = useNavigate();
    const logout = useStore(state => state.logout);
    return (
        <span 
        className="Logout" 
        onClick={() => {
            logout().then(() => navigate('/login'))
        }}>
            Logout
        </span>
    )
}
