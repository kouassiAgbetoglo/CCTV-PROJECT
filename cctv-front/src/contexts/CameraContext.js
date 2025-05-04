
import React, { createContext, useState, useContext } from 'react';

const CameraContext = createContext();

export const CameraProvider = ({ children }) => {
    const [selectedCamera, setSelectedCamera] = useState(null);

    const selectCamera = (cameraId) => {
        setSelectedCamera(cameraId);
    };

    return (
        <CameraContext.Provider value={{ selectedCamera, selectCamera }}>
            {children}
        </CameraContext.Provider>
    );
};

export const useCameraContext = () => useContext(CameraContext);
