import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { showMessage } from '../utils/notifications';

function Internships() {
    const navigate = useNavigate();
    const { loggedInUser, internships, applyForInternship, hasApplied, isLoading } = useAppContext();
    const [filterType, setFilterType] = useState('all');

    const filteredInternships = filterType === 'all' 
        ? internships 
        : internships.filter(i => i.type === filterType);

    const handleApply = (internshipId) => {
        if (!loggedInUser) {
            showMessage('Please login to apply for internships', 'warning');
            setTimeout(() => navigate('/login'), 1500);
            return;
        }
        
        if (hasApplied(internshipId)) {
            showMessage('You have already applied to this internship', 'warning');
            return;
        }
        
        if (applyForInternship(internshipId)) {
            showMessage('Application submitted successfully!', 'success');
        } else {
            showMessage('Failed to apply. Please try again.', 'error');
        }
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
                        <p className="internship-count">
                            {isLoading ? 'Loading internships...' : `Showing ${filteredInternships.length} internships`}
                        </p>
                    </div>
                    
                    <div className="internships-grid" id="internshipsGrid">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : filteredInternships.length === 0 ? (
                            <p>No internships available at the moment.</p>
                        ) : (
                            filteredInternships.map(internship => (
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
                                        className={`btn-apply ${hasApplied(internship.id) ? 'applied' : ''}`}
                                        onClick={() => handleApply(internship.id)}
                                        disabled={hasApplied(internship.id)}
                                    >
                                        {hasApplied(internship.id) ? '✓ Already Applied' : '🚀 Apply Now'}
                                    </button>
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

export default Internships;
