import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import getCameraId from '../LeftPanel/getCameraId';
import LiveStream from './LiveStream';

const StreamContainer = () => {
  const [cameraId, setCameraId] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const cameras = await getCameraId();
      if (cameras) {
        setCameraId(cameras);
      }
    };
    fetchData();
  }, []);

  const cameraCount = cameraId.length;
  const gridSize = Math.ceil(Math.sqrt(cameraCount));

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        width: '100%',
        height: '100%',
        gap: '8px',
        boxSizing: 'border-box'
      }}
    >
      {cameraId.map((camera, index) => (
        <Box
          key={index}
          sx={{
            boxSizing: 'border-box',
            overflow: 'hidden',
            position: 'relative',
            border: '2px solid #444',
          }}
        >
          <LiveStream cameraId={camera} />
        </Box>
      ))}
    </Box>
  );
};

export default StreamContainer;