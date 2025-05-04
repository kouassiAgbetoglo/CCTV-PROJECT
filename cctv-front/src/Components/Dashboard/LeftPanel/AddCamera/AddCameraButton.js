import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import CameraPopup from '../CameraPopup';
import PopupForm from './PopupForm';

const ClickableWrapper = styled('button')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  color: theme.palette.primary.main,
  fontWeight: 500,
  fontSize: '1rem',
  fontFamily: 'inherit',
  transition: 'transform 0.2s ease',

  '&:hover': {
    transform: 'scale(1.02)',
    textDecoration: 'underline',
  },

  '& .icon': {
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    transition: 'all 0.3s ease',
  },

  '&:hover .icon': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'scale(1.05)',
  },

  '&:active .icon': {
    transform: 'scale(0.95)',
  }
}));

const AddCameraButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const openPopup = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
  };

  const addCamera = async (event) => {
    event.preventDefault();
    const cameraName = event.target.elements.cameraName.value;
    const cameraType = event.target.elements.cameraType.value;
    const addNewCameraUrl = 'cam/AddNewCamera';

    console.log(`Nom de la caméra: ${cameraName}`);
    console.log(`Type de caméra: ${cameraType}`);

    try {
      const response = await fetch(addNewCameraUrl, {
        method: 'POST',
        body: JSON.stringify({ cameraName, cameraType }),
        headers: {
          "Content-Type": 'application/json',
        },
        credentials: 'include',
      })

      if (response.status === 409) {
        const data = await response.json();
        alert(data.message); 
      } else if (response.status === 201) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.log('Unexpected error:', response);
      }

    } catch (err) {
      
    }

    handleClosePopup();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title="Ajouter une caméra" placement="top">
        <ClickableWrapper onClick={openPopup} aria-label="add-camera">
          <div className="icon">
            <AddIcon />
          </div>
          <span>Ajouter une caméra</span>
        </ClickableWrapper>
      </Tooltip>

      <CameraPopup open={open} anchorEl={anchorEl}>
          <PopupForm handleClick={addCamera} />
      </CameraPopup>
    </>
  );
};

export default AddCameraButton;
