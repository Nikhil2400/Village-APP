import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf"; // Import jsPDF
import "../styles/UserDonation.css"; // CSS file

const UserDonation = () => {
  const [selectedDonation, setSelectedDonation] = useState("Ganpati Nidhi");
  const [donations, setDonations] = useState({
    "Ganpati Nidhi": 0,
    "Yatra Nidhi": 0,
    "Divi Nidhi": 0,
    "Kachara Nidhi": 0,
  });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [transactionId, setTransactionId] = useState(null);
  const [showReceiptButton, setShowReceiptButton] = useState(false); // New state

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/donations")
      .then((res) => {
        const fetchedData = res.data.reduce((acc, item) => {
          acc[item.donation_type] = item.amount;
          return acc;
        }, {});
        setDonations((prev) => ({ ...prev, ...fetchedData }));
      })
      .catch((err) => console.error("Error fetching Payments data:", err));
  }, []);

  const handlePayment = async () => {
    if (!name || !phone) {
      toast.error("Please enter your name and phone number.");
      return;
    }

    const amount = donations[selectedDonation] || 0;
    if (amount === 0) {
      toast.error("Invalid Payments amount.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/create-order", {
        name,
        phone,
        donation_type: selectedDonation,
      });

      if (response.data.order) {
        const { id } = response.data.order;

        const options = {
          key: "rzp_test_80jrNaPR7vkgee",
          amount: amount * 100,
          currency: "INR",
          name: "Village Payments",
          description: `Payments for ${selectedDonation}`,
          order_id: id,
          handler: async function (response) {
            setTransactionId(response.razorpay_payment_id);
            setShowReceiptButton(true); // Show receipt button after payment

            await axios.post("http://localhost:5000/api/payment-success", {
              name,
              phone,
              donation_type: selectedDonation,
              amount,
              transaction_id: response.razorpay_payment_id,
            });

            toast.success("Payment successful! You can now download the receipt.");
          },
          prefill: { name, contact: phone },
          theme: { color: "#ff6600" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error("Payment failed. Try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment process failed. Try again.");
    }
  };

  const downloadReceipt = () => {
    if (!transactionId) {
      toast.error("No transaction found!");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Payments Receipt", 80, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Phone: ${phone}`, 20, 50);
    doc.text(`Payments Type: ${selectedDonation}`, 20, 60);
    doc.text(`Amount: Rs${donations[selectedDonation]}`, 20, 70);
    doc.text(`Transaction ID: ${transactionId}`, 20, 80);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 90);
    doc.text("Thank you for your  Payments! ", 20, 110);

    doc.save(`Receipt_${transactionId}.pdf`);
    toast.success("Receipt downloaded successfully!");
  };

  return (
    <div className="donation-container">
      <h1 className="title">🙏 Get Payments  🙏</h1>

      <div className="form-group">
        <label>Select payments Type:</label>
        <select className="select-box" value={selectedDonation} onChange={(e) => setSelectedDonation(e.target.value)}>
          {Object.keys(donations).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <p className="amount">Amount: ₹{donations[selectedDonation] || "Loading..."}</p>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Your Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="input-field"
      />

      <button className="donate-btn" onClick={handlePayment}>Proceed to Pay</button>

      {transactionId && (
        <div className="receipt-section">
          <p className="success-msg">🎉 Payment Successful! Transaction ID: {transactionId}</p>
          {showReceiptButton && (
            <button className="download-btn" onClick={downloadReceipt}>Download Receipt</button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDonation;
