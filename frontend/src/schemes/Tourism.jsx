import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Tourism.css"; // Ensure CSS is in the correct path

function Tourism() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);

    useEffect(() => {
        axios.get("http://52.66.183.128:5000/api/tourism/places")
            .then((res) => {
                setPlaces(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching tourist places:", err);
                setError("Failed to load tourist places. Please try again later.");
                setLoading(false);
            });
    }, []);

    const handleClick = (place) => {
        setSelectedPlace(selectedPlace === place ? null : place);
    };

    return (
<div className="tourism-container" style={{ textAlign: "center", padding: "50px" }}>   
             <h2 className="tourism-title">📍 पर्यटक स्थळे</h2>
            
            {loading && <p className="loading">लोड होत आहे...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && (
                <div className="tourism-list">
                    {places.map((place) => (
                        <div 
                            key={place.id} 
                            className="place-card" 
                            onClick={() => handleClick(place)}
                        >
                            <h3 className="place-title">{place.name}</h3>

                            {selectedPlace === place && (
                                <div className="place-details">
                                    <img 
                                        src={`http://localhost:5000${place.image_url}`} 
                                        alt={place.name} 
                                        className="place-image"
                                    />
                                    <p className="place-description">{place.description}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Tourism;
