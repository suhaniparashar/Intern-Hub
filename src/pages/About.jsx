import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
    return (
        <>
            <Navbar />
            
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>About InternHub</h1>
                    <p>Empowering students to find their perfect internship</p>
                </div>
            </section>

            {/* About Content */}
            <section className="about-content-section">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-text">
                            <h2>Our Mission</h2>
                            <p>
                                InternHub is dedicated to bridging the gap between talented students and leading companies. 
                                We believe that every student deserves access to quality internship opportunities that help 
                                them build valuable skills and kickstart their professional careers.
                            </p>
                            <p>
                                This platform serves as a demonstration of modern web technologies, showcasing how 
                                a complete internship management system can be built using only HTML, CSS, and JavaScript 
                                without any backend infrastructure.
                            </p>
                        </div>
                        
                        <div className="about-image">
                            <div className="placeholder-image">
                                <span>🎯</span>
                                <p>Connecting Students with Opportunities</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">What We Offer</h2>
                    
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🔍</div>
                            <h3>Easy Search</h3>
                            <p>Browse through curated internship opportunities from various industries and companies.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>One-Click Apply</h3>
                            <p>Apply to multiple internships quickly and efficiently with our streamlined process.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Track Applications</h3>
                            <p>Monitor all your applications in one place with real-time status updates.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💼</div>
                            <h3>Career Growth</h3>
                            <p>Gain valuable work experience and build your professional network.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="tech-stack-section">
                <div className="container">
                    <h2 className="section-title">Built With</h2>
                    <p className="section-subtitle">Pure front-end technologies</p>
                    
                    <div className="tech-grid">
                        <div className="tech-item">
                            <h3>HTML5</h3>
                            <p>Semantic markup and structure</p>
                        </div>
                        <div className="tech-item">
                            <h3>CSS3</h3>
                            <p>Modern styling and animations</p>
                        </div>
                        <div className="tech-item">
                            <h3>JavaScript</h3>
                            <p>Interactive functionality</p>
                        </div>
                        <div className="tech-item">
                            <h3>LocalStorage</h3>
                            <p>Client-side data persistence</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Start Your Internship Journey?</h2>
                        <p>Join InternHub today and discover amazing opportunities</p>
                        <div className="cta-buttons">
                            <Link to="/register" className="btn btn-primary">Get Started</Link>
                            <Link to="/internships" className="btn btn-outline">Browse Internships</Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default About;
