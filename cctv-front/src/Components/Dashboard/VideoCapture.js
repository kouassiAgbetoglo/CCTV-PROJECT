import droneVideo from '../../Assests/drone_video.mp4'

const styles = {

    videoWrapper: {
        width: '100%',
        height: '100%',
    },

    videoElement: {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
    }

}

const VideoCapture = () => {
    return (
        <div className='videoWrapper'>
            <video
            style={styles.videoElement}
            controls
            >
                <source src={droneVideo} type='video/mp4' />
            </video>
        </div>
    );
}

export default VideoCapture;