import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
        return (
                <nav>
                    <Link to='/'>Accueil</Link>
                    <Link to='/about'>À propos</Link>
                    <Link to='/contact'>Contact</Link>
                </nav>
        )
}

export default Navbar;