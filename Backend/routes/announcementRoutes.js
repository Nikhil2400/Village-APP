const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Get Announcements
router.get("/", (req, res) => {
  db.query("SELECT * FROM announcements", (err, result) => {
    if (err) {
      console.error("❌ Error fetching announcements:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

// Add Announcement
router.post("/", (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  db.query("INSERT INTO announcements (message) VALUES (?)", [message], (err, result) => {
    if (err) {
      console.error("❌ Error adding announcement:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: "Announcement added!", insertId: result.insertId });
  });
});

// Update Announcement
router.put("/:id", (req, res) => {
  const { message } = req.body;
  const { id } = req.params;

  db.query("UPDATE announcements SET message = ? WHERE id = ?", [message, id], (err) => {
    if (err) {
      console.error("❌ Error updating announcement:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: "Announcement updated!" });
  });
});

// Delete Announcement
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM announcements WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("❌ Error deleting announcement:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: "Announcement deleted!" });
  });
});

module.exports = router;
