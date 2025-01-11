import LoginForm from '../Components/Authentication/LoginForm';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate(); // Import useNavigate



    const handleLogin = (event) => {
        event.preventDefault(); // Prevent from submitting form when page is loaded
        let {username, password} = event.target.elements;
        console.log({username: username.value, password: password.value });
        username =  username.value;
        password = password.value;
        // Mock user data
        const users = {username: 'admin', password: 'admin' };
        
        fetch('/auth/').then(
            res=> {
                console.log(res);
            }
        ).catch(err => {
            console.error(err);
        });

        
        
        // Check if user exists and password is correct
        /*
        const checkUser = (user, password) => {
            return users.username === user && users.password === password ? true : false;
        };

        if (checkUser(username, password)) { 
            navigate('/dashboard', {replace: true}); // Redirect to dashboard when logged in
        };
        */

    }

    return (
        <>
            <LoginForm submited={handleLogin}/>
        </>
    )

};

export default Home;