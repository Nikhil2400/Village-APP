const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ✅ Get All Contacts
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM contact_us';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Add New Contact
router.post('/add', (req, res) => {
  const { name, email, phone, address } = req.body;
  const sql = 'INSERT INTO contact_us (name, email, phone, address) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, phone, address], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Contact added successfully' });
  });
});

// ✅ Delete Contact
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM contact_us WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows > 0) {
      res.json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  });
});

module.exports = router;
