import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/packages">Pricing</Link></li>
                {/* כפתור ה-Login */}
                <li><Link to="/login" className="login-button">Login</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
