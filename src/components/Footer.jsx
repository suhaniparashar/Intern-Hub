import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>🎓 InternHub</h3>
                        <p>Your gateway to professional internships</p>
                    </div>
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/internships">Internships</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Student Portal</h4>
                        <ul>
                            <li><Link to="/enrolled">My Enrolled</Link></li>
                            <li><Link to="/status">Application Status</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 InternHub - Demo Project. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
