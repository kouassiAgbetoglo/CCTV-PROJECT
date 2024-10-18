import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';

import Home from './Home'
import About from './About';
import Contact from './Contact';

const Navbar = () => {

    
        return (
            <>
                <nav>
                    <Link to='/'>Accueil</Link>
                    <Link to='/about'>À propos</Link>
                    <Link to='/contact'>Contact</Link>
                </nav>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                </Routes>
            </>
        )
}

export default Navbar;