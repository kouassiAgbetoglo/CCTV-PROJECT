import LoginForm from '../Components/Authentication/LoginForm';
import Dashboard from '../Components/Dashboard/Dashboard';
import React from 'react';

const Home = () => {
    const [isLogged, setIsLogged] = React.useState(false);
    const handleLogin = (event) => {
        event.preventDefault(); // Prevent from submitting form when page is loaded
        let {username, password} = event.target.elements;
        // console.log({username: username.value, password: password.value });
        username =  username.value;
        password = password.value;
        // Mock user data
        const users = {username: 'admin', password: 'admin' };
        
        // Check if user exists and password is correct
        const checkUser = (user, password) => {
            return users.username === user && users.password === password ? true : false;
        };

        if (checkUser(username, password)) { 
            // console.log('logged in')
            setIsLogged(true);
        };

    }

    return (
        <>
            
            {/* WHY THE NAVBAR IS SHOWN IN THE DASHBOARD */}
            {isLogged ? <Dashboard /> : <LoginForm submited={handleLogin}/>}
        </>
    )

};

export default Home;