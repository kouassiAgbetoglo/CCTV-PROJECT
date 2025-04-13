import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import RefreshIcon from '@mui/icons-material/Refresh';

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

const RefreshButton = ({ onRefresh }) => {

  return (
    <Tooltip title="Actualiser" placement="top">
      <ClickableWrapper onClick={onRefresh} aria-label="refresh">
        <div className="icon">
          <RefreshIcon />
        </div>
        <span>Actualiser</span>
      </ClickableWrapper>
    </Tooltip>
  );
};

export default RefreshButton;
