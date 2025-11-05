import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import ProtectedRoute from './components/ProtectedRoute';
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
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<About />} />
          
          {/* Protected Routes - Students */}
          <Route 
            path='/dashboard' 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/internships' 
            element={
              <ProtectedRoute>
                <Internships />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/enrolled' 
            element={
              <ProtectedRoute>
                <Enrolled />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/status' 
            element={
              <ProtectedRoute>
                <Status />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected Routes - Admin Only */}
          <Route 
            path='/admin' 
            element={
              <ProtectedRoute requireAdmin={true}>
                <Admin />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
