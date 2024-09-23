import React from "react";

function MyEvents({events, selectedEvent, setSelectedEvent}){

    const handleEventClick = (event) => {

        setSelectedEvent(event); // נניח שזו הפונקציה שמעדכנת מחוץ לקומפוננטה
    };

    return (
        <div className="events-container">
            <div className={"event-container-title"}>MY EVENTS</div>
            <div className={"event-list"}>
                <div className={"event-list-header"}>
                    <span>Event Name</span>
                    <span>Date</span>
                    <span>Location</span>
                </div>
                {events.map((event) => (
                    <div
                        key={event.id} // הוסף מפתח ייחודי לכל אירוע
                        className={`event-item ${selectedEvent === event ? "selected" : ""}`}
                        onClick={() => handleEventClick(event)}
                    >
                        <span>{event.name}</span>
                        <span>{event.date}</span>
                        <span>{event.location}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyEvents