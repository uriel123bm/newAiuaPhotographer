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
                debugger
                setEvents(response.data)
            })

    }


    const sortEventsByDate = (events) => {
        return events.sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.split('/').map(Number);
            const [dayB, monthB, yearB] = b.date.split('/').map(Number);

            const dateA = new Date(yearA, monthA - 1, dayA);
            const dateB = new Date(yearB, monthB - 1, dayB);

            return dateA - dateB;
        });
    };

    const handleLockEvent =()=>{
        const confirmed = window.confirm("Are you sure you want to lock this event? This action cannot be undone.");
        if (confirmed){
            axios.get("http://localhost:8000/lock-event?event-id="+selectedEvent.id)
                .then((response)=>{
                    console.log(response.data)
                    debugger
                    updateLockedEvent(response.data.event)
                    setSelectedEvent(response.data.event)

                })
        }

    }

    const updateLockedEvent = (event) => {
        setEvents(prevEvents =>
            prevEvents.map(ev => ev.id === event.id ? event : ev)
        );
    };


    return (
        <div className={"main-container"}>
            <div className={"profile-header-container"}>
                <h1 className="event-name">{user.name}</h1>
                <div id={"edit-user-button"}>🖉</div>
                <div className="event-details">
                    <span className="event-date">{user.phone}</span>
                    <span style={{ fontWeight: "bold" }}> · </span>
                    <span className="event-location">{user.email}</span>
                </div>
            </div>
            <button id={"create-event"} className={"event-button"} onClick={() => setShowModal(true)}>Create Event</button>

            <MyEvents events={sortEventsByDate(events)} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent}/>
            {showModal && (
               <CreateEvent setShowModal={setShowModal} setEvents={setEvents}/>
            )}
            {
                selectedEvent !== null &&
                <div>
                    {
                        selectedEvent.is_open &&
                        <button id={"lock-event"} className={"event-button"} onClick={handleLockEvent}>Lock Event</button>
                    }
                    <EventPage event={selectedEvent}/>
                </div>

            }

        </div>
    );
};

export default Profile;
