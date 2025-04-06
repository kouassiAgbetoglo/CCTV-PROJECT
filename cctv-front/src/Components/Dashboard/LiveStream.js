import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const LiveStream = () => {
    const imgRef = useRef(null);

    useEffect(() => {
        const socket = io({
            withCredentials: true
        });

        socket.on('frameFromServer', (data) => {
            if (imgRef.current) {
                imgRef.current.src = 'data:image/jpeg;base64,' + data;
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Live Video Stream</h2>
            <img ref={imgRef} width="640" height="480" alt="Live Feed" />
        </div>
    );
};

export default LiveStream;
