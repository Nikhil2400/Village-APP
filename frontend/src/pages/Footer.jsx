import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer-container">
      <div className="footer-content">

        {/* About Section */}
        <div className="footer-about">
          <h3 className="footer-heading">{t('aboutHeading')}</h3>
          <p className="footer-text">{t('aboutText')}</p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3 className="footer-heading">{t('quickLinks')}</h3>
          <ul>
            <li><Link to="/home" className="footer-link">{t('home')}</Link></li>
            <li><Link to="/panchayat" className="footer-link">{t('panchayat')}</Link></li>
            <li><Link to="/education" className="footer-link">{t('education')}</Link></li>
            <li><Link to="/health" className="footer-link">{t('health')}</Link></li>
            <li><Link to="/schemes" className="footer-link">{t('schemes')}</Link></li>
            <li><Link to="/tourism" className="footer-link">{t('tourism')}</Link></li>
            <li><Link to="/complaints" className="footer-link">{t('complaints')}</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-contact">
          <h3 className="footer-heading">{t('contactHeading')}</h3>
          <p className="footer-text">{t('contactPrompt')}</p>
          <p className="footer-text">{t('email')} info@villageinfo.com</p>
          <p className="footer-text">{t('phone')} +123 456 7890</p>

          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noreferrer noopener" className="footer-social-icon" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer noopener" className="footer-social-icon" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer noopener" className="footer-social-icon" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer noopener" className="footer-social-icon" aria-label="WhatsApp">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="mailto:info@villageinfo.com" className="footer-social-icon" aria-label="Email">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer noopener" className="footer-social-icon" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <p>&copy; 2025 {t('rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;
