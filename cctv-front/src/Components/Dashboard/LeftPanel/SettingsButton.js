import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

// Conteneur global cliquable (icône + texte)
const ClickableWrapper = styled('button')(({ theme, disabled }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'none',
  border: 'none',
  cursor: disabled ? 'not-allowed' : 'pointer',
  padding: 0,
  color: disabled ? theme.palette.grey[500] : theme.palette.primary.main,
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
    backgroundColor: disabled ? theme.palette.grey[300] : theme.palette.primary.light,
    color: disabled ? theme.palette.grey[500] : 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    transition: 'all 0.3s ease',
  },

  '&:hover .icon': {
    backgroundColor: disabled ? theme.palette.grey[300] : theme.palette.primary.main,
    transform: disabled ? 'none' : 'scale(1.05)',
  },

  '&:active .icon': {
    transform: disabled ? 'none' : 'scale(0.95)',
  }
}));

const SettingsButton = ({ onClick, disabled = false }) => {
  return (
    <Tooltip title={disabled ? "Veuillez sélectionner un paramètre" : "Accéder aux paramètres"} placement="top">
      <ClickableWrapper onClick={onClick} disabled={disabled} aria-label="settings">
        <div className="icon">⚙️</div>
        <span>Paramètres</span>
      </ClickableWrapper>
    </Tooltip>
  );
};

export default SettingsButton;
