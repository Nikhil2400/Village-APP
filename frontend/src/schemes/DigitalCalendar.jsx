import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/DigitalCalendar.css'; // सानुकूल CSS

const DigitalCalendar = () => {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        axios.get('http://52.66.183.128:5000/api/events')
            .then(res => setEvents(res.data))
            .catch(error => console.error("घटनांची माहिती आणताना त्रुटी:", error));
    }, []);

    // तारीख योग्य स्वरूपात बदलण्यासाठी फंक्शन
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('mr-IN', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    // तारीख `YYYY-MM-DD` स्वरूपात मिळवण्यासाठी फंक्शन
    const getFormattedDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    // निवडलेल्या तारखेसाठी इव्हेंट फिल्टर करा
    const filteredEvents = events.filter(event => 
        getFormattedDate(new Date(event.date)) === getFormattedDate(selectedDate)
    );

    return (
        <div className="calendar-container">
            <h1>📅 कॅलेंडर</h1>

            {/* कॅलेंडर कॉम्पोनंट */}
            <div className="calendar-wrapper">
                <Calendar 
                    className="custom-calendar"
                    onChange={setSelectedDate}
                    value={selectedDate}
                />
            </div>

            {/* इव्हेंट यादी */}
            <div className="event-list">
                <h3>📌 {formatDate(selectedDate)} रोजीचे कार्यक्रम</h3>
                {filteredEvents.length > 0 ? (
                    <ul>
                        {filteredEvents.map(event => (
                            <li key={event.id}>
                                <strong>{event.title}</strong> - {event.description}
                                <span className="event-date">({formatDate(event.date)})</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>या दिवशी कोणतेही कार्यक्रम नाहीत.</p>
                )}
            </div>
        </div>
    );
};

export default DigitalCalendar;
