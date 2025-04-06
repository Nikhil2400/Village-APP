import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/BackButton.css";

const BackButton = () => {
  const navigate = useNavigate();

  // Define paths where the button should be hidden
  const hideOnPaths = ["/", "/home", "/login", "/register"];
  const currentPath = window.location.pathname;

  if (hideOnPaths.includes(currentPath)) {
    return null;
  }

  return (
    <div className="back-button" onClick={() => navigate(-1)}>
      <FaArrowLeft />
    </div>
  );
};

export default BackButton;
