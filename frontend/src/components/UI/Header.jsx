import React, { useState } from "react";
import { FaBell, FaEnvelope ,FaUser} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Menu, MenuItem, IconButton, Avatar, Tooltip } from "@mui/material";
import "../../styles/AdminHeader.css";

const Header = ({ setActiveSection }) => {
  const location = useLocation();

  // 🔹 Menu ke liye state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header">
      {/* ✅ Left Section with Links */}
      {/* <div className="header-left">
        <ul className="header-nav-list"> */}
          {/* <li>
            <Link
              to="#"
              onClick={() => setActiveSection("update-contact")}
              className={location.pathname === "/update-contact" ? "active" : ""}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="#"
              onClick={() => setActiveSection("user-management")}
              className={location.pathname === "/user-management" ? "active" : ""}
            >
              User Management
            </Link>
          </li>
          <li>
            <Link
              to="#"
              onClick={() => setActiveSection("message")}
              className={location.pathname === "/message" ? "active" : ""}
            >
              SMS Message
            </Link>
          </li>
          <li>
            <Link
              to="#"
              onClick={() => setActiveSection("manage-complaints")}
              className={location.pathname === "/manage-complaints" ? "active" : ""}
            >
              Complaints
            </Link>
          </li>
          <li>
            <Link
              to="#"
              onClick={() => setActiveSection("notice-management")}
              className={location.pathname === "/notice-management" ? "active" : ""}
            >
              Notice
            </Link>
          </li> */}
{/*          
        </ul>
      </div> */}

    </div>
  );
};

export default Header;
