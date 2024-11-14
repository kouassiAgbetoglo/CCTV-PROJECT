import './App.css';
import {Routes, Route } from 'react-router-dom';



import Home from './Home/Home'
import About from './About/About';
import Contact from './Contact/Contact';
import Dashboard from './Dashboard/Dashboard';
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
      </Routes>
    </div>
  );
}

export default App;
