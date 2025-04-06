import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "../styles/Header.css";

const Header = () => {
  const { t } = useTranslation(); // use t() for translation

  return (
    <header className="header-container">
      {/* Running Text */}
      <div className="running-text">
      <marquee scrollamount="12">{t("runningMessage")}</marquee>
      </div>

      {/* Title */}
      {/* <h1 className="site-title">{t("homeTitle")}</h1> */}

      {/* Optional Nav images (you can enable as needed) */}
      <div className="nav-images">
        {/* <img src="" alt="Village Logo" className="nav-logo" />
        <img src="" alt="Village Scenery" className="nav-image" /> */}
      </div>
    </header>
  );
};

export default Header;
