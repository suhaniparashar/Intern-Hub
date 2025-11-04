import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { checkLoginStatus } from '../utils/auth';
import { getRandomStatus } from '../utils/data';
import { showMessage } from '../utils/notifications';

function Status() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const loggedInUser = checkLoginStatus();
        if (!loggedInUser) {
            showMessage('Please login to access this page', 'warning');
            setTimeout(() => navigate('/login'), 1000);
            return;
        }
        setUser(loggedInUser);
        loadApplicationStatus(loggedInUser);
    }, [navigate]);

    const loadApplicationStatus = (loggedInUser) => {
        const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        const userEnrollments = enrollments.filter(e => e.userEmail === loggedInUser.email);
        
        // Assign random status if not set
        userEnrollments.forEach(e => {
            if (!e.status) {
                e.status = getRandomStatus();
            }
        });
        
        // Save updated statuses
        localStorage.setItem('enrollments', JSON.stringify(enrollments));
        setApplications(userEnrollments);
    };

    const refreshStatus = () => {
        const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        enrollments.forEach(e => {
            if (e.userEmail === user.email) {
                e.status = getRandomStatus();
            }
        });
        
        localStorage.setItem('enrollments', JSON.stringify(enrollments));
        showMessage('Status refreshed!', 'info');
        loadApplicationStatus(user);
    };

    if (!user) return null;

    return (
        <>
            <Navbar />
            
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>Application Status</h1>
                    <p>Track the progress of your internship applications</p>
                </div>
            </section>

            {/* Status Legend */}
            <section className="status-legend">
                <div className="container">
                    <div className="legend-items">
                        <div className="legend-item">
                            <span className="status-badge status-pending">Pending</span>
                            <p>Under review</p>
                        </div>
                        <div className="legend-item">
                            <span className="status-badge status-selected">Selected</span>
                            <p>Congratulations!</p>
                        </div>
                        <div className="legend-item">
                            <span className="status-badge status-rejected">Rejected</span>
                            <p>Better luck next time</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Status Section */}
            <section className="status-section">
                <div className="container">
                    <div className="status-header">
                        <h2>Your Applications</h2>
                        {applications.length > 0 && (
                            <button className="btn btn-outline" onClick={refreshStatus}>🔄 Refresh Status</button>
                        )}
                    </div>
                    
                    <div className="status-container" id="statusContainer">
                        {applications.length === 0 ? (
                            <p className="no-applications">
                                No applications to track. <Link to="/internships">Apply to internships</Link>
                            </p>
                        ) : (
                            applications.map((app, index) => (
                                <div key={index} className="status-card">
                                    <div className="status-header">
                                        <h3>{app.internshipTitle}</h3>
                                        <span className={`status-badge status-${app.status.toLowerCase()}`}>{app.status}</span>
                                    </div>
                                    <div className="status-details">
                                        <p><strong>Company:</strong> {app.company}</p>
                                        <p><strong>Applied on:</strong> {new Date(app.appliedAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Status;
