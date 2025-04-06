import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminPanel = () => {
  const donationTypes = ["Ganpati Nidhi", "Yatra Nidhi", "Divi Nidhi", "Kachara Nidhi"];
  const [donationType, setDonationType] = useState(donationTypes[0]);
  const [amount, setAmount] = useState("");
  const [donations, setDonations] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/donations")
      .then(res => {
        const fetchedDonations = res.data.reduce((acc, item) => {
          acc[item.donation_type] = item.amount;
          return acc;
        }, {});
        
        // Ensure all donation types are included, even if missing from the database
        const completeDonations = donationTypes.reduce((acc, type) => {
          acc[type] = fetchedDonations[type] || 0;
          return acc;
        }, {});

        setDonations(completeDonations);
      })
      .catch(err => console.error("Error fetching donations:", err));
  }, []);

  const updateAmount = () => {
    if (!amount) {
      toast.error("Please enter a valid amount.");
      return;
    }

    axios.post("http://localhost:5000/api/donations/set", { donation_type: donationType, amount })
      .then(() => {
        toast.success("Donation amount updated!");
        setDonations(prev => ({ ...prev, [donationType]: amount }));
        setAmount("");
      })
      .catch(err => toast.error("Error updating amount"));
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      
      <label>Select Donation Type:</label>
      <select value={donationType} onChange={(e) => setDonationType(e.target.value)}>
        {donationTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={updateAmount}>Set Amount</button>

      <h3>Current Donation Amounts:</h3>
      <ul>
        {donationTypes.map((type) => (
          <li key={type}>{type}: ₹{donations[type]}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;