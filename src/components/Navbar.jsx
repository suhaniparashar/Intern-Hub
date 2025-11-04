import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { checkLoginStatus } from '../utils/auth';
import { showConfirmModal, showMessage } from '../utils/notifications';

function Navbar() {
    const location = useLocation();
    const user = checkLoginStatus();
    const currentPath = location.pathname;

    const logoutUser = () => {
        showConfirmModal('Are you sure you want to logout?', () => {
            localStorage.removeItem('loggedInUser');
            showMessage('Logged out successfully', 'success');
            setTimeout(() => window.location.href = '/login', 1000);
        });
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-brand">
                    <h2>🎓 InternHub</h2>
                </div>
                <ul className="nav-links" id="navLinks">
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
                            <li><Link to="/dashboard" className={currentPath === '/dashboard' ? 'active' : ''}>Dashboard</Link></li>
                            <li><Link to="/internships" className={currentPath === '/internships' ? 'active' : ''}>Internships</Link></li>
                            <li><Link to="/enrolled" className={currentPath === '/enrolled' ? 'active' : ''}>My Applications</Link></li>
                            <li><Link to="/status" className={currentPath === '/status' ? 'active' : ''}>Status</Link></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); logoutUser(); }} className="btn-logout">Logout</a></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
