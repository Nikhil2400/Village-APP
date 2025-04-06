const db = require("../config/db");
const razorpay = require("../config/razorpay");

// ✅ Create Razorpay Order
exports.createOrder = (req, res) => {
  console.log(`[${new Date().toISOString()}] API hit: /create-order`);
  console.log("Request Body:", req.body);

  const { name, phone, donation_type } = req.body;

  if (!name || !phone || !donation_type) {
    return res.status(400).json({ success: false, error: "Name, phone, and donation type are required." });
  }

  // Check if donation_type exists in DB
  db.query(
    "SELECT amount FROM donation_amounts WHERE donation_type = ?",
    [donation_type],
    (err, results) => {
      if (err) {
        console.error(`[${new Date().toISOString()}] Database Error:`, err);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
      }

      console.log("DB Results:", results);

      if (results.length === 0) {
        return res.status(400).json({ success: false, error: "Invalid donation type" });
      }

      const amount = results[0].amount;
      if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ success: false, error: "Invalid donation amount" });
      }

      const options = {
        amount: amount * 100, // Convert to paise for Razorpay
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      };

      razorpay.orders.create(options, (err, order) => {
        if (err) {
          console.error(`[${new Date().toISOString()}] Razorpay Error:`, err);
          return res.status(500).json({ success: false, error: "Failed to create order" });
        }
        console.log("✅ Razorpay Order Created:", order);
        res.status(200).json({ success: true, order, name, phone, donation_type, amount });
      });
    }
  );
};

// ✅ Store Payment Record
exports.storePayment = (req, res) => {
  console.log(`[${new Date().toISOString()}] API hit: /payment-success`);
  console.log("Request Body:", req.body);

  const { name, phone, donation_type, amount, transaction_id } = req.body;

  if (!name || !phone || !donation_type || !amount || !transaction_id) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ success: false, error: "Invalid payment amount." });
  }

  const query = `
    INSERT INTO payment_records (name, phone, donation_type, amount, transaction_id, payment_status) 
    VALUES (?, ?, ?, ?, ?, 'Success')`;

  db.query(query, [name, phone, donation_type, amount, transaction_id], (err, results) => {
    if (err) {
      console.error(`[${new Date().toISOString()}] Error storing payment record:`, err);
      return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
    console.log("✅ Payment Stored:", results);
    res.status(200).json({ success: true, message: "✅ Payment recorded successfully.", results });
  });
};

// ✅ Get All Payments (Admin)
exports.getAllPayments = (req, res) => {
  console.log(`[${new Date().toISOString()}] API hit: /all`);

  db.query("SELECT * FROM payment_records ORDER BY created_at DESC", (err, results) => {
    if (err) {
      console.error(`[${new Date().toISOString()}] Error fetching payment records:`, err);
      return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
    console.log("✅ All Payments Retrieved:", results);
    res.status(200).json({ success: true, data: results });
  });
};
