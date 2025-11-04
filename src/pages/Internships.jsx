import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getAllInternships, getInternshipById } from '../utils/data';
import { checkLoginStatus } from '../utils/auth';
import { showMessage } from '../utils/notifications';

function Internships() {
    const navigate = useNavigate();
    const [internships, setInternships] = useState([]);
    const [appliedInternships, setAppliedInternships] = useState([]);
    const user = checkLoginStatus();

    useEffect(() => {
        loadInternships();
    }, []);

    const loadInternships = () => {
        const allInternships = getAllInternships();
        setInternships(allInternships);
        
        if (user) {
            const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
            setAppliedInternships(enrollments.filter(e => e.userEmail === user.email));
        }
    };

    const applyToInternship = (internshipId) => {
        if (!user) {
            showMessage('Please login to apply for internships', 'warning');
            setTimeout(() => navigate('/login'), 1500);
            return;
        }
        
        const internship = getInternshipById(internshipId);
        if (!internship) {
            showMessage('Internship not found', 'error');
            return;
        }
        
        // Get current enrollments
        const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        
        // Check if already applied
        if (enrollments.some(e => e.internshipId === internshipId && e.userEmail === user.email)) {
            showMessage('You have already applied to this internship', 'warning');
            return;
        }
        
        // Create enrollment with task tracking
        const enrollment = {
            internshipId: internship.id,
            userEmail: user.email,
            username: user.username,
            internshipTitle: internship.title,
            company: internship.company,
            appliedAt: new Date().toISOString(),
            status: 'Pending',
            tasks: [],
            progress: 0,
            feedback: '',
            evaluation: 'Pending'
        };
        
        enrollments.push(enrollment);
        localStorage.setItem('enrollments', JSON.stringify(enrollments));
        
        // Also maintain backward compatibility with appliedInternships
        const applied = JSON.parse(localStorage.getItem('appliedInternships') || '[]');
        applied.push({
            internshipId: internship.id,
            userEmail: user.email,
            username: user.username,
            internshipTitle: internship.title,
            company: internship.company,
            appliedAt: new Date().toISOString(),
            status: 'Pending'
        });
        localStorage.setItem('appliedInternships', JSON.stringify(applied));
        
        showMessage(`Successfully applied to ${internship.title}!`, 'success');
        
        // Reload internships
        loadInternships();
    };

    const isApplied = (internshipId) => {
        return appliedInternships.some(app => app.internshipId === internshipId);
    };

    return (
        <>
            <Navbar />
            
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>Available Internships</h1>
                    <p>Explore exciting opportunities from top companies</p>
                </div>
            </section>

            {/* Internships Section */}
            <section className="internships-section">
                <div className="container">
                    <div className="filter-bar">
                        <p className="internship-count">Showing <span id="internshipCount">{internships.length}</span> internships</p>
                    </div>
                    
                    <div className="internships-grid" id="internshipsGrid">
                        {internships.map(internship => (
                            <div key={internship.id} className="internship-card">
                                <div className="internship-header">
                                    <h3>{internship.title}</h3>
                                    <span className="company-badge">{internship.company}</span>
                                </div>
                                <div className="internship-details">
                                    <div className="detail-item">
                                        <span className="detail-label">Duration:</span>
                                        <span className="detail-value">{internship.duration}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Location:</span>
                                        <span className="detail-value">{internship.location}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Stipend:</span>
                                        <span className="detail-value">{internship.stipend}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Type:</span>
                                        <span className="detail-value">{internship.type}</span>
                                    </div>
                                </div>
                                <p className="internship-description">{internship.description}</p>
                                <div className="skills-container">
                                    {internship.skills.map((skill, index) => (
                                        <span key={index} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                                <button 
                                    className={`btn-apply ${isApplied(internship.id) ? 'applied' : ''}`}
                                    onClick={() => applyToInternship(internship.id)}
                                    disabled={isApplied(internship.id)}
                                >
                                    {isApplied(internship.id) ? '✓ Already Applied' : '🚀 Apply Now'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Internships;
