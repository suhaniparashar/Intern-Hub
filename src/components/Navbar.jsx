import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { checkLoginStatus } from '../utils/auth';
import { showConfirmModal, showMessage } from '../utils/notifications';

function Navbar() {
    const location = useLocation();
    const user = checkLoginStatus();
    const currentPath = location.pathname;
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const logoutUser = () => {
        showConfirmModal('Are you sure you want to logout?', () => {
            localStorage.removeItem('loggedInUser');
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
                {/* Hamburger menu button for mobile (only for student users) */}
                {user && !user.isAdmin && (
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
                <ul className={`nav-links ${user && !user.isAdmin && mobileMenuOpen ? 'mobile-open' : ''}`} id="navLinks">
                    {!user ? (
                        <>
                            <li><Link to="/" className={currentPath === '/' ? 'active' : ''}>Home</Link></li>
                            <li><Link to="/login" className="btn-login">Login</Link></li>
                        </>
                    ) : user.isAdmin ? (
                        <>
                            <li><Link to="/admin" className={currentPath === '/admin' ? 'active' : ''}>Admin Dashboard</Link></li>
                            <li><Link to="/">Home</Link></li>
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
