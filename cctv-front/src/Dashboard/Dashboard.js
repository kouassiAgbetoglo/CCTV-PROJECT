import VideoCapture from '../Components/Dashboard/VideoCapture';
import Logout from '../Components/Dashboard/Logout'
import UserSettings from '../Components/Dashboard/UserSettings';
import Pose from '../Components/Dashboard/Pose'
import Battery from '../Components/Dashboard/Battery';
import FlightTime from '../Components/Dashboard/FlightTime';

const styles = {

    gridContainer: {
        width: '75%',
        margin: '0 auto 0 auto',
    },

    videoContainer: {
        border: '1px solid black',
        marginTop: '10px',
        width: '90%',
        height: '480px'
    },

    logoutContainer: {
        border: '1px solid black',
        marginTop: '10px',
        width: '60px',
        height: '60px',
    },

    userSettingsContainer: {
        border: '1px solid black',
        marginTop: '10px',
        width: '60px',
        height: '60px',
    },

    poseContainer: {
        border: '1px solid black',
        marginTop: '10px',
        width: '60px',
        height: '60px',
    },

    batteryContainer: {
        border: '1px solid black',
        marginTop: '10px',
        width: '60px',
        height: '60px',
    },

    FlightTimeContainer: {
        border: '1px solid black',
        marginTop: '10px',
        width: '60px',
        height: '60px',
    },


}

const Dashbord = () => {
    return (
        <div className='gridContainer' style={styles.gridContainer}>
            <div className='videoCaptureContainer' style={styles.videoContainer}>
                <VideoCapture />
            </div>
            <div style={{width: '60px'}}>
                <div className='logoutContainer' style={styles.logoutContainer}>
                    <Logout />
                </div>
                <div className='userSettingsContainer' style={styles.userSettingsContainer}>
                    <UserSettings />
                </div>
                <div className='poseContainer' style={styles.poseContainer}>
                    <Pose />
                </div>
                <div className='batteryContainer' style={styles.batteryContainer}>
                    <Battery />
                </div>
                <div className='flightTimeContainer' style={styles.FlightTimeContainer}>
                    <FlightTime />
                </div>
            </div>
        </div>
    )
}

export default Dashbord;