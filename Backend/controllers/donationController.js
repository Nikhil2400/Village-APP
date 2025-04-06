const db = require("../config/db");

// ✅ Get All Donation Amounts
exports.getDonationAmounts = (req, res) => {
  db.query("SELECT * FROM donation_amounts", (err, results) => {
    if (err) {
      console.error("Error fetching donation amounts:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json(results);
  });
};

// ✅ Set or Update Donation Amount (Admin)
exports.setDonationAmount = (req, res) => {
  const { donation_type, amount } = req.body;

  if (!donation_type || !amount) {
    return res.status(400).json({ error: "Donation type and amount are required." });
  }

  const query = `
    INSERT INTO donation_amounts (donation_type, amount) 
    VALUES (?, ?) 
    ON DUPLICATE KEY UPDATE amount = ?`;

  db.query(query, [donation_type, amount, amount], (err, results) => {
    if (err) {
      console.error("Error updating donation amount:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json({ message: "✅ Donation amount updated successfully.", results });
  });
};
