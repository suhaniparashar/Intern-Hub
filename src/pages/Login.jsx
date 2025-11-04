import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showMessage } from '../utils/notifications';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        loginIdentifier: '',
        loginPassword: ''
    });
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const fillUserDemo = () => {
        const demoUser = {
            username: 'Demo User',
            email: 'demo@internhub.com',
            phone: '+91 9999999999',
            college: 'Demo University',
            branch: 'Computer Science',
            isAdmin: false
        };
        localStorage.setItem('loggedInUser', JSON.stringify(demoUser));
        showMessage('Logged in as Demo User!', 'success');
        setTimeout(() => navigate('/dashboard'), 1000);
    };

    const fillAdminDemo = () => {
        const adminUser = {
            username: 'Suhani Parashar',
            email: '2400033073@kluniversity.in',
            phone: '+91 9876543210',
            rollId: '2400033073',
            year: '2nd Year',
            college: 'KL University',
            branch: 'B.Tech CSE-3',
            semester: '3rd Semester',
            isAdmin: true
        };
        localStorage.setItem('loggedInUser', JSON.stringify(adminUser));
        showMessage('Logged in as Suhani Parashar (Admin)!', 'success');
        setTimeout(() => navigate('/admin'), 1000);
    };

    const loginUser = (e) => {
        e.preventDefault();
        
        const { loginIdentifier, loginPassword } = formData;
        
        if (!loginIdentifier || !loginPassword) {
            setMessage({ text: 'Please enter both username/email and password', type: 'error' });
            return;
        }
        
        // Check for admin login
        if (loginIdentifier === 'admin' && loginPassword === 'admin123') {
            const adminUser = {
                username: 'admin',
                email: 'admin@internhub.com',
                isAdmin: true
            };
            localStorage.setItem('loggedInUser', JSON.stringify(adminUser));
            setMessage({ text: 'Admin login successful! Redirecting...', type: 'success' });
            setTimeout(() => navigate('/admin'), 1000);
            return;
        }
        
        // Check regular users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => 
            (u.username === loginIdentifier || u.email === loginIdentifier) && u.password === loginPassword
        );
        
        if (user) {
            const loggedInUser = {
                username: user.username,
                email: user.email,
                phone: user.phone || '',
                rollId: user.rollId || '',
                year: user.year || '',
                college: user.college || '',
                branch: user.branch || '',
                semester: user.semester || '',
                isAdmin: user.isAdmin || false
            };
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
            setTimeout(() => navigate(user.isAdmin ? '/admin' : '/dashboard'), 1000);
        } else {
            setMessage({ text: 'Invalid credentials. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="auth-page">
            <nav className="navbar">
                <div className="container">
                    <div className="nav-brand">
                        <h2>🎓 InternHub</h2>
                    </div>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                    </ul>
                </div>
            </nav>

            <section className="auth-section">
                <div className="auth-container">
                    <div className="auth-card">
                        <div className="auth-header">
                            <h1>Welcome Back</h1>
                            <p>Login to access your dashboard</p>
                        </div>

                        <div id="messageContainer">
                            {message.text && (
                                <div className={`inline-message inline-${message.type}`}>
                                    {message.text}
                                </div>
                            )}
                        </div>

                        <form id="loginForm" className="auth-form" onSubmit={loginUser}>
                            <div className="form-group">
                                <label htmlFor="loginIdentifier">Username or Email</label>
                                <input 
                                    type="text" 
                                    id="loginIdentifier" 
                                    name="loginIdentifier" 
                                    value={formData.loginIdentifier}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="loginPassword">Password</label>
                                <input 
                                    type="password" 
                                    id="loginPassword" 
                                    name="loginPassword" 
                                    value={formData.loginPassword}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>

                            <button type="submit" className="btn-login btn-full">Login</button>
                        </form>

                        <div className="demo-accounts">
                            <p>🚀 Quick Demo Login:</p>
                            <div className="demo-buttons">
                                <button className="btn-demo" onClick={fillUserDemo}>👤 Log in as Demo User</button>
                                <button className="btn-demo admin" onClick={fillAdminDemo}>👨‍💼 Log in as Admin</button>
                            </div>
                        </div>

                        <div className="auth-footer">
                            <p>Don't have an account? <Link to="/register">Register here</Link></p>
                            <p><Link to="/">← Back to Home</Link></p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
