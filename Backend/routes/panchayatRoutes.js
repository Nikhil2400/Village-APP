const express = require('express');
const router = express.Router();
const PanchayatAbout = require('../models/panchayatAbout');

// ✅ Get All Panchayat About Data
router.get('/', async (req, res) => {
  try {
    const data = await PanchayatAbout.getAll();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching panchayat about data:', error);
    res.status(500).json({ error: 'Error fetching panchayat about data' });
  }
});

// ✅ Get Panchayat About Data by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await PanchayatAbout.getById(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: 'Panchayat about data not found' });
    }
  } catch (error) {
    console.error('Error fetching panchayat about data by ID:', error);
    res.status(500).json({ error: 'Error fetching panchayat about data' });
  }
});

// ✅ Add New Panchayat About Data
router.post('/add', async (req, res) => {
  const { title, description } = req.body;
  try {
    const id = await PanchayatAbout.create(title, description);
    res.status(201).json({ id, message: 'Panchayat about data created successfully' });
  } catch (error) {
    console.error('Error adding panchayat about data:', error);
    res.status(500).json({ error: 'Error adding panchayat about data' });
  }
});

// ✅ Update Panchayat About Data
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const success = await PanchayatAbout.update(id, title, description);
    if (success) {
      res.status(200).json({ message: 'Panchayat about data updated successfully' });
    } else {
      res.status(404).json({ error: 'Panchayat about data not found' });
    }
  } catch (error) {
    console.error('Error updating panchayat about data:', error);
    res.status(500).json({ error: 'Error updating panchayat about data' });
  }
});

// ✅ Delete Panchayat About Data
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const success = await PanchayatAbout.delete(id);
    if (success) {
      res.status(200).json({ message: 'Panchayat about data deleted successfully' });
    } else {
      res.status(404).json({ error: 'Panchayat about data not found' });
    }
  } catch (error) {
    console.error('Error deleting panchayat about data:', error);
    res.status(500).json({ error: 'Error deleting panchayat about data' });
  }
});

module.exports = router;
