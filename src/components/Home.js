import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import { FaBrain, FaHeartbeat, FaHandHoldingHeart } from 'react-icons/fa';
import { FaFacebook, FaTwitter, FaWhatsapp, FaInstagram } from 'react-icons/fa';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Solace - A Mental Health Platform</h1>
                    <h2 className="hero-subtitle">Your Mental Health Matters</h2>
                    <p className="hero-description">
                        Discover professional mental health assessments and resources designed to help you understand and improve your emotional well-being. Our platform provides confidential, research-based tools for your journey to better mental health.
                    </p>
                </div>
            </section>

            {/* Services Section */}
            <section className="services-section">
                <h2 className="section-title">Our Services</h2>
                <div className="services-grid">
                    <div className="service-card">
                        <FaBrain className="service-icon" />
                        <h3 className="service-title">Mental Health Assessment</h3>
                        <p className="service-description">
                            Take our comprehensive mental health assessments to gain insights into your emotional well-being and identify areas for improvement.
                        </p>
                    </div>
                    <div className="service-card">
                        <FaHeartbeat className="service-icon" />
                        <h3 className="service-title">Personalized Analysis</h3>
                        <p className="service-description">
                            Receive detailed analysis and personalized recommendations based on your assessment results.
                        </p>
                    </div>
                    <div className="service-card">
                        <FaHandHoldingHeart className="service-icon" />
                        <h3 className="service-title">Support Resources</h3>
                        <p className="service-description">
                            Access a wide range of mental health resources, coping strategies, and professional guidance.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="contact-section">
                <h2 className="contact-title">Contact Us</h2>
                <p className="contact-description">
                    Connect with us on social media for updates and support
                </p>
                <div className="social-links">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                        <FaFacebook />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                        <FaTwitter />
                    </a>
                    <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
                        <FaWhatsapp />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                        <FaInstagram />
                    </a>
                </div>
            </section>
        </div>
    );
}

export default Home;