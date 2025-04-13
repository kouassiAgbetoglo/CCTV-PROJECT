import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import CameraPopup from '../CameraPopup';
import PopupForm from '../DeleteCamera/PopupForm';

// Conteneur global cliquable (icône + texte)
const ClickableWrapper = styled('button')(({ theme, disabled }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'none',
  border: 'none',
  cursor: disabled ? 'not-allowed' : 'pointer',
  padding: 0,
  color: disabled ? theme.palette.grey[500] : theme.palette.error.main,
  fontWeight: 500,
  fontSize: '1rem',
  fontFamily: 'inherit',
  opacity: disabled ? 0.6 : 1,
  pointerEvents: disabled ? 'none' : 'auto',

  '&:hover': {
    transform: disabled ? 'none' : 'scale(1.02)',
    textDecoration: disabled ? 'none' : 'underline',
  },

  '& .icon': {
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: disabled ? theme.palette.grey[300] : theme.palette.error.light,
    color: disabled ? theme.palette.grey[500] : 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    transition: 'all 0.3s ease',
  },

  '&:hover .icon': {
    backgroundColor: disabled ? theme.palette.grey[300] : theme.palette.error.main,
    transform: disabled ? 'none' : 'scale(1.05)',
  },

  '&:active .icon': {
    transform: disabled ? 'none' : 'scale(0.95)',
  }
}));

const DeleteCameraButton = ({ disabled = false }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  
    const openPopup = (e) => {
      setAnchorEl(anchorEl ? null : e.currentTarget);
    };
  
    const handleClosePopup = () => {
      setAnchorEl(null);
    };

    const deleteCamera = async (event) => {
      event.preventDefault();
      const cameraName = event.target.elements.cameraName.value;
      const deleteCameraUrl = 'cam/DeleteCamera';

      //console.log(`Nom de la caméra: ${cameraName}`);

      try {
        const response = await fetch(deleteCameraUrl,{
          method: 'POST',
        body: JSON.stringify({ cameraName }),
        headers: {
          "Content-Type": 'application/json',
        },
        credentials: 'include',
        })

        if (response.status === 404) {
          const data = await response.json();
          alert(data.message); 
        } else if (response.status === 200) {
          const data = await response.json();
          console.log(data.message);
        } else {
          console.log('Unexpected error:', response);
        }

      } catch (err) {

      }

      handleClosePopup();

    }



  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title={disabled ? "Sélectionnez une caméra" : "Supprimer la caméra"} placement="top">
        <ClickableWrapper onClick={openPopup} disabled={disabled} aria-label="delete-camera">
          <div className="icon">−</div>
          <span>Supprimer une caméra</span>
        </ClickableWrapper>
      </Tooltip>

      <CameraPopup open={open} anchorEl={anchorEl}>
        <PopupForm  handleClick={deleteCamera}/>
      </CameraPopup>
    </>
  );
};

export default DeleteCameraButton;
