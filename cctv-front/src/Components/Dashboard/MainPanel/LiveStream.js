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
            socket.emit('joinRoom', roomId); // Utilisation de la prop cameraId
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
    }, [roomId]); // Ajout de roomId comme dépendance

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            backgroundColor: '#000' // Fond noir pour les zones non couvertes
        }}>
            {error ? (
                <div style={{ color: 'red' }}>{error}</div>
            ) : (
                <img
                    ref={imgRef}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', // Remplit tout l'espace en conservant le ratio
                        display: 'block'
                    }}
                    alt="Live Feed"
                    onError={() => setError('Failed to load video feed.')}
                />
            )}
        </div>
    );
};

export default LiveStream;