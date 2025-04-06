"""import requests

SIGNUP_URL = 'http://localhost:5000/timer'

def submit_form():
        obj = {'name':'whateever'}
        resp = requests.post(SIGNUP_URL, data = obj)        
        
if __name__ == '__main__':
            submit_form()"""





PORT = 5000
DATABASE_URL = mongodb://127.0.0.1:27017/DroneViewer
SESSION_KEY = '71db43b3c4da2afa7df764c0c78867fb858375a64ff9e45d258e758c965f173fc94c5cb0182ccfa7be4b59a76434b5119ac595fb2c743229c669dae605cf1f21'






import socketio
import cv2
import base64
import numpy as np

sio = socketio.Client()

@sio.on('messageFromServer')  
def on_message(data):
    print(f"Server says: {data}")

def encode_frame(frame):
    """Convert OpenCV frame to base64 string"""
    _, buffer = cv2.imencode('.jpg', frame)
    return base64.b64encode(buffer).decode('utf-8')

def main():
    sio.connect("http://localhost:5000")  # Connect to WebSocket server
    cap = cv2.VideoCapture(0)  # Capture from webcam (0 = default camera)

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        encoded_frame = encode_frame(frame)
        sio.emit("frameFromClient", encoded_frame)  # Send frame to server
        print(encode_frame)
        cv2.imshow("Client", frame)  # Show the frame locally

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    sio.disconnect()

if __name__ == "__main__":
    main()