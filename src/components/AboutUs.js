import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link here
import './AboutUs.css';

const AboutUs = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <div className="about-us-container">
            {/* Navigation Bar */}
            <nav className="navbar">
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/about-us">About Us</Link></li>
                    <li><Link to="/packages">Our Packages</Link></li>
                    <li><Link to="/clients">Our Clients</Link></li>
                </ul>
            </nav>

            <h1 className="about-us-title">About Us</h1>
            <p className="about-us-text">
                <strong>Welcome to A.I.U.A</strong>, a pioneering company in software development and technological solutions. Founded by four college friends, we bring innovation and expertise to create cutting-edge technology experiences.
            </p>
            <p className="about-us-text">
                One of our flagship products is <strong>A.I.U.A Event</strong>, designed to enhance your event experience for your guests. Our platform offers easy access to your event photos, ensuring that every guest can enjoy the highest quality images. We understand the importance of capturing memorable moments, so we've developed a system that delivers photos directly to your guests without the need for additional software installations.
            </p>
            <p className="about-us-text">
                Using <strong>WhatsApp</strong>, we ensure that accessing photos is simple and accessible for everyone. No need to deal with complicated software – just use the familiar and user-friendly app that everyone knows.
            </p>
            <p className="about-us-text">
                <strong>Your experience is our event!</strong> We are here to ensure that every important detail receives the attention it deserves, and that every memory is captured and delivered in the best possible way.
            </p>
            <button className="back-button" onClick={handleBackClick}>
                Back to Home
            </button>
        </div>
    );
};

export default AboutUs;
