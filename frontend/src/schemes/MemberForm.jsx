import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/MemberForm.css"; // ✅ CSS फाइल इंपोर्ट करा

const MemberForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherHusbandName: "",
    gender: "",
    dob: "",
    age: "",
    caste: "",
    religion: "",
    mobile: "",
    whatsapp: "",
    email: "",
    aadhar: "",
    village: "",
    ward: "",
    houseNumber: "",
    pinCode: "",
    photo: null,
    govId: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      await axios.post("http://52.66.183.128:5000/api/members", formDataToSend);
      toast.success("सदस्य यशस्वीरित्या जोडले गेले!");
      setFormData({
        fullName: "",
        fatherHusbandName: "",
        gender: "",
        dob: "",
        age: "",
        caste: "",
        religion: "",
        mobile: "",
        whatsapp: "",
        email: "",
        aadhar: "",
        village: "",
        ward: "",
        houseNumber: "",
        pinCode: "",
        photo: null,
        govId: null
      });
    } catch (error) {
      toast.error("सदस्य जोडताना त्रुटी आली!");
    }
  };

  return (
    <div className="member-form-container">
      <form onSubmit={handleSubmit} className="member-form" encType="multipart/form-data">
        <h2>गाव सदस्य नोंदणी फॉर्म</h2>
        <input type="text" name="fullName" placeholder="पूर्ण नाव" value={formData.fullName} onChange={handleChange} required />
        <input type="text" name="fatherHusbandName" placeholder="वडील/पती यांचे नाव" value={formData.fatherHusbandName} onChange={handleChange} required />

        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">लिंग निवडा</option>
          <option value="Male">पुरुष</option>
          <option value="Female">महिला</option>
          <option value="Other">इतर</option>
        </select>

        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <input type="number" name="age" placeholder="वय" value={formData.age} onChange={handleChange} required />

        <input type="text" name="caste" placeholder="जात" value={formData.caste} onChange={handleChange} required />
        <input type="text" name="religion" placeholder="धर्म" value={formData.religion} onChange={handleChange} required />

        <input type="tel" name="mobile" placeholder="मोबाईल नंबर" value={formData.mobile} onChange={handleChange} required />
        <input type="tel" name="whatsapp" placeholder="WhatsApp नंबर" value={formData.whatsapp} onChange={handleChange} required />
        <input type="email" name="email" placeholder="ईमेल (ऐच्छिक)" value={formData.email} onChange={handleChange} />

        <input type="text" name="aadhar" placeholder="आधार नंबर" value={formData.aadhar} onChange={handleChange} />

        <input type="text" name="village" placeholder="गावाचे नाव" value={formData.village} onChange={handleChange} required />
        <input type="number" name="ward" placeholder="वॉर्ड नंबर" value={formData.ward} onChange={handleChange} required />
        <input type="text" name="houseNumber" placeholder="घर क्रमांक" value={formData.houseNumber} onChange={handleChange} required />
        <input type="text" name="pinCode" placeholder="पिन कोड" value={formData.pinCode} onChange={handleChange} required />

        <label>📷 प्रोफाइल फोटो अपलोड करा:</label>
        <input type="file" name="photo" onChange={handleFileChange} required />

        <label>📄 सरकारी ओळखपत्र अपलोड करा (ऐच्छिक):</label>
        <input type="file" name="govId" onChange={handleFileChange} />

        <button type="submit">सदस्य जोडा</button>
      </form>
    </div>
  );
};

export default MemberForm;
