import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { showMessage } from '../utils/notifications';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Login() {
    const navigate = useNavigate();
    const { login, users, loggedInUser } = useAppContext();
    const [formData, setFormData] = useState({
        loginIdentifier: '',
        loginPassword: ''
    });
    const [message, setMessage] = useState({ text: '', type: '' });

    // Redirect if already logged in
    useEffect(() => {
        if (loggedInUser) {
            navigate(loggedInUser.isAdmin ? '/admin' : '/dashboard');
        }
    }, [loggedInUser, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const fillUserDemo = () => {
        const demoUser = users.find(u => u.email === 'demo@internhub.com');
        if (demoUser) {
            login(demoUser);
            showMessage('Logged in as Demo User!', 'success');
            setTimeout(() => navigate('/dashboard'), 1000);
        }
    };

    const fillAdminDemo = () => {
        const adminUser = users.find(u => u.email === '2400033073@kluniversity.in');
        if (adminUser) {
            login(adminUser);
            showMessage('Logged in as Suhani Parashar (Admin)!', 'success');
            setTimeout(() => navigate('/admin'), 1000);
        }
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
            login(adminUser);
            setMessage({ text: 'Admin login successful! Redirecting...', type: 'success' });
            setTimeout(() => navigate('/admin'), 1000);
            return;
        }
        
        // Check regular users
        const user = users.find(u => 
            (u.username === loginIdentifier || u.email === loginIdentifier) && u.password === loginPassword
        );
        
        if (user) {
            login(user);
            setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
            setTimeout(() => navigate(user.isAdmin ? '/admin' : '/dashboard'), 1000);
        } else {
            setMessage({ text: 'Invalid credentials. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="auth-page">
            <Navbar />

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
