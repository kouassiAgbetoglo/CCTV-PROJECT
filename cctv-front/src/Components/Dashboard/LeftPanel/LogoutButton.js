import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

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

const LogoutButton = ({ disabled = false }) => {

  const navigate = useNavigate();
  const logoutUrl = '/auth/logout';

  const handleLogout = async () => {
    try {
      const response = await fetch(logoutUrl, {
          method: 'POST',
          credentials: 'include',
      });

      if (response.ok) {
          navigate('/');
      } else {
          console.error('Logout failed');
      }
  } catch (err) {
      console.error('Network error during logout:', err);
  }
};


  return (
    <Tooltip title={disabled ? "Action non disponible" : "Se déconnecter"} placement="top">
      <ClickableWrapper onClick={handleLogout} disabled={disabled} aria-label="logout">
        <div className="icon">
          <ExitToAppIcon />
        </div>
        <span>Déconnexion</span>
      </ClickableWrapper>
    </Tooltip>
  );
};

export default LogoutButton;
