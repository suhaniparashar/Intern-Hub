import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Home() {
    return (
        <>
            <Navbar />
            
            {/* Hero Section */}
            <section id="home" className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Welcome to InternHub</h1>
                        <p className="hero-subtitle">Find your dream internship easily</p>
                        <p className="hero-description">
                            Connect with top companies and kickstart your career journey. 
                            InternHub is your gateway to exciting internship opportunities across various industries.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/internships" className="btn btn-primary">View Internships</Link>
                            <Link to="/dashboard" className="btn btn-outline">Student Dashboard</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Why Choose InternHub?</h2>
                    <p className="section-subtitle">Your gateway to professional success</p>
                    
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">💼</div>
                            <h3>Quality Internships</h3>
                            <p>Access curated opportunities from top companies across various industries.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Quick Apply</h3>
                            <p>Apply to multiple internships with just one click and track your progress.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Track Status</h3>
                            <p>Monitor your application status in real-time through your dashboard.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎓</div>
                            <h3>Career Growth</h3>
                            <p>Build your skills and experience with internships that matter.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about-section">
                <div className="container">
                    <h2 className="section-title">About InternHub</h2>
                    <p className="about-text">
                        InternHub is a demo platform designed to connect students with internship opportunities. 
                        Our mission is to simplify the internship search process and help students gain valuable 
                        work experience. This is a static demonstration project showcasing modern web design 
                        and local storage functionality.
                    </p>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Home;
