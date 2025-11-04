import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getAllInternships } from '../utils/data';
import { checkLoginStatus } from '../utils/auth';
import { showMessage } from '../utils/notifications';

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        applications: 0,
        pending: 0,
        available: 6,
        selected: 0
    });
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        college: '',
        branch: ''
    });
    const [recentApplications, setRecentApplications] = useState([]);

    useEffect(() => {
        const loggedInUser = checkLoginStatus();
        if (!loggedInUser) {
            showMessage('Please login to access this page', 'warning');
            setTimeout(() => navigate('/login'), 1000);
            return;
        }
        
        if (loggedInUser.isAdmin) {
            navigate('/admin');
            return;
        }
        
        setUser(loggedInUser);
        loadDashboardStats(loggedInUser);
        loadProfileInfo(loggedInUser);
    }, [navigate]);

    const loadDashboardStats = (loggedInUser) => {
        const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        const userEnrollments = enrollments.filter(e => e.userEmail === loggedInUser.email);
        const totalInternships = getAllInternships().length;
        const pendingApplications = userEnrollments.filter(e => e.status === 'Pending').length;
        const selectedApplications = userEnrollments.filter(e => e.status === 'Selected').length;

        setStats({
            applications: userEnrollments.length,
            pending: pendingApplications,
            available: totalInternships,
            selected: selectedApplications
        });

        // Load recent applications (last 3)
        const recent = userEnrollments
            .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
            .slice(0, 3);
        setRecentApplications(recent);
    };

    const loadProfileInfo = (loggedInUser) => {
        setProfileData({
            username: loggedInUser.username || '',
            email: loggedInUser.email || '',
            college: loggedInUser.college || '',
            branch: loggedInUser.branch || ''
        });
    };

    const handleProfileChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
    };

    const updateProfile = (e) => {
        e.preventDefault();
        
        const isDemoUser = user.email === 'demo@internhub.com' || user.email === '2400033073@kluniversity.in' || user.email === 'admin@internhub.com';
        if (isDemoUser) {
            showMessage('Demo users cannot edit profile information', 'warning');
            return;
        }
        
        const { college, branch } = profileData;
        
        if (!college || !branch) {
            showMessage('All fields are required', 'error');
            return;
        }
        
        // Update logged in user
        const updatedUser = { ...user, college, branch };
        localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        // Update in users array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
            users[userIndex].college = college;
            users[userIndex].branch = branch;
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        showMessage('Profile updated successfully!', 'success');
    };

    const resetProfileForm = () => {
        loadProfileInfo(user);
        showMessage('Profile form reset', 'info');
    };

    const scrollToProfile = () => {
        document.getElementById('profileSection')?.scrollIntoView({ behavior: 'smooth' });
    };

    const getInitials = (name) => {
        if (!name) return 'SP';
        const names = name.split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[names.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const isDemoUser = user && (user.email === 'demo@internhub.com' || user.email === '2400033073@kluniversity.in' || user.email === 'admin@internhub.com');

    if (!user) return null;

    return (
        <>
            <Navbar />
            
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>Student Dashboard</h1>
                    <p>Welcome back, <span id="studentName">{user.username}</span>! 👋</p>
                </div>
            </section>

            {/* Dashboard Stats */}
            <section className="dashboard-stats">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-card clickable-card" onClick={() => navigate('/enrolled')} title="Click to view your applications">
                            <div className="stat-icon">📝</div>
                            <div className="stat-info">
                                <h3 id="totalApplications">{stats.applications}</h3>
                                <p>Applications Submitted</p>
                            </div>
                            <div className="card-arrow">→</div>
                        </div>
                        <div className="stat-card clickable-card" onClick={() => navigate('/status')} title="Click to view pending applications">
                            <div className="stat-icon">⏳</div>
                            <div className="stat-info">
                                <h3 id="pendingCount">{stats.pending}</h3>
                                <p>Pending Reviews</p>
                            </div>
                            <div className="card-arrow">→</div>
                        </div>
                        <div className="stat-card clickable-card" onClick={() => navigate('/internships')} title="Click to browse internships">
                            <div className="stat-icon">💼</div>
                            <div className="stat-info">
                                <h3>{stats.available}</h3>
                                <p>Available Internships</p>
                            </div>
                            <div className="card-arrow">→</div>
                        </div>
                        <div className="stat-card clickable-card" onClick={() => navigate('/status')} title="Click to view selections">
                            <div className="stat-icon">✓</div>
                            <div className="stat-info">
                                <h3>{stats.selected}</h3>
                                <p>Selections</p>
                            </div>
                            <div className="card-arrow">→</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="quick-actions-section">
                <div className="container">
                    <h2 className="section-title">Quick Actions</h2>
                    
                    <div className="actions-grid">
                        <Link to="/enrolled" className="action-card">
                            <div className="action-icon">📋</div>
                            <h3>My Enrolled Internships</h3>
                            <p>View all internships you've applied to</p>
                            <span className="action-arrow">→</span>
                        </Link>
                        
                        <Link to="/status" className="action-card">
                            <div className="action-icon">📊</div>
                            <h3>Application Status</h3>
                            <p>Track the status of your applications</p>
                            <span className="action-arrow">→</span>
                        </Link>
                        
                        <Link to="/internships" className="action-card">
                            <div className="action-icon">🔍</div>
                            <h3>Browse Internships</h3>
                            <p>Discover new internship opportunities</p>
                            <span className="action-arrow">→</span>
                        </Link>
                        
                        <a href="#profileSection" onClick={(e) => { e.preventDefault(); scrollToProfile(); }} className="action-card">
                            <div className="action-icon">👤</div>
                            <h3>Edit Profile</h3>
                            <p>Update your profile information</p>
                            <span className="action-arrow">→</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Profile Section */}
            <section className="profile-section" id="profileSection">
                <div className="container">
                    <h2 className="section-title">My Profile</h2>
                    
                    {/* Student Information Display */}
                    <div className="student-info-card">
                        <div className="student-info-header">
                            <div className="student-avatar">
                                <span id="studentInitials">{getInitials(user.username)}</span>
                            </div>
                            <div className="student-main-info">
                                <h2 id="displayStudentName">{user.username}</h2>
                                {user.rollId && <p id="displayRollId" className="roll-id">Roll ID: {user.rollId}</p>}
                            </div>
                        </div>
                        
                        <div className="student-details-grid">
                            <div className="info-item">
                                <span className="info-label">📧 Email</span>
                                <span className="info-value" id="displayEmail">{user.email || 'Not provided'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">📱 Phone</span>
                                <span className="info-value" id="displayPhone">{user.phone || 'Not provided'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">🏛️ College</span>
                                <span className="info-value" id="displayCollege">{user.college || 'Not provided'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">📚 Branch</span>
                                <span className="info-value" id="displayBranch">{user.branch || 'Not provided'}</span>
                            </div>
                            {user.year && (
                                <div className="info-item">
                                    <span className="info-label">🎓 Year</span>
                                    <span className="info-value" id="displayYear">{user.year}</span>
                                </div>
                            )}
                            {user.semester && (
                                <div className="info-item">
                                    <span className="info-label">📖 Semester</span>
                                    <span className="info-value" id="displaySemester">{user.semester}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <h3 className="section-subtitle">Edit Profile Information</h3>
                    
                    <div className="profile-container">
                        <div className="profile-card">
                            <form id="profileForm" className="profile-form" onSubmit={updateProfile}>
                                {isDemoUser && (
                                    <div className="demo-user-notice">
                                        <p>ℹ️ Demo users cannot edit profile information</p>
                                    </div>
                                )}
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="profileUsername">Username</label>
                                        <input 
                                            type="text" 
                                            id="profileUsername" 
                                            name="username"
                                            value={profileData.username}
                                            placeholder="Enter your name"
                                            readOnly
                                            disabled
                                        />
                                        <small className="form-hint">Username cannot be changed</small>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="profileEmail">Email Address</label>
                                        <input 
                                            type="email" 
                                            id="profileEmail" 
                                            name="email"
                                            value={profileData.email}
                                            placeholder="Enter your email"
                                            readOnly
                                            disabled
                                        />
                                        <small className="form-hint">Email cannot be changed</small>
                                    </div>
                                </div>
                                
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="profileCollege">College/University</label>
                                        <input 
                                            type="text" 
                                            id="profileCollege" 
                                            name="college"
                                            value={profileData.college}
                                            onChange={handleProfileChange}
                                            placeholder="Enter your college name"
                                            readOnly={isDemoUser}
                                            disabled={isDemoUser}
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="profileBranch">Branch/Major</label>
                                        <input 
                                            type="text" 
                                            id="profileBranch" 
                                            name="branch"
                                            value={profileData.branch}
                                            onChange={handleProfileChange}
                                            placeholder="e.g., Computer Science"
                                            readOnly={isDemoUser}
                                            disabled={isDemoUser}
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-actions">
                                    <button 
                                        type="submit" 
                                        className="btn btn-confirm"
                                        disabled={isDemoUser}
                                        style={isDemoUser ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                                    >
                                        💾 Save Changes
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-cancel" 
                                        onClick={resetProfileForm}
                                    >
                                        🔄 Reset
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Applications */}
            <section className="recent-applications">
                <div className="container">
                    <h2 className="section-title">Recent Applications</h2>
                    
                    <div id="recentApplicationsContainer">
                        {recentApplications.length === 0 ? (
                            <p className="no-applications">No recent applications found.</p>
                        ) : (
                            <div className="applications-list">
                                {recentApplications.map((app, index) => (
                                    <div key={index} className="application-item">
                                        <div className="application-info">
                                            <h4>{app.internshipTitle}</h4>
                                            <p>{app.company}</p>
                                            <span className="application-date">Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                                        </div>
                                        <span className={`status-badge status-${app.status.toLowerCase()}`}>{app.status}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Dashboard;
