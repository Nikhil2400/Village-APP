import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/announcements")
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.error("❌ Announcement fetch error:", err));
  }, []);

  const images = ["/photo/2.jpg", "/photo/3.jpg", "/photo/4.jpg"];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="landing-page">
      {/* 🏡 Village Introduction Section */}
      <section className="intro-section">
        <h1>{t("welcome_title")}</h1>
        <p>{t("welcome_desc")}</p>
        <button onClick={() => navigate("/intro-section")}>
          {t("watch_button")}
        </button>
      </section>

      {/* ✅ Running Announcements */}
      <div className="announcement-bar">
        <marquee scrollamount="12">
          {announcements.length > 0
            ? announcements.map((a) => `📢 ${a.message} `).join(" | ")
            : t("no_announcements")}
        </marquee>
      </div>

      {/* ✅ Special Features */}
      <section className="village-features">
        <div className="feature-card" onClick={() => navigate("/about")}>
          <h3>{t("panchayat_hub")}</h3>
          <p>{t("panchayat_desc")}</p>
        </div>

        <div className="feature-card" onClick={() => navigate("/edu")}>
          <h3>{t("education")}</h3>
          <p>{t("education_desc")}</p>
        </div>

        <div className="feature-card" onClick={() => navigate("/hospitals")}>
          <h3>{t("health_facilities")}</h3>
          <p>{t("health_desc")}</p>
        </div>
      </section>

      {/* ✅ Map */}
      {/* ✅ Map */}
<div className="map-container">
  <iframe
    title="Sultanpur Map"
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d60373.787925206245!2d73.9019597!3d17.9767587!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc25d0c4a848809%3A0x2de19a6f5b8d907f!2sSultanpur%2C%20wai%2C%20maharashtra!5e0!3m2!1sen!2sin!4v1712400000000!5m2!1sen!2sin"
    width="100%"
    height="250"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>


      {/* ✅ WhatsApp & Contact */}
      <div className="contact-section">
        <p>{t("contact_info")}: <strong>+91 98765 43210</strong></p>
        <button onClick={() => window.location.href = "https://wa.me/919876543210"}>
          {t("chat_whatsapp")}
        </button>
      </div>

      {/* ✅ Login Button */}
      <div className="login-btn-container">
        <button className="animated-login-btn" onClick={() => navigate("/login")}>
          {t("login_button")}
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
