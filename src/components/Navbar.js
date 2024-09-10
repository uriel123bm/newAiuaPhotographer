import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login / Register</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/packages">Our Packages</Link></li>
                <li><Link to="/clients">Our Clients</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
