
// AdminCalendar.jsx (Admin Side - React)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/events')
            .then(res => setEvents(res.data))
            .catch(error => console.error("Error fetching events:", error));
    }, []);

    const addEvent = () => {
        axios.post('http://localhost:5000/api/admin/events', { title, date, description }) 
            .then((res) => {
                alert('Event added successfully!');
                setEvents([...events, { id: res.data.eventId, title, date, description }]);
            })
            .catch(error => console.error("Error adding event:", error));
    };
    

    const deleteEvent = (id) => {
        axios.delete(`http://localhost:5000/api/admin/events/${id}`)
            .then(() => {
                alert('Event deleted!');
                window.location.reload();
            })
            .catch(error => console.error("Error deleting event:", error));
    };

    return (
        <div>
            <h2>Admin Calendar Management</h2>
            <input type="text" placeholder="Event Title" onChange={e => setTitle(e.target.value)} />
            <input type="date" onChange={e => setDate(e.target.value)} />
            <input type="text" placeholder="Description" onChange={e => setDescription(e.target.value)} />
            <button onClick={addEvent}>Add Event</button>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        {event.title} - {event.description} ({event.date}) 
                        <button onClick={() => deleteEvent(event.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default Calendar;