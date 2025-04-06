const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ✅ Get All Users
router.get('/', (req, res) => {
  db.query('SELECT id, email, password FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
    res.json(results);
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ error: 'Failed to delete user' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  });
});


module.exports = router;
