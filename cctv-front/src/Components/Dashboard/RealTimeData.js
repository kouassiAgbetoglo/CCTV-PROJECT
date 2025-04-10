import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const RealTimeData = () => {
    const [message, setMessage] = useState('Waiting for data...');
    const socket = io('http://localhost:5000'); // Replace with your server's address and port

    useEffect(() => {
        // Connect to the server and join the "test1" room
        socket.on('connect', () => {
            console.log('Connected to server');
            socket.emit('joinRoom', 'CAM-HP52AMY3-F542'); // Join the "test1" room
        });

        // Listen for real-time data from the server
        socket.on('dataFromCamera', (data) => {
            // Update the displayed message with the data received from the server
            if (data) {
                console.log(4);
                setMessage('Received Data: ' + data);
            }
        });

        // Cleanup when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, [socket]);


    return (
        <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h1>Real-Time Data from Server - Room: test1</h1>
            <div style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold' }}>
                {message}
            </div>
        </div>
    );
};

export default RealTimeData;
