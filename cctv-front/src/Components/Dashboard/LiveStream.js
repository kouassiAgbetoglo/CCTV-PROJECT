import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const LiveStream = () => {
    const imgRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const socket = io({
            withCredentials: true
        });

        // Connect to the server and join the corresponding room
        socket.on('connect', () => {
            console.log('Connected to server');
            socket.emit('joinRoom', 'CAM-HP52AMY3-F542');
        });

        

        // Listen for real-time data from the server
        socket.on('dataFromCamera', (data) => {
            // Update the displayed image with the data received from the server
            if (imgRef.current) {
                imgRef.current.src = 'data:image/jpeg;base64,' + data;
            }
        });

        // Handle socket errors
        socket.on('connect_error', (err) => {
            console.error('Connection error: ', err);
            setError('Failed to connect to the server');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Live Video Stream</h2>
            {error ? (
                <div style={{ color: 'red' }}>{error}</div>
            ) : (
                <img
                    ref={imgRef}
                    width="640"
                    height="480"
                    alt="Live Feed"
                    onError={() => setError('Failed to load video feed.')}
                />
            )}
        </div>
    );
};

export default LiveStream;
