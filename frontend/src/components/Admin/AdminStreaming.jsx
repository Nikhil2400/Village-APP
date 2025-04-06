import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminStreaming = ({ socket }) => {
    const [streams, setStreams] = useState([]);
    const [option, setOption] = useState('');
    const [streamUrl, setStreamUrl] = useState('');
    const [isLive, setIsLive] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchStreams();
    }, []);

    const fetchStreams = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/get-streams');
            setStreams(response.data);
        } catch (error) {
            console.error('Error fetching streams', error);
        }
    };

    const handleSubmit = async () => {
        try {
            const streamData = { option, stream_url: streamUrl, is_live: isLive };
            if (editingId) {
                await axios.put(`http://localhost:5000/api/update-stream/${editingId}`, streamData);
            } else {
                await axios.post('http://localhost:5000/api/set-streaming-option', streamData);
            }
            alert('Live Stream Updated!');
            fetchStreams();
            resetForm();
            if (socket) {
                socket.emit('updateStream', streamData);
            }
        } catch (error) {
            console.error('Error updating stream', error);
        }
    };

    const handleEdit = (stream) => {
        setEditingId(stream.id);
        setOption(stream.option_name);
        setStreamUrl(stream.stream_url);
        setIsLive(stream.is_live);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this stream?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/delete-stream/${id}`);
            alert('Stream Deleted!');
            fetchStreams();
        } catch (error) {
            console.error('Error deleting stream', error);
        }
    };

    const toggleLive = async (id, currentStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/toggle-live/${id}`, { is_live: !currentStatus });
            fetchStreams();
        } catch (error) {
            console.error('Error toggling live stream', error);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setOption('');
        setStreamUrl('');
        setIsLive(false);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Admin Live Streaming</h2>
            <input 
                type="text" 
                placeholder="Enter Stream Name" 
                value={option} 
                onChange={(e) => setOption(e.target.value)} 
                style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
            />
            <input 
                type="text" 
                placeholder="Enter Stream URL" 
                value={streamUrl} 
                onChange={(e) => setStreamUrl(e.target.value)} 
                style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
            />
            <label>
                <input 
                    type="checkbox" 
                    checked={isLive} 
                    onChange={(e) => setIsLive(e.target.checked)} 
                /> 
                Go Live
            </label>
            <button 
                onClick={handleSubmit} 
                style={{ display: 'block', width: '100%', marginTop: '10px', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}
            >
                {editingId ? 'Update' : 'Add'} Streaming
            </button>

            <h3>Live Streams</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {streams.map((stream) => (
                    <li key={stream.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                        <strong>{stream.option_name}</strong> - {stream.stream_url}
                        <div>
                            <button 
                                onClick={() => handleEdit(stream)}
                                style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: 'orange', color: 'white', border: 'none', cursor: 'pointer' }}
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDelete(stream.id)}
                                style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
                            >
                                Delete
                            </button>
                            <button 
                                onClick={() => toggleLive(stream.id, stream.is_live)}
                                style={{ padding: '5px 10px', backgroundColor: stream.is_live ? 'green' : 'gray', color: 'white', border: 'none', cursor: 'pointer' }}
                            >
                                {stream.is_live ? 'Stop' : 'Start'} Live
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminStreaming;