import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventUploader = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState("");

    // Fetch the list of events from the server
    useEffect(() => {
        axios.get('http://localhost:8000/get-events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the events!", error);
            });
    }, []);

    // Handle event selection
    const handleEventSelect = (event) => {
        setSelectedEvent(event);
    };

    // Handle image selection
    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    // Handle image upload
    const handleUpload = () => {
        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append(`image${index}`, image); // תיקון השימוש ב-template literals
        });

        axios.post(`http://localhost:8000/add-photos/?event-id=${selectedEvent.id}`, formData) // תיקון של שימוש במרכאות
            .then(response => {
                if (response.data.status === "success") {
                    setImages([]);
                    setSelectedEvent(null);
                    setMessage("התמונות עודכנו בהצלחה!");
                    setTimeout(() => {
                        setMessage("");
                    }, 2000);
                } else {
                    setImages([]);
                    setSelectedEvent(null);
                    setMessage("לא הצלחנו להעלות את התמונות. אנא נסה שנית!");
                    setTimeout(() => {
                        setMessage("");
                    }, 2000);
                }
            })
            .catch(error => {
                console.error("There was an error uploading the images!", error);
            });
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Upload Event Images</h1>

            {/* Display event list */}
            <div style={styles.eventList}>
                {events.map(event => (
                    <div
                        key={event.id}
                        onClick={() => handleEventSelect(event)}
                        style={event.id === selectedEvent?.id ? styles.selectedEvent : styles.eventItem}
                    >
                        {event.name} - {event.date}
                    </div>
                ))}
            </div>

            {/* Upload button and image selection */}
            {selectedEvent && (
                <div style={styles.uploadSection}>
                    <h2 style={styles.subHeader}>Selected Event: {selectedEvent.name}</h2>
                    <input type="file" multiple onChange={handleImageChange} style={styles.fileInput} />
                    <button onClick={handleUpload} style={styles.uploadButton}>Upload Images</button>
                </div>
            )}

            {/* Display message */}
            <div>
                {message}
            </div>
        </div>
    );
};
// TODO להוציא לקובץ נפרד

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f7f7f7',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center',
        color: '#333',
    },
    eventList: {
        margin: '20px 0',
    },
    eventItem: {
        padding: '10px',
        margin: '5px 0',
        backgroundColor: '#eee',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    selectedEvent: {
        padding: '10px',
        margin: '5px 0',
        backgroundColor: '#cce5ff',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    uploadSection: {
        marginTop: '20px',
    },
    subHeader: {
        color: '#555',
    },
    fileInput: {
        display: 'block',
        margin: '10px 0',
    },
    uploadButton: {
        padding: '10px 15px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default EventUploader;
