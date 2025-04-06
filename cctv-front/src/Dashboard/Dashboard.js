import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from '../Components/Dashboard/Logout';
import LiveStream from '../Components/Dashboard/LiveStream';

const styles = {
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto',
        width: '75%',
        margin: '0 auto 0 auto',
        border: '2px solid black',
        padding: '10px 10px 10px 10px',
    },

    videoContainer: {
        border: '1px solid black',
        gridColumn: '1/5',
    },

    logoutContainer: {
        gridColumn: '5/5',
    },  
};

const Dashbord = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // 👈 Initial loading state

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch('/auth/secured-auth', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (res.status === 200) {
                    setLoading(false); //  Auth OK, allow rendering
                } else {
                    navigate('/', { replace: true }); //  Redirect if not logged in
                }
            } catch (error) {
                console.error('Session check failed:', error);
                navigate('/', { replace: true });
            }
        };

        checkSession();
    }, [navigate]);

    if (loading) return null; // Or show a spinner like <Loading />

    return (
        <div className='gridContainer' style={styles.gridContainer}>
            <div className='videoCaptureContainer' style={styles.videoContainer}>
                <LiveStream />
            </div>
            <div className='logoutContainer' style={styles.logoutContainer}>
                <div style={{ textAlign: 'center' }}>
                    <Logout />
                </div>
            </div>
        </div>
    );
};

export default Dashbord;
