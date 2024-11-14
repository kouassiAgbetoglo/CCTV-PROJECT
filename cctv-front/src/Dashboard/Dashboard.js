import VideoCapture from '../Components/Dashboard/VideoCapture';
import Logout from '../Components/Dashboard/Logout'
import UserSettings from '../Components/Dashboard/UserSettings';
import Pose from '../Components/Dashboard/Pose'
import Battery from '../Components/Dashboard/Battery';
import FlightTime from '../Components/Dashboard/FlightTime';

const styles = {
    videoContainer: {
        border: '1px solid black',
        marginTop: '10px',
    },

    logoutContainer: {
        border: '1px solid black',
        marginTop: '10px',
    },

    userSettingsContainer: {
        border: '1px solid black',
        marginTop: '10px',
    },

    poseContainer: {
        border: '1px solid black',
        marginTop: '10px',
    },

    batteryContainer: {
        border: '1px solid black',
        marginTop: '10px',
    },

    FlightTimeContainer: {
        border: '1px solid black',
        marginTop: '10px',
    },


}

const Dashbord = () => {
    return (
        <div>
            <h1>This is the dashbord page.</h1>
            <div className='videoCaptureContainer' style={styles.videoContainer}>
                <VideoCapture />
            </div>
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
    )
}

export default Dashbord;