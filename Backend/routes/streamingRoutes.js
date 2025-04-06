const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 🟢 Fetch All Live Streams
router.get('/get-streams', (req, res) => {
    db.query('SELECT * FROM live_streaming ORDER BY id DESC', (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

// 🔴 Fetch Current Live Streaming (Latest Entry)
router.get('/get-streaming-option', (req, res) => {
    db.query('SELECT * FROM live_streaming ORDER BY id DESC LIMIT 1', (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result.length > 0 ? result[0] : { option_name: '', stream_url: '', is_live: false });
    });
});

// 🟡 Admin: Add New Streaming Option
router.post('/set-streaming-option', (req, res) => {
    const { option, stream_url, is_live } = req.body;
    db.query('INSERT INTO live_streaming (option_name, stream_url, is_live) VALUES (?, ?, ?)', [option, stream_url, is_live], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ success: true, message: 'Streaming option added!' });
    });
});

// 🟠 Admin: Update Existing Streaming Option
router.put('/update-stream/:id', (req, res) => {
    const { option, stream_url, is_live } = req.body;
    const { id } = req.params;
    db.query('UPDATE live_streaming SET option_name = ?, stream_url = ?, is_live = ? WHERE id = ?', 
        [option, stream_url, is_live, id], (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ success: true, message: 'Streaming option updated!' });
        }
    );
});

// 🛑 Admin: Delete a Streaming Option
router.delete('/delete-stream/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM live_streaming WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ success: true, message: 'Streaming option deleted!' });
    });
});

// 🔄 Admin: Toggle Live Streaming Status
router.put('/toggle-live/:id', (req, res) => {
    const { id } = req.params;
    const { is_live } = req.body;
    db.query('UPDATE live_streaming SET is_live = ? WHERE id = ?', [is_live, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ success: true, message: `Stream ${is_live ? 'started' : 'stopped'} successfully!` });
    });
});

module.exports = router;
