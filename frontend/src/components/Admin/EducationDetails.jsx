import React, { useState, useEffect } from "react";
import axios from "axios";

const EducationDetails = () => {
  const [educationList, setEducationList] = useState([]);
  const [formData, setFormData] = useState({
    schools: "",
    colleges: "",
    teachers: "",
    students: "",
    achievements: "",
    schemes: "",
    infrastructure: "",
    contact: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const res = await axios.get("http://52.66.183.128:5000/api/education/admin/list");
      if (res.data) setEducationList(res.data);
    } catch (error) {
      console.error("Error fetching education data:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitForm = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      submitForm.append(key, value);
    });

    photoFiles.forEach((file) => submitForm.append("photos", file));
    videoFiles.forEach((file) => submitForm.append("videos", file));

    try {
      if (editingId) {
        await axios.post(`http://52.66.183.128:5000/api/education/admin/update/${editingId}`, submitForm);
        alert("Education updated");
      } else {
        await axios.post("http://52.66.183.128:5000/api/education/admin/add", submitForm);
        alert("Education added");
      }

      resetForm();
      fetchEducation();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to submit data.");
    }
  };

  const resetForm = () => {
    setFormData({
      schools: "",
      colleges: "",
      teachers: "",
      students: "",
      achievements: "",
      schemes: "",
      infrastructure: "",
      contact: "",
    });
    setPhotoFiles([]);
    setVideoFiles([]);
    setEditingId(null);
  };

  const handleEdit = (data) => {
    setFormData(data);
    setEditingId(data.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      await axios.delete(`http://52.66.183.128:5000/api/education/admin/delete/${id}`);
      alert("Education entry deleted");
      fetchEducation();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete entry.");
    }
  };

  return (
    <div className="admin-education-container">
      <h2>📘 Admin: Education Section</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="education-form">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label>{key.toUpperCase()}</label>
            <input name={key} value={value} onChange={handleInputChange} />
          </div>
        ))}

        <div className="upload-section">
          <label>Upload Photos:</label>
          <input type="file" multiple onChange={(e) => setPhotoFiles([...e.target.files])} />
        </div>

        <div className="upload-section">
          <label>Upload Videos:</label>
          <input type="file" multiple accept="video/*" onChange={(e) => setVideoFiles([...e.target.files])} />
        </div>

        <button type="submit">{editingId ? "Update" : "Add"} Education</button>
      </form>

      {/* List */}
      <div className="education-list">
        <h3>📋 Education Records</h3>
        {educationList.map((edu) => {
          let gallery = { images: [], videos: [] };
          try {
            gallery = edu.gallery ? JSON.parse(edu.gallery) : { images: [], videos: [] };
          } catch (e) {
            console.error("Gallery parse error:", e);
          }

          return (
            <div key={edu.id} className="education-card">
              <p><strong>Schools:</strong> {edu.schools}</p>
              <p><strong>Colleges:</strong> {edu.colleges}</p>
              <p><strong>Teachers:</strong> {edu.teachers}</p>
              <p><strong>Students:</strong> {edu.students}</p>
              <p><strong>Achievements:</strong> {edu.achievements}</p>
              <p><strong>Contact:</strong> {edu.contact}</p>

              <div className="gallery">
                {gallery.images.map((img, i) => (
                  <img key={i} src={`http://52.66.183.128:5000/uploads/${img}`} alt="img" width="150" />
                ))}
              </div>

              <div className="gallery">
                {gallery.videos.map((vid, i) => (
                  <video key={i} controls width="200">
                    <source src={`http://52.66.183.128:5000/uploads/${vid}`} />
                  </video>
                ))}
              </div>

              <button onClick={() => handleEdit(edu)}>✏ Edit</button>
              <button onClick={() => handleDelete(edu.id)} style={{ color: "red", marginLeft: "10px" }}>🗑 Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EducationDetails;
