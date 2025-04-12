import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, fontSize: '0.75rem' }}> {/* Modification ici */}
          <Typography style={{ fontSize: '0.75rem' }}>{children}</Typography> {/* Modification ici */}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ 
        flexGrow: 1, 
        bgcolor: 'background.paper', 
        display: 'flex', 
        height: 200,
        fontSize: '0.75rem' /* Modification ici */
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ 
          borderRight: 1, 
          borderColor: 'divider', 
          color: 'black',
          '& .MuiTab-root': {
            fontSize: '0.75rem' /* Modification ici pour les tabs */
          }
        }}
      >
        <Tab label="Informations Personnelles" {...a11yProps(0)} />
        <Tab label="Sécurité" {...a11yProps(1)} />
        <Tab label="Préférences" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div>
          👤 Nom d'utilisateur
        </div>
        <div>
          📧 Email
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
         🔒 Changer le mot de passe
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
          🌓 Thème
        </div>
        <div>
          🚪 Déconnexion
        </div>
      </TabPanel>
    </Box>
  );
}