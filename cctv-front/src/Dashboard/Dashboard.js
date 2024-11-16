import VideoCapture from '../Components/Dashboard/VideoCapture';
import Logout from '../Components/Dashboard/Logout'

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

}

const Dashbord = () => {
    return (
        <div className='gridContainer' style={styles.gridContainer}>
            <div className='videoCaptureContainer' style={styles.videoContainer}>
                <VideoCapture />
            </div>
            <div className='logoutContainer' style={styles.logoutContainer}>
                <div style={{textAlign: 'center'}}>
                    <Logout />
                </div>
            </div>
        </div>
    )
}

export default Dashbord;

