import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/Receipt.css"; // CSS file for styling

const Receipt = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    donationType: "Ganpati Nidhi",
    amount: "",
    transactionId: "",
    date: new Date().toLocaleDateString(),
  });

  const donationOptions = ["Ganpati Nidhi", "Yatra Nidhi", "Divi Nidhi", "Kachara Nidhi"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const input = document.getElementById("receipt");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 180, 120);
      pdf.save(`Donation_Receipt_${formData.transactionId}.pdf`);
    });
  };

  return (
    <div className="receipt-container">
      <h2 className="title">Generate Donation Receipt</h2>

      <div className="form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
        <select name="donationType" value={formData.donationType} onChange={handleChange}>
          {donationOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <input type="text" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} />
        <input type="text" name="transactionId" placeholder="Transaction ID" value={formData.transactionId} onChange={handleChange} />
      </div>

      <button className="generate-btn" onClick={generatePDF}>Download Receipt</button>

      {/* Receipt Design */}
      <div id="receipt" className="receipt">
        <h3>🙏 Village Donation Receipt 🙏</h3>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
        <p><strong>Donation Type:</strong> {formData.donationType}</p>
        <p><strong>Amount:</strong> ₹{formData.amount}</p>
        <p><strong>Transaction ID:</strong> {formData.transactionId}</p>
        <p><strong>Date:</strong> {formData.date}</p>
        <p>Thank you for your generous donation! 😊</p>
      </div>
    </div>
  );
};

export default Receipt;
