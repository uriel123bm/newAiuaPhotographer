import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const EventPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { event } = location.state || {}; // קבלת פרטי האירוע מה-state

    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // דף נוכחי עבור Pagination
    const imagesPerPage = 30; // מספר תמונות לדף

    // חישוב מספר הדפים הכולל
    const totalPages = Math.ceil(images.length / imagesPerPage);

    // חישוב התמונות לדף הנוכחי
    const currentImages = images.slice(
        (currentPage - 1) * imagesPerPage,
        currentPage * imagesPerPage
    );

    // פונקציה לטיפול בהעלאת תמונות
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...newImages]);
    };

    // פונקציה לעמוד הבא
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // פונקציה לעמוד הקודם
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // מחיקת אירוע
    const handleDeleteEvent = () => {
        if (window.confirm(`האם אתה בטוח שברצונך למחוק את האירוע של ${event.name}?`)) {
            navigate('/profile');
        }
    };

    return (
        <div>
            <h2 className="Name-style">פרטי האירוע</h2>
            {event ? (
                <div>
                    <p>שם האירוע: {event.name}</p>
                    <p>מיקום: {event.location}</p>
                    <p>תאריך: {event.date}</p>

                    <div>
                        <h3>הוסף תמונות</h3>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                        />
                        {images.length > 0 && (
                            <div>
                                <p>{` ${currentImages.length} / ${images.length} תמונות `}</p>
                                <div className="image-gallery">
                                    {currentImages.map((img, index) => (
                                        <img key={index} src={img} alt={`Event ${index}`} className="event-image" />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* כפתורי Pagination */}
                        {images.length > imagesPerPage && (
                            <div className="pagination">
                                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                                    קודם
                                </button>
                                <span>עמוד {currentPage} מתוך {totalPages}</span>
                                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                                    הבא
                                </button>
                            </div>
                        )}
                    </div>

                    <button onClick={handleDeleteEvent} className="delete-button">מחק אירוע</button>
                    <Link className="Link-exit" to="/profile">חזור לפרופיל</Link>
                </div>
            ) : (
                <p>לא נמצאו פרטי אירוע.</p>
            )}
        </div>
    );
};

export default EventPage;
