import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../styles/Profile.css';
import MyEvents from "./MyEvents";
import axios from "axios";
import CreateEvent from "./CreateEvent";
import EventPage from "./EventPage";


const Profile = () => {
    const [user, setUser] = useState({});
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [selectedEvent,setSelectedEvent] = useState(null)

    const navigate = useNavigate();

    // טוען את המידע של המשתמש מה-localStorage
    useEffect(() => {
        getUser()
        getEvents()
    }, []);

    const getUser =()=>{
        axios.get("http://localhost:8000/get-user",{withCredentials: true})
            .then((response)=>{
                debugger
                setUser(response.data)
            })

    }

    const getEvents =()=>{
        axios.get("http://localhost:8000/get-events",{withCredentials: true})
            .then((response)=>{

                setEvents(response.data)
            })

    }

    //פונקציה למעבר לדף האירוע
    const handleEventClick = (event) => {
        navigate(`/event/${event.name}-${event.location}`, { state: { event } });
    };


    return (
        <div className={"main-container"}>
            <div className={"profile-header-container"}>
                {user.name} {user.email} {user.phone}
            </div>
            <button id={"create-event"} className={"event-button"} onClick={() => setShowModal(true)}>Create Event</button>
            <MyEvents events={events} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent}/>
            {showModal && (
               <CreateEvent setShowModal={setShowModal} setEvents={setEvents}/>
            )}
            {
                selectedEvent !== null &&
                <EventPage event={selectedEvent}/>
            }

        </div>
    );
};

export default Profile;
