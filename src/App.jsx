import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initializeDemoData } from './utils/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Internships from './pages/Internships';
import Enrolled from './pages/Enrolled';
import Status from './pages/Status';
import About from './pages/About';
import Admin from './pages/Admin';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize demo data on first load
    initializeDemoData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/internships' element={<Internships />} />
        <Route path='/enrolled' element={<Enrolled />} />
        <Route path='/status' element={<Status />} />
        <Route path='/about' element={<About />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
