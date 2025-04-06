import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp } from "react-icons/fa";
import "../styles/SocialApps.css";

const socialLinks = [
    { name: "FaceBook", icon: <FaFacebook />, url: "https://www.facebook.com", color: "#1877F2" },
    { name: "Twiter", icon: <FaTwitter />, url: "https://www.twitter.com", color: "#1DA1F2" },
    { name: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com", color: "#E4405F" },
    { name: "YouTube", icon: <FaYoutube />, url: "https://www.youtube.com", color: "#FF0000" },
    { name: "WhatsApp", icon: <FaWhatsapp />, url: "https://wa.me/your-number", color: "#25D366" },
];

const SocialApps = () => {
    return (
        <motion.div 
            className="social-container"
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
        >
            <h1 className="title">आमच्या सोशल मीडियावर आम्हाला फॉलो करा</h1>
            <div className="icons-container">
                {socialLinks.map((link, index) => (
                    <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        style={{ backgroundColor: link.color }}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {link.icon}
                        <span>{link.name}</span>
                    </motion.a>
                ))}
            </div>
        </motion.div>
    );
};

export default SocialApps;
