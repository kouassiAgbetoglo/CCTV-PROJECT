from threading import Thread, Lock
from time import time, sleep
import cv2 as cv

class Video():
    """
    A class to handle video capture from a webcam or a video file,
    using multithreading for efficient frame retrieval.
    """

    stopped = True  # Flag to control the video thread
    lock = None  # Thread lock for safe access to shared resources

    def __init__(self):
        """Initialize the video class with threading lock and state variables."""
        self.lock = Lock()  # Create a thread lock object
        self.cam_open = False  # Flag to check if the camera is open
        self.frame = None  # Store the current frame
        self.prev_time = time()
    
    def StartVideo(self, video_name=None, cam_on=True):
        """
        Start capturing video from a webcam or a file.
        
        :param video_name: Path to the video file (if using a file)
        :param cam_on: Boolean flag to determine if webcam should be used
        """
        if self.cam_open:  # Release cam if already in use
            self.ReleaseCam()

        if cam_on:  # Use webcam as the video source
            self.cap_video = cv.VideoCapture(0)
            self.video_from_cam = True
            self.cam_open = self.cap_video.isOpened() 
        elif not cam_on and video_name:  # Use a video file as the source
            self.cap_video = cv.VideoCapture(video_name)
            self.video_from_cam = False
        else:
            return
        
        self.cam_open = self.cap_video.isOpened() 


         # Check if the camera opened successfully

    def ReleaseCam(self): 
        """Release the camera or video file when done."""
        if self.cam_open and self.cap_video:
            self.cap_video.release()
            self.cam_open = False

    def start(self):
        """Start the video capture thread."""
        self.stopped = False 
        t = Thread(target=self.run, daemon=True)
        t.start()

    def stop(self):
        """Stop the video capture thread."""
        self.stopped = True

    def run(self):
        """Capture video frames in a separate thread."""
        while not self.stopped:
            ret, frame = self.cap_video.read()
            if not ret:  # Stop the thread if frame is not valid
                self.stop()
                break

            self.lock.acquire()  # Lock the thread while updating the frame
            self.frame = frame.copy()  # Copy the current frame
            self.lock.release()  # Release the lock after updating
            
            sleep(0.01)  # Small delay to prevent high CPU usage

    def get_frame(self):
        """Retrieve the latest video frame safely."""
        self.lock.acquire()
        frame_copy = None if self.frame is None else self.frame.copy()
        self.lock.release()
        return frame_copy

    def GetFps(self):
        current_time = time()
        fps = 1 / (current_time - self.prev_time)
        self.prev_time = current_time
        return fps
         


if __name__ == "__main__":
    video = Video()
    video.StartVideo(cam_on=True)
    video.start()
    
    while True:
        frame = video.get_frame()
        if frame is not None:
            cv.putText(frame, f"FPS: {int(video.GetFps())}", (10, 30),
                    cv.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            cv.imshow("Video", frame)
        
        if cv.waitKey(1) & 0xFF == ord('q'):
            break
    
    video.stop()
    video.ReleaseCam()
    cv.destroyAllWindows()