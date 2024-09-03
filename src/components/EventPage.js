import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const EventPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { event } = location.state || {}; // Get event details from state

    const [images, setImages] = useState([]);

    // Function to handle image upload
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...newImages]);
    };

    // Function to delete the event
    const handleDeleteEvent = () => {
        if (window.confirm(`האם אתה בטוח שברצונך למחוק את האירוע של ${event.name}?`)) {
            // Logic to delete event from storage (or state) goes here

            // Redirect to profile page
            navigate('/profile');
        }
    };

    return (
        <div>
            <h2 className={"Name-style"}>פרטי האירוע</h2>
            {event ? (
                <div>
                    <p>שם האירוע: {event.name}</p>
                    <p>מיקום: {event.location}</p>
                    <p>תאריך: {event.date}</p>

                    <div>
                        <h3 >הוסף תמונות</h3>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                        />
                        {images.length > 0 && (
                            <div className="image-gallery">
                                {images.map((img, index) => (
                                    <img key={index} src={img} alt={`Event ${index}`} className="event-image" />
                                ))}
                            </div>
                        )}
                    </div>

                    <button onClick={handleDeleteEvent} className="delete-button">מחק אירוע</button>
                    <Link className={"Link-exit"} to="/profile">חזור לפרופיל</Link>
                </div>
            ) : (
                <p>לא נמצאו פרטי אירוע.</p>
            )}
        </div>
    );
};

export default EventPage;
