import React from 'react';
import { useLocation } from 'react-router-dom';

import './App.css';
import Navbar from './Components/Navbar'

function App() {

  const [hideNavbar, setHideNavbar] = React.useState(false);
  let currentPath = useLocation().pathname; // Get current path 
  const validPaths = ['/', '/about', '/contact'];
  let isValidPath = !validPaths.includes(currentPath);
  
  console.log(isValidPath)

  React.useEffect(() => {
    setHideNavbar(isValidPath);
  }, [currentPath]);
  
  

  return (
    <>
      {!hideNavbar && <Navbar />}
    </>
  );
}

export default App;
