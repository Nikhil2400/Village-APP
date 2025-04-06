const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../config/db');

// File Upload Config
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// ➡️ Create Complaint
router.post('/add', upload.single('file'), (req, res) => {
  const { name, phone, complaint } = req.body;
  const file = req.file ? req.file.filename : null;

  const sql = 'INSERT INTO complaints (name, phone, complaint, file) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, phone, complaint, file], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Complaint submitted successfully' });
  });
});

// ➡️ Get All Complaints
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM complaints';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ➡️ Delete Complaint
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM complaints WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Complaint deleted successfully' });
  });
});

module.exports = router;
