import Logout from '../Components/Dashboard/Logout';
import LiveStream from '../Components/Dashboard/LiveStream';
import CameraList from '../Components/Dashboard/LeftPanel/CameraList';
import Settings from '../Components/Dashboard/LeftPanel/Settings';




const styles = {

    contentContaier: {
        width: '100%',
        height: '100%',
    },

    leftColumn: {
        position: 'absolute',
        top: '0%',
        left: '0%',
        width: '15%',
        height: '100%',
        backgroundColor: '#f5f5f5',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
    },

    leftColumnItem1: {
        position: 'absolute',
        top: '20%',
    },

    leftColumnItem2: {
        position: 'absolute',
        bottom: '20%',
    },

    centerColumn: {
        position: 'absolute',
        top: '0%',
        right: '15%',
        width: '70%',
        height: '100%',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'auto',
    },
    
    rightColumn: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '15%',
        height: '100%',
        backgroundColor: '#f5f5f5',
        padding: '1rem',
    },

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
    
    return (
        <div className='contentContainer' style={styles.contentContaier}>

            <div className='leftColumn' style={styles.leftColumn}>
                <div style={styles.leftColumnItem1}>
                    <CameraList />
                </div>
               
                <div style={styles.leftColumnItem2}>
                    <Settings />
                </div>

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

            <div className='rightColumn' style={styles.rightColumn}>

            </div>

        </div>
    );
};

export default Dashbord;
