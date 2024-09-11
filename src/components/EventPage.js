import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/EventPage.css';

const EventPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { event } = location.state || {}; // קבלת פרטי האירוע מה-state

    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // דף נוכחי עבור Pagination
    const [isLoading, setIsLoading] = useState(false); // מצב טעינה
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
        setIsLoading(true); // מתחילים טעינה
        const files = Array.from(e.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));

        // סימולציה של זמן טעינה (למשל בזמן העלאה לשרת)
        setTimeout(() => {
            setImages(prevImages => [...prevImages, ...newImages]);
            setIsLoading(false); // סיום טעינה
        }, 2000); // סימולציה של 2 שניות טעינה
    };

    // פונקציה לעמוד הבא
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setIsLoading(true); // מתחילים טעינה
            setTimeout(() => {
                setCurrentPage(currentPage + 1);
                setIsLoading(false); // סיום טעינה
            }, 1000); // סימולציה של טעינה של דף
        }
    };

    // פונקציה לעמוד הקודם
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setIsLoading(true); // מתחילים טעינה
            setTimeout(() => {
                setCurrentPage(currentPage - 1);
                setIsLoading(false); // סיום טעינה
            }, 1000); // סימולציה של טעינה של דף
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
                        {isLoading ? (
                            <p>טוען...</p>
                        ) : (
                            <>
                                {images.length > 0 && (
                                    <div>
                                        <p>{`מוצגות ${currentImages.length} תמונות מתוך ${images.length} סה"כ`}</p>
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
                            </>
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
