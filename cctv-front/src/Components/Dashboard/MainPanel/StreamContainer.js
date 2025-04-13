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
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        width: '65%',
        height: '65%',
      }}
    >
  {cameraId.map((camera, index) => (
    <Box
      key={index}
      sx={{
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
      }}
    >
      <LiveStream />
    </Box>
  ))}
</Box>

  );
};

export default StreamContainer;
