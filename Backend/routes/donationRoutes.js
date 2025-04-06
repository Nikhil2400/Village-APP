const express = require("express");
const { getDonationAmounts, setDonationAmount } = require("../controllers/donationController");

const router = express.Router();

router.get("/", getDonationAmounts);
router.post("/set", setDonationAmount); // Admin Only

module.exports = router;
