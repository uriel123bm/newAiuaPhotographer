import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link here
import '../styles/Clients.css';
import Navbar from "./Navbar"; // Import the CSS file for styling

const ClientCard = ({ image, name, testimonial }) => {
    return (
        <div className="client-card">
            <img src={image} alt={name} className="client-image" />
            <h3 className="client-name">{name}</h3>
            <p className="client-testimonial">"{testimonial}"</p>
        </div>
    );
};

const Clients = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <div className="clients-container">
            {/* מייבא מהקופוננטה*/}
            <Navbar />

            <h1 className="clients-title">Our Clients</h1>
            <div className="clients-grid">
                <ClientCard
                    image="path_to_image1.jpg" // Replace with actual image path
                    name="Avihai & Hadar Swissa"
                    testimonial="A.I.U.A made our wedding unforgettable. The photo service was seamless and the quality was superb!"
                />
                <ClientCard
                    image="path_to_image2.jpg" // Replace with actual image path
                    name="Emily & Michael Smith"
                    testimonial="Fantastic experience with A.I.U.A. The photos were accessible and everyone loved the ease of use."
                />
            </div>
        </div>
    );
};

export default Clients;
