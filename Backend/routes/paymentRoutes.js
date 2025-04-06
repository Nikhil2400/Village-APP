const express = require("express");
const { createOrder, storePayment, getAllPayments } = require("../controllers/paymentController");

const router = express.Router();

/**
 * @route POST /api/payments/create-order
 * @desc Create a new Razorpay order
 * @access Public
 */
router.post("/create-order", createOrder);

/**
 * @route POST /api/payments/payment-success
 * @desc Store payment details after successful payment
 * @access Public
 */
router.post("/payment-success", storePayment);

/**
 * @route GET /api/payments/all
 * @desc Get all payment records (Admin Only)
 * @access Admin
 */
router.get("/all", getAllPayments); // Admin Only

module.exports = router;
