import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import {
  Assignment, LocalHospital, Campaign, Group, Gavel,
  People, Notifications, Report, Payment, Description,
  Place, LiveTv, Photo
} from '@mui/icons-material';
import '../styles/Home.css';


const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const options = [
    { title: t('health'), color: '#ffa726', route: '/about-health', icon: <Assignment fontSize="large" /> },
    { title: t('hospitals'), color: '#dcedc8', route: '/hospitals', icon: <LocalHospital fontSize="large" /> },
    { title: t('govSchemes'), color: '#80deea', route: '/govschemes', icon: <Campaign fontSize="large" /> },
    { title: t('pmSchemes'), color: '#ffccbc', route: '/government-schemes', icon: <Assignment fontSize="large" /> },
    { title: t('socialApps'), color: '#ba68c8', route: '/social-apps', icon: <Group fontSize="large" /> },
    { title: t('gramSabha'), color: '#f48fb1', route: '/gram-sabha', icon: <Gavel fontSize="large" /> },
    { title: t('rules'), color: '#ffb74d', route: '/rules-regulations', icon: <Gavel fontSize="large" /> },
    { title: t('members'), color: '#4db6ac', route: '/member-form', icon: <People fontSize="large" /> },
    { title: t('notice'), color: '#7986cb', route: '/notice', icon: <Notifications fontSize="large" /> },
    { title: t('complaints'), color: '#64b5f6', route: '/complaints', icon: <Report fontSize="large" /> },
    { title: t('payments'), color: '#81c784', route: '/user-donation', icon: <Payment fontSize="large" /> },
    { title: t('farmerForm'), color: '#8d6e63', route: '/farmer-form', icon: <Description fontSize="large" /> },
    { title: t('Education'), color: '#b2dfdb', route: '/education', icon: <Place fontSize="large" /> },
    { title: t('liveTv'), color: '#d1c4e9', route: '/live-streaming', icon: <LiveTv fontSize="large" /> },
    { title: t('Animation'), color: '#f48fb1', route: '/intro-section', icon: <Photo fontSize="large" /> },
    { title: t('calendar'), color: '#4db6ac', route: '/digital-calendar', icon: <Photo fontSize="large" /> },
  ];

  return (
    <Box p={2}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
      
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        {options.map((option, index) => (
          <Box
            key={index}
            onClick={() => navigate(option.route)}
            sx={{
              width: {
                xs: '47%',
                sm: '30%',
                md: '15%'
              },
              backgroundColor: option.color,
              color: '#000',
              padding: 2,
              borderRadius: 8,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Box mb={1}>{option.icon}</Box>
            <Typography variant="subtitle1" fontWeight="medium">
              {option.title}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* 👇 Social Media Icons */}
     
      <Box className="social-icons" sx={{ textAlign: 'center', mt: 5 }}>
        <a href="https://chat.whatsapp.com/YourGroupLink" target="_blank" rel="noopener noreferrer">
          <img src="/home/whatsapp.png" alt="WhatsApp" className="social-logo" width="40" style={{ margin: '0 10px' }} />
        </a>
        <a href="https://www.youtube.com/YourChannel" target="_blank" rel="noopener noreferrer">
          <img src="/home/youtube.png" alt="YouTube" className="social-logo" width="40" style={{ margin: '0 10px' }} />
        </a>
        <a href="https://www.instagram.com/YourProfile" target="_blank" rel="noopener noreferrer">
          <img src="/home/instagram.png" alt="Instagram" className="social-logo" width="40" style={{ margin: '0 10px' }} />
        </a>
        <a href="mailto:your-email@gmail.com" target="_blank" rel="noopener noreferrer">
          <img src="/home/mail.png" alt="Gmail" className="social-logo" width="40" style={{ margin: '0 10px' }} />
        </a>
      </Box>

      {/* 👇 Footer Running Text */}
      <footer className="footer" style={{ marginTop: '30px', textAlign: 'center' }}>
        <div className="running-text" style={{ background: '#eee', padding: '10px 0', fontWeight: 'bold' }}>
          Welcome 
        </div>
      </footer>
    </Box>
  );
};

export default Home;
