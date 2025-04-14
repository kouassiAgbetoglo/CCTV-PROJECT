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
    contentContainer: {
        width: '100vw', // Utilisation de vw au lieu de %
        height: '100%',
        fontFamily: 'Segoe UI, sans-serif',
        display: 'grid',
        gridTemplateColumns: 'minmax(200px, 20%) 1fr', // Colonne gauche avec largeur minimale
        gridTemplateRows: '1fr',
        overflow: 'hidden', // Empêche tout débordement
        minWidth: '320px', // Largeur minimale pour éviter l'écrasement
        minHeight: '480px' // Hauteur minimale
    },

    leftColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRight: '1px solid #cccccc',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.05)',
    },

    mainColumn: {
        padding: '1rem',
        border: '1px solid black',
        overflow: 'hidden', // Change de 'auto' à 'hidden' pour contenir les enfants
        position: 'relative', // Maintenu pour le positionnement
        minWidth: '300px', // Largeur minimale absolue
    },
    themeToggleContainer: {
        position: 'relative', // Change de 'absolute' à 'sticky'
        alignSelf: 'flex-end',
        zIndex: 10,
        marginBottom: '0.5%',
    },

    fixedBottomDiv: {
        position: 'fixed',
        bottom: '5%',
        left: '0',
        width: '20%', // Même largeur que leftColumn
        padding: '1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderTop: '1px solid #ccc',
        zIndex: 100,
        boxSizing: 'border-box'
    }
};


const lightTheme = {
    ...baseTheme,
    contentContainer: {
        ...baseTheme.contentContainer,
        backgroundColor: '#f0f2f5',
        color: '#333333',
    },
    leftColumn: {
        ...baseTheme.leftColumn,
        backgroundColor: '#ffffff',
    },
    mainColumn: {
        ...baseTheme.mainColumn,
        backgroundColor: '#ffffff',
    },
};

const darkTheme = {
    ...baseTheme,
    contentContainer: {
        ...baseTheme.contentContainer,
        backgroundColor: '#121212',
        color: '#ffffff',
    },
    leftColumn: {
        ...baseTheme.leftColumn,
        backgroundColor: '#1e1e1e',
        borderRight: '1px solid #2e2e2e',
    },
    mainColumn: {
        ...baseTheme.mainColumn,
        backgroundColor: '#1a1a1a',
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
        <div className='contentContainer' style={styles.contentContainer}>
            <div className='leftColumn' style={styles.leftColumn}>
                <div style={{ width: '100%', paddingLeft: '5%' }}> {/* Conteneur pour le décalage */}
                    <CameraList key={refreshKey} />
                    <div style={{ marginBottom: '2.5%' }}><AddCameraButton /></div>
                    <div style={{ marginBottom: '2.5%' }}><DeleteCameraButton /></div>
                    <div style={{ marginBottom: '2.5%' }}><RefreshButton onRefresh={handleRefresh} /></div>
                    <div style={{ marginBottom: '2.5%' }}><SettingsButton /></div>
                    <div style={{ marginBottom: '2.5%' }}><ProfileButton /></div>
                    <div style={{ marginBottom: '2.5%' }}><LogoutButton /></div>
                </div>
            </div>

            <div className='mainColumn' style={styles.mainColumn}>
                <div style={styles.themeToggleContainer}>
                    <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
                </div>
            
                <div style={{
                    width: '100%',
                    height: 'calc(100% - 40px)', // Réserve de l'espace pour le toggle
                    overflow: 'auto',
                    boxSizing: 'border-box'
                }}>
                    <StreamContainer key={refreshKey} />
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
