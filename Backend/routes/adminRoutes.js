const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import MySQL connection

// ✅ Get Dashboard Overview Data
router.get('/dashboard', async (req, res) => {
  try {
    const totalFarmers = await new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) as total FROM farmers', (err, result) => {
        if (err) reject(err);
        resolve(result[0].total);
      });
    });

    const totalSchemes = await new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) as total FROM schemes', (err, result) => {
        if (err) reject(err);
        resolve(result[0].total);
      });
    });

    const totalHealthCenters = await new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) as total FROM health_centers', (err, result) => {
        if (err) reject(err);
        resolve(result[0].total);
      });
    });

    res.status(200).json({
      totalFarmers,
      totalSchemes,
      totalHealthCenters,
    });
  } catch (error) {
    console.error('❌ Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ Get Farmers List
router.get('/farmers', (req, res) => {
  db.query('SELECT * FROM farmers', (err, results) => {
    if (err) {
      console.error('❌ Error fetching farmers:', err);
      res.status(500).json({ error: 'Failed to load farmers' });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;
