import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        regUsername: '',
        regEmail: '',
        regCollege: '',
        regBranch: '',
        regPassword: '',
        regConfirmPassword: ''
    });
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const registerUser = (e) => {
        e.preventDefault();
        
        const { regUsername, regEmail, regCollege, regBranch, regPassword, regConfirmPassword } = formData;
        const username = regUsername.trim();
        const email = regEmail.trim();
        const college = regCollege.trim();
        const branch = regBranch.trim();
        
        // Validation
        if (!username || !email || !college || !branch || !regPassword) {
            setMessage({ text: 'All fields are required', type: 'error' });
            return;
        }
        
        if (regPassword.length < 6) {
            setMessage({ text: 'Password must be at least 6 characters', type: 'error' });
            return;
        }
        
        if (regPassword !== regConfirmPassword) {
            setMessage({ text: 'Passwords do not match', type: 'error' });
            return;
        }
        
        // Check if username is 'admin' (reserved)
        if (username.toLowerCase() === 'admin') {
            setMessage({ text: 'Username "admin" is reserved. Please choose another.', type: 'error' });
            return;
        }
        
        // Check if email is admin email
        if (email.toLowerCase() === 'admin@internhub.com') {
            setMessage({ text: 'This email is reserved. Please use another.', type: 'error' });
            return;
        }
        
        // Get existing users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if user already exists
        if (users.find(u => u.email === email)) {
            setMessage({ text: 'An account with this email already exists', type: 'error' });
            return;
        }
        
        if (users.find(u => u.username === username)) {
            setMessage({ text: 'Username already taken', type: 'error' });
            return;
        }
        
        // Create new user
        const newUser = {
            username,
            email,
            college,
            branch,
            password: regPassword,
            isAdmin: false,
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        setMessage({ text: 'Account created successfully! Redirecting to login...', type: 'success' });
        
        setTimeout(() => {
            navigate('/login');
        }, 2000);
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
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </div>
            </nav>

            <section className="auth-section">
                <div className="auth-container">
                    <div className="auth-card">
                        <div className="auth-header">
                            <h1>Create Account</h1>
                            <p>Join InternHub today and find your dream internship</p>
                        </div>

                        <div id="messageContainer">
                            {message.text && (
                                <div className={`inline-message inline-${message.type}`}>
                                    {message.text}
                                </div>
                            )}
                        </div>

                        <form id="registerForm" className="auth-form" onSubmit={registerUser}>
                            <div className="form-group">
                                <label htmlFor="regUsername">Username</label>
                                <input 
                                    type="text" 
                                    id="regUsername" 
                                    name="regUsername" 
                                    value={formData.regUsername}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="regEmail">Email</label>
                                <input 
                                    type="email" 
                                    id="regEmail" 
                                    name="regEmail" 
                                    value={formData.regEmail}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="regCollege">College/University</label>
                                <input 
                                    type="text" 
                                    id="regCollege" 
                                    name="regCollege" 
                                    value={formData.regCollege}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="regBranch">Branch/Major</label>
                                <input 
                                    type="text" 
                                    id="regBranch" 
                                    name="regBranch" 
                                    value={formData.regBranch}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="regPassword">Password</label>
                                <input 
                                    type="password" 
                                    id="regPassword" 
                                    name="regPassword" 
                                    value={formData.regPassword}
                                    onChange={handleChange}
                                    required 
                                    minLength="6" 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="regConfirmPassword">Confirm Password</label>
                                <input 
                                    type="password" 
                                    id="regConfirmPassword" 
                                    name="regConfirmPassword" 
                                    value={formData.regConfirmPassword}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>

                            <button type="submit" className="btn-login btn-full">Create Account</button>
                        </form>

                        <div className="auth-footer">
                            <p>Already have an account? <Link to="/login">Login here</Link></p>
                            <p><Link to="/">← Back to Home</Link></p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Register;
