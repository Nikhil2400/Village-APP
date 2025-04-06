const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");


// Get user profile
router.get("/profile/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT id, name, email FROM users WHERE id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length === 0) return res.status(404).json({ error: "User not found" });

    res.json(result[0]);
  });
});
// ✅ Reset password route
router.post("/user/reset-password", async (req, res) => {
    const { email, newPassword } = req.body;
  
    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required." });
    }
  
    try {
      // Check if user exists
      const checkUserQuery = "SELECT * FROM users WHERE email = ?";
      db.query(checkUserQuery, [email], async (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error" });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }
  
        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
  
        // Update password
        const updateQuery = "UPDATE users SET password = ? WHERE email = ?";
        db.query(updateQuery, [hashedPassword, email], (updateErr) => {
          if (updateErr) {
            console.error("Update error:", updateErr);
            return res.status(500).json({ message: "Error updating password" });
          }
  
          return res.status(200).json({ message: "Password reset successful" });
        });
      });
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
module.exports = router;
