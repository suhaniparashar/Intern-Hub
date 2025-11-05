import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { showConfirmModal, showMessage } from '../utils/notifications';

function Navbar() {
    const location = useLocation();
    const { loggedInUser, logout, darkMode, toggleDarkMode } = useAppContext();
    const currentPath = location.pathname;
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const logoutUser = () => {
        showConfirmModal('Are you sure you want to logout?', () => {
            logout();
            showMessage('Logged out successfully', 'success');
            // use client-side navigation to avoid server 404 on static hosts (Vercel)
            setTimeout(() => navigate('/login'), 1000);
        });
        setMobileMenuOpen(false); // Close mobile menu on logout
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-brand">
                    <h2>🎓 InternHub</h2>
                </div>
                {/* Dark Mode Toggle */}
                <button 
                    className="dark-mode-toggle" 
                    onClick={toggleDarkMode}
                    aria-label="Toggle dark mode"
                    title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {darkMode ? '☀️' : '🌙'}
                </button>
                {/* Hamburger menu button for mobile */}
                {loggedInUser && (
                    <button 
                        className="mobile-menu-toggle" 
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </button>
                )}
                <ul className={`nav-links ${loggedInUser && mobileMenuOpen ? 'mobile-open' : ''}`} id="navLinks">
                    {!loggedInUser ? (
                        <>
                            <li><Link to="/" className={currentPath === '/' ? 'active' : ''}>Home</Link></li>
                            <li><Link to="/login" className="btn-login">Login</Link></li>
                        </>
                    ) : loggedInUser.isAdmin ? (
                        <>
                            <li><Link to="/admin" onClick={closeMobileMenu} className={currentPath === '/admin' ? 'active' : ''}>Admin Dashboard</Link></li>
                            <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); logoutUser(); }} className="btn-logout">Logout</a></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/dashboard" onClick={closeMobileMenu} className={currentPath === '/dashboard' ? 'active' : ''}>Dashboard</Link></li>
                            <li><Link to="/internships" onClick={closeMobileMenu} className={currentPath === '/internships' ? 'active' : ''}>Internships</Link></li>
                            <li><Link to="/enrolled" onClick={closeMobileMenu} className={currentPath === '/enrolled' ? 'active' : ''}>My Applications</Link></li>
                            <li><Link to="/status" onClick={closeMobileMenu} className={currentPath === '/status' ? 'active' : ''}>Status</Link></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); logoutUser(); }} className="btn-logout">Logout</a></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
