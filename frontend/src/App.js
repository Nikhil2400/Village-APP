import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AdminDashboard from './components/Admin/AdminDashboard';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Navbar from './pages/Navbar';
import FarmerForm from './farmerinfo/FarmerForm';
import AdminRoutes from './routes/AdminRoutes';
import './App.css';
import About from './components/panchayat/About';
import Notice from './components/panchayat/Notice';
import ContactUs from './components/ContactUs';
import ComplaintForm from './components/ComplaintForm';
import AdminPanel from './components/Admin/AdminPanel';
import Receipt from './components/Receipt';
import UserDonation from './components/UserDonation';
import LandingPage from './pages/LandingPage';
import GovSchemes from './schemes/GovSchemes';
import Hospitals from './schemes/Hospitals';
import GovernmentSchemes from './schemes/GovernmentSchemes';
import AboutHealth from './schemes/AboutHealth';
import SocialApps from './schemes/SocialApps';
import RulesRegulations from './schemes/RulesRegulations';
import GramSabha from './schemes/GramSabha';
import MemberForm from './schemes/MemberForm';
import Documents from './schemes/Documents';
import LiveStreaming from './schemes/LiveStreaming';
import ForgotPassword from './pages/ForgotPassword';
import Tourism from './schemes/Tourism';
import DigitalCalendar from './schemes/DigitalCalendar';
import { useTranslation } from "react-i18next";
import LanguageSelector from "./components/LanguageSelector";
import UserProfile from './components/UserProfile';
import Education from './schemes/Education';
import BackButton from './pages/BackButton';
import Edu from './pages/Edu';
import IntroSection from './pages/IntroSection';

const App = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('role');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAdmin(userType === 'admin');
    }
    setLoading(false);
  }, []);

  const isAdminPage = location.pathname.startsWith('/admin');

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <LanguageSelector />
      <BackButton/>
    
     

      

      {!isAdminPage && <Header user={user} isAdmin={isAdmin} setUser={setUser} setIsAdmin={setIsAdmin} />}
      {!isAdminPage && <Navbar isAdmin={isAdmin} user={user} />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={user ? <Navigate to={isAdmin ? "/admin" : "/home"} /> : <Login setUser={setUser} setIsAdmin={setIsAdmin} />} />
        <Route path="/register" element={user ? <Navigate to={isAdmin ? "/admin" : "/home"} /> : <Register />} />
        <Route path="/home" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
        <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/admin/*" element={isAdmin ? <AdminRoutes /> : <Navigate to="/login" />} />

        {/* General Routes */}
        <Route path="/farmer-form" element={<FarmerForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/complaints" element={<ComplaintForm />} />
        <Route path="/user-donation" element={<UserDonation />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/edu" element={<Edu />} />
        <Route path="/intro-section" element={<IntroSection />} />
        
        {/* Schemes */}
        <Route path="/govschemes" element={<GovSchemes />} />
        <Route path="/social-apps" element={<SocialApps />} />
        <Route path="/rules-regulations" element={<RulesRegulations />} />
        <Route path="/gram-sabha" element={<GramSabha />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/government-schemes" element={<GovernmentSchemes />} />
        <Route path="/about-health" element={<AboutHealth />} />
        <Route path="/member-form" element={<MemberForm />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/live-streaming" element={<LiveStreaming />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/tourism" element={<Tourism />} />
        <Route path="/digital-calendar" element={<DigitalCalendar />} />
        <Route path="/education" element={<Education />} />
      

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </div>
  );
};

export default App;
