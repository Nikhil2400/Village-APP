const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_80jrNaPR7vkgee", // Replace with actual key
  key_secret: "WUTDNvsaRpkdbOPYvhJKKoD5", // Replace with your actual secret
});

module.exports = razorpay;
