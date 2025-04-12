import { useState, useCallback} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';



const styles = {

    headerContent: {
        fontSize: '125%',
        fontWeight: 'bold',
        color: 'black',
    },
}


const CameraList = () => {

  const [cameraId, setCameraId] = useState([]);
  const getCameraIdsUrl = 'cam/getID';

  
  const getCamera = useCallback(async () => {
      try {
          const response = await fetch(getCameraIdsUrl, {
              method: 'POST',
              credentials: 'include',
              headers: {
                  "Content-Type": 'application/json',
              },
          });

          if (!response.ok) { // Exit if the request is not valid
              return; 
          }

          const data = await response.json();
          const cameras = data.Cameras;
          if (cameras) {
              setCameraId(cameras);
          }
      } catch (error) {
          console.error('Cant access camera :', error);
      }
  }, [getCameraIdsUrl]);

  getCamera();



  return (
    <div>
        <List
        sx={{
            width: '100%',
            maxWidth: 350,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,
            '& ul': { padding: 0 },
        }}
        subheader={<li />}
        >
        <li>
            <ul>
            <ListSubheader style={styles.headerContent}>{`Mes caméras:`}</ListSubheader>
            {cameraId.map((item) => (
                <ListItem key={`item-${item}`}>
                <ListItemText primary={`- ${item}`} />
                </ListItem>
            ))}
            </ul>
        </li>
        </List>
    </div>
  );
};

export default CameraList;
