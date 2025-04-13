import LoginForm from '../Components/Authentication/LoginForm';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate(); // Import useNavigate

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent from submitting form when page is loaded
        const username =  event.target.elements.username.value; 
        const password = event.target.elements.password.value;
        const loginUrl = '/auth/login/';

        // Request

        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                body: JSON.stringify({ username, password }), // Use variables instead of hardcoded values
                headers: {
                    "Content-Type": 'application/json',
                },
                credentials: 'include',
            });
    
            // Check if the response is successful
            if (!response.ok) {
                const errorData = await response.json(); // Parse error response as JSON
                console.error(errorData.message); // Log the error message from the server
            } else {
                const data = await response.json(); // Parse success response as JSON

                // Use token to validate connection later
                if (data.message === 'Connected.') {
                    navigate('/dashboard', {replace: true}); // Redirect to dashboard when logged in
                }

            }
        } catch (error) {
            console.error('Network error:', error.message); // Log any network or other errors
        }
    }

    return (
        <>
            <LoginForm submited={handleLogin}/>
        </>
    )

};

export default Home;