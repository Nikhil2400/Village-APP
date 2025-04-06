const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const db = require('../config/db');

// ✅ Set up file storage using multer
const storage = multer.diskStorage({
  destination: './uploads/', // Save files to 'uploads' folder
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Add Notice (with file upload)
router.post('/add-notice', upload.single('file'), (req, res) => {
  const { title, description } = req.body;
  const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const query = 'INSERT INTO notices (title, description, file_url) VALUES (?, ?, ?)';
  db.query(query, [title, description, fileUrl], (err, result) => {
    if (err) {
      console.error('Error adding notice:', err.message);
      return res.status(500).json({ error: 'Failed to add notice' });
    }
    res.status(201).json({ message: 'Notice added successfully', id: result.insertId });
  });
});

// ✅ Get Notices
router.get('/get-notices', (req, res) => {
  const query = 'SELECT * FROM notices ORDER BY created_at DESC';
  db.query(query, (err, rows) => {
    if (err) {
      console.error('Error fetching notices:', err.message);
      return res.status(500).json({ error: 'Failed to fetch notices' });
    }
    res.status(200).json({ data: rows });
  });
});

// ✅ Update Notice (with file upload)
router.put('/update-notice/:id', upload.single('file'), (req, res) => {
  const { title, description } = req.body;
  const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const { id } = req.params;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  let query;
  let values;

  if (fileUrl) {
    query = 'UPDATE notices SET title = ?, description = ?, file_url = ? WHERE id = ?';
    values = [title, description, fileUrl, id];
  } else {
    query = 'UPDATE notices SET title = ?, description = ? WHERE id = ?';
    values = [title, description, id];
  }

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating notice:', err.message);
      return res.status(500).json({ error: 'Failed to update notice' });
    }
    res.status(200).json({ message: 'Notice updated successfully' });
  });
});

// ✅ Delete Notice
router.delete('/delete-notice/:id', (req, res) => {
  const { id } = req.params;

  // Delete the file first if it exists
  const getFileQuery = 'SELECT file_url FROM notices WHERE id = ?';
  db.query(getFileQuery, [id], (err, rows) => {
    if (err) {
      console.error('Error finding notice:', err.message);
      return res.status(500).json({ error: 'Failed to delete notice' });
    }

    const fileUrl = rows[0]?.file_url;
    if (fileUrl) {
      const fs = require('fs');
      const filePath = path.join(__dirname, '..', fileUrl);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Error deleting file:', err.message);
      });
    }

    // Now delete the notice record
    const query = 'DELETE FROM notices WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting notice:', err.message);
        return res.status(500).json({ error: 'Failed to delete notice' });
      }
      res.status(200).json({ message: 'Notice deleted successfully' });
    });
  });
});

module.exports = router;
