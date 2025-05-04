import { useState, useEffect } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import getCameraId from './getCameraId';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


const styles = {
    cardItem: {
        marginBottom: '8px',
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }
    },

    headerContent: {
        fontSize: '125%',
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
    },

};



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

    const handleItemClick = (cameraId) => {
        console.log('Caméra cliquée:', cameraId);
    };

    // Crée un tableau avec toujours 4 éléments (rempli avec null si nécessaire)
    const displayItems = [...cameraId];
    while (displayItems.length < 4) {
        displayItems.push(null);
    }
    displayItems.length = 4; // Garantit exactement 4 éléments

    return (
        <div style={styles.listContainer}>
            <ListSubheader style={styles.headerContent}>
                {`Mes caméras:`}
            </ListSubheader>
            <Table size="small">
                <TableBody>
                    {displayItems.map((item, index) => (
                        <TableRow 
                            key={item ? `item-${item}` : `empty-${index}`}
                            hover={!!item}
                            onClick={() => item && handleItemClick(item)}
                            sx={{ 
                                cursor: item ? 'pointer' : 'default',
                                height: '48px' // Hauteur fixe pour les lignes vides
                            }}
                        >
                            <TableCell>
                                {item ? `- ${item}` : '\u00A0'} {/* &nbsp; pour les cellules vides */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CameraList;
