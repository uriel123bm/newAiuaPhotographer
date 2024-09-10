// Packages.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link here
import '../styles/Packages.css';
import Navbar from "./Navbar";

const PackageCard = ({ title, details, price }) => {
    const navigate = useNavigate();

    const handlePurchaseClick = () => {
        navigate('/purchase-packages');
    };

    return (
        <div className="package-card">
            <h2 className="package-title">{title}</h2>
            <ul className="package-details">
                {details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                ))}
            </ul>
            <p className="package-price">${price}</p>
            <button className="purchase-button" onClick={handlePurchaseClick}>
                Purchase
            </button>
        </div>
    );
};

const Packages = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <div className="packages-container">
            {/* מייבא מהקופוננטה*/}
            <Navbar />

            <h1 className="packages-title">Our Packages</h1>
            <div className="packages-grid">
                <PackageCard
                    title="Standard Package"
                    details={[
                        "12-month software subscription",
                        "Up to 10 events per month",
                        "Up to 500 photos per event"
                    ]}
                    price="200"
                />
                <PackageCard
                    title="Premium Package"
                    details={[
                        "24-month subscription",
                        "Up to 25 events per month",
                        "Up to 1000 photos per event"
                    ]}
                    price="300"
                />
                <PackageCard
                    title="Super Premium Package"
                    details={[
                        "36-month subscription",
                        "Unlimited events",
                        "Unlimited photos"
                    ]}
                    price="500"
                />
            </div>
            <button className="home-button" onClick={handleHomeClick}>
                Back to Home
            </button>
        </div>
    );
};

export default Packages;
