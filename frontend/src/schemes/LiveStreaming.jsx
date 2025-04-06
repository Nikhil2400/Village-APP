import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/LiveStreaming.css';

const LiveStreaming = () => {
    const [streamData, setStreamData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStream = () => {
            axios.get('http://localhost:5000/api/get-streaming-option')
                .then(res => {
                    setStreamData(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('लाईव्ह स्ट्रीम लोड करताना त्रुटी:', err);
                    setError('लाईव्ह स्ट्रीम लोड करण्यात अयशस्वी.');
                    setLoading(false);
                });
        };

        fetchStream();
        const interval = setInterval(fetchStream, 5000); // दर 5 सेकंदांनी डेटा अपडेट

        return () => clearInterval(interval); // अनमाउंट झाल्यावर इंटरव्हल क्लिअर करणे
    }, []);

    if (loading) {
        return <h2>लाईव्ह स्ट्रीम लोड होत आहे...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!streamData || !streamData.is_live || !streamData.stream_url) {
        return (
            <div className="no-stream-container">
                <div className="animated-text">⏳ सध्या कोणताही लाईव्ह स्ट्रीम उपलब्ध नाही</div>
                <div className="blinking-text">🚀 थोड्या वेळात पुन्हा पहा!</div>
            </div>
        );
    }

    const { stream_url, option_name } = streamData;

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>📡 {option_name} सध्या लाईव्ह आहे!</h2>
            {stream_url.includes('youtube.com') || stream_url.includes('youtu.be') ? (
                <iframe 
                    width="100%" 
                    height="500px" 
                    src={stream_url.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1'} 
                    frameBorder="0" 
                    allow="autoplay; encrypted-media" 
                    allowFullScreen 
                    title="लाईव्ह स्ट्रीम">
                </iframe>
            ) : (
                <video 
                    controls 
                    autoPlay 
                    muted 
                    playsInline 
                    width="100%" 
                    height="500px">
                    <source src={stream_url} type="application/x-mpegURL" />
                </video>
            )}
        </div>
    );
};

export default LiveStreaming;
