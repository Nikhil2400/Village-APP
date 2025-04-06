import React, { useState } from "react";
import { createFarmer } from "../api/Farmers";
import "../styles/FarmerForm.css";

const FarmerForm = () => {
  const [farmerData, setFarmerData] = useState({
    name: "",
    middleName: "",
    surname: "",
    age: "",
    address: "",
    village: "",
    aadharNumber: "",
    govId: null,
    govId2: null,
    contactNumber: "",
    email: "",
    houseNumber: "",
    rentedOwnerName: "",
    photo: null,
  });

  const [preview, setPreview] = useState({
    govId: null,
    govId2: null,
    photo: null,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        setFarmerData((prev) => ({
          ...prev,
          [name]: file,
        }));

        // ✅ Preview File
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview((prev) => ({
            ...prev,
            [name]: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFarmerData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!farmerData.name || !farmerData.surname || !farmerData.age || !farmerData.address) {
      setError("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();

    // ✅ Append text and files to FormData
    Object.keys(farmerData).forEach((key) => {
      if (farmerData[key] !== null && farmerData[key] !== "") {
        formData.append(key, farmerData[key]);
      }
    });

    try {
      await createFarmer(formData);
      setMessage("✅ Farmer details submitted successfully!");
      setError("");
      resetForm(); // ✅ Reset form after submission
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      setError(`❌ Error: ${err.message}`);
      setMessage("");
    }
  };

  // ✅ Reset Form
  const resetForm = () => {
    setFarmerData({
      name: "",
      middleName: "",
      surname: "",
      age: "",
      address: "",
      village: "",
      aadharNumber: "",
      govId: null,
      govId2: null,
      contactNumber: "",
      email: "",
      houseNumber: "",
      rentedOwnerName: "",
      photo: null,
    });

    setPreview({
      govId: null,
      govId2: null,
      photo: null,
    });
  };

  return (
    <div className="farmer-form">
       <div className="form-layout">
      <h2 className="form-title">Farmer Registration Form</h2>

      {/* ✅ Success/Error Messages */}
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="form-layout">
        {/* ✅ Personal Information */}
        <div className="form-row">
          <input
            type="text"
            name="name"
            value={farmerData.name}
            placeholder="Name"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="middleName"
            value={farmerData.middleName}
            placeholder="Middle Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="surname"
            value={farmerData.surname}
            placeholder="Surname"
            required
            onChange={handleChange}
          />
        </div>

        {/* ✅ Contact Information */}
        <div className="form-row">
          <input
            type="number"
            name="age"
            value={farmerData.age}
            placeholder="Age"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            value={farmerData.address}
            placeholder="Address"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="village"
            value={farmerData.village}
            placeholder="Village"
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="aadharNumber"
            value={farmerData.aadharNumber}
            placeholder="Aadhar Number"
            onChange={handleChange}
          />
          <input
            type="text"
            name="contactNumber"
            value={farmerData.contactNumber}
            placeholder="Contact Number"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={farmerData.email}
            placeholder="Email"
            onChange={handleChange}
          />
        </div>

        {/* ✅ House Details */}
        <div className="form-row">
          <input
            type="text"
            name="houseNumber"
            value={farmerData.houseNumber}
            placeholder="House Number"
            onChange={handleChange}
          />
          <input
            type="text"
            name="rentedOwnerName"
            value={farmerData.rentedOwnerName}
            placeholder="Rented Owner Name"
            onChange={handleChange}
          />
        </div>

        {/* ✅ File Upload with Preview */}
        <div className="form-row">
          <input
            type="file"
            name="govId"
            accept=".jpg, .jpeg, .png, .pdf"
            onChange={handleChange}
          />
          {preview.govId && (
            <img src={preview.govId} alt="Gov ID 1 Preview" className="preview-img" />
          )}
        </div>

        <div className="form-row">
          <input
            type="file"
            name="govId2"
            accept=".jpg, .jpeg, .png, .pdf"
            onChange={handleChange}
          />
          {preview.govId2 && (
            <img src={preview.govId2} alt="Gov ID 2 Preview" className="preview-img" />
          )}
        </div>

        <div className="form-row">
          <input
            type="file"
            name="photo"
            accept=".jpg, .jpeg, .png"
            onChange={handleChange}
          />
          {preview.photo && (
            <img src={preview.photo} alt="Photo Preview" className="preview-img" />
          )}
        </div>

        {/* ✅ Submit Button */}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default FarmerForm;
