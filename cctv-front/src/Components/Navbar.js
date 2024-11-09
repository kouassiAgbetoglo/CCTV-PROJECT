import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';

const styles = {
        navBar : {
                padding: '0',
                border: '2px solid',
                margin: '0 auto 0 auto',
                backgroundColor: 'rgba(94, 93, 93, 0.961)',
        },

        navBarContent : {
                color: 'black',
                padding: '0',   
        },
}

const Navbar = () => {
        const [value, setValue] = React.useState("/");
        const navigate = useNavigate();

        const handleChange = (event, newValue) => {
                setValue(newValue);
                navigate(newValue);
        };

        const navItems = [
                {label: 'Acceuil', value: '/'},
                {label: 'A propos', value: '/about'},
                {label: 'Contact', value: '/contact'},
        ]

        return (
                <>
                        <Box 
                         sx={{ 
                         margin: '20px auto', // Set margin on the Box component
                         width: '90%', // Optional: Set a width to control the layout
                        }}
                        >
                        <BottomNavigation
                         value={value} 
                         onChange={handleChange} 
                         showLabels
                         style={styles.navBar}
                        >
                                {navItems.map((item) => (
                                        <BottomNavigationAction key= {item.value} label={item.label} value={item.value} style={styles.navBarContent}/>
                                ))}
                        </BottomNavigation>
                        </Box>
                </>
        )
}

export default Navbar;