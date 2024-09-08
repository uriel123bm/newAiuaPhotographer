import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link here
import '../styles/PurchasePackages.css';

const PurchasePackages = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/packages');
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <div className="purchase-packages-container">
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

            <h1 className="purchase-title">Purchase Packages</h1>
            <p className="purchase-text">
                Here you can finalize your purchase. Please follow the instructions to complete your order.
            </p>
            {/* Add form or payment integration here */}
            <div className="button-container">
                <button className="back-button" onClick={handleBackClick}>
                    Back to Packages
                </button>
                <button className="home-button" onClick={handleHomeClick}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default PurchasePackages;
