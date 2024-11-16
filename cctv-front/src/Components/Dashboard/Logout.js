import logout from '../../Assests/exit_to_app.svg';
import { Link } from 'react-router-dom';

const Logout = () => {
    return (
        <>
            <Link to='/'>
                <img src={logout} alt='logout' style={{width: '60px', height: '60px'}}/>
            </Link>
        </>
    );
}

export default Logout;