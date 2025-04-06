const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Connect to MySQL

// ✅ Get all events (for users)
router.get('/events', (req, res) => {
    const sql = "SELECT * FROM events ORDER BY date ASC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching events:", err);
            return res.status(500).json({ error: "Failed to fetch events" });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
