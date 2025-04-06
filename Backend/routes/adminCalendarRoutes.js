const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ✅ Admin: Add an event
router.post('/admin/events', (req, res) => {
    const { title, date, description } = req.body;
    const sql = "INSERT INTO events (title, date, description) VALUES (?, ?, ?)";
    db.query(sql, [title, date, description], (err, result) => {
        if (err) {
            console.error("Error adding event:", err);
            return res.status(500).json({ error: "Failed to add event" });
        }
        res.status(201).json({ message: "Event added successfully" });
    });
});

// ✅ Admin: Delete an event
router.delete('/admin/events/:id', (req, res) => {
    const eventId = req.params.id;
    const sql = "DELETE FROM events WHERE id = ?";
    db.query(sql, [eventId], (err, result) => {
        if (err) {
            console.error("Error deleting event:", err);
            return res.status(500).json({ error: "Failed to delete event" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    });
});

module.exports = router;
