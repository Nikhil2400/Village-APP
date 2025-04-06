import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Education.css";

const Education = () => {
  const [educationList, setEducationList] = useState([]);

  useEffect(() => {
    fetchEducationData();
  }, []);

  const fetchEducationData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/education/admin/list");
      if (res.data) setEducationList(res.data);
    } catch (err) {
      console.error("Error fetching education data", err);
    }
  };

  return (
    <div className="edu-page">
      <h2 className="edu-title">🎓 Village Education Information</h2>

      {educationList.map((edu, index) => {
        const gallery = edu.gallery ? JSON.parse(edu.gallery) : { images: [], videos: [] };
        return (
          <div key={index} className="edu-section fade-in">
            <div className="edu-info">
              <p><span>🏫 Schools:</span> {edu.schools}</p>
              <p><span>🏢 Colleges:</span> {edu.colleges}</p>
              <p><span>👨‍🏫 Teachers:</span> {edu.teachers}</p>
              <p><span>👨‍🎓 Students:</span> {edu.students}</p>
              <p><span>🏆 Achievements:</span> {edu.achievements}</p>
              <p><span>💡 Schemes:</span> {edu.schemes}</p>
              <p><span>🏗 Infrastructure:</span> {edu.infrastructure}</p>
              <p><span>📞 Contact:</span> {edu.contact}</p>
            </div>

            {gallery.images.length > 0 && (
              <div className="edu-gallery">
                <h4>📸 Photos</h4>
                <div className="gallery-flex">
                  {gallery.images.map((img, i) => (
                    <img key={i} src={`http://localhost:5000/uploads/${img}`} alt="Education" />
                  ))}
                </div>
              </div>
            )}

            {gallery.videos.length > 0 && (
              <div className="edu-gallery">
                <h4>🎥 Videos</h4>
                <div className="gallery-flex">
                  {gallery.videos.map((vid, i) => (
                    <video key={i} controls>
                      <source src={`http://localhost:5000/uploads/${vid}`} type="video/mp4" />
                    </video>
                  ))}
                </div>
              </div>
            )}

            <hr className="edu-divider" />
          </div>
        );
      })}
    </div>
  );
};

export default Education;
