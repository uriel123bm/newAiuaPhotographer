import React, {useState} from "react";
import axios from "axios";

function CreateEvent({setShowModal, setEvents}){
    const [newEvent, setNewEvent] = useState({
        name: '',
        location: '',
        date: ''
    });

    const handleInputChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    const isFormComplete = () => {
        return newEvent.name && newEvent.location && newEvent.date;
    };

    const handleAddEvent = () => {
        const formData = new FormData();
        formData.append('name', newEvent.name);
        formData.append('location', newEvent.location);
        formData.append('date', newEvent.date);

        axios.post('http://localhost:8000/create-event/', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                if (response.status === 201) {

                    setEvents(response.data.events);
                    setShowModal(false);
                }
            })
            .catch(error => {
                console.error('Error creating event:', error.response ? error.response.data : error.message);
            });
    };

    const handleShowModal = () => {
        setShowModal(false)
    };

    return(
        <div className="modal-event">
            <div className="modal-content">
                <h3>Create New Event</h3>
                <input
                    className={"modal-input"}
                    type="text"
                    name="name"
                    placeholder="Event Name"
                    value={newEvent.name}
                    onChange={handleInputChange}
                />
                <input
                    className={"modal-input"}
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={newEvent.location}
                    onChange={handleInputChange}
                />
                <input
                    className={"modal-input"}
                    type="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                />
                <button className={"event-button"}
                        onClick={handleAddEvent}
                        disabled={!isFormComplete()}
                >
                    Create
                </button>
                <button className={"event-button"} onClick={handleShowModal}>Close</button>
            </div>
        </div>
    )

}

export default CreateEvent