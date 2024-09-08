import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
    return (
        <div className="home-page">
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

            {/* Main Content */}
            <div className="hero-section">
                <h1>Welcome to A.I.U.A Event!</h1>

            </div>

            {/* Event Elements Section */}
            <div className="event-elements">
                <div className="event-card">
                    <img src="wedding-icon.png" alt="Wedding Icon" />
                    <h3>Weddings</h3>
                    <p>Create your dream wedding with our tailored packages.</p>
                </div>
                <div className="event-card">
                    <img src="conference-icon.png" alt="Conference Icon" />
                    <h3>Conferences</h3>
                    <p>Plan the perfect conference with our professional services.</p>
                </div>
                <div className="event-card">
                    <img src="party-icon.png" alt="Party Icon" />
                    <h3>Private Parties</h3>
                    <p>Host unforgettable private parties with us.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
