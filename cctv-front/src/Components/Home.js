import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import React from 'react';

const Home = () => {

    const [isLogged, setIsLogged] = React.useState(false);

    const handleLogin = (e) => {
        e.preventDefault(); // Prevent from submitting form when page is loaded
        console.log('Logged in');
        setIsLogged(true);
    }

    return isLogged ? <Dashboard /> : <LoginForm submited={handleLogin}/>;

};

export default Home;