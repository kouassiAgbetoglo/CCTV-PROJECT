import { useState } from 'react';
import CameraList from '../Components/Dashboard/LeftPanel/CameraList';
import AddCameraButton from '../Components/Dashboard/LeftPanel/AddCamera/AddCameraButton';
import DeleteCameraButton from '../Components/Dashboard/LeftPanel/DeleteCamera/DeletteCameraButton';
import RefreshButton from '../Components/Dashboard/LeftPanel/RefreshButton';
import SettingsButton from '../Components/Dashboard/LeftPanel/SettingsButton';
import ProfileButton from '../Components/Dashboard/LeftPanel/ProfileButton';
import LogoutButton from '../Components/Dashboard/LeftPanel/LogoutButton';
import ThemeToggleButton from '../Components/Dashboard/LeftPanel/ThemeToggleButton';
import StreamContainer from '../Components/Dashboard/MainPanel/StreamContainer';


const baseTheme = {
    contentContaier: {
        width: '100%',
        height: '100%',
        fontFamily: 'Segoe UI, sans-serif',
    },
    leftColumn: {
        position: 'absolute',
        top: '0%',
        left: '0%',
        width: '20%',
        height: '100%',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '2rem',
        borderRight: '1px solid #cccccc',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.05)',
    },
    mainColumn: {
        position: 'absolute',
        top: '0%',
        right: '0%',
        width: '80%',
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
    },
    logoutContainer: {
        gridColumn: '5/5',
    },
};

const lightTheme = {
    ...baseTheme,
    contentContaier: {
        ...baseTheme.contentContaier,
        backgroundColor: '#f0f2f5',
        color: '#333333',
    },
    leftColumn: {
        ...baseTheme.leftColumn,
        backgroundColor: '#ffffff',
    },
    gridContainer: {
        ...baseTheme.gridContainer,
        backgroundColor: '#ffffff',
    },
    videoContainer: {
        ...baseTheme.videoContainer,
        backgroundColor: '#ffffff',
    },
};

const darkTheme = {
    ...lightTheme,
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

    const [refreshKey, setRefreshKey] = useState(0);
    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <>
            <div className='contentContainer' style={styles.contentContaier}>
                <div className='leftColumn' style={styles.leftColumn}>
                        <CameraList key={refreshKey} />
                        <AddCameraButton />
                        <DeleteCameraButton />
                        <RefreshButton onRefresh={handleRefresh} />
                        <SettingsButton />
                        <ProfileButton />
                        <LogoutButton />
                    {/* Theme switcher */}
                    <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} position="right" />
                </div>

                <div className='mainColumn' style={styles.mainColumn}>
                    <StreamContainer key={refreshKey}/>
                </div>
            </div>

        </>
    );
};

export default Dashboard;
