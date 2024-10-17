import './App.css';
import Home from './Components/Home'
import About from './Components/About';
import Contact from './Components/Contact';
import {Routes, Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/" element={<Home />}>Accueil</Link>
        <Link to="/about" element={<About />}>À propos</Link>
        <Link to="/contact" element={<Contact />}>Contact</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

    </div>
  );
}

export default App;
