const express = require('express');
const router = express.Router();
const db = require('../config/db');
const twilio = require('twilio');
require('dotenv').config();

// Twilio setup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

/**
 * 📌 Add a new phone number
 */
router.post('/add-number', (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ success: false, message: 'Name and phone number are required.' });
  }

  const sql = 'INSERT INTO phone_numbers (name, phone_number) VALUES (?, ?)';
  db.query(sql, [name, number], (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to add number' });
    res.status(200).json({ success: true, message: 'Number added successfully' });
  });
});

/**
 * 📌 Get all phone numbers
 */
router.get('/get-numbers', (req, res) => {
  const sql = 'SELECT id, name, phone_number FROM phone_numbers';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to retrieve numbers' });
    res.status(200).json({ success: true, data: results });
  });
});

/**
 * 📌 Delete a phone number
 */
router.delete('/delete-number/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM phone_numbers WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to delete number' });
    res.status(200).json({ success: true, message: 'Number deleted successfully' });
  });
});

/**
 * 📌 Send message to selected recipients
 */
router.post('/api/send-message', async (req, res) => {
  const { numbers, message } = req.body;
  if (!message || !Array.isArray(numbers) || numbers.length === 0) {
    return res.status(400).json({ success: false, message: 'Message and recipients are required' });
  }

  const placeholders = numbers.map(() => '?').join(',');
  const sql = `SELECT name, phone_number FROM phone_numbers WHERE phone_number IN (${placeholders})`;

  db.query(sql, numbers, async (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to fetch recipients' });

    for (const recipient of results) {
      let toNumber = recipient.phone_number;
      if (!toNumber.startsWith('+')) {
        toNumber = '+91' + toNumber;
      }

      try {
        await client.messages.create({
          body: `Hello ${recipient.name}, ${message}`,
          from: fromPhone,
          to: toNumber,
        });
      } catch (twilioError) {
        console.error(`Failed to send to ${toNumber}:`, twilioError.message);
      }
    }

    const insertSql = `INSERT INTO sent_messages (message, recipients) VALUES (?, ?)`;
    db.query(insertSql, [message, numbers.join(',')]);

    res.status(200).json({ success: true, message: `Message sent to ${results.length} recipients` });
  });
});

/**
 * 📌 Get all sent messages
 */

router.get('/api/sent-messages', (req, res) => {
  const query = 'SELECT * FROM sent_messages ORDER BY created_at DESC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching messages:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});


/**
 * 📌 Update sent message by ID
 */
router.put('/update-message/:id', (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const sql = 'UPDATE sent_messages SET message = ? WHERE id = ?';
  db.query(sql, [message, id], (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Update failed' });
    res.status(200).json({ success: true, message: 'Message updated successfully' });
  });
});

/**
 * 📌 Delete sent message by ID
 */
router.delete('/delete-message/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM sent_messages WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Delete failed' });
    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  });
});

module.exports = router;
