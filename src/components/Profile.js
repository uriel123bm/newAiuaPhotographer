import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Profile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [images, setImages] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setFirstName(storedUser.firstName);
            setLastName(storedUser.lastName);
        }
    }, []);

    const handleImageUpload = (e) => {
        const files = e.target.files;
        // כאן תוכל להוסיף את הלוגיקה להעלאת תמונות
    };

    return (
        <div>
            <h2>שלום {firstName} {lastName}</h2>
            <input type="file" multiple onChange={handleImageUpload} />
            <div>
                <h3>האירועים שלי</h3>
                {/* כאן תוכל להציג את האירועים */}
            </div>
            <p>רוצה לצאת? <Link to="/Login">התנתק</Link></p>
        </div>
    );
};

export default Profile;
