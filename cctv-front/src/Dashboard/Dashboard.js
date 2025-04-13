import { useState } from 'react';
import Logout from '../Components/Dashboard/Logout';
import LiveStream from '../Components/Dashboard/LiveStream';
import CameraList from '../Components/Dashboard/LeftPanel/CameraList';
import AddCameraButton from '../Components/Dashboard/LeftPanel/AddCameraButton';
import DeleteCameraButton from '../Components/Dashboard/LeftPanel/DeletteCameraButton';
import RefreshButton from '../Components/Dashboard/LeftPanel/RefreshButton';
import SettingsButton from '../Components/Dashboard/LeftPanel/SettingsButton';
import ProfileButton from '../Components/Dashboard/LeftPanel/ProfileButton';
import LogoutButton from '../Components/Dashboard/LeftPanel/LogoutButton';
import ThemeToggleButton from '../Components/Dashboard/LeftPanel/ThemeToggleButton';

const lightTheme = {
    contentContaier: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f0f2f5',
        color: '#333333',
        fontFamily: 'Segoe UI, sans-serif',
    },
    leftColumn: {
        position: 'absolute',
        top: '0%',
        left: '0%',
        width: '25%',
        height: '100%',
        backgroundColor: '#ffffff',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '2rem',
        borderRight: '1px solid #cccccc',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.05)',
    },
    leftColumnItem1: {
        width: '100%',
    },
    leftColumnItem2: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
    },
    centerColumn: {
        position: 'absolute',
        top: '0%',
        right: '0%',
        width: '75%',
        height: '100%',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'auto',
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        border: '2px solid #e0e0e0',
        padding: '10px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    },
    videoContainer: {
        border: '1px solid black',
        gridColumn: '1/5',
        backgroundColor: '#ffffff', 
    },
    logoutContainer: {
        gridColumn: '5/5',
    },
};

const darkTheme = {
    ...lightTheme, // on hérite pour ne pas tout réécrire
    contentContaier: {
        ...lightTheme.contentContaier,
        backgroundColor: '#121212',
        color: '#ffffff',
    },
    leftColumn: {
        ...lightTheme.leftColumn,
        backgroundColor: '#1e1e1e',
        borderRight: '1px solid #2e2e2e',
    },
    gridContainer: {
        ...lightTheme.gridContainer,
        backgroundColor: '#1a1a1a',
        border: '2px solid #333333',
    },
    videoContainer: {
        ...lightTheme.videoContainer,
        backgroundColor: '#000',
        border: '1px solid #444444',
    },
};

const Dashboard = () => {
    const [theme, setTheme] = useState('light');
    const styles = theme === 'light' ? lightTheme : darkTheme;
    const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

    return (
        <div className='contentContainer' style={styles.contentContaier}>
            <div className='leftColumn' style={styles.leftColumn}>
                <div>
                    <div className="leftColumnItem1" style={styles.leftColumnItem1}>
                        <CameraList />
                    </div>

                    <div className="leftColumnItem2" style={styles.leftColumnItem2}>
                        <AddCameraButton />
                        <DeleteCameraButton />
                        <RefreshButton />
                        <SettingsButton />
                        <ProfileButton />
                        <LogoutButton />
                    </div>
                </div>

                {/* Theme switcher (en bas à droite du panneau gauche) */}
                <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} position="right" />
            </div>

            <div className='centerColumn' style={styles.centerColumn}>
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
            </div>
        </div>
    );
};

export default Dashboard;
