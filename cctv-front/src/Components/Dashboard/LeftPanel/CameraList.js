import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import getCameraId from './getCameraId';


const styles = {
    headerContent: {
        fontSize: '125%',
        fontWeight: 'bold',
        color: 'black',
    },
}

const CameraList = () => {
    const [cameraId, setCameraId] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const cameras = await getCameraId();
            if (cameras) {
                setCameraId(cameras);
            }
        }
        fetchData();
    }, []);

    // Gestionnaire d'événements lors du clic sur un élément de la liste
    const handleItemClick = (cameraId) => {
        console.log('Caméra cliquée:', cameraId);
        // Vous pouvez effectuer une action avec l'ID de la caméra, comme naviguer vers une autre page ou afficher des détails.
    };

    return (
        <div>
            <List
                sx={{
                    width: '85%',
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
                            <ListItem
                                key={`item-${item}`}
                                button
                                onClick={() => handleItemClick(item)} // Gestion du clic
                            >
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
