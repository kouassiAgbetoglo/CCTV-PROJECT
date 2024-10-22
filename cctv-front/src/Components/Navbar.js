import React from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';


const Navbar = () => {
        const [value, setValue] = React.useState("/");
        const history = React.useHistory();

        const handleChange = (event, newValue) => {
                setValue(newValue);
        };

        return (
                <>
                        <BottomNavigation
                         value={value} 
                         onChange={handleChange} 
                         showLabels
                        >
                                <BottomNavigationAction label="Acceuil" value="/" />
                                <BottomNavigationAction label="A propos" value="/about" />
                                <BottomNavigationAction label="Contact" value="/contact" />
                        </BottomNavigation>
                </>
                // <nav>
                //     <Link to='/'>Accueil</Link>
                //     <Link to='/about'>À propos</Link>
                //     <Link to='/contact'>Contact</Link>
                // </nav>
        )
}

export default Navbar;