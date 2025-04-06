import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material";
import { FaBars, FaUser } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "../styles/Navbar.css";


const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleUserMenuClick = (event) => {
    setUserMenuOpen(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuOpen(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setUserMenuOpen(null);
    navigate("/");
    window.location.reload();
  };

  const handleProfileRedirect = () => {
    handleUserMenuClose();
    if (user?.role === "admin") {
      navigate("/admin/dashboard"); // or "/admin/profile"
    } else {
      navigate("/profile");
    }
  };

  return (
    <nav className="nav-bar">
    
      <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars size={24} />
      </div>

      <h1 className="site-title" style={{ fontSize: "2rem" }}>{t("welcome")}</h1>


      <ul className={`nav-links ${menuOpen ? "mobile-active" : ""}`}>
        <li>
          <Link
            to="/home"
            className={location.pathname === "/home" ? "active" : ""}
          >
            {t("home")}
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={location.pathname === "/about" ? "active" : ""}
          >
            {t("about")}
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={location.pathname === "/contact" ? "active" : ""}
          >
            {t("contact")}
          </Link>
        </li>

        <li className="account-icon-container">
          <Button onClick={handleUserMenuClick} className="icon-button">
            <FaUser className="account-icon" />
            <span className="user">
              {user ? user.name : t("account")}
            </span>
          </Button>

          <Menu
            anchorEl={userMenuOpen}
            open={Boolean(userMenuOpen)}
            onClose={handleUserMenuClose}
          >
            {!user ? (
              <>
                <MenuItem
                  onClick={() => {
                    handleUserMenuClose();
                    navigate("/login");
                  }}
                >
                  {t("login")}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleUserMenuClose();
                    navigate("/register");
                  }}
                >
                  {t("register")}
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleProfileRedirect}>
                  {t("profile") || "Profile"}
                </MenuItem>
                <MenuItem onClick={handleLogout}>{t("logout")}</MenuItem>
              </>
            )}
          </Menu>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
