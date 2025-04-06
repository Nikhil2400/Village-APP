const Farmer = require('../models/Farmer');

exports.getFarmers = (req, res) => {
  Farmer.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ data: results });
  });
};

exports.addFarmer = (req, res) => {
  try {
    const {
      name,
      middleName,
      surname,
      age,
      village,
      contactNumber,
      email,
    } = req.body;

    const photo = req.files?.photo?.[0]?.filename || null;
    const govId = req.files?.govId?.[0]?.filename || null;
    const govId2 = req.files?.govId2?.[0]?.filename || null;

    const farmerData = {
      name,
      middleName,
      surname,
      age,
      village,
      contactNumber,
      email,
      photo,
      govId,
      govId2,
    };

    Farmer.create(farmerData, (err, result) => {
      if (err) {
        console.error('Error creating farmer:', err);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Farmer added successfully' });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Unexpected server error' });
  }
};

exports.updateFarmer = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  Farmer.update(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Farmer updated successfully' });
  });
};

exports.deleteFarmer = (req, res) => {
  const { id } = req.params;
  Farmer.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Farmer deleted successfully' });
  });
};
