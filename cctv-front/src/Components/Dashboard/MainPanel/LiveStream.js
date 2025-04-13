import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const LiveStream = (props) => {
    const imgRef = useRef(null);
    const [error, setError] = useState(null);

    const roomId = props.cameraId;

    useEffect(() => {
        const socket = io({ withCredentials: true });

        socket.on('connect', () => {
            console.log('Connected to server');
            socket.emit('joinRoom', 'CAM-HP52AMY3-F542');
        });

        socket.on('dataFromCamera', (data) => {
            if (imgRef.current) {
                imgRef.current.src = 'data:image/jpeg;base64,' + data;
            }
        });

        socket.on('connect_error', (err) => {
            console.error('Connection error: ', err);
            setError('Failed to connect to the server');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            {error ? (
                <div style={{ color: 'red' }}>{error}</div>
            ) : (
                <img
                    ref={imgRef}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', // you can change to 'contain' if needed
                    }}
                    alt="Live Feed"
                    onError={() => setError('Failed to load video feed.')}
                />
            )}
        </div>
    );
};

export default LiveStream;
