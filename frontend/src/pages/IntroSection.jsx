import React from "react";
import { motion } from "framer-motion";
import "../styles/AnimationPage.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // 🆕 Import

const IntroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // 🆕 Hook

  return (
    <div className="animation-wrapper">
      <motion.div
        className="circle"
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="animated-title"
      >
        {t("introTitle")}
      </motion.h1>

      <motion.button
        className="enter-button"
        whileHover={{ scale: 1.1 }}
        onClick={() => navigate("/home")}
      >
        {t("enterButton")}
      </motion.button>
    </div>
  );
};

export default IntroSection;
