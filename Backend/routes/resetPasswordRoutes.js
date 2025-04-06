const express = require('express');
const router = express.Router();
const db = require('../config/db'); // MySQL connection
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs'); // Ensure bcrypt is imported

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nikhilkayangude143@gmail.com', // Replace with your email
    pass: 'aqao foie qpbj okgc' // Use Google App Password
  }
});

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Forgot Password - Send OTP
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // Check if email exists
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 10 * 60000); // 10 minutes expiry

    // Store OTP in database
    db.query('UPDATE users SET reset_otp = ?, otp_expiry = ? WHERE email = ?', [otp, expiry, email], async (err) => {
      if (err) return res.status(500).json({ message: 'Error saving OTP' });

      // Send email with OTP
      const mailOptions = {
        from: 'nikhilkayangude143@gmail.com', // Use the same email as authenticated above
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) return res.status(500).json({ message: 'Error sending email' });
        res.json({ message: 'OTP sent successfully' });
      });
    });
  });
});

// Reset Password - Verify OTP & Update Password
router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  db.query('SELECT * FROM users WHERE email = ? AND reset_otp = ? AND otp_expiry > NOW()', [email, otp], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(400).json({ message: 'Invalid OTP or expired' });

    // ✅ Password ko hash karna zaroori hai
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // ✅ Ab hashed password database me save hoga
    db.query('UPDATE users SET password = ?, reset_otp = NULL, otp_expiry = NULL WHERE email = ?', [hashedPassword, email], (err) => {
      if (err) return res.status(500).json({ message: 'Error updating password' });
      res.json({ message: 'Password reset successfully' });
    });
  });
});


module.exports = router;
