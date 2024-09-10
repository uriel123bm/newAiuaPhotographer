import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // ייבוא הקומפוננטה של ה-Navbar
import '../styles/Home.css'; // ייבוא קובץ CSS של דף הבית
const Home = () => {
    return (
        <div className="home-page">
            {/* מייבא מהקופוננטה*/}
            <Navbar />

            {/* Main Content */}
            <div className="hero-section">
                <h1>Welcome to A.I.U.A Events</h1>

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