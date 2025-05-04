
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';

const grey = {
  200: '#DAE2ED',
  700: '#434D5B',
  900: '#1C2025',
};

const PopupBody = styled('div')(
  ({ theme }) => `
  width: 300;
  padding: 12px 16px;
  margin-left: 10px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  z-index: 1000;
`
);

const CameraPopup = ({ open, anchorEl, children }) => {
  return (
    <BasePopup open={open} anchor={anchorEl} placement="right-start">
      <PopupBody>{children}</PopupBody>
    </BasePopup>
  );
};

export default CameraPopup;
