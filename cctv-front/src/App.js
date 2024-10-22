import './App.css';
import {Routes, Route } from 'react-router-dom';



import Home from './Home/Home'
import About from './About/About';
import Contact from './Contact/Contact';
import Dashboard from './Components/Dashboard/Dashboard';
import Mod1 from './Components/Dashboard/Mod1';
import Mod2 from './Components/Dashboard/Mod2';
import Mod3 from './Components/Dashboard/Mod3';
import Mod4 from './Components/Dashboard/Mod4';
import Mod5 from './Components/Dashboard/Mod5';
import Mod6 from './Components/Dashboard/Mod6';
import ResetPw from './PasswordReset/ResetPw';



const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='resetPW' element={<ResetPw />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/MOD1' element={<Mod1 />} /> {/* MODIFY THE PATH LATER */}
        <Route path='/dashboard/MOD2' element={<Mod2 />} />
        <Route path='/dashboard/MOD3' element={<Mod3 />} />
        <Route path='/dashboard/MOD4' element={<Mod4 />} />
        <Route path='/dashboard/MOD5' element={<Mod5 />} />
        <Route path='/dashboard/MOD6' element={<Mod6 />} />
      </Routes>
    </div>
  );
}

export default App;
