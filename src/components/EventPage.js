import React, { useState } from 'react';
import axios from 'axios';
import '../styles/EventPage.css';

function EventPage({ event }) {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState("");

    // שמירת הקבצים שנבחרו
    const handleFileSelect = (e) => {
        setImages([...e.target.files]);
        setUploadProgress(0); // אפס את ההתקדמות לפני תחילת ההעלאה
    };

    // תהליך ההעלאה לשרת
    const handleSubmit = () => {
        debugger
        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append(`image${index}`, image);
        });

        axios.post(`http://localhost:8000/add-photos/?event-id=${event.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
            }
        })
            .then(response => {
                if (response.data.status === "success") {
                    setImages([]);
                    setMessage("התמונות עודכנו בהצלחה!");
                    setUploadProgress(0)
                } else {
                    setMessage("לא הצלחנו להעלות את התמונות. אנא נסה שנית!");
                }
                setTimeout(() => setMessage(""), 2000);
            })
            .catch(error => {
                console.error("There was an error uploading the images!", error);
                setMessage("אירעה שגיאה בהעלאה. אנא נסה שנית.");
            });

    };

    return (
        <div className={"event-page-container"}>
            <div className={"event-page-title"}>
                {event.name} - {event.date} - {event.location}
            </div>
            <div className={"event-page-body"}>
                <h3>Upload Photos</h3>
                <input
                    type="file"
                    className={"upload-input"}
                    onChange={handleFileSelect}
                    multiple
                />
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                <button
                    className={"upload-button"}
                    onClick={handleSubmit}
                    disabled={images.length ===0 || uploadProgress === 100}
                >
                    Upload
                </button>
                {message}
            </div>
        </div>
    );
};

export default EventPage;
