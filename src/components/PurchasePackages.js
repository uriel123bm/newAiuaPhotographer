import React from 'react';
import { useNavigate} from 'react-router-dom';
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
            <h1 className="purchase-title">Purchase Packages</h1>
            <p className="purchase-text">
                Here you can finalize your purchase. Please follow the instructions to complete your order.
            </p>
            <div className="button-container">
                <button className="back-button" onClick={handleBackClick}>
                    Back to Packages
                </button>
                <button className="back-button" onClick={handleHomeClick}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default PurchasePackages;
