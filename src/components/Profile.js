import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
    const [fullName, setFullName] = useState('');
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({
        name: '',
        location: '',
        date: ''
    });

    const navigate = useNavigate();

    // טוען את המידע של המשתמש מה-localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setFullName(storedUser.fullName); // שינוי ל-fullName
        }
    }, []);

    // פונקציה לבדיקת אם כל השדות מלאים
    const isFormComplete = () => {
        return newEvent.name && newEvent.location && newEvent.date;
    };

    // פונקציה לבדוק אם האירוע כבר קיים
    const isEventDuplicate = () => {
        return events.some(event =>
            event.name === newEvent.name &&
            event.location === newEvent.location &&
            event.date === newEvent.date
        );
    };

    // פונקציה להוסיף אירוע
    const handleAddEvent = () => {
        if (isFormComplete() && !isEventDuplicate()) {
            const updatedEvents = [...events, newEvent].sort((a, b) => new Date(a.date) - new Date(b.date));
            setEvents(updatedEvents);
            setNewEvent({ name: '', location: '', date: '' });
            setShowModal(false);
        } else if (isEventDuplicate()) {
            alert('אירוע כזה כבר קיים!');
        }
    };

    // פונקציה לעדכון השדות של האירוע
    const handleInputChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    // פונקציה למעבר לדף האירוע
    const handleEventClick = (event) => {
        navigate(`/event/${event.name}-${event.location}`, { state: { event } });
    };

    return (
        <div>
            <h2 className={"Name-style"}>שלום {fullName}</h2> {/* שימוש ב-fullName */}
            <div className="event-container">
                <h3 className={"Event-style"}>האירועים שלי</h3>
                <ul>
                    {events.map((event, index) => (
                        <li key={index}>
                            <button onClick={() => handleEventClick(event)}>
                                {event.name}, {event.date} ב-{event.location}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={() => setShowModal(true)}>הוסף אירוע</button>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>הוסף אירוע חדש</h3>
                        <input
                            type="text"
                            name="name"
                            placeholder="שם האירוע"
                            value={newEvent.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="מיקום"
                            value={newEvent.location}
                            onChange={handleInputChange}
                        />
                        <input
                            type="date"
                            name="date"
                            value={newEvent.date}
                            onChange={handleInputChange}
                        />
                        <button
                            onClick={handleAddEvent}
                            disabled={!isFormComplete()} // הופך את הכפתור ללא פעיל אם השדות לא מלאים
                        >
                            שמור
                        </button>
                        <button onClick={() => setShowModal(false)}>סגור</button>
                    </div>
                </div>
            )}
            <p className={"Link-exit"}>רוצה לצאת? <Link to="/">התנתק</Link></p>
        </div>
    );
};

export default Profile;
