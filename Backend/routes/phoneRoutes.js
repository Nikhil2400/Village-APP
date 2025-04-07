const express = require('express');
const router = express.Router();
const db = require('../config/db');
const twilio = require('twilio');
const util = require('util');
require('dotenv').config();

// Promisify DB queries for async/await usage
const query = util.promisify(db.query).bind(db);

// Twilio setup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

/**
 * 📌 Add a new phone number
 */
router.post('/add-number', async (req, res) => {
  const { name, number } = req.body;
  const phoneRegex = /^[0-9]{10}$/;

  if (!name || !number || !phoneRegex.test(number)) {
    return res.status(400).json({ success: false, message: 'Valid name and 10-digit phone number required.' });
  }

  try {
    await query('INSERT INTO phone_numbers (name, phone_number) VALUES (?, ?)', [name, number]);
    res.status(200).json({ success: true, message: 'Number added successfully' });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ success: false, message: 'Failed to add number' });
  }
});

/**
 * 📌 Get all phone numbers
 */
router.get('/get-numbers', async (req, res) => {
  try {
    const results = await query('SELECT id, name, phone_number FROM phone_numbers');
    res.status(200).json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve numbers' });
  }
});

/**
 * 📌 Delete a phone number
 */
router.delete('/delete-number/:id', async (req, res) => {
  try {
    await query('DELETE FROM phone_numbers WHERE id = ?', [req.params.id]);
    res.status(200).json({ success: true, message: 'Number deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete number' });
  }
});

/**
 * 📌 Send message to selected recipients
 */
router.post('/api/send-message', async (req, res) => {
  const { numbers, message } = req.body;

  if (!message || !Array.isArray(numbers) || numbers.length === 0) {
    return res.status(400).json({ success: false, message: 'Message and recipients are required' });
  }

  try {
    const placeholders = numbers.map(() => '?').join(',');
    const sql = `SELECT name, phone_number FROM phone_numbers WHERE phone_number IN (${placeholders})`;
    const recipients = await query(sql, numbers);

    for (const recipient of recipients) {
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

    await query('INSERT INTO sent_messages (message, recipients) VALUES (?, ?)', [message, numbers.join(',')]);
    res.status(200).json({ success: true, message: `Message sent to ${recipients.length} recipients` });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to send messages' });
  }
});

/**
 * 📌 Get all sent messages
 */
router.get('/api/sent-messages', async (req, res) => {
  try {
    const results = await query('SELECT * FROM sent_messages ORDER BY created_at DESC');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

/**
 * 📌 Update sent message by ID
 */
router.put('/update-message/:id', async (req, res) => {
  const { message } = req.body;
  try {
    await query('UPDATE sent_messages SET message = ? WHERE id = ?', [message, req.params.id]);
    res.status(200).json({ success: true, message: 'Message updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed' });
  }
});

/**
 * 📌 Delete sent message by ID
 */
router.delete('/delete-message/:id', async (req, res) => {
  try {
    await query('DELETE FROM sent_messages WHERE id = ?', [req.params.id]);
    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
});

module.exports = router;
