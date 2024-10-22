import LoginForm from '../Components/Authentication/LoginForm';
import Dashboard from '../Components/Dashboard/Dashboard';
import React from 'react';

const Home = () => {
    
    const [isLogged, setIsLogged] = React.useState(false);
    const handleLogin = (e) => {
        e.preventDefault(); // Prevent from submitting form when page is loaded
        console.log('Logged in');
        setIsLogged(true);
    }
    return (
        <>
            {/* WHY THE NAVBAR IS SHOWN IN THE DASHBOARD */}
            {isLogged ? <Dashboard /> : <LoginForm submited={handleLogin}/>}
        </>
    )

};

export default Home;