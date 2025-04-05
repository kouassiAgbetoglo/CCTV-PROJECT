import logout from '../../Assests/exit_to_app.svg';
import { useNavigate } from 'react-router-dom';



const Logout = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                navigate('/');
            } else {
                console.error('Logout failed');
            }
        } catch (err) {
            console.error('Network error during logout:', err);
        }
    };


    return (
        <img 
            src={logout} 
            alt='logout' 
            onClick={handleLogout}
            style={{width: '60px', height: '60px'}}
        />
    );
}

export default Logout;